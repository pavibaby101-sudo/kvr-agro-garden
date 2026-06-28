import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { getAuthFromRequest } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthFromRequest();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const galleryPath = path.join(process.cwd(), "src", "data", "gallery.ts");
  const content = await readFile(galleryPath, "utf-8");

  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const itemRegex = new RegExp(
    `(\\{[^}]*id:\\s*"${escapedId}"[^}]*)(alt:\\s*")[^"]*(")([^}]*)(\\})`,
    "g"
  );

  const newContent = content.replace(itemRegex, `$1$2${(body.alt || "").replace(/"/g, '\\"')}$3$4$5`);

  if (newContent !== content) {
    await writeFile(galleryPath, newContent, "utf-8");
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Item not found" }, { status: 404 });
}
