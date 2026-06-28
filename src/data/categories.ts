import { Category } from "@/types";
import { readJSON } from "@/lib/db";

export function getCategories(): Category[] {
  try {
    const dbCategories = readJSON<Category[]>("categories.json");
    if (Array.isArray(dbCategories) && dbCategories.length > 0) {
      return dbCategories;
    }
  } catch {}
  return [];
}
