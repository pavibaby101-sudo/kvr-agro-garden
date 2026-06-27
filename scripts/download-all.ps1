param([string]$Section = "all")

$outputRoot = "C:\Users\Jithendra Krishna\Downloads\klk\kvr-agro-gardens\public\images"
$maxParallel = 4

function Ensure-Dir {
    param($Path)
    if (!(Test-Path $Path)) { New-Item -ItemType Directory -Path $Path -Force | Out-Null }
}

$scriptBlock = {
    param($prompt, $outputPath, $seed, $w, $h)
    $encPrompt = [System.Uri]::EscapeDataString($prompt)
    $url = "https://image.pollinations.ai/prompt/$encPrompt`?width=$w&height=$h&nologo=true&seed=$seed"
    $dir = [System.IO.Path]::GetDirectoryName($outputPath)
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath -UseBasicParsing -ErrorAction Stop | Out-Null
        $sz = (Get-Item $outputPath).Length
        if ($sz -gt 1000) { return "OK" } else { return "SMALL:$sz" }
    } catch { return "FAIL" }
}

function Download-Batch {
    param($Jobs, $Label)
    
    $total = $Jobs.Count
    $success = 0
    $failed = 0
    Write-Output ">>> $Label ($total images)"
    
    $idx = 0
    while ($idx -lt $total) {
        $end = $idx + $maxParallel
        if ($end -gt $total) { $end = $total }
        $batchNum = [Math]::Floor($idx / $maxParallel) + 1
        $startItem = $idx + 1
        Write-Output "  Batch $batchNum items: $startItem-$end"
        
        $results = @()
        for ($j = $idx; $j -lt $end; $j++) {
            $job = $Jobs[$j]
            $results += Start-Job -ScriptBlock $scriptBlock -ArgumentList $job.Prompt, $job.Output, $job.Seed, $job.Width, $job.Height
        }
        
        $results | Wait-Job | Receive-Job | ForEach-Object {
            if ($_ -eq "OK") { $success++ } else { $failed++ }
        }
        
        $idx = $end
        Start-Sleep -Milliseconds 200
    }
    Write-Output "  Result: $success OK, $failed Failed"
}

