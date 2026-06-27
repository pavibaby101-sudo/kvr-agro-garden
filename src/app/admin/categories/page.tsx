"use client";
import Link from "next/link";
import { AdminShell } from "@/app/admin/orders/page";

const cats = [
  { name: "Indoor Plants", count: 35 },
  { name: "Outdoor Plants", count: 28 },
  { name: "Flowering Plants", count: 42 },
  { name: "Medicinal Plants", count: 20 },
  { name: "Fruit Plants", count: 15 },
];

export default function AdminCategoriesPage() {
  return (
    <AdminShell title="Categories">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cats.map(cat => (
          <div key={cat.name} className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{cat.count} products</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
