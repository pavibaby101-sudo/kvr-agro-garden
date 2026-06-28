import "server-only";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "src", "data", "db");

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "");
}

export function readJSON<T>(filename: string): T {
  ensureDataDir();
  const safeFilename = sanitizeFilename(filename);
  const filepath = join(DATA_DIR, safeFilename);
  if (!existsSync(filepath)) {
    return [] as unknown as T;
  }
  const raw = readFileSync(filepath, "utf-8");
  return JSON.parse(raw) as T;
}

export function writeJSON<T>(filename: string, data: T): void {
  ensureDataDir();
  const safeFilename = sanitizeFilename(filename);
  const filepath = join(DATA_DIR, safeFilename);
  writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
}