# PLANTS
if ($Section -eq "all" -or $Section -eq "plants") {
    $dir = "$outputRoot\plants"; Ensure-Dir $dir
    Download-Batch @(
        @{Prompt="Snake Plant Sansevieria Trifasciata in modern white ceramic pot isolated on white background, tall green leaves yellow edges, sharp focus natural lighting, product photography 8K"; Output="$dir\snake-plant.jpg"; Seed=1; Width=600; Height=600},
        @{Prompt="Peace Lily Spathiphyllum with white blooms and glossy dark leaves in premium ceramic pot, white background, studio lighting 8K"; Output="$dir\peace-lily.jpg"; Seed=2; Width=600; Height=600},
        @{Prompt="Monstera Deliciosa Swiss Cheese Plant with large split green leaves in decorative pot, white background, bright natural lighting 8K"; Output="$dir\monstera-deliciosa.jpg"; Seed=3; Width=600; Height=600},
        @{Prompt="Golden Pothos with trailing heart-shaped green and yellow variegated leaves in hanging ceramic pot, white background, studio lighting"; Output="$dir\golden-pothos.jpg"; Seed=4; Width=600; Height=600},
        @{Prompt="ZZ Plant Zamioculcas Zamiifolia with glossy dark green waxy leaves in minimalist pot, white background, natural lighting 8K"; Output="$dir\zz-plant.jpg"; Seed=5; Width=600; Height=600},
        @{Prompt="Spider Plant Chlorophytum Comosum with arching green white striped leaves and baby spiderettes in hanging white pot, white background"; Output="$dir\spider-plant.jpg"; Seed=6; Width=600; Height=600},
        @{Prompt="Fiddle Leaf Fig Ficus Lyrata with large violin-shaped green leaves in premium terracotta pot, white background, studio lighting 8K"; Output="$dir\fiddle-leaf-fig.jpg"; Seed=7; Width=600; Height=600},
        @{Prompt="Areca Palm Butterfly Palm with feathery green fronds in large decorative pot, white background, bright natural lighting 8K"; Output="$dir\areca-palm.jpg"; Seed=8; Width=600; Height=600},
        @{Prompt="Aloe Vera succulent with thick fleshy green spiky leaves in terracotta pot, white background, sharp focus studio lighting"; Output="$dir\aloe-vera.jpg"; Seed=9; Width=600; Height=600},
        @{Prompt="Tulsi Holy Basil sacred Indian plant with green aromatic leaves in clay pot, white background, natural lighting sharp focus"; Output="$dir\tulsi.jpg"; Seed=10; Width=600; Height=600}
    ) "Plants 1/5"
    
    Download-Batch @(
        @{Prompt="Hybrid Tea Rose with red blooming flower and green leaves in garden pot, white background, bright sunlight, sharp focus 8K"; Output="$dir\rose.jpg"; Seed=11; Width=600; Height=600},
        @{Prompt="Jasmine Mogra with small white fragrant flowers and green leaves in decorative pot, white background, natural lighting"; Output="$dir\jasmine.jpg"; Seed=12; Width=600; Height=600},
        @{Prompt="Bougainvillea Glabra with vibrant magenta pink bracts and green leaves in garden pot, white background, bright sunlight"; Output="$dir\bougainvillea.jpg"; Seed=13; Width=600; Height=600},
        @{Prompt="Hibiscus Rosa Sinensis with large red showy flower and glossy green leaves in pot, white background, bright sunlight 8K"; Output="$dir\hibiscus.jpg"; Seed=14; Width=600; Height=600},
        @{Prompt="Dendrobium Orchid with purple and white long-lasting blooms in transparent pot, white background, elegant studio lighting 8K"; Output="$dir\orchid.jpg"; Seed=15; Width=600; Height=600},
        @{Prompt="Bonsai Ficus Retusa miniature tree with thick trunk aerial roots in shallow bonsai pot, white background, studio lighting 8K"; Output="$dir\bonsai-ficus.jpg"; Seed=16; Width=600; Height=600},
        @{Prompt="Mint Pudina fresh green aromatic herb plant in small pot, white background, bright natural lighting sharp focus"; Output="$dir\mint.jpg"; Seed=17; Width=600; Height=600},
        @{Prompt="Neem Tree young medicinal plant with green compound leaves in pot, white background, natural lighting sharp focus"; Output="$dir\neem.jpg"; Seed=18; Width=600; Height=600},
        @{Prompt="Tomato Plant vegetable seedling with green leaves and yellow flowers in pot, white background, bright natural lighting"; Output="$dir\tomato.jpg"; Seed=19; Width=600; Height=600},
        @{Prompt="Mango Plant grafted fruit tree with green leaves in large pot, white background, bright sunlight 8K"; Output="$dir\mango.jpg"; Seed=20; Width=600; Height=600}
    ) "Plants 2/5"
    
    Download-Batch @(
        @{Prompt="Echeveria Elegans succulent rosette with fleshy blue-green leaves in small decorative pot, white background, studio lighting"; Output="$dir\echeveria.jpg"; Seed=21; Width=600; Height=600},
        @{Prompt="Jade Plant Crassula Ovata money plant with thick glossy oval leaves in ceramic pot, white background, bright natural lighting"; Output="$dir\jade-plant.jpg"; Seed=22; Width=600; Height=600},
        @{Prompt="Dwarf Lemon Plant with green leaves and small yellow fruits in pot, white background, bright sunlight sharp focus"; Output="$dir\lemon.jpg"; Seed=23; Width=600; Height=600},
        @{Prompt="Money Plant with heart-shaped green leaves trailing from hanging pot, white background, natural lighting sharp focus"; Output="$dir\money-plant.jpg"; Seed=24; Width=600; Height=600},
        @{Prompt="Marigold with bright golden yellow pom-pom flowers in pot, white background, bright sunlight sharp focus"; Output="$dir\marigold.jpg"; Seed=25; Width=600; Height=600},
        @{Prompt="Philodendron Brasil with heart-shaped green yellow variegated trailing leaves in hanging pot, white background, bright lighting"; Output="$dir\philodendron-brasil.jpg"; Seed=26; Width=600; Height=600},
        @{Prompt="Chinese Evergreen with silver-patterned green leaves in ceramic pot, white background, indoor foliage plant photography"; Output="$dir\chinese-evergreen.jpg"; Seed=27; Width=600; Height=600},
        @{Prompt="Rubber Plant Ficus Elastica with large glossy dark green leaves in premium pot, white background, studio lighting 8K"; Output="$dir\rubber-plant.jpg"; Seed=28; Width=600; Height=600},
        @{Prompt="Ixora Kerala garden shrub with clusters of bright red flowers and green leaves in pot, white background, bright sunlight"; Output="$dir\ixora.jpg"; Seed=29; Width=600; Height=600},
        @{Prompt="Crossandra Firecracker Flower with salmon-orange blooms and green leaves in pot, white background, natural lighting"; Output="$dir\crossandra.jpg"; Seed=30; Width=600; Height=600}
    ) "Plants 3/5"
    
    Download-Batch @(
        @{Prompt="Adenium Desert Rose succulent with thick caudex and pink trumpet-shaped flowers in pot, white background, bright sunlight 8K"; Output="$dir\adenium.jpg"; Seed=31; Width=600; Height=600},
        @{Prompt="Plumeria Champa Frangipani with fragrant white yellow tropical flowers and leaves in pot, white background, bright sunlight"; Output="$dir\plumeria.jpg"; Seed=32; Width=600; Height=600},
        @{Prompt="Chrysanthemum with pom-pom shaped pink flowers and green leaves in pot, white background, bright natural lighting"; Output="$dir\chrysanthemum.jpg"; Seed=33; Width=600; Height=600},
        @{Prompt="Lavender with purple flower spikes and silver-green foliage in terracotta pot, white background, bright sunlight aromatic herb"; Output="$dir\lavender.jpg"; Seed=34; Width=600; Height=600},
        @{Prompt="Curry Leaf Plant with aromatic green leaves in pot, white background, natural lighting sharp focus kitchen garden"; Output="$dir\curry-leaf.jpg"; Seed=35; Width=600; Height=600},
        @{Prompt="Coriander Dhaniya fresh green leafy herb in small pot, white background, bright natural lighting sharp focus"; Output="$dir\coriander.jpg"; Seed=36; Width=600; Height=600},
        @{Prompt="Lemongrass aromatic grass with long green blades in pot, white background, bright sunlight medicinal plant"; Output="$dir\lemongrass.jpg"; Seed=37; Width=600; Height=600},
        @{Prompt="Guava Plant grafted fruit tree with green leaves in pot, white background, bright sunlight sharp focus"; Output="$dir\guava.jpg"; Seed=38; Width=600; Height=600},
        @{Prompt="Dwarf Pomegranate with orange-red flowers and green leaves in pot, white background, bright sunlight 8K"; Output="$dir\pomegranate.jpg"; Seed=39; Width=600; Height=600},
        @{Prompt="Ashwagandha Ayurvedic medicinal herb with green leaves in pot, white background, natural lighting sharp focus"; Output="$dir\ashwagandha.jpg"; Seed=40; Width=600; Height=600}
    ) "Plants 4/5"
    
    Download-Batch @(
        @{Prompt="String of Pearls trailing succulent with pearl-like green beads cascading from hanging pot, white background, natural lighting"; Output="$dir\string-of-pearls.jpg"; Seed=41; Width=600; Height=600},
        @{Prompt="Calathea Orbifolia prayer plant with large round silver-striped green leaves in ceramic pot, white background, soft lighting 8K"; Output="$dir\calathea.jpg"; Seed=42; Width=600; Height=600},
        @{Prompt="Green Chilli Plant with spicy green chillies and leaves in pot, white background, bright sunlight sharp focus"; Output="$dir\chilli.jpg"; Seed=43; Width=600; Height=600},
        @{Prompt="Brinjal Eggplant vegetable plant with glossy purple fruits and leaves in pot, white background, bright sunlight"; Output="$dir\brinjal.jpg"; Seed=44; Width=600; Height=600},
        @{Prompt="Sweet Basil aromatic Italian herb with large green leaves in pot, white background, bright natural lighting"; Output="$dir\basil.jpg"; Seed=45; Width=600; Height=600}
    ) "Plants 5/5"
}

