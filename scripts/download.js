const https = require('https');
const fs = require('fs');
const path = require('path');

function download(prompt, filePath, seed, w = 600, h = 600) {
  return new Promise((resolve) => {
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      console.log(`  EXISTS ${path.basename(filePath)}`);
      return resolve(true);
    }
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const encoded = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encoded}?width=${w}&height=${h}&nologo=true&seed=${seed}`;
    console.log(`  GET ${path.basename(filePath)}...`);
    const file = fs.createWriteStream(filePath);
    https.get(url, { timeout: 60000 }, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const sz = fs.statSync(filePath).size;
        if (sz > 1000) { resolve(true); } else { console.log(`  SMALL ${sz}B`); resolve(false); }
      });
    }).on('error', (e) => { console.log(`  ERR ${e.message}`); resolve(false); });
  });
}

async function downloadBatch(items) {
  let ok = 0, fail = 0;
  // Process 4 at a time
  for (let i = 0; i < items.length; i += 4) {
    const batch = items.slice(i, i + 4);
    const results = await Promise.all(batch.map(d => download(d.prompt, d.file, d.seed, d.w, d.h)));
    results.forEach(r => r ? ok++ : fail++);
  }
  return { ok, fail };
}

// Missing plant images
(async () => {
  const base = path.join(__dirname, '..', 'public', 'images', 'plants');
  
  console.log('\n=== Missing Plants ===');
  const plants = [
    { prompt: 'Bonsai Ficus miniature tree thick trunk aerial roots shallow bonsai pot white background 8K', file: path.join(base, 'bonsai-ficus.jpg'), seed: 16 },
    { prompt: 'Fresh green Mint Pudina aromatic herb plant small pot white background bright natural lighting', file: path.join(base, 'mint.jpg'), seed: 17 },
    { prompt: 'Neem Tree Azadirachta Indica young medicinal plant green compound leaves pot white background', file: path.join(base, 'neem.jpg'), seed: 18 },
    { prompt: 'Mango Plant Mangifera Indica grafted fruit tree green leaves large pot white background bright sunlight 8K', file: path.join(base, 'mango.jpg'), seed: 20 },
    { prompt: 'Jade Plant Crassula Ovata thick glossy oval leaves ceramic pot white background bright natural lighting', file: path.join(base, 'jade-plant.jpg'), seed: 22 },
    { prompt: 'Dwarf Lemon Plant Citrus Limon green leaves small yellow fruits pot white background bright sunlight', file: path.join(base, 'lemon.jpg'), seed: 23 },
    { prompt: 'Money Plant Epipremnum Aureum heart-shaped green leaves trailing hanging pot white background natural lighting', file: path.join(base, 'money-plant.jpg'), seed: 24 },
    { prompt: 'Philodendron Brasil heart-shaped green yellow variegated trailing leaves hanging pot white background', file: path.join(base, 'philodendron-brasil.jpg'), seed: 26 },
    { prompt: 'Chinese Evergreen Aglaonema silver-patterned green leaves ceramic pot white background indoor foliage', file: path.join(base, 'chinese-evergreen.jpg'), seed: 27 },
    { prompt: 'Rubber Plant Ficus Elastica large glossy dark green leaves premium pot white background dramatic lighting 8K', file: path.join(base, 'rubber-plant.jpg'), seed: 28 },
    { prompt: 'Ixora Coccinea Kerala shrub clusters bright red flowers green leaves pot white background sunlight', file: path.join(base, 'ixora.jpg'), seed: 29 },
    { prompt: 'Adenium Desert Rose succulent thick caudex pink trumpet flowers pot white background bright sunlight 8K', file: path.join(base, 'adenium.jpg'), seed: 31 },
    { prompt: 'Plumeria Rubra Frangipani fragrant white yellow tropical flowers green leaves pot white background sunlight', file: path.join(base, 'plumeria.jpg'), seed: 32 },
    { prompt: 'Chrysanthemum Morifolium pom-pom pink flowers green leaves pot white background bright natural lighting', file: path.join(base, 'chrysanthemum.jpg'), seed: 33 },
    { prompt: 'Coriander Dhaniya fresh green leafy herb small pot white background bright natural lighting', file: path.join(base, 'coriander.jpg'), seed: 36 },
    { prompt: 'Lemongrass Cymbopogon Citratus aromatic grass long green blades pot white background bright sunlight', file: path.join(base, 'lemongrass.jpg'), seed: 37 },
    { prompt: 'Guava Plant Psidium Guajava grafted fruit tree green leaves pot white background bright sunlight', file: path.join(base, 'guava.jpg'), seed: 38 },
    { prompt: 'Ashwagandha Withania Somnifera Ayurvedic medicinal herb green leaves pot white background natural lighting', file: path.join(base, 'ashwagandha.jpg'), seed: 40 },
    { prompt: 'Calathea Orbifolia prayer plant large round silver-striped green leaves ceramic pot white background soft lighting 8K', file: path.join(base, 'calathea.jpg'), seed: 42 },
    { prompt: 'Green Chilli Plant Capsicum Annuum spicy green chillies leaves pot white background bright sunlight', file: path.join(base, 'chilli.jpg'), seed: 43 },
    { prompt: 'Brinjal Eggplant Solanum Melongena glossy purple fruits green leaves pot white background bright sunlight', file: path.join(base, 'brinjal.jpg'), seed: 44 },
  ];
  
  const r = await downloadBatch(plants);
  console.log(`\nPlants: ${r.ok} OK, ${r.fail} Failed`);

  // Categories
  console.log('\n=== Categories ===');
  const catBase = path.join(__dirname, '..', 'public', 'images', 'categories');
  const cats = [
    { prompt: 'Beautiful indoor house plants decorative pots white shelf bright living room natural sunlight lush green foliage 8K', file: path.join(catBase, 'indoor.jpg'), seed: 401, w: 800, h: 600 },
    { prompt: 'Lush outdoor garden flowering shrubs green plants sunny backyard stone pathway tropical landscape 8K', file: path.join(catBase, 'outdoor.jpg'), seed: 402, w: 800, h: 600 },
    { prompt: 'Vibrant flowering plants garden colorful blooms red pink yellow purple butterflies hovering bright sunlight 8K', file: path.join(catBase, 'flowering.jpg'), seed: 403, w: 800, h: 600 },
    { prompt: 'Medicinal Ayurvedic herbs clay pots Tulsi Aloe Neem Ashwagandha traditional Indian medicinal garden 8K', file: path.join(catBase, 'medicinal.jpg'), seed: 404, w: 800, h: 600 },
    { prompt: 'Grafted fruit trees sunny orchard mango guava lemon pomegranate fruits tropical fruit garden 8K', file: path.join(catBase, 'fruit.jpg'), seed: 405, w: 800, h: 600 },
    { prompt: 'Organic vegetable garden fresh green seedlings raised bed tomatoes chillies brinjals kitchen garden 8K', file: path.join(catBase, 'vegetable.jpg'), seed: 406, w: 800, h: 600 },
    { prompt: 'Aromatic herb garden mint coriander basil rosemary curry leaves clay pots fresh herbs sunlight 8K', file: path.join(catBase, 'herb.jpg'), seed: 407, w: 800, h: 600 },
    { prompt: 'Beautiful succulents cacti collection small decorative pots wooden desk various shapes colors 8K', file: path.join(catBase, 'succulent.jpg'), seed: 408, w: 800, h: 600 },
    { prompt: 'Rare exotic tropical plants unusual colorful leaves monstera calathea orchids greenhouse 8K', file: path.join(catBase, 'exotic.jpg'), seed: 409, w: 800, h: 600 },
    { prompt: 'Elegant palm trees ferns decorative pots tropical foliage feathery fronds resort style 8K', file: path.join(catBase, 'palm.jpg'), seed: 410, w: 800, h: 600 },
    { prompt: 'Climbing plants vines garden trellis flowering creepers green leaves 8K', file: path.join(catBase, 'climber.jpg'), seed: 411, w: 800, h: 600 },
    { prompt: 'Elegant bonsai tree collection miniature trained trees ceramic pots zen garden 8K', file: path.join(catBase, 'bonsai.jpg'), seed: 412, w: 800, h: 600 },
    { prompt: 'Ornamental bamboo grass garden tall green bamboo stems lush foliage Japanese style 8K', file: path.join(catBase, 'bamboo.jpg'), seed: 413, w: 800, h: 600 },
    { prompt: 'Aquatic pond plants water lilies lotus serene pond koi fish 8K', file: path.join(catBase, 'aquatic.jpg'), seed: 414, w: 800, h: 600 },
    { prompt: 'Hanging basket plants trailing ceiling lush green cascading foliage macrame hangers 8K', file: path.join(catBase, 'hanging.jpg'), seed: 415, w: 800, h: 600 },
    { prompt: 'Fragrant flowering garden jasmine roses lavender morning dew perfume 8K', file: path.join(catBase, 'fragrant.jpg'), seed: 416, w: 800, h: 600 },
    { prompt: 'Air purifying indoor plants snake plant peace lily spider plant pothos white background 8K', file: path.join(catBase, 'air-purifying.jpg'), seed: 417, w: 800, h: 600 },
    { prompt: 'Drought tolerant garden succulents cacti agave desert plants dry rocky landscape 8K', file: path.join(catBase, 'drought-tolerant.jpg'), seed: 418, w: 800, h: 600 },
    { prompt: 'Pet friendly house plants safe cats dogs spider plant ferns calathea modern home 8K', file: path.join(catBase, 'pet-friendly.jpg'), seed: 419, w: 800, h: 600 },
    { prompt: 'Seasonal blooming flowers collection colorful annual plants full bloom flower market 8K', file: path.join(catBase, 'seasonal.jpg'), seed: 420, w: 800, h: 600 },
  ];
  const r2 = await downloadBatch(cats);
  console.log(`\nCategories: ${r2.ok} OK, ${r2.fail} Failed`);

  // Services
  console.log('\n=== Services ===');
  const svcBase = path.join(__dirname, '..', 'public', 'images', 'services');
  const svcs = [
    { prompt: 'Landscaping design service beautiful garden stone pathways water features colorful flower beds 8K', file: path.join(svcBase, 'landscaping.jpg'), seed: 101 },
    { prompt: 'Garden setup service fresh soil preparation organic compost planting seedlings flowers 8K', file: path.join(svcBase, 'garden-setup.jpg'), seed: 102 },
    { prompt: 'Garden maintenance service gardener pruning plants trimming hedges healthy green garden 8K', file: path.join(svcBase, 'garden-maintenance.jpg'), seed: 103 },
    { prompt: 'Vertical garden living wall building lush plants growing vertically green architecture 8K', file: path.join(svcBase, 'vertical-garden.jpg'), seed: 104 },
    { prompt: 'Terrace garden rooftop potted plants flowers herbs seating area urban green oasis 8K', file: path.join(svcBase, 'terrace-garden.jpg'), seed: 105 },
    { prompt: 'Organic kitchen garden raised vegetable beds fresh tomatoes lettuce herbs 8K', file: path.join(svcBase, 'kitchen-garden.jpg'), seed: 106 },
    { prompt: 'Organic farming compost pile natural fertilizers healthy soil green crops 8K', file: path.join(svcBase, 'organic-farming.jpg'), seed: 107 },
    { prompt: 'Plant rental service events offices lush green plants corporate event decoration 8K', file: path.join(svcBase, 'plant-rental.jpg'), seed: 108 },
    { prompt: 'Corporate office plants service modern office beautiful green plants biophilic design 8K', file: path.join(svcBase, 'corporate-plants.jpg'), seed: 109 },
    { prompt: 'Garden consultation service expert horticulturist advising homeowners garden design 8K', file: path.join(svcBase, 'garden-consultation.jpg'), seed: 110 },
    { prompt: 'Plant doctor service expert examining plant leaves diseases pests plant healthcare 8K', file: path.join(svcBase, 'plant-doctor.jpg'), seed: 111 },
    { prompt: 'Home plant delivery cardboard box healthy plants safe packaging 8K', file: path.join(svcBase, 'home-delivery.jpg'), seed: 112 },
    { prompt: 'Bulk plant orders hotels resorts institutions large quantity plants delivery 8K', file: path.join(svcBase, 'bulk-orders.jpg'), seed: 113 },
    { prompt: 'Office decoration plants beautiful workspace indoor plants desks shelves 8K', file: path.join(svcBase, 'office-decoration.jpg'), seed: 114 },
  ];
  const r3 = await downloadBatch(svcs);
  console.log(`\nServices: ${r3.ok} OK, ${r3.fail} Failed`);

  // Testimonials
  console.log('\n=== Testimonials ===');
  const testBase = path.join(__dirname, '..', 'public', 'images', 'testimonials');
  const tests = [];
  for (let i = 1; i <= 8; i++) {
    tests.push({
      prompt: 'Professional portrait photo smiling Indian person happy satisfied customer friendly face warm natural lighting headshot',
      file: path.join(testBase, `customer-${String(i).padStart(2,'0')}.jpg`),
      seed: 300 + i,
      w: 200, h: 200
    });
  }
  const r4 = await downloadBatch(tests);
  console.log(`\nTestimonials: ${r4.ok} OK, ${r4.fail} Failed`);

  // Blog
  console.log('\n=== Blog ===');
  const blogBase = path.join(__dirname, '..', 'public', 'images', 'blog');
  const blogs = [
    { prompt: 'Best indoor plants beginners Kerala climate snake plant pothos peace lily windowsill tropical home 8K', file: path.join(blogBase, 'indoor-plants-beginners.jpg'), seed: 201 },
    { prompt: 'Seasonal garden care guide Kerala gardener monsoon summer winter tropical garden 8K', file: path.join(blogBase, 'seasonal-garden-care.jpg'), seed: 202 },
    { prompt: 'Organic farming home step by step hands soil compost vegetable seedlings growing 8K', file: path.join(blogBase, 'organic-farming.jpg'), seed: 203 },
    { prompt: 'Essential medicinal plants Kerala home Tulsi Aloe Neem Ashwagandha clay pots Ayurvedic 8K', file: path.join(blogBase, 'medicinal-plants.jpg'), seed: 204 },
    { prompt: 'Growing fruit trees garden mango guava lemon pomegranate fruits home orchard 8K', file: path.join(blogBase, 'fruit-trees.jpg'), seed: 205 },
    { prompt: 'Monsoon gardening guide Kerala protecting plants heavy rain lush green garden 8K', file: path.join(blogBase, 'monsoon-gardening.jpg'), seed: 206 },
    { prompt: 'Vertical garden design ideas living green wall various plants biophilic decor 8K', file: path.join(blogBase, 'vertical-garden-design.jpg'), seed: 207 },
    { prompt: 'Vegetable gardening guide Kerala growing food fresh harvest tomatoes chillies 8K', file: path.join(blogBase, 'vegetable-gardening.jpg'), seed: 208 },
  ];
  const r5 = await downloadBatch(blogs);
  console.log(`\nBlog: ${r5.ok} OK, ${r5.fail} Failed`);

  // About
  console.log('\n=== About ===');
  const aboutDir = path.join(__dirname, '..', 'public', 'images');
  const abouts = [
    { prompt: 'Aerial view beautiful plant nursery thousands of plants organized rows greenhouses shade nets customers walking golden morning sunlight cinematic 8K', file: path.join(aboutDir, 'about-nursery.jpg'), seed: 901, w: 800, h: 600 },
  ];
  const r6 = await downloadBatch(abouts);
  console.log(`\nAbout: ${r6.ok} OK, ${r6.fail} Failed`);

  // Gallery - all 105 images
  console.log('\n=== Gallery ===');
  const galBase = path.join(__dirname, '..', 'public', 'images', 'gallery');
  const gallery = [
    'Beautiful lush garden landscape colorful flower beds stone pathway',
    'Vibrant blooming flowers Kerala garden red hibiscus pink roses',
    'Lush green plant nursery rows healthy plants pots greenhouse',
    'Happy family customers visiting KVR Agro Gardens nursery buying plants',
    'Seasonal flower blooms tropical garden morning dew petals',
    'Fruit tree orchard mango guava lemon trees bearing fruits sunny day',
    'Professional landscaping decorative stones water feature exotic plants',
    'Beautiful garden decoration colorful planters artistic arrangement pots',
    'Indoor plant collection modern living room variety houseplants shelves',
    'Vertical garden installation building wall lush living wall ferns',
    'Beautiful terrace garden potted plants outdoor seating city view',
    'Organic vegetable garden fresh green vegetables raised beds',
    'Medicinal plant garden Tulsi Aloe Neem Ayurvedic herbs',
    'Creative succulent arrangement decorative containers various colors',
    'Tall palm trees lining garden pathway tropical resort style landscape',
    'Beautiful bonsai tree collection display miniature masterpieces ceramic pots',
    'Aromatic herb garden mint basil coriander rosemary thyme pots',
    'Garden water feature beautiful fountain surrounded by flowering plants',
    'Scenic garden pathway decorative stepping stones lush greenery',
    'Colorful flower bed arrangement seasonal blooms formal garden design',
    'Night garden lighting warm fairy lights illuminating garden path',
    'Garden furniture wooden bench table surrounded by plants',
    'Plant sale event KVR Agro Gardens customers browsing plants nursery',
    'Guided nursery tour visitors learning different plant varieties',
    'Rare exotic plants collection unusual foliage patterns colors',
    'Fragrant flower garden jasmine roses lavender aromatic blooms',
    'Shade garden design ferns hostas shade-loving foliage plants',
    'Drought tolerant garden succulents cacti desert plants rocks',
    'Pet friendly garden design non-toxic plants safe for pets',
    'Seasonal garden decoration festive plants ornamental flowers',
    'Garden maintenance service gardener pruning caring plants',
    'New plant arrivals display nursery fresh stock healthy plants',
    'Customer planting workshop KVR nursery learning pot plants',
    'Garden workshop training session participants learning gardening skills',
    'Plant potting session nursery staff preparing plants sale',
    'Garden consultation expert horticulturist nursery',
    'Bulk plant delivery truck loaded healthy plants large order',
    'Office plant setup service professional installation modern office',
    'Hotel garden design tropical plants resort style landscaping',
    'Resort landscaping poolside gardens tropical foliage',
    'School garden project children learning plant garden',
    'Community garden project families growing vegetables together',
    'Beautiful rooftop garden transformation potted plants seating',
    'Small balcony garden makeover vertical planters hanging pots',
    'Entryway landscaping beautiful potted plants welcoming visitors',
    'Backyard garden transformation lush green makeover',
    'Front garden design colorful flowers ornamental shrubs',
    'Poolside garden tropical plants palm trees resort vibe',
    'Natural pest control organic solutions plant health',
    'Organic composting kitchen waste garden clippings',
    'Seed sowing workshop learning plant seeds trays',
    'Garden harvest day fresh vegetables fruits collected',
    'Plant propagation workshop growing plants cuttings',
    'Garden photography capturing beauty blooming flowers',
    'KVR Agro Gardens team photo staff workers nursery',
    'KVR Agro Gardens nursery entrance plants greenery welcome',
    'Eco-friendly plant packaging safe delivery biodegradable materials',
    'Safe secure plant delivery custom boxes shipping',
    'Customer unboxing plant order excitement happiness',
    'Happy plant parent showing off indoor plant collection',
    'Garden party decoration plants flowers greenery theme',
    'Wedding garden setup floral decorations green backdrop',
    'Festival garden decoration traditional flowers rangoli',
    'Monsoon garden care tips protecting plants heavy rainfall',
    'Summer garden care tips protecting plants heat sun damage',
    'Winter garden blooms colorful flowers cold season',
    'Spring flower show vibrant colorful blooms full display',
    'Autumn garden colors warm tones yellow orange red foliage',
    'Tropical garden design exotic plants palms colorful flowers',
    'Butterfly garden attract butterflies nectar flowers',
    'Bird friendly garden plants attract birds provide habitat',
    'Pollinator garden bee-friendly flowers biodiversity',
    'Beautiful cactus collection various shapes sizes flowering cacti',
    'Fern garden different fern varieties lush green texture',
    'Bamboo grove tall green bamboo stems peaceful atmosphere',
    'Orchid house many blooming orchids different colors varieties',
    'Hydroponic setup soilless gardening modern growing system',
    'Greenhouse interior rows healthy plants automatic irrigation',
    'Shade net nursery protecting young plants harsh sunlight',
    'Garden tools equipment display watering cans shears gloves pots',
    'Beautiful pottery collection decorative planters various colors',
    'Decorative planters pots display artistic containers indoor plants',
    'Garden art sculpture decoration artistic elements garden',
    'Garden water fountain centerpiece surrounded flowering plants',
    'Koi pond colorful fish aquatic plants serene garden',
    'Rock garden decorative stones succulents alpine plants',
    'Japanese garden zen elements bamboo water feature moss',
    'Cottage garden romantic flowers rustic elements',
    'Modern garden clean lines minimalist planting contemporary style',
    'Minimalist garden simple elegant planting geometric design',
    'Tropical paradise exotic palms vibrant flowers lush foliage',
    'Desert landscape cacti succulents drought tolerant plants',
    'Moss garden soft green moss rocks ground zen atmosphere',
    'Green living fern wall lush ferns natural green texture',
    'Living wall automated irrigation vertical garden technology',
    'Green building facade climbing plants exterior wall',
    'Garden bench seating area surrounded flowering plants trees',
    'Reading nook garden comfortable seating shaded by trees plants',
    'Meditation garden peaceful design calming plants quiet seating',
    'Yoga garden space wooden deck surrounded plants flowers',
    'Children play garden safe plants natural playground elements',
    'Edible garden vegetables fruits herbs growing beautifully',
    'Kitchen garden harvest basket fresh vegetables fruits herbs',
    'Farm to table concept fresh garden produce healthy cooking',
    'Fresh garden produce display organically grown vegetables fruits',
  ];
  
  const galItems = gallery.map((p, i) => ({
    prompt: p,
    file: path.join(galBase, `gallery-${String(i + 1).padStart(3, '0')}.jpg`),
    seed: 501 + i,
    w: 800, h: 600
  }));
  const r7 = await downloadBatch(galItems);
  console.log(`\nGallery: ${r7.ok} OK, ${r7.fail} Failed`);

  // Final summary
  console.log('\n=== ALL DONE ===');
})();
