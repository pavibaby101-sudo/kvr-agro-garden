const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "src", "data", "db");
const dataDir = path.join(__dirname, "..", "src", "data");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

try {
  // Read and execute the plants data file content
  const plantsCode = fs.readFileSync(path.join(dataDir, "plants.ts"), "utf-8");

  let evaluableCode = plantsCode
    .replace(/import\s*\{[^}]*\}\s*from\s*["'][^"']*["'];?\n?/g, "")
    .replace(/export\s+/g, "")
    .replace(/:\s*Plant\[\]/g, "")
    .replace(/:\s*string/g, "")
    .replace(/as\s+string\[\]/g, "")
    .replace(/\(\s*id:\s*string\s*\)/g, "(id)")
    .replace(/\(\s*category:\s*string\s*\)/g, "(category)");

  const fn = new Function(evaluableCode + "\nreturn plants;");
  const plantsData = fn();

  // Read categories
  const categoriesCode = fs.readFileSync(path.join(dataDir, "categories.ts"), "utf-8")
    .replace(/import\s*\{[^}]*\}\s*from\s*["'][^"']*["'];?\n?/g, "")
    .replace(/export\s+/g, "")
    .replace(/:\s*Category\[\]/g, "");

  const catFn = new Function(categoriesCode + "\nreturn categories;");
  const categoriesData = catFn();

  // Read blog data
  const blogCode = fs.readFileSync(path.join(dataDir, "blog.ts"), "utf-8")
    .replace(/import\s*\{[^}]*\}\s*from\s*["'][^"']*["'];?\n?/g, "")
    .replace(/export\s+/g, "")
    .replace(/:\s*BlogPost\[\]/g, "");

  const blogFn = new Function(blogCode + "\nreturn blogPosts;");
  const blogsData = blogFn();

const settingsData = {
  siteName: "KVR Agro Gardens",
  siteDescription: "Premium plants and gardening solutions in Kerala",
  contactEmail: "info@kvragrogardens.com",
  contactPhone: "+91 7909173649",
  address: "KVR Agro Gardens, Nemmara, Palakkad District, Kerala - 678508, India",
  facebook: "",
  instagram: "",
  youtube: "",
  whatsapp: "",
  businessHours: "Mon-Sat: 9AM - 7PM, Sun: Closed",
  metaTitle: "KVR Agro Gardens - Premium Plants Kerala",
  metaDescription: "Buy premium indoor, outdoor, flowering, and medicinal plants in Kerala",
};

const adminsData = [
  {
    id: "admin-001",
    name: "KVR Admin",
    email: "admin@kvr.com",
    password: "$2b$10$ilX6/X9kotxeziYlKDaNa.QmBN1jAZwG/eEW1xMmxXdUuTFT.EJaG",
    role: "superadmin",
    createdAt: new Date().toISOString(),
  },
];

fs.writeFileSync(path.join(DATA_DIR, "plants.json"), JSON.stringify(plantsData, null, 2));
fs.writeFileSync(path.join(DATA_DIR, "categories.json"), JSON.stringify(categoriesData, null, 2));
fs.writeFileSync(path.join(DATA_DIR, "blogs.json"), JSON.stringify(blogsData, null, 2));
fs.writeFileSync(path.join(DATA_DIR, "settings.json"), JSON.stringify(settingsData, null, 2));
fs.writeFileSync(path.join(DATA_DIR, "admins.json"), JSON.stringify(adminsData, null, 2));

console.log("Seeded " + plantsData.length + " plants");
console.log("Seeded " + categoriesData.length + " categories");
console.log("Seeded " + blogsData.length + " blog posts");
console.log("Seeded settings");
console.log("Seeded " + adminsData.length + " admin users");
console.log("Database seeded successfully!");
} catch (error) {
  console.error("Seed script failed:", error.message);
  process.exit(1);
}