# CATEGORIES
if ($Section -eq "all" -or $Section -eq "categories") {
    $dir = "$outputRoot\categories"; Ensure-Dir $dir
    Download-Batch @(
        @{Prompt="Beautiful collection of indoor house plants in decorative pots on white shelf, bright living room with natural sunlight, lush green foliage 8K"; Output="$dir\indoor.jpg"; Seed=401; Width=800; Height=600},
        @{Prompt="Lush outdoor garden with flowering shrubs and green plants, sunny backyard with stone pathway, tropical garden landscape 8K"; Output="$dir\outdoor.jpg"; Seed=402; Width=800; Height=600},
        @{Prompt="Vibrant flowering plants garden with colorful blooms red pink yellow purple, butterflies hovering, bright sunlight 8K"; Output="$dir\flowering.jpg"; Seed=403; Width=800; Height=600},
        @{Prompt="Collection of medicinal Ayurvedic herbs in clay pots, Tulsi Aloe Neem Ashwagandha, traditional Indian medicinal garden 8K"; Output="$dir\medicinal.jpg"; Seed=404; Width=800; Height=600},
        @{Prompt="Grafted fruit trees in sunny orchard, mango guava lemon pomegranate with fruits, tropical fruit garden 8K"; Output="$dir\fruit.jpg"; Seed=405; Width=800; Height=600}
    ) "Categories 1/4"
    
    Download-Batch @(
        @{Prompt="Organic vegetable garden with fresh green seedlings in raised beds, tomatoes chillies brinjals, kitchen garden sunlight 8K"; Output="$dir\vegetable.jpg"; Seed=406; Width=800; Height=600},
        @{Prompt="Aromatic herb garden with mint coriander basil rosemary curry leaves in clay pots, fresh herbs sunlight 8K"; Output="$dir\herb.jpg"; Seed=407; Width=800; Height=600},
        @{Prompt="Beautiful succulent and cacti collection in small decorative pots on wooden desk, various shapes colors 8K"; Output="$dir\succulent.jpg"; Seed=408; Width=800; Height=600},
        @{Prompt="Rare exotic tropical plants with unusual colorful leaves and patterns, monstera calathea orchids greenhouse 8K"; Output="$dir\exotic.jpg"; Seed=409; Width=800; Height=600},
        @{Prompt="Elegant palm trees and ferns in decorative pots, tropical foliage with feathery fronds, resort style 8K"; Output="$dir\palm.jpg"; Seed=410; Width=800; Height=600}
    ) "Categories 2/4"
    
    Download-Batch @(
        @{Prompt="Beautiful climbing plants and vines growing on garden trellis, flowering creepers with green leaves 8K"; Output="$dir\climber.jpg"; Seed=411; Width=800; Height=600},
        @{Prompt="Elegant bonsai tree collection, miniature trained trees in beautiful ceramic bonsai pots, zen garden 8K"; Output="$dir\bonsai.jpg"; Seed=412; Width=800; Height=600},
        @{Prompt="Ornamental bamboo and grass garden, tall green bamboo stems with lush foliage, Japanese garden style 8K"; Output="$dir\bamboo.jpg"; Seed=413; Width=800; Height=600},
        @{Prompt="Beautiful aquatic pond plants with water lilies and lotus floating on serene pond, koi fish 8K"; Output="$dir\aquatic.jpg"; Seed=414; Width=800; Height=600},
        @{Prompt="Beautiful hanging basket plants trailing from ceiling, lush green cascading foliage, macrame hangers 8K"; Output="$dir\hanging.jpg"; Seed=415; Width=800; Height=600}
    ) "Categories 3/4"
    
    Download-Batch @(
        @{Prompt="Fragrant flowering garden with jasmine roses lavender, morning dew on petals, perfume garden 8K"; Output="$dir\fragrant.jpg"; Seed=416; Width=800; Height=600},
        @{Prompt="Air purifying indoor plants snake plant peace lily spider plant pothos on white background, clean modern interior 8K"; Output="$dir\air-purifying.jpg"; Seed=417; Width=800; Height=600},
        @{Prompt="Drought tolerant garden with succulents cacti agave desert plants, dry rocky landscape, hot sunlight 8K"; Output="$dir\drought-tolerant.jpg"; Seed=418; Width=800; Height=600},
        @{Prompt="Pet friendly house plants safe for cats and dogs, spider plant ferns calathea in modern home 8K"; Output="$dir\pet-friendly.jpg"; Seed=419; Width=800; Height=600},
        @{Prompt="Seasonal blooming flowers collection, colorful annual plants in full bloom, flower market 8K"; Output="$dir\seasonal.jpg"; Seed=420; Width=800; Height=600}
    ) "Categories 4/4"
}

