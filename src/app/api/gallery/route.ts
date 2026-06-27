import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const galleryPath = path.join(process.cwd(), "src", "data", "gallery.ts");
    const content = await readFile(galleryPath, "utf-8");

    const items: { id: string; src: string; alt: string; category: string; width: number; height: number; type: string }[] = [];
    const regex = /\{[^}]*id:\s*"([^"]*)"[^}]*src:\s*"([^"]*)"[^}]*alt:\s*"([^"]*)"[^}]*category:\s*"([^"]*)"[^}]*width:\s*(\d+)[^}]*height:\s*(\d+)[^}]*type:\s*"([^"]*)"[^}]*\}/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      items.push({
        id: match[1],
        src: match[2],
        alt: match[3],
        category: match[4],
        width: parseInt(match[5]),
        height: parseInt(match[6]),
        type: match[7],
      });
    }

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
