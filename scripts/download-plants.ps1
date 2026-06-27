. "C:\Users\Jithendra Krishna\Downloads\klk\kvr-agro-gardens\scripts\download-images.ps1"

$plantsDir = "C:\Users\Jithendra Krishna\Downloads\klk\kvr-agro-gardens\public\images\plants"

$jobs = @(
    @{Prompt = "Snake Plant Sansevieria Trifasciata in a modern white ceramic pot isolated on white background, tall green leaves with yellow edges, sharp focus natural lighting, professional e-commerce product photography ultra realistic 8K"; Output = "$plantsDir\snake-plant.jpg"; Seed = 1 },
    @{Prompt = "Peace Lily Spathiphyllum with elegant white blooms and glossy dark green leaves in a premium ceramic pot, white background, sharp focus studio lighting, professional product photography 8K"; Output = "$plantsDir\peace-lily.jpg"; Seed = 2 },
    @{Prompt = "Monstera Deliciosa Swiss Cheese Plant with large split green leaves in a modern decorative pot, white background, bright natural lighting, sharp focus, professional e-commerce photography 8K"; Output = "$plantsDir\monstera-deliciosa.jpg"; Seed = 3 },
    @{Prompt = "Golden Pothos Money Plant with trailing heart-shaped green and yellow variegated leaves in a hanging ceramic pot, white background, studio lighting, professional product photography"; Output = "$plantsDir\golden-pothos.jpg"; Seed = 4 },
    @{Prompt = "ZZ Plant Zamioculcas Zamiifolia with glossy dark green waxy leaves in a modern minimalist pot, white background, sharp focus natural lighting, professional e-commerce photography 8K"; Output = "$plantsDir\zz-plant.jpg"; Seed = 5 }
)

Write-Output "=== Downloading Plants Batch 1/9 ==="
Run-Batch $jobs
$jobs = @(
    @{Prompt = "Spider Plant Chlorophytum Comosum with arching green and white striped leaves and baby spiderettes in a hanging white pot, white background, bright natural lighting, sharp focus"; Output = "$plantsDir\spider-plant.jpg"; Seed = 6 },
    @{Prompt = "Fiddle Leaf Fig Ficus Lyrata with large violin-shaped green leaves in a premium terracotta pot, white background, dramatic studio lighting, professional home decor photography 8K"; Output = "$plantsDir\fiddle-leaf-fig.jpg"; Seed = 7 },
    @{Prompt = "Areca Palm Butterfly Palm Dypsis Lutescens with feathery green fronds in a large decorative pot, white background, bright natural lighting, tropical plant photography 8K"; Output = "$plantsDir\areca-palm.jpg"; Seed = 8 },
    @{Prompt = "Aloe Vera Succulent with thick fleshy green spiky leaves in a small terracotta pot, white background, sharp focus studio lighting, medicinal plant product photography"; Output = "$plantsDir\aloe-vera.jpg"; Seed = 9 },
    @{Prompt = "Tulsi Holy Basil Ocimum Sanctum sacred Indian plant with green aromatic leaves in a small clay pot, white background, natural lighting, sharp focus product photography"; Output = "$plantsDir\tulsi.jpg"; Seed = 10 }
)

Write-Output "=== Downloading Plants Batch 2/9 ==="
Run-Batch $jobs
$jobs = @(
    @{Prompt = "Hybrid Tea Rose Plant Rosa with a beautiful red blooming flower and green leaves in a garden pot, white background, bright natural sunlight, sharp focus flower photography 8K"; Output = "$plantsDir\rose.jpg"; Seed = 11 },
    @{Prompt = "Jasmine Mogra Jasminum Sambac with small white fragrant flowers and green leaves in a decorative pot, white background, natural lighting, sharp focus, Indian garden plant photography"; Output = "$plantsDir\jasmine.jpg"; Seed = 12 },
    @{Prompt = "Bougainvillea Glabra with vibrant magenta pink bracts and green leaves in a garden pot, white background, bright sunlight, sharp focus, colorful flowering plant photography 8K"; Output = "$plantsDir\bougainvillea.jpg"; Seed = 13 },
    @{Prompt = "Hibiscus Rosa Sinensis with a large red showy flower and glossy green leaves in a pot, white background, bright natural sunlight, sharp focus tropical flower photography"; Output = "$plantsDir\hibiscus.jpg"; Seed = 14 },
    @{Prompt = "Dendrobium Orchid with beautiful purple and white long-lasting blooms in a transparent pot, white background, elegant studio lighting, luxury plant photography 8K"; Output = "$plantsDir\orchid.jpg"; Seed = 15 }
)