# SERVICES
if ($Section -eq "all" -or $Section -eq "services") {
    $dir = "$outputRoot\services"; Ensure-Dir $dir
    Download-Batch @(
        @{Prompt="Professional landscaping design service, beautiful garden with stone pathways water features colorful flower beds 8K"; Output="$dir\landscaping.jpg"; Seed=101; Width=600; Height=600},
        @{Prompt="Garden setup service, fresh soil preparation with organic compost, planting new seedlings and flowers 8K"; Output="$dir\garden-setup.jpg"; Seed=102; Width=600; Height=600},
        @{Prompt="Garden maintenance service, gardener pruning plants trimming hedges with shears, healthy green garden 8K"; Output="$dir\garden-maintenance.jpg"; Seed=103; Width=600; Height=600},
        @{Prompt="Beautiful vertical garden living wall on building, lush plants growing vertically, green architecture 8K"; Output="$dir\vertical-garden.jpg"; Seed=104; Width=600; Height=600},
        @{Prompt="Stunning terrace garden on rooftop, potted plants flowers herbs seating area, urban green oasis 8K"; Output="$dir\terrace-garden.jpg"; Seed=105; Width=600; Height=600},
        @{Prompt="Organic kitchen garden with raised vegetable beds, fresh tomatoes lettuce herbs growing 8K"; Output="$dir\kitchen-garden.jpg"; Seed=106; Width=600; Height=600},
        @{Prompt="Organic farming setup with compost pile natural fertilizers healthy soil green crops growing 8K"; Output="$dir\organic-farming.jpg"; Seed=107; Width=600; Height=600},
        @{Prompt="Plant rental service for events offices, lush green plants arranged for corporate event decoration 8K"; Output="$dir\plant-rental.jpg"; Seed=108; Width=600; Height=600},
        @{Prompt="Corporate office plants service, modern office with beautiful green plants biophilic design 8K"; Output="$dir\corporate-plants.jpg"; Seed=109; Width=600; Height=600},
        @{Prompt="Garden consultation service, expert horticulturist advising homeowners on garden design 8K"; Output="$dir\garden-consultation.jpg"; Seed=110; Width=600; Height=600},
        @{Prompt="Plant doctor service, expert examining plant leaves for diseases pests, plant healthcare 8K"; Output="$dir\plant-doctor.jpg"; Seed=111; Width=600; Height=600},
        @{Prompt="Home plant delivery service, cardboard box with healthy plants inside safe packaging 8K"; Output="$dir\home-delivery.jpg"; Seed=112; Width=600; Height=600},
        @{Prompt="Bulk plant orders for hotels resorts institutions, large quantity of plants ready for delivery 8K"; Output="$dir\bulk-orders.jpg"; Seed=113; Width=600; Height=600},
        @{Prompt="Office decoration with plants, beautiful workspace with indoor plants on desks and shelves 8K"; Output="$dir\office-decoration.jpg"; Seed=114; Width=600; Height=600}
    ) "Services"
}

