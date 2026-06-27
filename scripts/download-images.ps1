param(
    [string]$Section = "all"
)

$baseUrl = "https://image.pollinations.ai/prompt"
$outputRoot = "C:\Users\Jithendra Krishna\Downloads\klk\kvr-agro-gardens\public\images"
$maxParallel = 5

function EncodePrompt($text) {
    return [System.Uri]::EscapeDataString($text)
}

function Download-Image {
    param($Prompt, $OutputPath, $Seed, $Width = 600, $Height = 600)
    
    $encodedPrompt = EncodePrompt $Prompt
    $url = "$baseUrl/$encodedPrompt`?width=$Width&height=$Height&nologo=true&seed=$Seed"
    
    $dir = Split-Path $OutputPath -Parent
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $OutputPath -UseBasicParsing -ErrorAction Stop | Out-Null
        $size = (Get-Item $OutputPath).Length
        if ($size -gt 1000) {
            return $true
        } else {
            Write-Warning "Small file: $OutputPath ($size bytes)"
            return $false
        }
    } catch {
        Write-Warning "Failed: $OutputPath - $_"
        return $false
    }
}

function Run-Batch {
    param($Jobs)
    
    $batchNum = 1
    $total = $Jobs.Count
    $success = 0
    $failed = 0
    
    for ($i = 0; $i -lt $total; $i += $maxParallel) {
        $end = [Math]::Min($i + $maxParallel, $total)
        $batch = $Jobs[$i..($end-1)]
        
        Write-Output "Batch $batchNum: Processing items $($i+1) to $end of $total..."
        
        $results = @()
        foreach ($job in $batch) {
            $results += Start-Job -ScriptBlock {
                param($p, $o, $s, $w, $h)
                $encPrompt = [System.Uri]::EscapeDataString($p)
                $url = "https://image.pollinations.ai/prompt/$encPrompt`?width=$w&height=$h&nologo=true&seed=$s"
                $dir = Split-Path $o -Parent
                if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
                try {
                    Invoke-WebRequest -Uri $url -OutFile $o -UseBasicParsing -ErrorAction Stop | Out-Null
                    $sz = (Get-Item $o).Length
                    return @{ Path = $o; Success = ($sz -gt 1000); Size = $sz }
                } catch { return @{ Path = $o; Success = $false; Error = $_ } }
            } -ArgumentList $job.Prompt, $job.Output, $job.Seed, $job.Width, $job.Height
        }
        
        $results | Wait-Job | Receive-Job | ForEach-Object {
            if ($_.Success) { $success++ } else { $failed++; Write-Warning "Failed: $($_.Path)" }
        }
        
        $batchNum++
        Start-Sleep -Milliseconds 500
    }
    
    Write-Output "Completed: $success successful, $failed failed"
    return $success
}
