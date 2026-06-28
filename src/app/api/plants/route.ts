import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";
import { fetchPlantImage } from "@/lib/unsplash";

export interface PlantData {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  price: number;
  discount: number;
  available: boolean;
  height: string;
  potSize: string;
  careLevel: "Easy" | "Moderate" | "Expert";
  sunlight: string;
  waterNeeds: string;
  description: string;
  images: string[];
  featured: boolean;
  createdAt: string;
  rating: number;
  reviews: number;
}

export async function GET(request: NextRequest) {
  const plants = readJSON<PlantData[]>("plants.json");
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const featured = searchParams.get("featured");
  const sort = searchParams.get("sort") || "name";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1") || 1);
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50") || 50));

  let filtered = [...plants];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.scientificName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (featured === "true") {
    filtered = filtered.filter((p) => p.featured);
  }

  filtered.sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return a.name.localeCompare(b.name);
  });

  const total = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return NextResponse.json({ plants: items, total, page, limit });
}

export async function POST(request: NextRequest) {
  const user = await getAuthFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const plants = readJSON<PlantData[]>("plants.json");

    let images = body.images || [];
    if (images.length === 0 && body.name) {
      const autoImage = await fetchPlantImage(body.name, body.scientificName);
      if (autoImage) images = [autoImage];
    }

    const newPlant: PlantData = {
      id: `plant-${uuidv4().slice(0, 8)}`,
      name: body.name || "",
      scientificName: body.scientificName || "",
      category: body.category || "",
      price: body.price ?? 0,
      discount: body.discount ?? 0,
      available: body.available !== false,
      height: body.height || "",
      potSize: body.potSize || "",
      careLevel: body.careLevel || "Easy",
      sunlight: body.sunlight || "",
      waterNeeds: body.waterNeeds || "",
      description: body.description || "",
      images,
      featured: body.featured || false,
      createdAt: new Date().toISOString().split("T")[0],
      rating: 0,
      reviews: 0,
    };

    plants.push(newPlant);
    writeJSON("plants.json", plants);

    return NextResponse.json({ plant: newPlant }, { status: 201 });
  } catch (error) {
    console.error("Failed to create plant:", error);
    return NextResponse.json({ error: "Failed to create plant" }, { status: 500 });
  }
}