# TESTIMONIALS
if ($Section -eq "all" -or $Section -eq "testimonials") {
    $dir = "$outputRoot\testimonials"; Ensure-Dir $dir
    Download-Batch @(
        @{Prompt="Professional portrait photo of smiling Indian man 40s casual shirt, happy satisfied customer headshot photography"; Output="$dir\customer-01.jpg"; Seed=301; Width=200; Height=200},
        @{Prompt="Professional portrait photo of smiling Indian woman 30s wearing saree, happy satisfied customer headshot"; Output="$dir\customer-02.jpg"; Seed=302; Width=200; Height=200},
        @{Prompt="Professional portrait photo of smiling Indian man 50s with mustache kurta, happy satisfied customer headshot"; Output="$dir\customer-03.jpg"; Seed=303; Width=200; Height=200},
        @{Prompt="Professional portrait photo of smiling Indian woman 50s with bindi gold earrings, happy customer headshot"; Output="$dir\customer-04.jpg"; Seed=304; Width=200; Height=200},
        @{Prompt="Professional portrait photo of smiling Indian man 30s t-shirt, happy satisfied customer headshot"; Output="$dir\customer-05.jpg"; Seed=305; Width=200; Height=200},
        @{Prompt="Professional portrait photo of smiling Indian woman 20s salwar kameez, happy satisfied customer headshot"; Output="$dir\customer-06.jpg"; Seed=306; Width=200; Height=200},
        @{Prompt="Professional portrait photo of smiling Indian man 60s white hair glasses, happy satisfied customer headshot"; Output="$dir\customer-07.jpg"; Seed=307; Width=200; Height=200},
        @{Prompt="Professional portrait photo of smiling Indian woman 40s traditional blouse, happy satisfied customer headshot"; Output="$dir\customer-08.jpg"; Seed=308; Width=200; Height=200}
    ) "Testimonials"
}

