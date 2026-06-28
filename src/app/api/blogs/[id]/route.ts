import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import { BlogData } from "../route";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const blogs = readJSON<BlogData[]>("blogs.json");
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }

  return NextResponse.json({ blog });
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
  const blogs = readJSON<BlogData[]>("blogs.json");
  const index = blogs.findIndex((b) => b.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const allowedFields: Record<string, unknown> = {};
    const validKeys = ["title", "slug", "excerpt", "content", "image", "category", "author", "readTime", "tags", "featured"];
    for (const key of validKeys) {
      if (key in body) {
        allowedFields[key] = body[key];
      }
    }
    blogs[index] = { ...blogs[index], ...allowedFields, id };
    writeJSON("blogs.json", blogs);
    return NextResponse.json({ blog: blogs[index] });
  } catch (error) {
    console.error("Failed to update blog post:", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
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
  const blogs = readJSON<BlogData[]>("blogs.json");
  const filtered = blogs.filter((b) => b.id !== id);

  if (filtered.length === blogs.length) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }

  writeJSON("blogs.json", filtered);
  return NextResponse.json({ success: true });
}
