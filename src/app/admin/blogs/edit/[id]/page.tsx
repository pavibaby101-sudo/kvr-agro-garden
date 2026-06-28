"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    readTime: "",
    tags: "",
    featured: false,
  });

  useEffect(() => {
    fetch(`/api/blogs/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.blog) {
          setBlog(data.blog);
          setForm({
            title: data.blog.title,
            excerpt: data.blog.excerpt,
            content: data.blog.content,
            category: data.blog.category,
            image: data.blog.image,
            readTime: data.blog.readTime,
            tags: (data.blog.tags || []).join(", "),
            featured: data.blog.featured,
          });
        }
        setLoading(false);
      });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/blogs/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        router.push("/admin/blogs");
      } else {
        alert("Failed to update blog post");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Blog Post">
        <div className="text-center text-gray-500 py-8">Loading...</div>
      </AdminLayout>
    );
  }

  if (!blog) {
    return (
      <AdminLayout title="Edit Blog Post">
        <div className="text-center text-gray-500 py-8">Blog post not found</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Edit: ${blog.title}`}>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title *
            </label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Read Time
              </label>
              <Input
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
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
            <Button type="submit" size="lg" disabled={saving}>
              {saving ? "Saving..." : "Update Post"}
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