# BLOG
if ($Section -eq "all" -or $Section -eq "blog") {
    $dir = "$outputRoot\blog"; Ensure-Dir $dir
    Download-Batch @(
        @{Prompt="Best indoor plants for beginners Kerala climate, snake plant pothos peace lily on windowsill, tropical home garden 8K"; Output="$dir\indoor-plants-beginners.jpg"; Seed=201; Width=600; Height=600},
        @{Prompt="Seasonal garden care guide Kerala, gardener caring for plants during monsoon summer winter, tropical garden 8K"; Output="$dir\seasonal-garden-care.jpg"; Seed=202; Width=600; Height=600},
        @{Prompt="Organic farming at home step by step, hands holding soil with compost, vegetable seedlings growing 8K"; Output="$dir\organic-farming.jpg"; Seed=203; Width=600; Height=600},
        @{Prompt="Essential medicinal plants for Kerala home, Tulsi Aloe Neem Ashwagandha in clay pots Ayurvedic herbs 8K"; Output="$dir\medicinal-plants.jpg"; Seed=204; Width=600; Height=600},
        @{Prompt="Tips for growing fruit trees in garden, mango guava lemon pomegranate with fruits, home orchard 8K"; Output="$dir\fruit-trees.jpg"; Seed=205; Width=600; Height=600},
        @{Prompt="Monsoon gardening guide Kerala, protecting plants from heavy rain, lush green garden rainy season 8K"; Output="$dir\monsoon-gardening.jpg"; Seed=206; Width=600; Height=600},
        @{Prompt="Beautiful vertical garden design ideas, living green wall with various plants, biophilic home decor 8K"; Output="$dir\vertical-garden-design.jpg"; Seed=207; Width=600; Height=600},
        @{Prompt="Vegetable gardening guide Kerala, growing your own food, fresh harvest tomatoes chillies brinjals 8K"; Output="$dir\vegetable-gardening.jpg"; Seed=208; Width=600; Height=600}
    ) "Blog"
}