Write-Output "=== Downloading Plants Batch 3/9 ==="
Run-Batch $jobs
$jobs = @(
    @{Prompt = "Bonsai Ficus Retusa miniature trained tree with thick trunk and aerial roots in a shallow bonsai pot, white background, dramatic studio lighting, living art photography 8K"; Output = "$plantsDir\bonsai-ficus.jpg"; Seed = 16 },
    @{Prompt = "Mint Pudina Mentha Spicata fresh green aromatic herb plant in a small pot, white background, bright natural lighting, sharp focus kitchen garden photography"; Output = "$plantsDir\mint.jpg"; Seed = 17 },
    @{Prompt = "Neem Tree Azadirachta Indica young medicinal plant with green compound leaves in a pot, white background, natural lighting, sharp focus Ayurvedic plant photography"; Output = "$plantsDir\neem.jpg"; Seed = 18 },
    @{Prompt = "Tomato Plant Solanum Lycopersicum vegetable seedling with green leaves and small yellow flowers in a pot, white background, bright natural lighting, kitchen garden photography"; Output = "$plantsDir\tomato.jpg"; Seed = 19 },
    @{Prompt = "Mango Plant Mangifera Indica grafted fruit tree with green leaves in a large pot, white background, bright natural sunlight, tropical fruit plant photography 8K"; Output = "$plantsDir\mango.jpg"; Seed = 20 }
)

Write-Output "=== Downloading Plants Batch 4/9 ==="
Run-Batch $jobs
$jobs = @(
    @{Prompt = "Echeveria Elegans succulent rosette with fleshy blue-green leaves in a small decorative pot, white background, sharp focus studio lighting, minimalist plant photography"; Output = "$plantsDir\echeveria.jpg"; Seed = 21 },
    @{Prompt = "Jade Plant Crassula Ovata money plant with thick glossy oval leaves in a ceramic pot, white background, bright natural lighting, sharp focus Feng Shui plant photography"; Output = "$plantsDir\jade-plant.jpg"; Seed = 22 },
    @{Prompt = "Dwarf Lemon Plant Citrus Limon with green leaves and small yellow fruits in a pot, white background, bright sunlight, sharp focus container gardening photography"; Output = "$plantsDir\lemon.jpg"; Seed = 23 },
    @{Prompt = "Money Plant Epipremnum Aureum with heart-shaped green leaves trailing from a hanging pot, white background, natural lighting, sharp focus, lucky plant photography"; Output = "$plantsDir\money-plant.jpg"; Seed = 24 },
    @{Prompt = "Marigold Tagetes Erecta with bright golden yellow and orange pom-pom flowers in a pot, white background, bright sunlight, sharp focus Indian festival flower photography"; Output = "$plantsDir\marigold.jpg"; Seed = 25 }
)

Write-Output "=== Downloading Plants Batch 5/9 ==="
Run-Batch $jobs
$jobs = @(
    @{Prompt = "Philodendron Brasil with heart-shaped green and yellow variegated trailing leaves in a hanging pot, white background, bright indirect lighting, indoor plant photography"; Output = "$plantsDir\philodendron-brasil.jpg"; Seed = 26 },
    @{Prompt = "Chinese Evergreen Aglaonema Commutatum with silver-patterned green leaves in a ceramic pot, white background, low lighting, sharp focus indoor foliage plant photography"; Output = "$plantsDir\chinese-evergreen.jpg"; Seed = 27 },
    @{Prompt = "Rubber Plant Ficus Elastica with large glossy dark green leaves in a premium pot, white background, dramatic studio lighting, bold indoor tree photography 8K"; Output = "$plantsDir\rubber-plant.jpg"; Seed = 28 },
    @{Prompt = "Ixora Coccinea Kerala garden shrub with clusters of bright red flowers and green leaves in a pot, white background, bright sunlight, tropical flowering plant photography"; Output = "$plantsDir\ixora.jpg"; Seed = 29 },
    @{Prompt = "Crossandra Infundibuliformis Firecracker Flower with salmon-orange blooms and green leaves in a pot, white background, natural lighting, shade-loving plant photography"; Output = "$plantsDir\crossandra.jpg"; Seed = 30 }
)

