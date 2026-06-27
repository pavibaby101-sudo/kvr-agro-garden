const fs = require('fs');
const path = require('path');
const base = path.join(__dirname, '..');

// ===== PLANTS.TS =====
let plants = fs.readFileSync(path.join(base, 'src/data/plants.ts'), 'utf8');
const plantMap = {
  1: 'snake-plant', 2: 'peace-lily', 3: 'monstera-deliciosa', 4: 'golden-pothos',
  5: 'zz-plant', 6: 'spider-plant', 7: 'fiddle-leaf-fig', 8: 'areca-palm',
  9: 'aloe-vera', 10: 'tulsi', 11: 'rose', 12: 'jasmine', 13: 'bougainvillea',
  14: 'hibiscus', 15: 'orchid', 16: 'bonsai-ficus', 17: 'mint', 18: 'neem',
  19: 'tomato', 20: 'mango', 21: 'echeveria', 22: 'jade-plant', 23: 'lemon',
  24: 'money-plant', 25: 'marigold', 26: 'philodendron-brasil', 27: 'chinese-evergreen',
  28: 'rubber-plant', 29: 'ixora', 30: 'crossandra', 31: 'adenium', 32: 'plumeria',
  33: 'chrysanthemum', 34: 'lavender', 35: 'curry-leaf', 36: 'coriander',
  37: 'lemongrass', 38: 'guava', 39: 'pomegranate', 40: 'ashwagandha',
  41: 'string-of-pearls', 42: 'calathea', 43: 'chilli', 44: 'brinjal', 45: 'basil'
};

for (const [seed, file] of Object.entries(plantMap)) {
  const regex = new RegExp('images: \\["https://image\\.pollinations\\.ai/prompt/[^"]*seed=' + seed + '"\\]');
  plants = plants.replace(regex, 'images: ["/images/plants/' + file + '.jpg"]');
}
fs.writeFileSync(path.join(base, 'src/data/plants.ts'), plants);
console.log('plants.ts updated, remaining Pollinations: ' + (plants.match(/pollinations/g) || []).length);

// ===== CATEGORIES.TS =====
let cats = fs.readFileSync(path.join(base, 'src/data/categories.ts'), 'utf8');
const catMap = { 401:'indoor', 402:'outdoor', 403:'flowering', 404:'medicinal', 405:'fruit', 406:'vegetable', 407:'herb', 408:'succulent', 409:'exotic', 410:'palm', 411:'climber', 412:'bonsai', 413:'bamboo', 414:'aquatic', 415:'hanging', 416:'fragrant', 417:'air-purifying', 418:'drought-tolerant', 419:'pet-friendly', 420:'seasonal' };
for (const [seed, file] of Object.entries(catMap)) {
  const regex = new RegExp('image: "https://image\\.pollinations\\.ai/prompt/[^"]*seed=' + seed + '"');
  cats = cats.replace(regex, 'image: "/images/categories/' + file + '.jpg"');
}
fs.writeFileSync(path.join(base, 'src/data/categories.ts'), cats);
console.log('categories.ts updated, remaining Pollinations: ' + (cats.match(/pollinations/g) || []).length);

// ===== SERVICES.TS =====
let svcs = fs.readFileSync(path.join(base, 'src/data/services.ts'), 'utf8');
const svcMap = { 101:'landscaping', 102:'garden-setup', 103:'garden-maintenance', 104:'vertical-garden', 105:'terrace-garden', 106:'kitchen-garden', 107:'organic-farming', 108:'plant-rental', 109:'corporate-plants', 110:'garden-consultation', 111:'plant-doctor', 112:'home-delivery', 113:'bulk-orders', 114:'office-decoration' };
for (const [seed, file] of Object.entries(svcMap)) {
  const regex = new RegExp('image: "https://image\\.pollinations\\.ai/prompt/[^"]*seed=' + seed + '"');
  svcs = svcs.replace(regex, 'image: "/images/services/' + file + '.jpg"');
}
fs.writeFileSync(path.join(base, 'src/data/services.ts'), svcs);
console.log('services.ts updated, remaining Pollinations: ' + (svcs.match(/pollinations/g) || []).length);

// ===== TESTIMONIALS.TS =====
let tests = fs.readFileSync(path.join(base, 'src/data/testimonials.ts'), 'utf8');
for (let i = 1; i <= 8; i++) {
  const regex = new RegExp('avatar: "https://image\\.pollinations\\.ai/prompt/[^"]*seed=' + (300+i) + '"');
  tests = tests.replace(regex, 'avatar: "/images/testimonials/customer-' + String(i).padStart(2,'0') + '.jpg"');
}
fs.writeFileSync(path.join(base, 'src/data/testimonials.ts'), tests);
console.log('testimonials.ts updated, remaining Pollinations: ' + (tests.match(/pollinations/g) || []).length);

