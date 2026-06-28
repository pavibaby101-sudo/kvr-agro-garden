"use client";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data.blogs || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  };

  return (
    <AdminLayout title="Blog Posts">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {blogs.length} blog posts
          </p>
          <Link href="/admin/blogs/new">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>

        <div className="bg-white dark:bg-dark-100 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : blogs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No blog posts yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-dark border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Title</th>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Category</th>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Author</th>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Date</th>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-dark"
                    >
                      <td className="p-4">
                        <div className="font-medium text-gray-900 dark:text-white">{blog.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{blog.readTime}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-forest-100 dark:bg-forest-900/30 text-forest-700 dark:text-forest-400">
                          {blog.category || "Uncategorized"}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600 dark:text-gray-400">{blog.author}</td>
                      <td className="p-4 text-gray-500">{blog.date}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/blogs/edit/${blog.id}`}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark text-gray-500 hover:text-forest-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark text-gray-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
