param([string]$Section = "all")

$outputRoot = "C:\Users\Jithendra Krishna\Downloads\klk\kvr-agro-gardens\public\images"

function Ensure-Dir($Path) {
    if (!(Test-Path $Path)) { New-Item -ItemType Directory -Path $Path -Force | Out-Null }
}

function Download-Image($prompt, $filePath, $seed, $w, $h) {
    if (Test-Path $filePath) {
        Write-Output "  EXISTS $([System.IO.Path]::GetFileName($filePath))"
        return $true
    }
    $dir = [System.IO.Path]::GetDirectoryName($filePath)
    Ensure-Dir $dir
    $encPrompt = [System.Uri]::EscapeDataString($prompt)
    $url = "https://image.pollinations.ai/prompt/$encPrompt`?width=$w&height=$h&nologo=true&seed=$seed"
    try {
        Write-Output "  DOWNLOAD $([System.IO.Path]::GetFileName($filePath))"
        Invoke-WebRequest -Uri $url -OutFile $filePath -UseBasicParsing -ErrorAction Stop | Out-Null
        $sz = (Get-Item $filePath).Length
        if ($sz -gt 1000) { return $true }
        else { Write-Warning "  SMALL FILE ($sz bytes): $filePath"; return $false }
    } catch {
        Write-Warning "  FAILED: $($_.Exception.Message)"
        return $false
    }
}

