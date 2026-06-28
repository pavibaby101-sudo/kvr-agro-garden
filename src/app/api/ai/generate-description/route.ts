import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";
import { generateDescription } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  const user = await getAuthFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, category, careLevel, height, sunlight, waterNeeds } = await request.json();
    if (!name || !category) {
      return NextResponse.json({ error: "Name and category are required" }, { status: 400 });
    }

    const description = await generateDescription({ name, category, careLevel, height, sunlight, waterNeeds });
    return NextResponse.json({ description });
  } catch (error) {
    console.error("Description generation failed:", error);
    return NextResponse.json({ error: "Failed to generate description" }, { status: 500 });
  }
}
