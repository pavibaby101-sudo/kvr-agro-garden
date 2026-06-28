import { NextRequest, NextResponse } from "next/server";
import { unlink, readFile, writeFile } from "fs/promises";
import path from "path";
import { getAuthFromRequest } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const user = await getAuthFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { src, id } = await request.json();

    if (!src) {
      return NextResponse.json({ error: "No src provided" }, { status: 400 });
    }

    const filename = src.split("/").pop();
    if (filename) {
      const uploadsPath = path.join(process.cwd(), "uploads", "gallery", filename);
      try { await unlink(uploadsPath); } catch {}
      const publicPath = path.join(process.cwd(), "public", "images", "gallery", filename);
      try { await unlink(publicPath); } catch {}
    }

    if (id) {
      const galleryPath = path.join(process.cwd(), "src", "data", "gallery.ts");
      let content = await readFile(galleryPath, "utf-8");
      const regex = new RegExp(`\\s*\\{[^}]*id:\\s*"${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^}]*\\},?\\n?`, "g");
      content = content.replace(regex, "\n");
      await writeFile(galleryPath, content, "utf-8");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
