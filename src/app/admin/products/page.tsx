"use client";
import Link from "next/link";
import { Plus, Edit, Trash2, Search, ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import { formatPrice, getDiscountedPrice } from "@/lib/utils";

interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  price: number;
  discount: number;
  available: boolean;
  featured: boolean;
  images: string[];
}

export default function AdminProductsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("name");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchPlants = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    params.set("sort", sort);
    params.set("limit", "100");

    const res = await fetch(`/api/plants?${params}`);
    const data = await res.json();
    setPlants(data.plants || []);
    setTotal(data.total || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlants();
  }, [search, category, sort]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await fetch(`/api/plants/${id}`, { method: "DELETE" });
    setPlants(plants.filter((p) => p.id !== id));
    setTotal(total - 1);
  };

  const handleBulkPriceUpdate = async (percentage: number) => {
    if (!confirm(`Update all prices by ${percentage > 0 ? "+" : ""}${percentage}%?`)) return;

    await Promise.all(plants.map((plant) => {
      const newPrice = Math.round(plant.price * (1 + percentage / 100));
      return fetch(`/api/plants/${plant.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: newPrice }),
      });
    }));
    fetchPlants();
  };

  const categories = [
    "indoor", "outdoor", "flowering", "medicinal", "fruit",
    "vegetable", "herb", "succulent", "exotic", "palm",
    "climber", "bonsai", "spice",
  ];

  return (
    <AdminLayout title="Products">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {total} products
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleBulkPriceUpdate(10)}
              className="px-3 py-2 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-medium hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
            >
              +10% All Prices
            </button>
            <button
              onClick={() => handleBulkPriceUpdate(-10)}
              className="px-3 py-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              -10% All Prices
            </button>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-700 text-white text-sm font-medium hover:bg-forest-800 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Product
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
            >
              <option value="name">Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-100 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : plants.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No products found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-dark border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                      Name
                    </th>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                      Category
                    </th>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                      Price
                    </th>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                      Discount
                    </th>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                      Stock
                    </th>
                    <th className="text-left p-4 font-medium text-gray-600 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {plants.map((plant) => (
                    <tr
                      key={plant.id}
                      className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-dark"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {plant.images[0] && (
                            <img
                              src={plant.images[0]}
                              alt={plant.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {plant.name}
                            </div>
                            <div className="text-xs text-gray-500 italic">
                              {plant.scientificName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 capitalize text-gray-600 dark:text-gray-400">
                        {plant.category}
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {formatPrice(
                            getDiscountedPrice(plant.price, plant.discount)
                          )}
                        </span>
                        {plant.discount > 0 && (
                          <span className="text-xs text-gray-500 line-through ml-2">
                            {formatPrice(plant.price)}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {plant.discount > 0 ? (
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            -{plant.discount}%
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            plant.available
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {plant.available ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/products/edit/${plant.id}`}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark text-gray-500 hover:text-forest-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(plant.id)}
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