# PLANTS
if ($Section -eq "all" -or $Section -eq "plants") {
    Write-Output "=== PLANTS ==="
    $dir = "$outputRoot\plants"; Ensure-Dir $dir
    $ok = 0; $fail = 0
    $all = @(
        @("Snake Plant Sansevieria Trifasciata in modern white ceramic pot isolated on white background, tall green leaves yellow edges, sharp focus natural lighting, product photography 8K", "snake-plant.jpg", 1, 600, 600),
        @("Peace Lily with white blooms and glossy dark leaves in premium ceramic pot, white background studio lighting 8K", "peace-lily.jpg", 2, 600, 600),
        @("Monstera Deliciosa with large split green leaves in decorative pot, white background bright natural lighting 8K", "monstera-deliciosa.jpg", 3, 600, 600),
        @("Golden Pothos with trailing green and yellow variegated leaves in hanging ceramic pot, white background", "golden-pothos.jpg", 4, 600, 600),
        @("ZZ Plant with glossy dark green waxy leaves in minimalist pot, white background natural lighting 8K", "zz-plant.jpg", 5, 600, 600),
        @("Spider Plant with arching green white striped leaves and baby spiderettes in hanging pot, white background", "spider-plant.jpg", 6, 600, 600),
        @("Fiddle Leaf Fig Ficus Lyrata with large violin-shaped green leaves in terracotta pot, white background 8K", "fiddle-leaf-fig.jpg", 7, 600, 600),
        @("Areca Palm Butterfly Palm with feathery green fronds in large decorative pot, white background 8K", "areca-palm.jpg", 8, 600, 600),
        @("Aloe Vera succulent with thick fleshy green spiky leaves in terracotta pot, white background studio lighting", "aloe-vera.jpg", 9, 600, 600),
        @("Tulsi Holy Basil Indian plant with green aromatic leaves in clay pot, white background natural lighting", "tulsi.jpg", 10, 600, 600),
        @("Hybrid Tea Rose with red blooming flower and green leaves in garden pot, white background bright sunlight 8K", "rose.jpg", 11, 600, 600),
        @("Jasmine Mogra with small white fragrant flowers and green leaves in decorative pot, white background", "jasmine.jpg", 12, 600, 600),
        @("Bougainvillea Glabra with vibrant magenta pink bracts and green leaves in garden pot, white background", "bougainvillea.jpg", 13, 600, 600),
        @("Hibiscus Rosa Sinensis with large red showy flower glossy leaves in pot, white background bright sunlight", "hibiscus.jpg", 14, 600, 600),
        @("Dendrobium Orchid with purple white long-lasting blooms in transparent pot, white background studio 8K", "orchid.jpg", 15, 600, 600),
        @("Bonsai Ficus miniature tree with thick trunk aerial roots in shallow bonsai pot, white background 8K", "bonsai-ficus.jpg", 16, 600, 600),
        @("Mint fresh green aromatic herb plant in small pot, white background bright natural lighting", "mint.jpg", 17, 600, 600),
        @("Neem Tree young medicinal plant with green compound leaves in pot, white background natural lighting", "neem.jpg", 18, 600, 600),
        @("Tomato Plant with green leaves and yellow flowers in pot, white background bright natural lighting", "tomato.jpg", 19, 600, 600),
        @("Mango Plant grafted fruit tree with green leaves in large pot, white background bright sunlight 8K", "mango.jpg", 20, 600, 600),
        @("Echeveria succulent rosette with fleshy blue-green leaves in small decorative pot, white background", "echeveria.jpg", 21, 600, 600),
        @("Jade Plant with thick glossy oval leaves in ceramic pot, white background bright natural lighting", "jade-plant.jpg", 22, 600, 600),
        @("Dwarf Lemon Plant with green leaves and yellow fruits in pot, white background bright sunlight", "lemon.jpg", 23, 600, 600),
        @("Money Plant with heart-shaped green leaves trailing from hanging pot, white background natural lighting", "money-plant.jpg", 24, 600, 600),
        @("Marigold with bright golden yellow pom-pom flowers in pot, white background bright sunlight", "marigold.jpg", 25, 600, 600),
        @("Philodendron Brasil with heart-shaped green yellow variegated trailing leaves, white background", "philodendron-brasil.jpg", 26, 600, 600),
        @("Chinese Evergreen with silver-patterned green leaves in ceramic pot, white background indoor plant", "chinese-evergreen.jpg", 27, 600, 600),
        @("Rubber Plant Ficus Elastica with large glossy dark green leaves in premium pot, white background 8K", "rubber-plant.jpg", 28, 600, 600),
        @("Ixora Kerala shrub with clusters bright red flowers green leaves in pot, white background bright sunlight", "ixora.jpg", 29, 600, 600),
        @("Crossandra Firecracker Flower with salmon-orange blooms and green leaves in pot, white background", "crossandra.jpg", 30, 600, 600),
        @("Adenium Desert Rose succulent thick caudex pink flowers in pot, white background bright sunlight 8K", "adenium.jpg", 31, 600, 600),
        @("Plumeria with fragrant white yellow tropical flowers leaves in pot, white background bright sunlight", "plumeria.jpg", 32, 600, 600),
        @("Chrysanthemum with pom-pom shaped pink flowers green leaves in pot, white background natural lighting", "chrysanthemum.jpg", 33, 600, 600),
        @("Lavender with purple flower spikes silver-green foliage in terracotta pot, white background sunlight", "lavender.jpg", 34, 600, 600),
        @("Curry Leaf Plant with aromatic green leaves in pot, white background natural lighting kitchen garden", "curry-leaf.jpg", 35, 600, 600),
        @("Coriander fresh green leafy herb in small pot, white background bright natural lighting", "coriander.jpg", 36, 600, 600),
        @("Lemongrass aromatic grass with long green blades in pot, white background bright sunlight", "lemongrass.jpg", 37, 600, 600),
        @("Guava Plant grafted fruit tree with green leaves in pot, white background bright sunlight", "guava.jpg", 38, 600, 600),
        @("Dwarf Pomegranate with orange-red flowers and green leaves in pot, white background bright sunlight 8K", "pomegranate.jpg", 39, 600, 600),
        @("Ashwagandha Ayurvedic medicinal herb with green leaves in pot, white background natural lighting", "ashwagandha.jpg", 40, 600, 600),
        @("String of Pearls trailing succulent with pearl-like green beads hanging pot, white background", "string-of-pearls.jpg", 41, 600, 600),
        @("Calathea Orbifolia prayer plant with large round silver-striped green leaves, white background 8K", "calathea.jpg", 42, 600, 600),
        @("Green Chilli Plant with spicy green chillies leaves in pot, white background bright sunlight", "chilli.jpg", 43, 600, 600),
        @("Brinjal eggplant plant with glossy purple fruits leaves in pot, white background bright sunlight", "brinjal.jpg", 44, 600, 600),
        @("Sweet Basil aromatic Italian herb with large green leaves in pot, white background bright lighting", "basil.jpg", 45, 600, 600)
    )
    foreach ($item in $all) {
        $file = "$dir\$($item[1])"
        if (Download-Image $item[0] $file $item[2] $item[3] $item[4]) { $ok++ } else { $fail++ }
    }
    Write-Output "Plants: $ok OK, $fail Fail"
}

