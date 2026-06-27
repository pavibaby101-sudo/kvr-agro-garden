import { NextRequest, NextResponse } from "next/server";
import { unlink, readFile, writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const { src, id } = await request.json();

    if (!src) {
      return NextResponse.json({ error: "No src provided" }, { status: 400 });
    }

    if (src.startsWith("/images/gallery/")) {
      const filePath = path.join(process.cwd(), "public", src);
      try {
        await unlink(filePath);
      } catch {
        // File may not exist
      }
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
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
