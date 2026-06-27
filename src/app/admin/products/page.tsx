"use client";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { plants } from "@/data/plants";
import { getDiscountedPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  return (
    <AdminLayout title="Products">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">{plants.length} products</p>
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-700 text-white text-sm font-medium hover:bg-forest-800 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>
      <div className="bg-white dark:bg-dark-100 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-dark border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Name</th>
              <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Category</th>
              <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Price</th>
              <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Stock</th>
              <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.slice(0, 10).map(plant => (
              <tr key={plant.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-dark">
                <td className="p-4">
                  <div className="font-medium text-gray-900 dark:text-white">{plant.name}</div>
                  <div className="text-xs text-gray-500 italic">{plant.scientificName}</div>
                </td>
                <td className="p-4 capitalize text-gray-600 dark:text-gray-400">{plant.category}</td>
                <td className="p-4">
                  <span className="font-medium text-gray-900 dark:text-white">₹{getDiscountedPrice(plant.price, plant.discount).toLocaleString("en-IN")}</span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${plant.available ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                    {plant.available ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/products/edit/${plant.id}`} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark text-gray-500 hover:text-forest-700"><Edit className="w-4 h-4" /></Link>
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

function AdminLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark flex">
      <aside className="w-64 bg-white dark:bg-dark-100 border-r border-gray-200 dark:border-gray-800 p-4 hidden lg:block">
        <Link href="/admin/dashboard" className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forest-600 to-forest-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
          <span className="font-heading font-bold text-gray-900 dark:text-white text-sm">KVR Admin</span>
        </Link>
        <nav className="space-y-1">
          {["Dashboard","Products","Categories","Orders","Customers","Reviews","Messages","Gallery","Blogs","Settings"].map(label => (
            <Link key={label} href={`/admin/${label.toLowerCase()}`}
              className={`block px-3 py-2 rounded-xl text-sm transition-colors ${title === label ? "bg-forest-100 dark:bg-forest-900/50 text-forest-700 dark:text-forest-400 font-medium" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark hover:text-forest-700"}`}>
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1">
        <header className="bg-white dark:bg-dark-100 border-b border-gray-200 dark:border-gray-800 p-4">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
