#!/usr/bin/env node

/**
 * Bulk Gallery Import Script
 *
 * Usage:
 *   node scripts/import-gallery.js <path-to-folder> [category]
 *
 * Examples:
 *   node scripts/import-gallery.js ./my-photos
 *   node scripts/import-gallery.js C:\Users\You\Photos plants
 *   node scripts/import-gallery.js ./videos nursery
 *
 * Supported formats:
 *   Images: .jpg, .jpeg, .png, .webp, .gif
 *   Videos: .mp4, .mov, .webm
 */

const fs = require("fs");
const path = require("path");

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const VIDEO_EXTS = [".mp4", ".mov", ".webm"];
const ALL_EXTS = [...IMAGE_EXTS, ...VIDEO_EXTS];

const GALLERY_DIR = path.join(__dirname, "..", "public", "images", "gallery");
const DATA_FILE = path.join(__dirname, "..", "src", "data", "gallery.ts");

const defaultCategory = "nursery";
const defaultWidth = 800;
const defaultHeight = 600;
const videoWidth = 1280;
const videoHeight = 720;

function generateId() {
  const ts = Date.now();
  const rand = Math.random().toString(36).substring(2, 8);
  return `gallery-${ts}-${rand}`;
}

function sanitizeAlt(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractExistingIds(content) {
  const ids = [];
  const regex = /id:\s*"(gallery-[^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log("Usage: node scripts/import-gallery.js <path-to-folder> [category]");
    console.log("");
    console.log("Categories: plants, flowers, fruit, landscaping, customers, events, nursery");
    process.exit(1);
  }

  const folderPath = path.resolve(args[0]);
  const category = args[1] || defaultCategory;

  if (!fs.existsSync(folderPath)) {
    console.error(`Error: Folder not found: ${folderPath}`);
    process.exit(1);
  }

  return { folderPath, category };
}

function scanFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ALL_EXTS.includes(ext);
  });
}

function copyFiles(folderPath, files) {
  fs.mkdirSync(GALLERY_DIR, { recursive: true });

  const copied = [];
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const isImage = IMAGE_EXTS.includes(ext);
    const isVideo = VIDEO_EXTS.includes(ext);

    if (!isImage && !isVideo) continue;

    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const srcPath = path.join(folderPath, file);
    const destPath = path.join(GALLERY_DIR, uniqueName);

    fs.copyFileSync(srcPath, destPath);

    copied.push({
      fileName: file,
      uniqueName,
      type: isImage ? "image" : "video",
      src: `/images/gallery/${uniqueName}`,
    });

    process.stdout.write(`\rCopying files... ${copied.length}/${files.length}`);
  }
  console.log("");
  return copied;
}

function generateGalleryItems(copiedFiles, category) {
  return copiedFiles.map((file) => ({
    id: generateId(),
    src: file.src,
    alt: sanitizeAlt(file.fileName),
    category: category,
    width: file.type === "video" ? videoWidth : defaultWidth,
    height: file.type === "video" ? videoHeight : defaultHeight,
    type: file.type,
  }));
}

function updateGalleryData(newItems) {
  let content = fs.readFileSync(DATA_FILE, "utf-8");

  // Remove the closing ]; and add new items before it
  const closingIndex = content.lastIndexOf("];");
  if (closingIndex === -1) {
    console.error("Error: Could not find end of galleryItems array in gallery.ts");
    process.exit(1);
  }

  const lines = newItems.map((item) => {
    return `  { id: "${item.id}", src: "${item.src}", alt: "${item.alt}", category: "${item.category}", width: ${item.width}, height: ${item.height}, type: "${item.type}" },`;
  });

  const newContent = content.slice(0, closingIndex) + lines.join("\n") + "\n];\n";
  fs.writeFileSync(DATA_FILE, newContent, "utf-8");
}

function main() {
  const { folderPath, category } = parseArgs();

  console.log(`\nBulk Gallery Import`);
  console.log(`Source: ${folderPath}`);
  console.log(`Category: ${category}\n`);

  // Scan for files
  const files = scanFolder(folderPath);
  if (files.length === 0) {
    console.log("No supported image or video files found in the folder.");
    console.log("Supported formats:", ALL_EXTS.join(", "));
    process.exit(0);
  }

  console.log(`Found ${files.length} file(s) to import.\n`);

  // Copy files
  const copied = copyFiles(folderPath, files);

  // Generate gallery items
  const newItems = generateGalleryItems(copied, category);

  // Update gallery.ts
  updateGalleryData(newItems);

  console.log(`\nDone! ${newItems.length} items added to gallery.`);
  console.log(`Files copied to: ${GALLERY_DIR}`);
  console.log(`Data updated in: ${DATA_FILE}`);
  console.log(`\nRun "npm run dev" to see the changes.\n`);
}

main();
