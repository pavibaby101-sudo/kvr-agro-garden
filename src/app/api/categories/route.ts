import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  image: string;
  plantCount: number;
  description: string;
}

export async function GET() {
  const categories = readJSON<CategoryData[]>("categories.json");
  return NextResponse.json({ categories });
}

export async function POST(request: NextRequest) {
  const user = await getAuthFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const categories = readJSON<CategoryData[]>("categories.json");

    const slug = body.slug || body.name?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || `category-${Date.now()}`;
    const slugExists = categories.some(c => c.slug === slug);
    if (slugExists) {
      return NextResponse.json({ error: "A category with this slug already exists" }, { status: 409 });
    }

    const newCategory: CategoryData = {
      id: `cat-${uuidv4().slice(0, 8)}`,
      name: body.name || "",
      slug,
      image: body.image || "/images/categories/default.jpg",
      plantCount: 0,
      description: body.description || "",
    };

    categories.push(newCategory);
    writeJSON("categories.json", categories);

    return NextResponse.json({ category: newCategory }, { status: 201 });
  } catch (error) {
    console.error("Failed to create category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
