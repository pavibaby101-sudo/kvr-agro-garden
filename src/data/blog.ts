import { BlogPost } from "@/types";
import { readJSON } from "@/lib/db";

export function getBlogPosts(): BlogPost[] {
  try {
    const dbPosts = readJSON<BlogPost[]>("blogs.json");
    if (Array.isArray(dbPosts) && dbPosts.length > 0) {
      return dbPosts;
    }
  } catch {}
  return [];
}
