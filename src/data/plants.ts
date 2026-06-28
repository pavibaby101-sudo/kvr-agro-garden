import { Plant } from "@/types";
import { readJSON } from "@/lib/db";

export function getPlants(): Plant[] {
  try {
    const dbPlants = readJSON<Plant[]>("plants.json");
    if (Array.isArray(dbPlants) && dbPlants.length > 0) {
      return dbPlants;
    }
  } catch {}
  return [];
}

export function getFeaturedPlants(): Plant[] {
  return getPlants().filter(p => p.featured);
}

export function getPlantCategories(): string[] {
  return [...new Set(getPlants().map(p => p.category))];
}

export function getPlantById(id: string) {
  return getPlants().find(p => p.id === id);
}

export function getPlantsByCategory(category: string) {
  return getPlants().filter(p => p.category === category);
}