Write-Output "=== Downloading Plants Batch 6/9 ==="
Run-Batch $jobs
$jobs = @(
    @{Prompt = "Adenium Obesum Desert Rose succulent with thick caudex and pink trumpet-shaped flowers in a pot, white background, bright sunlight, sharp focus exotic plant photography 8K"; Output = "$plantsDir\adenium.jpg"; Seed = 31 },
    @{Prompt = "Plumeria Rubra Champa Frangipani with fragrant white and yellow tropical flowers and green leaves in a pot, white background, bright sunlight, sharp focus garden photography"; Output = "$plantsDir\plumeria.jpg"; Seed = 32 },
    @{Prompt = "Chrysanthemum Morifolium with pom-pom shaped pink flowers and green leaves in a pot, white background, bright natural lighting, sharp focus winter flowering plant photography"; Output = "$plantsDir\chrysanthemum.jpg"; Seed = 33 },
    @{Prompt = "Lavender Lavandula Angustifolia with purple flower spikes and silver-green foliage in a terracotta pot, white background, bright sunlight, aromatic herb photography"; Output = "$plantsDir\lavender.jpg"; Seed = 34 },
    @{Prompt = "Curry Leaf Plant Murraya Koenigii with aromatic green leaves in a pot, white background, natural lighting, sharp focus Indian kitchen garden photography"; Output = "$plantsDir\curry-leaf.jpg"; Seed = 35 }
)

Write-Output "=== Downloading Plants Batch 7/9 ==="
Run-Batch $jobs
$jobs = @(
    @{Prompt = "Coriander Dhaniya Coriandrum Sativum fresh green leafy herb in a small pot, white background, bright natural lighting, sharp focus Indian cooking herb photography"; Output = "$plantsDir\coriander.jpg"; Seed = 36 },
    @{Prompt = "Lemongrass Cymbopogon Citratus aromatic grass with long green blades in a pot, white background, bright sunlight, sharp focus medicinal plant photography"; Output = "$plantsDir\lemongrass.jpg"; Seed = 37 },
    @{Prompt = "Guava Plant Psidium Guajava grafted fruit tree with green leaves in a pot, white background, bright sunlight, sharp focus tropical fruit plant photography"; Output = "$plantsDir\guava.jpg"; Seed = 38 },
    @{Prompt = "Dwarf Pomegranate Punica Granatum with orange-red flowers and green leaves in a pot, white background, bright sunlight, sharp focus superfood plant photography 8K"; Output = "$plantsDir\pomegranate.jpg"; Seed = 39 },
    @{Prompt = "Ashwagandha Withania Somnifera Ayurvedic medicinal herb with green leaves in a pot, white background, natural lighting, sharp focus adaptogenic plant photography"; Output = "$plantsDir\ashwagandha.jpg"; Seed = 40 }
)

Write-Output "=== Downloading Plants Batch 8/9 ==="
Run-Batch $jobs
$jobs = @(
    @{Prompt = "String of Pearls Senecio Rowleyanus unique trailing succulent with pearl-like green beads cascading from a hanging pot, white background, bright natural lighting, sharp focus"; Output = "$plantsDir\string-of-pearls.jpg"; Seed = 41 },
    @{Prompt = "Calathea Orbifolia prayer plant with large round silver-striped green leaves in a ceramic pot, white background, soft lighting, sharp focus exotic foliage photography 8K"; Output = "$plantsDir\calathea.jpg"; Seed = 42 },
    @{Prompt = "Green Chilli Plant Capsicum Annuum with spicy green chillies and leaves in a pot, white background, bright sunlight, sharp focus Indian vegetable gardening photography"; Output = "$plantsDir\chilli.jpg"; Seed = 43 },
    @{Prompt = "Brinjal Eggplant Solanum Melongena vegetable plant with glossy purple fruits and green leaves in a pot, white background, bright sunlight, sharp focus gardening photography"; Output = "$plantsDir\brinjal.jpg"; Seed = 44 },
    @{Prompt = "Sweet Basil Ocimum Basilicum aromatic Italian herb with large green leaves in a pot, white background, bright natural lighting, sharp focus culinary herb photography"; Output = "$plantsDir\basil.jpg"; Seed = 45 }
)

Write-Output "=== Downloading Plants Batch 9/9 ==="
Run-Batch $jobs
Write-Output "=== All Plants Downloaded ==="
