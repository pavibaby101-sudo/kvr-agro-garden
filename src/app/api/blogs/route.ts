import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";

export interface BlogData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export async function GET() {
  const blogs = readJSON<BlogData[]>("blogs.json");
  return NextResponse.json({ blogs });
}

export async function POST(request: NextRequest) {
  const user = await getAuthFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const blogs = readJSON<BlogData[]>("blogs.json");

    const newBlog: BlogData = {
      id: `blog-${uuidv4().slice(0, 8)}`,
      title: body.title || "",
      slug: body.slug || body.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || `post-${Date.now()}`,
      excerpt: body.excerpt || "",
      content: body.content || "",
      image: body.image || "/images/blog/default.jpg",
      category: body.category || "",
      author: body.author || user.name,
      date: new Date().toISOString().split("T")[0],
      readTime: body.readTime || "5 min read",
      tags: body.tags || [],
      featured: body.featured || false,
    };

    blogs.push(newBlog);
    writeJSON("blogs.json", blogs);

    return NextResponse.json({ blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
