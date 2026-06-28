import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";
import { generateBlogPost } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  const user = await getAuthFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, category, topic } = await request.json();
    const blogTopic = topic || title;
    if (!blogTopic) {
      return NextResponse.json({ error: "Title or topic is required" }, { status: 400 });
    }

    const post = await generateBlogPost(blogTopic, category);
    return NextResponse.json(post);
  } catch (error) {
    console.error("Blog generation failed:", error);
    return NextResponse.json({ error: "Failed to generate blog post" }, { status: 500 });
  }
}