# GALLERY
if ($Section -eq "all" -or $Section -eq "gallery") {
    $dir = "$outputRoot\gallery"; Ensure-Dir $dir
    
    $items = @(
        @("Beautiful lush garden landscape with colorful flower beds and stone pathway", 501, 800, 600),
        @("Vibrant blooming flowers in Kerala garden, red hibiscus pink roses yellow marigolds", 502, 600, 800),
        @("Lush green plant nursery with rows of healthy plants in pots organized greenhouse", 503, 800, 600)
    )
    $jobs = @()
    $items | ForEach-Object { $i = [array]::IndexOf($items, $_); $num = $i + 1; $jobs += @{Prompt=$_[0]; Output="$dir\gallery-$( '{0:D3}' -f $num ).jpg"; Seed=$_[1]; Width=$_[2]; Height=$_[3]} }
    Download-Batch $jobs "Gallery 1/35"
    
    $jobs = @()
    $items = @(
        @("Happy family customers visiting KVR Agro Gardens nursery buying plants", 504, 800, 600),
        @("Seasonal flower blooms in tropical garden with morning dew on petals", 505, 600, 800),
        @("Fruit tree orchard with mango guava lemon trees bearing fruits sunny day", 506, 800, 600)
    )
    $items | ForEach-Object { $i = [array]::IndexOf($items, $_); $num = $i + 4; $jobs += @{Prompt=$_[0]; Output="$dir\gallery-$( '{0:D3}' -f $num ).jpg"; Seed=$_[1]; Width=$_[2]; Height=$_[3]} }
    Download-Batch $jobs "Gallery 2/35"
    
    $jobs = @()
    $items = @(
        @("Professional landscaping project with decorative stones water feature exotic plants", 507, 1200, 800),
        @("Beautiful garden decoration with colorful planters artistic arrangement of pots", 508, 800, 600),
        @("Indoor plant collection in modern living room with variety of houseplants on shelves", 509, 600, 800)
    )
    $items | ForEach-Object { $i = [array]::IndexOf($items, $_); $num = $i + 7; $jobs += @{Prompt=$_[0]; Output="$dir\gallery-$( '{0:D3}' -f $num ).jpg"; Seed=$_[1]; Width=$_[2]; Height=$_[3]} }
    Download-Batch $jobs "Gallery 3/35"
    
    # Let me just do the rest with simpler sequential approach for remaining gallery
    Write-Output ">>> Gallery 4/35 - Quick sequential remaining 96 images..."
    
    $allItems = @(
        @("Vertical garden installation on building wall with lush green living wall ferns", 510, 800, 600),
        @("Beautiful terrace garden setup with potted plants outdoor seating city view", 511, 800, 600),
        @("Organic vegetable garden with fresh green vegetables growing in raised beds", 512, 800, 600),
        @("Medicinal plant garden with Tulsi Aloe Neem Ayurvedic herbs", 513, 600, 800),
        @("Creative succulent arrangement in decorative containers various colors", 514, 800, 600),
        @("Tall palm trees lining garden pathway tropical resort style landscape", 515, 800, 600),
        @("Beautiful bonsai tree collection display miniature masterpieces ceramic pots", 516, 600, 800),
        @("Aromatic herb garden with mint basil coriander rosemary thyme in pots", 517, 1200, 800),
        @("Garden water feature with beautiful fountain surrounded by flowering plants", 518, 800, 600),
        @("Scenic garden pathway with decorative stepping stones through lush greenery", 519, 800, 600),
        @("Colorful flower bed arrangement with seasonal blooms formal garden design", 520, 600, 800),
        @("Night garden lighting with warm fairy lights illuminating garden path", 521, 800, 600),
        @("Garden furniture setup wooden bench table surrounded by plants", 522, 800, 600),
        @("Plant sale event at KVR Agro Gardens customers browsing plants at nursery", 523, 800, 600),
        @("Guided nursery tour visitors learning about different plant varieties", 524, 800, 600),
        @("Rare exotic plants collection with unusual foliage patterns and colors", 525, 600, 800),
        @("Fragrant flower garden with jasmine roses lavender aromatic blooms", 526, 800, 600),
        @("Shade garden design with ferns hostas shade-loving foliage plants", 527, 600, 800),
        @("Drought tolerant garden with succulents cacti desert plants rocks", 528, 800, 600),
        @("Pet friendly garden design with non-toxic plants safe for pets", 529, 800, 600),
        @("Seasonal garden decoration with festive plants ornamental flowers", 530, 800, 600),
        @("Garden maintenance service gardener pruning caring for plants", 531, 800, 600),
        @("New plant arrivals display at nursery fresh stock healthy plants", 532, 600, 800),
        @("Customer planting workshop at KVR nursery people learning to pot plants", 533, 800, 600),
        @("Garden workshop training session participants learning gardening skills", 534, 800, 600),
        @("Plant potting session at nursery staff preparing plants for sale", 535, 800, 600),
        @("Garden consultation with expert horticulturist at nursery", 536, 800, 600),
        @("Bulk plant delivery truck loaded with healthy plants for large order", 537, 800, 600),
        @("Office plant setup service professional installation modern office", 538, 800, 600),
        @("Hotel garden design with tropical plants resort style landscaping", 539, 800, 600),
        @("Resort landscaping project with poolside gardens tropical foliage", 540, 600, 800),
        @("School garden project children learning to plant and garden", 541, 800, 600),
        @("Community garden project families growing vegetables together", 542, 800, 600),
        @("Beautiful rooftop garden transformation with potted plants seating", 543, 800, 600),
        @("Small balcony garden makeover with vertical planters hanging pots", 544, 800, 600),
        @("Entryway landscaping with beautiful potted plants welcoming visitors", 545, 800, 600),
        @("Backyard garden transformation before after lush green makeover", 546, 800, 600),
        @("Front garden design with colorful flowers and ornamental shrubs", 547, 800, 600),
        @("Poolside garden tropical plants palm trees creating resort vibe", 548, 600, 800),
        @("Natural pest control methods organic solutions for plant health", 549, 800, 600),
        @("Organic composting setup with kitchen waste garden clippings", 550, 600, 800),
        @("Seed sowing workshop people learning to plant seeds trays", 551, 800, 600),
        @("Garden harvest day fresh vegetables fruits collected from garden", 552, 800, 600),
        @("Plant propagation workshop learning to grow plants from cuttings", 553, 600, 800),
        @("Garden photography session capturing beauty of blooming flowers", 554, 800, 600),
        @("KVR Agro Gardens team photo staff workers at nursery", 555, 600, 800),
        @("KVR Agro Gardens nursery entrance with plants greenery welcome", 556, 800, 600),
        @("Eco-friendly plant packaging for safe delivery biodegradable materials", 557, 800, 600),
        @("Safe secure plant delivery in custom boxes ready for shipping", 558, 600, 800),
        @("Customer unboxing plant order with excitement and happiness", 559, 800, 600),
        @("Happy plant parent showing off new indoor plant collection", 560, 800, 600),
        @("Garden party decoration with plants flowers greenery theme", 561, 800, 600),
        @("Wedding garden setup with floral decorations green backdrop", 562, 800, 600),
        @("Festival garden decoration with traditional flowers rangoli", 563, 600, 800),
        @("Monsoon garden care tips protecting plants from heavy rainfall", 564, 800, 600),
        @("Summer garden care tips protecting plants from heat sun damage", 565, 800, 600),
        @("Winter garden blooms colorful flowers that bloom in cold season", 566, 800, 600),
        @("Spring flower show with vibrant colorful blooms full display", 567, 600, 800),
        @("Autumn garden colors with warm tones yellow orange red foliage", 568, 800, 600),
        @("Tropical garden design with exotic plants palms colorful flowers", 569, 800, 600),
        @("Butterfly garden designed to attract butterflies with nectar flowers", 570, 800, 600),
        @("Bird friendly garden with plants that attract birds provide habitat", 571, 800, 600),
        @("Pollinator garden with bee-friendly flowers supporting biodiversity", 572, 600, 800),
        @("Beautiful cactus collection with various shapes sizes flowering cacti", 573, 800, 600),
        @("Fern garden with different fern varieties creating lush green texture", 574, 800, 600),
        @("Bamboo grove with tall green bamboo stems peaceful atmosphere", 575, 800, 600),
        @("Orchid house with many blooming orchids different colors varieties", 576, 600, 800),
        @("Hydroponic setup for soilless gardening modern growing system", 577, 800, 600),
        @("Greenhouse interior with rows of healthy plants automatic irrigation", 578, 600, 800),
        @("Shade net nursery protecting young plants from harsh sunlight", 579, 800, 600),
        @("Garden tools equipment display watering cans shears gloves pots", 580, 800, 600),
        @("Beautiful pottery collection decorative planters various colors designs", 581, 800, 600),
        @("Decorative planters pots display artistic containers for indoor plants", 582, 800, 600),
        @("Garden art sculpture decoration adding artistic elements to garden", 583, 600, 800),
        @("Garden water fountain as centerpiece surrounded by flowering plants", 584, 800, 600),
        @("Koi pond with colorful fish aquatic plants serene garden setting", 585, 800, 600),
        @("Rock garden design with decorative stones succulents alpine plants", 586, 800, 600),
        @("Japanese garden design with zen elements bamboo water feature moss", 587, 600, 800),
        @("Cottage garden style with romantic flowers rustic garden elements", 588, 800, 600),
        @("Modern garden design with clean lines minimalist planting contemporary", 589, 800, 600),
        @("Minimalist garden with simple elegant planting clean geometric design", 590, 800, 600),
        @("Tropical paradise garden with exotic palms vibrant flowers lush foliage", 591, 800, 600),
        @("Desert landscape garden with cacti succulents drought tolerant plants", 592, 600, 800),
        @("Moss garden with soft green moss covering rocks ground zen atmosphere", 593, 800, 600),
        @("Green living fern wall with lush ferns creating natural green texture", 594, 800, 600),
        @("Living wall system with automated irrigation vertical garden technology", 595, 800, 600),
        @("Green building facade with climbing plants covering exterior wall", 596, 800, 600),
        @("Garden bench seating area surrounded by flowering plants and trees", 597, 800, 600),
        @("Reading nook garden with comfortable seating shaded by trees plants", 598, 600, 800),
        @("Meditation garden with peaceful design calming plants quiet seating", 599, 800, 600),
        @("Yoga garden space with flat wooden deck surrounded by plants flowers", 600, 800, 600),
        @("Children play garden with safe plants natural playground elements", 601, 800, 600),
        @("Edible garden with vegetables fruits herbs growing together beautifully", 602, 800, 600),
        @("Kitchen garden harvest basket fresh vegetables fruits herbs", 603, 800, 600),
        @("Farm to table concept fresh garden produce healthy cooking", 604, 800, 600),
        @("Fresh garden produce display organically grown vegetables fruits", 605, 800, 600)
    )
    
    $jobs = @()
    $startSeed = 510
    foreach ($item in $allItems) {
        $idx = [array]::IndexOf($allItems, $item)
        $num = $idx + 10
        $jobs += @{Prompt=$item[0]; Output="$dir\gallery-$( '{0:D3}' -f $num ).jpg"; Seed=$item[1]; Width=$item[2]; Height=$item[3]}
    }
    Download-Batch $jobs "Gallery Remaining (lab 4-35)"
}

# ABOUT images
if ($Section -eq "all" -or $Section -eq "about") {
    $dir = $outputRoot
    Download-Batch @(
        @{Prompt="Aerial view beautiful plant nursery with thousands of plants organized rows greenhouses shade nets flowering plants customers walking golden morning sunlight cinematic photography 8K"; Output="$dir\about-nursery.jpg"; Seed=901; Width=800; Height=600}
    ) "About"
}

Write-Output "`nDONE! All images downloaded."