# CATEGORIES
if ($Section -eq "all" -or $Section -eq "categories") {
    Write-Output "=== CATEGORIES ==="
    $dir = "$outputRoot\categories"; Ensure-Dir $dir
    $ok = 0; $fail = 0
    $all = @(
        @("Beautiful indoor house plants in decorative pots on white shelf, bright living room natural sunlight lush green foliage 8K", "indoor.jpg", 401, 800, 600),
        @("Lush outdoor garden with flowering shrubs green plants sunny backyard stone pathway tropical landscape 8K", "outdoor.jpg", 402, 800, 600),
        @("Vibrant flowering plants garden colorful blooms red pink yellow purple butterflies hovering bright sunlight 8K", "flowering.jpg", 403, 800, 600),
        @("Medicinal Ayurvedic herbs in clay pots Tulsi Aloe Neem Ashwagandha traditional Indian medicinal garden 8K", "medicinal.jpg", 404, 800, 600),
        @("Grafted fruit trees sunny orchard mango guava lemon pomegranate fruits tropical fruit garden 8K", "fruit.jpg", 405, 800, 600),
        @("Organic vegetable garden fresh green seedlings raised bed tomatoes chillies brinjals kitchen garden 8K", "vegetable.jpg", 406, 800, 600),
        @("Aromatic herb garden mint coriander basil rosemary curry leaves in clay pots fresh herbs sunlight 8K", "herb.jpg", 407, 800, 600),
        @("Beautiful succulents cacti collection small decorative pots wooden desk various shapes colors 8K", "succulent.jpg", 408, 800, 600),
        @("Rare exotic tropical plants unusual colorful leaves patterns monstera calathea orchids greenhouse 8K", "exotic.jpg", 409, 800, 600),
        @("Elegant palm trees ferns in decorative pots tropical foliage feathery fronds resort style 8K", "palm.jpg", 410, 800, 600),
        @("Beautiful climbing plants vines on garden trellis flowering creepers green leaves 8K", "climber.jpg", 411, 800, 600),
        @("Elegant bonsai tree collection miniature trained trees beautiful ceramic pots zen garden 8K", "bonsai.jpg", 412, 800, 600),
        @("Ornamental bamboo grass garden tall green bamboo stems lush foliage Japanese style 8K", "bamboo.jpg", 413, 800, 600),
        @("Aquatic pond plants water lilies lotus floating serene pond koi fish 8K", "aquatic.jpg", 414, 800, 600),
        @("Hanging basket plants trailing from ceiling lush green cascading foliage macrame hangers 8K", "hanging.jpg", 415, 800, 600),
        @("Fragrant flowering garden jasmine roses lavender morning dew petals perfume garden 8K", "fragrant.jpg", 416, 800, 600),
        @("Air purifying indoor plants snake plant peace lily spider plant pothos white background 8K", "air-purifying.jpg", 417, 800, 600),
        @("Drought tolerant garden succulents cacti agave desert plants dry rocky landscape hot sunlight 8K", "drought-tolerant.jpg", 418, 800, 600),
        @("Pet friendly house plants safe cats dogs spider plant ferns calathea modern home 8K", "pet-friendly.jpg", 419, 800, 600),
        @("Seasonal blooming flowers collection colorful annual plants full bloom flower market 8K", "seasonal.jpg", 420, 800, 600)
    )
    foreach ($item in $all) {
        if (Download-Image $item[0] "$dir\$($item[1])" $item[2] $item[3] $item[4]) { $ok++ } else { $fail++ }
    }
    Write-Output "Categories: $ok OK, $fail Fail"
}

