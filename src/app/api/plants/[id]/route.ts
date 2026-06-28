import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import { PlantData } from "../route";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const plants = readJSON<PlantData[]>("plants.json");
  const plant = plants.find((p) => p.id === id);

  if (!plant) {
    return NextResponse.json({ error: "Plant not found" }, { status: 404 });
  }

  return NextResponse.json({ plant });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const plants = readJSON<PlantData[]>("plants.json");
  const index = plants.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Plant not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const allowedFields: Record<string, unknown> = {};
    const validKeys = ["name", "scientificName", "category", "price", "discount", "available", "height", "potSize", "careLevel", "sunlight", "waterNeeds", "description", "images", "featured"];
    for (const key of validKeys) {
      if (key in body) {
        allowedFields[key] = body[key];
      }
    }
    plants[index] = { ...plants[index], ...allowedFields, id };
    writeJSON("plants.json", plants);
    return NextResponse.json({ plant: plants[index] });
  } catch (error) {
    console.error("Failed to update plant:", error);
    return NextResponse.json({ error: "Failed to update plant" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const plants = readJSON<PlantData[]>("plants.json");
  const filtered = plants.filter((p) => p.id !== id);

  if (filtered.length === plants.length) {
    return NextResponse.json({ error: "Plant not found" }, { status: 404 });
  }

  writeJSON("plants.json", filtered);
  return NextResponse.json({ success: true });
}
