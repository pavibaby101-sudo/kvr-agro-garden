"use client";
import { motion } from "framer-motion";
import { Package, FolderTree, FileText, DollarSign, TrendingUp, Leaf } from "lucide-react";
import Link from "next/link";
import AdminLayout from "@/components/admin/admin-layout";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ plants: 0, categories: 0, blogs: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/plants?limit=1").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/blogs").then((r) => r.json()),
    ]).then(([plants, categories, blogs]) => {
      setStats({
        plants: plants.total || 0,
        categories: categories.categories?.length || 0,
        blogs: blogs.blogs?.length || 0,
      });
    }).catch(() => {});
  }, []);

  const statCards = [
    { label: "Total Plants", value: stats.plants, icon: Leaf, color: "from-forest-500 to-forest-700" },
    { label: "Categories", value: stats.categories, icon: FolderTree, color: "from-gold-500 to-gold-700" },
    { label: "Blog Posts", value: stats.blogs, icon: FileText, color: "from-blue-500 to-blue-700" },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2">
              {[
                { label: "Add Product", href: "/admin/products/new", icon: Package },
                { label: "Manage Categories", href: "/admin/categories", icon: FolderTree },
                { label: "Write Blog Post", href: "/admin/blogs/new", icon: FileText },
                { label: "Update Prices", href: "/admin/products", icon: DollarSign },
                { label: "Site Settings", href: "/admin/settings", icon: TrendingUp },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-forest-50 hover:text-forest-700 dark:hover:bg-forest-900/30 dark:hover:text-forest-400 transition-colors"
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Getting Started
            </h2>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <p>Use the sidebar to navigate between sections:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-forest-500 mt-0.5">•</span>
                  <span><strong>Products:</strong> Add, edit, and manage plant prices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest-500 mt-0.5">•</span>
                  <span><strong>Categories:</strong> Organize plants into categories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest-500 mt-0.5">•</span>
                  <span><strong>Blogs:</strong> Write gardening articles and tips</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest-500 mt-0.5">•</span>
                  <span><strong>Gallery:</strong> Upload photos of your work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest-500 mt-0.5">•</span>
                  <span><strong>Settings:</strong> Update site info and social links</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