# SERVICES
if ($Section -eq "all" -or $Section -eq "services") {
    Write-Output "=== SERVICES ==="
    $dir = "$outputRoot\services"; Ensure-Dir $dir
    $ok = 0; $fail = 0
    $all = @(
        @("Landscaping design service beautiful garden stone pathways water features colorful flower beds 8K", "landscaping.jpg", 101, 600, 600),
        @("Garden setup service fresh soil preparation organic compost planting new seedlings flowers 8K", "garden-setup.jpg", 102, 600, 600),
        @("Garden maintenance service gardener pruning plants trimming hedges healthy green garden 8K", "garden-maintenance.jpg", 103, 600, 600),
        @("Beautiful vertical garden living wall on building lush plants growing vertically green architecture 8K", "vertical-garden.jpg", 104, 600, 600),
        @("Terrace garden on rooftop potted plants flowers herbs seating area urban green oasis 8K", "terrace-garden.jpg", 105, 600, 600),
        @("Organic kitchen garden raised vegetable beds fresh tomatoes lettuce herbs growing 8K", "kitchen-garden.jpg", 106, 600, 600),
        @("Organic farming setup compost pile natural fertilizers healthy soil green crops 8K", "organic-farming.jpg", 107, 600, 600),
        @("Plant rental service for events offices lush green plants corporate event decoration 8K", "plant-rental.jpg", 108, 600, 600),
        @("Corporate office plants service modern office with beautiful green plants biophilic design 8K", "corporate-plants.jpg", 109, 600, 600),
        @("Garden consultation service expert horticulturist advising homeowners on garden design 8K", "garden-consultation.jpg", 110, 600, 600),
        @("Plant doctor service expert examining plant leaves for diseases pests plant healthcare 8K", "plant-doctor.jpg", 111, 600, 600),
        @("Home plant delivery service cardboard box with healthy plants inside safe packaging 8K", "home-delivery.jpg", 112, 600, 600),
        @("Bulk plant orders hotels resorts institutions large quantity plants ready for delivery 8K", "bulk-orders.jpg", 113, 600, 600),
        @("Office decoration with plants beautiful workspace indoor plants on desks shelves 8K", "office-decoration.jpg", 114, 600, 600)
    )
    foreach ($item in $all) {
        if (Download-Image $item[0] "$dir\$($item[1])" $item[2] $item[3] $item[4]) { $ok++ } else { $fail++ }
    }
    Write-Output "Services: $ok OK, $fail Fail"
}

# TESTIMONIALS
if ($Section -eq "all" -or $Section -eq "testimonials") {
    Write-Output "=== TESTIMONIALS ==="
    $dir = "$outputRoot\testimonials"; Ensure-Dir $dir
    $ok = 0; $fail = 0
    for ($i = 1; $i -le 8; $i++) {
        $seed = 300 + $i
        $prompt = "Professional portrait photo of a smiling Indian person, happy satisfied customer, friendly face, warm natural lighting, headshot photography"
        if (Download-Image $prompt "$dir\customer-$( '{0:D2}' -f $i ).jpg" $seed 200 200) { $ok++ } else { $fail++ }
    }
    Write-Output "Testimonials: $ok OK, $fail Fail"
}

# BLOG
if ($Section -eq "all" -or $Section -eq "blog") {
    Write-Output "=== BLOG ==="
    $dir = "$outputRoot\blog"; Ensure-Dir $dir
    $ok = 0; $fail = 0
    $all = @(
        @("Best indoor plants for beginners Kerala climate snake plant pothos peace lily windowsill tropical home 8K", "indoor-plants-beginners.jpg", 201, 600, 600),
        @("Seasonal garden care guide Kerala gardener caring for plants monsoon summer winter tropical garden 8K", "seasonal-garden-care.jpg", 202, 600, 600),
        @("Organic farming at home step by step hands holding soil with compost vegetable seedlings growing 8K", "organic-farming.jpg", 203, 600, 600),
        @("Essential medicinal plants for Kerala home Tulsi Aloe Neem Ashwagandha clay pots Ayurvedic herbs 8K", "medicinal-plants.jpg", 204, 600, 600),
        @("Growing fruit trees garden mango guava lemon pomegranate fruits home orchard 8K", "fruit-trees.jpg", 205, 600, 600),
        @("Monsoon gardening guide Kerala protecting plants from heavy rain lush green garden 8K", "monsoon-gardening.jpg", 206, 600, 600),
        @("Vertical garden design ideas living green wall various plants biophilic home decor 8K", "vertical-garden-design.jpg", 207, 600, 600),
        @("Vegetable gardening guide Kerala growing your own food fresh harvest tomatoes chillies 8K", "vegetable-gardening.jpg", 208, 600, 600)
    )
    foreach ($item in $all) {
        if (Download-Image $item[0] "$dir\$($item[1])" $item[2] $item[3] $item[4]) { $ok++ } else { $fail++ }
    }
    Write-Output "Blog: $ok OK, $fail Fail"
}

# ABOUT
if ($Section -eq "all" -or $Section -eq "about") {
    Write-Output "=== ABOUT ==="
    $dir = $outputRoot
    if (Download-Image "Aerial view beautiful plant nursery with thousands of plants organized rows greenhouses shade nets customers walking golden morning sunlight cinematic photography 8K" "$dir\about-nursery.jpg" 901 800 600) { Write-Output "About: OK" } else { Write-Output "About: FAIL" }
}

Write-Output "`n=== DOWNLOAD COMPLETE ==="