// ===== BLOG.TS =====
let blog = fs.readFileSync(path.join(base, 'src/data/blog.ts'), 'utf8');
const blogMap = { 201:'indoor-plants-beginners', 202:'seasonal-garden-care', 203:'organic-farming', 204:'medicinal-plants', 205:'fruit-trees', 206:'monsoon-gardening', 207:'vertical-garden-design', 208:'vegetable-gardening' };
for (const [seed, file] of Object.entries(blogMap)) {
  const regex = new RegExp('image: "https://image\\.pollinations\\.ai/prompt/[^"]*seed=' + seed + '"');
  blog = blog.replace(regex, 'image: "/images/blog/' + file + '.jpg"');
}
fs.writeFileSync(path.join(base, 'src/data/blog.ts'), blog);
console.log('blog.ts updated, remaining Pollinations: ' + (blog.match(/pollinations/g) || []).length);

// ===== GALLERY.TS - Fix malformed URLs =====
let gallery = fs.readFileSync(path.join(base, 'src/data/gallery.ts'), 'utf8');
// All gallery URLs have the same broken prompt pattern
// Replace the broken prompt portion with the correct one from the alt text
const galleryFixes = [
  ['gallery-001', 'Beautiful garden landscape', 501, 800, 600],
  ['gallery-002', 'Colorful flowering plants', 502, 600, 800],
  ['gallery-003', 'Lush green nursery', 503, 800, 600],
  ['gallery-004', 'Happy customers at KVR', 504, 800, 600],
  ['gallery-005', 'Seasonal flower bloom', 505, 600, 800],
  ['gallery-006', 'Fruit tree orchard', 506, 800, 600],
  ['gallery-007', 'Landscaping project', 507, 1200, 800],
  ['gallery-008', 'Garden decoration', 508, 800, 600],
  ['gallery-009', 'Indoor plant collection', 509, 600, 800],
  ['gallery-010', 'Vertical garden', 510, 800, 600],
  ['gallery-011', 'Terrace garden', 511, 800, 600],
  ['gallery-012', 'Organic vegetable garden', 512, 800, 600],
  ['gallery-013', 'Medicinal plant garden', 513, 600, 800],
  ['gallery-014', 'Succulent arrangement', 514, 800, 600],
  ['gallery-015', 'Palm tree garden', 515, 800, 600],
  ['gallery-016', 'Bonsai art collection', 516, 600, 800],
  ['gallery-017', 'Herb garden', 517, 1200, 800],
  ['gallery-018', 'Water feature design', 518, 800, 600],
  ['gallery-019', 'Garden pathway', 519, 800, 600],
  ['gallery-020', 'Flower bed arrangement', 520, 600, 800],
  ['gallery-021', 'Night garden lighting', 521, 800, 600],
  ['gallery-022', 'Garden furniture setup', 522, 800, 600],
  ['gallery-023', 'Plant sale event', 523, 800, 600],
  ['gallery-024', 'Nursery tour', 524, 800, 600],
  ['gallery-025', 'Rare exotic plants', 525, 600, 800],
  ['gallery-026', 'Fragrant flower garden', 526, 800, 600],
  ['gallery-027', 'Shade garden design', 527, 600, 800],
  ['gallery-028', 'Drought tolerant garden', 528, 800, 600],
  ['gallery-029', 'Pet friendly garden', 529, 800, 600],
  ['gallery-030', 'Seasonal decoration', 530, 800, 600],
  ['gallery-031', 'Garden maintenance', 531, 800, 600],
  ['gallery-032', 'New plant arrivals', 532, 600, 800],
  ['gallery-033', 'Customer planting day', 533, 800, 600],
  ['gallery-034', 'Garden workshop', 534, 800, 600],
  ['gallery-035', 'Plant potting session', 535, 800, 600],
  ['gallery-036', 'Garden consultation', 536, 800, 600],
  ['gallery-037', 'Bulk plant delivery', 537, 800, 600],
  ['gallery-038', 'Office plant setup', 538, 800, 600],
  ['gallery-039', 'Hotel garden design', 539, 800, 600],
  ['gallery-040', 'Resort landscaping', 540, 600, 800],
  ['gallery-041', 'School garden project', 541, 800, 600],
  ['gallery-042', 'Community garden', 542, 800, 600],
  ['gallery-043', 'Rooftop garden', 543, 800, 600],
  ['gallery-044', 'Balcony garden', 544, 800, 600],
  ['gallery-045', 'Entryway landscaping', 545, 800, 600],
  ['gallery-046', 'Backyard transformation', 546, 800, 600],
  ['gallery-047', 'Front garden design', 547, 800, 600],
  ['gallery-048', 'Poolside garden', 548, 600, 800],
  ['gallery-049', 'Garden pest control', 549, 800, 600],
  ['gallery-050', 'Organic composting', 550, 600, 800],
  ['gallery-051', 'Seed sowing workshop', 551, 800, 600],
  ['gallery-052', 'Garden harvest', 552, 800, 600],
  ['gallery-053', 'Plant propagation', 553, 600, 800],
  ['gallery-054', 'Garden photography', 554, 800, 600],
  ['gallery-055', 'KVR Agro Gardens team', 555, 600, 800],
  ['gallery-056', 'Palakkad nursery', 556, 800, 600],
  ['gallery-057', 'Plant packaging', 557, 800, 600],
  ['gallery-058', 'Safe plant delivery', 558, 600, 800],
  ['gallery-059', 'Customer unboxing', 559, 800, 600],
  ['gallery-060', 'Happy plant parent', 560, 800, 600],
  ['gallery-061', 'Garden party decoration', 561, 800, 600],
  ['gallery-062', 'Wedding garden setup', 562, 800, 600],
  ['gallery-063', 'Festival garden', 563, 600, 800],
  ['gallery-064', 'Monsoon garden care', 564, 800, 600],
  ['gallery-065', 'Summer garden tips', 565, 800, 600],
  ['gallery-066', 'Winter garden blooms', 566, 800, 600],
  ['gallery-067', 'Spring flower show', 567, 600, 800],
  ['gallery-068', 'Autumn garden colors', 568, 800, 600],
  ['gallery-069', 'Tropical garden design', 569, 800, 600],
  ['gallery-070', 'Butterfly garden', 570, 800, 600],
  ['gallery-071', 'Bird friendly garden', 571, 800, 600],
  ['gallery-072', 'Pollinator garden', 572, 600, 800],
  ['gallery-073', 'Cactus collection', 573, 800, 600],
  ['gallery-074', 'Fern garden', 574, 800, 600],
  ['gallery-075', 'Bamboo grove', 575, 800, 600],
  ['gallery-076', 'Orchid house', 576, 600, 800],
  ['gallery-077', 'Hydroponic setup', 577, 800, 600],
  ['gallery-078', 'Greenhouse interior', 578, 600, 800],
  ['gallery-079', 'Shade net nursery', 579, 800, 600],
  ['gallery-080', 'Garden tools display', 580, 800, 600],
  ['gallery-081', 'Pottery collection', 581, 800, 600],
  ['gallery-082', 'Decorative planters', 582, 800, 600],
  ['gallery-083', 'Garden art', 583, 600, 800],
  ['gallery-084', 'Water fountain', 584, 800, 600],
  ['gallery-085', 'Koi pond', 585, 800, 600],
  ['gallery-086', 'Rock garden', 586, 800, 600],
  ['gallery-087', 'Japanese garden', 587, 600, 800],
  ['gallery-088', 'Cottage garden', 588, 800, 600],
  ['gallery-089', 'Modern garden design', 589, 800, 600],
  ['gallery-090', 'Minimalist garden', 590, 800, 600],
  ['gallery-091', 'Tropical paradise', 591, 800, 600],
  ['gallery-092', 'Desert landscape', 592, 600, 800],
  ['gallery-093', 'Moss garden', 593, 800, 600],
  ['gallery-094', 'Fern wall', 594, 800, 600],
  ['gallery-095', 'Living wall', 595, 800, 600],
  ['gallery-096', 'Green facade', 596, 800, 600],
  ['gallery-097', 'Garden bench area', 597, 800, 600],
  ['gallery-098', 'Reading nook garden', 598, 600, 800],
  ['gallery-099', 'Meditation garden', 599, 800, 600],
  ['gallery-100', 'Yoga garden space', 600, 800, 600],
  ['gallery-101', 'Children play garden', 601, 800, 600],
  ['gallery-102', 'Edible garden', 602, 800, 600],
  ['gallery-103', 'Kitchen garden harvest', 603, 800, 600],
  ['gallery-104', 'Farm to table', 604, 800, 600],
  ['gallery-105', 'Garden fresh produce', 605, 800, 600],
];

for (const [id, alt, seed, w, h] of galleryFixes) {
  const encoded = encodeURIComponent(alt + ' garden nature photorealistic');
  const newUrl = 'https://image.pollinations.ai/prompt/' + encoded + '?width=' + w + '&height=' + h + '&nologo=true&seed=' + seed;
  const regex = new RegExp('src: "https://image\\.pollinations\\.ai/prompt/[^\"]*' + id.replace('gallery-', '') + '"');
  gallery = gallery.replace(regex, 'src: "' + newUrl + '"');
}
fs.writeFileSync(path.join(base, 'src/data/gallery.ts'), gallery);
console.log('gallery.ts fixed, remaining broken: ' + (gallery.match(/%22%2C%20alt/g) || []).length);

// ===== ABOUTSECTION.TX =====
let about = fs.readFileSync(path.join(base, 'src/components/sections/AboutSection.tsx'), 'utf8');
about = about.replace(
  /src="https:\/\/image\.pollinations\.ai\/prompt\/[^"]*"/,
  'src="/images/about-nursery.jpg"'
);
fs.writeFileSync(path.join(base, 'src/components/sections/AboutSection.tsx'), about);
console.log('AboutSection.tsx updated');

console.log('\n=== ALL DATA FILES UPDATED! ===');
