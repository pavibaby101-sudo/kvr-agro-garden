import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import { CategoryData } from "../route";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const categories = readJSON<CategoryData[]>("categories.json");
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json({ category });
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
  const categories = readJSON<CategoryData[]>("categories.json");
  const index = categories.findIndex((c) => c.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const allowedFields: Record<string, unknown> = {};
    const validKeys = ["name", "slug", "image", "description"];
    for (const key of validKeys) {
      if (key in body) {
        allowedFields[key] = body[key];
      }
    }
    categories[index] = { ...categories[index], ...allowedFields, id };
    writeJSON("categories.json", categories);
    return NextResponse.json({ category: categories[index] });
  } catch (error) {
    console.error("Failed to update category:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
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
  const categories = readJSON<CategoryData[]>("categories.json");
  const filtered = categories.filter((c) => c.id !== id);

  if (filtered.length === categories.length) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  writeJSON("categories.json", filtered);
  return NextResponse.json({ success: true });
}
