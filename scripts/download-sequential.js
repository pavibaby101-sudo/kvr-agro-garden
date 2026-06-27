const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function download(prompt, filePath, seed, w = 600, h = 600) {
  return new Promise((resolve) => {
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      console.log(`  SKIP ${path.basename(filePath)} (exists)`);
      return resolve(true);
    }
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const encoded = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encoded}?width=${w}&height=${h}&nologo=true&seed=${seed}`;
    console.log(`  GET  ${path.basename(filePath)}...`);
    
    const req = https.get(url, { timeout: 90000 }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        fs.writeFileSync(filePath, buf);
        if (buf.length > 1000) {
          console.log(`  OK   ${path.basename(filePath)} (${Math.round(buf.length/1024)}KB)`);
          resolve(true);
        } else {
          console.log(`  SMALL ${path.basename(filePath)} (${buf.length}B)`);
          resolve(false);
        }
      });
    });
    req.on('error', (e) => { console.log(`  ERR  ${e.message}`); resolve(false); });
    req.on('timeout', () => { req.destroy(); console.log(`  TIMEOUT`); resolve(false); });
  });
}

(async () => {
  const base = path.join(__dirname, '..', 'public', 'images');
  
  // Helper: download all items sequentially with delay
  async function runAll(label, items) {
    let ok = 0, fail = 0;
    console.log(`\n=== ${label} (${items.length} images) ===`);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const file = typeof item.file === 'string' ? item.file : item.file;
      const w = item.w || 600;
      const h = item.h || 600;
      if (await download(item.prompt, file, item.seed, w, h)) ok++;
      else fail++;
      if (i < items.length - 1) await sleep(3500); // 3.5s delay between downloads
    }
    console.log(`  RESULT: ${ok} OK, ${fail} Failed`);
    return { ok, fail };
  }

  // ============ MISSING PLANTS ============
  const pBase = path.join(base, 'plants');
  await runAll('Missing Plants', [
    { prompt: 'Bonsai Ficus miniature tree thick trunk aerial roots shallow bonsai pot white background 8K', file: path.join(pBase, 'bonsai-ficus.jpg'), seed: 16 },
    { prompt: 'Fresh green Mint Pudina aromatic herb small pot white background bright natural lighting', file: path.join(pBase, 'mint.jpg'), seed: 17 },
    { prompt: 'Neem Tree young medicinal plant green compound leaves pot white background natural lighting', file: path.join(pBase, 'neem.jpg'), seed: 18 },
    { prompt: 'Mango Plant grafted fruit tree green leaves large pot white background bright sunlight 8K', file: path.join(pBase, 'mango.jpg'), seed: 20 },
    { prompt: 'Jade Plant Crassula Ovata thick glossy oval leaves ceramic pot white background bright lighting', file: path.join(pBase, 'jade-plant.jpg'), seed: 22 },
    { prompt: 'Dwarf Lemon Plant green leaves small yellow fruits pot white background bright sunlight', file: path.join(pBase, 'lemon.jpg'), seed: 23 },
    { prompt: 'Money Plant heart-shaped green leaves trailing hanging pot white background natural lighting', file: path.join(pBase, 'money-plant.jpg'), seed: 24 },
    { prompt: 'Philodendron Brasil heart-shaped green yellow variegated trailing leaves pot white background', file: path.join(pBase, 'philodendron-brasil.jpg'), seed: 26 },
    { prompt: 'Chinese Evergreen silver-patterned green leaves ceramic pot white background indoor foliage', file: path.join(pBase, 'chinese-evergreen.jpg'), seed: 27 },
    { prompt: 'Rubber Plant Ficus Elastica large glossy dark green leaves premium pot white background 8K', file: path.join(pBase, 'rubber-plant.jpg'), seed: 28 },
    { prompt: 'Ixora Kerala shrub clusters bright red flowers green leaves pot white background sunlight', file: path.join(pBase, 'ixora.jpg'), seed: 29 },
    { prompt: 'Adenium Desert Rose succulent thick caudex pink flowers pot white background bright sunlight', file: path.join(pBase, 'adenium.jpg'), seed: 31 },
    { prompt: 'Plumeria Champa Frangipani fragrant white yellow tropical flowers leaves pot white background', file: path.join(pBase, 'plumeria.jpg'), seed: 32 },
    { prompt: 'Chrysanthemum pom-pom pink flowers green leaves pot white background bright natural lighting', file: path.join(pBase, 'chrysanthemum.jpg'), seed: 33 },
    { prompt: 'Coriander fresh green leafy herb small pot white background bright natural lighting', file: path.join(pBase, 'coriander.jpg'), seed: 36 },
    { prompt: 'Lemongrass aromatic grass long green blades pot white background bright sunlight', file: path.join(pBase, 'lemongrass.jpg'), seed: 37 },
    { prompt: 'Guava Plant grafted fruit tree green leaves pot white background bright sunlight', file: path.join(pBase, 'guava.jpg'), seed: 38 },
    { prompt: 'Ashwagandha Ayurvedic medicinal herb green leaves pot white background natural lighting', file: path.join(pBase, 'ashwagandha.jpg'), seed: 40 },
    { prompt: 'Calathea Orbifolia prayer plant large round silver-striped green leaves white background 8K', file: path.join(pBase, 'calathea.jpg'), seed: 42 },
    { prompt: 'Green Chilli Plant spicy green chillies leaves pot white background bright sunlight', file: path.join(pBase, 'chilli.jpg'), seed: 43 },
    { prompt: 'Brinjal Eggplant glossy purple fruits green leaves pot white background bright sunlight', file: path.join(pBase, 'brinjal.jpg'), seed: 44 },
  ]);

  // ============ CATEGORIES ============
  const cBase = path.join(base, 'categories');
  await runAll('Categories', [
    { prompt: 'Beautiful indoor house plants decorative pots white shelf bright living room natural sunlight 8K', file: path.join(cBase, 'indoor.jpg'), seed: 401, w: 800, h: 600 },
    { prompt: 'Lush outdoor garden flowering shrubs green plants sunny backyard stone pathway 8K', file: path.join(cBase, 'outdoor.jpg'), seed: 402, w: 800, h: 600 },
    { prompt: 'Vibrant flowering plants garden colorful blooms red pink yellow purple butterflies bright sunlight 8K', file: path.join(cBase, 'flowering.jpg'), seed: 403, w: 800, h: 600 },
    { prompt: 'Medicinal Ayurvedic herbs clay pots Tulsi Aloe Neem Ashwagandha Indian medicinal garden 8K', file: path.join(cBase, 'medicinal.jpg'), seed: 404, w: 800, h: 600 },
    { prompt: 'Grafted fruit trees sunny orchard mango guava lemon pomegranate fruits tropical 8K', file: path.join(cBase, 'fruit.jpg'), seed: 405, w: 800, h: 600 },
    { prompt: 'Organic vegetable garden fresh green seedlings raised beds tomatoes chillies 8K', file: path.join(cBase, 'vegetable.jpg'), seed: 406, w: 800, h: 600 },
    { prompt: 'Aromatic herb garden mint coriander basil rosemary curry leaves clay pots 8K', file: path.join(cBase, 'herb.jpg'), seed: 407, w: 800, h: 600 },
    { prompt: 'Beautiful succulents cacti collection decorative pots wooden desk various shapes 8K', file: path.join(cBase, 'succulent.jpg'), seed: 408, w: 800, h: 600 },
    { prompt: 'Rare exotic tropical plants colorful leaves monstera calathea orchids greenhouse 8K', file: path.join(cBase, 'exotic.jpg'), seed: 409, w: 800, h: 600 },
    { prompt: 'Elegant palm trees ferns decorative pots tropical foliage feathery fronds resort 8K', file: path.join(cBase, 'palm.jpg'), seed: 410, w: 800, h: 600 },
    { prompt: 'Climbing plants vines garden trellis flowering creepers green leaves 8K', file: path.join(cBase, 'climber.jpg'), seed: 411, w: 800, h: 600 },
    { prompt: 'Elegant bonsai tree collection miniature trained trees ceramic pots zen garden 8K', file: path.join(cBase, 'bonsai.jpg'), seed: 412, w: 800, h: 600 },
    { prompt: 'Ornamental bamboo grass tall green bamboo stems lush foliage Japanese garden 8K', file: path.join(cBase, 'bamboo.jpg'), seed: 413, w: 800, h: 600 },
    { prompt: 'Aquatic pond plants water lilies lotus serene pond koi fish 8K', file: path.join(cBase, 'aquatic.jpg'), seed: 414, w: 800, h: 600 },
    { prompt: 'Hanging basket plants trailing ceiling lush green cascading foliage 8K', file: path.join(cBase, 'hanging.jpg'), seed: 415, w: 800, h: 600 },
    { prompt: 'Fragrant flowering garden jasmine roses lavender morning dew perfume 8K', file: path.join(cBase, 'fragrant.jpg'), seed: 416, w: 800, h: 600 },
    { prompt: 'Air purifying indoor plants snake plant peace lily spider plant pothos white 8K', file: path.join(cBase, 'air-purifying.jpg'), seed: 417, w: 800, h: 600 },
    { prompt: 'Drought tolerant garden succulents cacti agave desert plants dry rocky 8K', file: path.join(cBase, 'drought-tolerant.jpg'), seed: 418, w: 800, h: 600 },
    { prompt: 'Pet friendly house plants safe cats dogs spider plant ferns modern home 8K', file: path.join(cBase, 'pet-friendly.jpg'), seed: 419, w: 800, h: 600 },
    { prompt: 'Seasonal blooming flowers colorful annual plants full bloom flower market 8K', file: path.join(cBase, 'seasonal.jpg'), seed: 420, w: 800, h: 600 },
  ]);

  // ============ SERVICES ============
  const sBase = path.join(base, 'services');
  await runAll('Services', [
    { prompt: 'Landscaping design beautiful garden stone pathways water features colorful flower beds 8K', file: path.join(sBase, 'landscaping.jpg'), seed: 101 },
    { prompt: 'Garden setup fresh soil preparation organic compost planting seedlings flowers 8K', file: path.join(sBase, 'garden-setup.jpg'), seed: 102 },
    { prompt: 'Garden maintenance gardener pruning plants trimming hedges healthy green garden 8K', file: path.join(sBase, 'garden-maintenance.jpg'), seed: 103 },
    { prompt: 'Vertical garden living wall building lush plants growing vertically green 8K', file: path.join(sBase, 'vertical-garden.jpg'), seed: 104 },
    { prompt: 'Terrace garden rooftop potted plants flowers herbs seating urban green 8K', file: path.join(sBase, 'terrace-garden.jpg'), seed: 105 },
    { prompt: 'Organic kitchen garden raised vegetable beds fresh tomatoes lettuce herbs 8K', file: path.join(sBase, 'kitchen-garden.jpg'), seed: 106 },
    { prompt: 'Organic farming compost pile natural fertilizers healthy soil green crops 8K', file: path.join(sBase, 'organic-farming.jpg'), seed: 107 },
    { prompt: 'Plant rental service events offices lush green plants corporate decoration 8K', file: path.join(sBase, 'plant-rental.jpg'), seed: 108 },
    { prompt: 'Corporate office plants modern office beautiful green plants biophilic design 8K', file: path.join(sBase, 'corporate-plants.jpg'), seed: 109 },
    { prompt: 'Garden consultation expert horticulturist advising homeowners design 8K', file: path.join(sBase, 'garden-consultation.jpg'), seed: 110 },
    { prompt: 'Plant doctor expert examining leaves diseases pests plant healthcare 8K', file: path.join(sBase, 'plant-doctor.jpg'), seed: 111 },
    { prompt: 'Home plant delivery cardboard box healthy plants safe packaging 8K', file: path.join(sBase, 'home-delivery.jpg'), seed: 112 },
    { prompt: 'Bulk plant orders hotels resorts institutions large quantity delivery 8K', file: path.join(sBase, 'bulk-orders.jpg'), seed: 113 },
    { prompt: 'Office decoration plants workspace indoor plants desks shelves 8K', file: path.join(sBase, 'office-decoration.jpg'), seed: 114 },
  ]);

  // ============ TESTIMONIALS ============
  const tBase = path.join(base, 'testimonials');
  const testimonials = [];
  for (let i = 1; i <= 8; i++) {
    testimonials.push({
      prompt: 'Professional portrait photo smiling Indian person happy customer friendly face warm natural lighting headshot',
      file: path.join(tBase, `customer-${String(i).padStart(2,'0')}.jpg`),
      seed: 300 + i, w: 200, h: 200
    });
  }
  await runAll('Testimonials', testimonials);

  // ============ BLOG ============
  const bBase = path.join(base, 'blog');
  await runAll('Blog', [
    { prompt: 'Best indoor plants beginners Kerala climate snake plant pothos peace lily windowsill 8K', file: path.join(bBase, 'indoor-plants-beginners.jpg'), seed: 201 },
    { prompt: 'Seasonal garden care guide Kerala gardener monsoon summer winter tropical 8K', file: path.join(bBase, 'seasonal-garden-care.jpg'), seed: 202 },
    { prompt: 'Organic farming home step by step hands soil compost vegetable seedlings 8K', file: path.join(bBase, 'organic-farming.jpg'), seed: 203 },
    { prompt: 'Essential medicinal plants Kerala home Tulsi Aloe Neem Ashwagandha clay pots 8K', file: path.join(bBase, 'medicinal-plants.jpg'), seed: 204 },
    { prompt: 'Growing fruit trees garden mango guava lemon pomegranate home orchard 8K', file: path.join(bBase, 'fruit-trees.jpg'), seed: 205 },
    { prompt: 'Monsoon gardening guide Kerala protecting plants heavy rain lush garden 8K', file: path.join(bBase, 'monsoon-gardening.jpg'), seed: 206 },
    { prompt: 'Vertical garden design ideas living green wall various plants decor 8K', file: path.join(bBase, 'vertical-garden-design.jpg'), seed: 207 },
    { prompt: 'Vegetable gardening guide Kerala growing food fresh harvest tomatoes chillies 8K', file: path.join(bBase, 'vegetable-gardening.jpg'), seed: 208 },
  ]);

  // ============ ABOUT ============
  await runAll('About', [
    { prompt: 'Aerial view beautiful plant nursery thousands of plants greenhouses shade nets golden morning sunlight 8K', file: path.join(base, 'about-nursery.jpg'), seed: 901, w: 800, h: 600 },
  ]);

  // ============ GALLERY ============
  const gBase = path.join(base, 'gallery');
  const gallery = [
    'Beautiful lush garden landscape colorful flower beds stone pathway',
    'Vibrant blooming flowers Kerala garden red hibiscus pink roses',
    'Lush green plant nursery rows healthy plants pots greenhouse',
    'Happy family customers visiting KVR Agro Gardens nursery buying plants',
    'Seasonal flower blooms tropical garden morning dew petals',
    'Fruit tree orchard mango guava lemon trees bearing fruits sunny',
    'Professional landscaping decorative stones water feature exotic plants',
    'Beautiful garden decoration colorful planters artistic arrangement',
    'Indoor plant collection modern living room variety houseplants',
    'Vertical garden installation building wall lush living wall',
    'Beautiful terrace garden potted plants outdoor seating city',
    'Organic vegetable garden fresh green vegetables raised beds',
    'Medicinal plant garden Tulsi Aloe Neem Ayurvedic herbs',
    'Creative succulent arrangement decorative containers various colors',
    'Tall palm trees lining garden pathway tropical resort style',
    'Beautiful bonsai tree collection miniature masterpieces ceramic pots',
    'Aromatic herb garden mint basil coriander rosemary thyme',
    'Garden water feature beautiful fountain flowering plants',
    'Scenic garden pathway decorative stepping stones lush greenery',
    'Colorful flower bed arrangement seasonal blooms formal design',
    'Night garden lighting warm fairy lights illuminating garden path',
    'Garden furniture wooden bench table surrounded by plants',
    'Plant sale event KVR Agro Gardens customers browsing nursery',
    'Guided nursery tour visitors learning plant varieties',
    'Rare exotic plants collection unusual foliage patterns colors',
    'Fragrant flower garden jasmine roses lavender aromatic blooms',
    'Shade garden design ferns hostas shade-loving foliage',
    'Drought tolerant garden succulents cacti desert plants rocks',
    'Pet friendly garden design non-toxic plants safe pets',
    'Seasonal garden decoration festive plants ornamental flowers',
    'Garden maintenance service gardener pruning caring plants',
    'New plant arrivals display nursery fresh stock healthy',
    'Customer planting workshop KVR nursery learning pot plants',
    'Garden workshop training session participants learning gardening',
    'Plant potting session nursery staff preparing plants sale',
    'Garden consultation expert horticulturist at nursery',
    'Bulk plant delivery truck loaded healthy plants',
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
    'Monsoon garden care tips protecting plants rainfall',
    'Summer garden care tips protecting plants heat sun',
    'Winter garden blooms colorful flowers cold season',
    'Spring flower show vibrant colorful blooms display',
    'Autumn garden colors warm tones yellow orange red',
    'Tropical garden design exotic plants palms colorful flowers',
    'Butterfly garden attract butterflies nectar flowers',
    'Bird friendly garden plants attract birds habitat',
    'Pollinator garden bee-friendly flowers biodiversity',
    'Beautiful cactus collection various shapes sizes flowering',
    'Fern garden different fern varieties lush green',
    'Bamboo grove tall green bamboo stems peaceful',
    'Orchid house many blooming orchids different colors',
    'Hydroponic setup soilless gardening modern growing system',
    'Greenhouse interior rows healthy plants automatic irrigation',
    'Shade net nursery protecting young plants sunlight',
    'Garden tools equipment display watering cans shears',
    'Beautiful pottery collection decorative planters various colors',
    'Decorative planters pots display artistic containers indoor',
    'Garden art sculpture decoration artistic elements garden',
    'Garden water fountain centerpiece flowering plants',
    'Koi pond colorful fish aquatic plants serene garden',
    'Rock garden decorative stones succulents alpine plants',
    'Japanese garden zen elements bamboo water feature moss',
    'Cottage garden romantic flowers rustic elements',
    'Modern garden clean lines minimalist planting contemporary',
    'Minimalist garden simple elegant planting geometric design',
    'Tropical paradise exotic palms vibrant flowers lush foliage',
    'Desert landscape cacti succulents drought tolerant plants',
    'Moss garden soft green moss rocks ground zen',
    'Green living fern wall lush ferns natural texture',
    'Living wall automated irrigation vertical garden technology',
    'Green building facade climbing plants exterior wall',
    'Garden bench seating area surrounded flowering plants',
    'Reading nook garden comfortable seating shaded trees plants',
    'Meditation garden peaceful design calming plants quiet seating',
    'Yoga garden space wooden deck surrounded plants flowers',
    'Children play garden safe plants natural playground',
    'Edible garden vegetables fruits herbs growing beautifully',
    'Kitchen garden harvest basket fresh vegetables fruits herbs',
    'Farm to table concept fresh garden produce healthy',
    'Fresh garden produce display organically grown vegetables',
  ];

  const galItems = gallery.map((p, i) => ({
    prompt: p,
    file: path.join(gBase, `gallery-${String(i + 1).padStart(3, '0')}.jpg`),
    seed: 501 + i,
    w: 800, h: 600
  }));
  
  await runAll('Gallery', galItems);

  console.log('\n========================================');
  console.log('  ALL IMAGE DOWNLOADS COMPLETE!');
  console.log('========================================\n');
})();
