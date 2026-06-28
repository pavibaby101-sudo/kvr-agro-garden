"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    readTime: "5 min read",
    tags: "",
    featured: false,
  });

  const handleGenerateBlog = async () => {
    if (!form.title) {
      alert("Please enter a blog title first");
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title, category: form.category }),
      });
      if (res.ok) {
        const data = await res.json();
        setForm((prev) => ({
          ...prev,
          content: data.content,
          excerpt: data.excerpt || prev.excerpt,
        }));
      } else {
        alert("Failed to generate blog content");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        router.push("/admin/blogs");
      } else {
        alert("Failed to create blog post");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="New Blog Post">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-forest-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-8 rounded-3xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div />
            <button type="button" onClick={handleGenerateBlog} disabled={generating} className="inline-flex items-center gap-1.5 text-sm text-forest-600 hover:text-forest-800 disabled:opacity-50">
              <Sparkles className="w-4 h-4" />
              {generating ? "Generating content..." : "Generate with AI"}
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title *
            </label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Blog post title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Excerpt
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
              placeholder="Short summary..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content *
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={12}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
              placeholder="Write your blog post content here..."
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Plant Care"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Read Time
              </label>
              <Input
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                placeholder="5 min read"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (comma separated)
            </label>
            <Input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="indoor plants, kerala, gardening"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="rounded border-gray-300 text-forest-600 focus:ring-forest-500"
            />
            <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">
              Featured post
            </label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Publishing..." : "Publish Post"}
            </Button>
            <Link href="/admin/blogs">
              <Button type="button" size="lg" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
