"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, Grid3X3, List, Heart, Star, ShoppingBag } from "lucide-react";
import { plants } from "@/data/plants";
import { getDiscountedPrice } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallButton from "@/components/shared/CallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const categoryNames = [...new Set(plants.map(p => p.category))];

export default function PlantsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filtered = useMemo(() => {
    let result = [...plants];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.scientificName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }
    switch (sortBy) {
      case "price-low": result.sort((a, b) => getDiscountedPrice(a.price, a.discount) - getDiscountedPrice(b.price, b.discount)); break;
      case "price-high": result.sort((a, b) => getDiscountedPrice(b.price, b.discount) - getDiscountedPrice(a.price, a.discount)); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "name": result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
    }
    return result;
  }, [search, selectedCategory, sortBy]);

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-12 bg-gradient-to-b from-forest-50 to-white dark:from-dark dark:to-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">Our Plants</h1>
            <p className="text-gray-600 dark:text-gray-400">Discover our collection of {plants.length}+ premium plants</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white dark:bg-dark-100 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search plants..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-3 flex-wrap">
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500">
                <option value="all">All Categories</option>
                {categoryNames.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500">
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name</option>
              </select>
              <div className="flex rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <button onClick={() => setView("grid")} className={`p-3 ${view === "grid" ? "bg-forest-700 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-100"}`}><Grid3X3 className="h-4 w-4" /></button>
                <button onClick={() => setView("list")} className={`p-3 ${view === "list" ? "bg-forest-700 text-white" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-100"}`}><List className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mb-6 text-sm text-gray-500">Showing {filtered.length} of {plants.length} plants</div>

        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((plant, i) => {
              const finalPrice = getDiscountedPrice(plant.price, plant.discount);
              return (
                <motion.div key={plant.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -8 }} className="group bg-white dark:bg-dark-100 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <Link href={`/plants/${plant.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={plant.images[0]}
                        alt={plant.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {plant.discount > 0 && <Badge variant="secondary">-{plant.discount}%</Badge>}
                        {plant.available ? <Badge variant="success">In Stock</Badge> : <Badge variant="danger">Out of Stock</Badge>}
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => { e.preventDefault(); toggleWishlist(plant.id); }} className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
                          <Heart className={`w-4 h-4 ${wishlist.includes(plant.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                        </button>
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize mb-1">{plant.category}</div>
                    <Link href={`/plants/${plant.id}`}><h3 className="font-semibold text-gray-900 dark:text-white hover:text-forest-700 dark:hover:text-forest-400 transition-colors">{plant.name}</h3></Link>
                    <p className="text-xs text-gray-400 italic mt-0.5">{plant.scientificName}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(plant.rating) ? "fill-gold-500 text-gold-500" : "text-gray-300 dark:text-gray-600"}`} />)}
                      <span className="text-xs text-gray-500 ml-1">({plant.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-forest-700 dark:text-forest-400">₹{finalPrice.toLocaleString("en-IN")}</span>
                      {plant.discount > 0 && <span className="text-sm text-gray-400 line-through">₹{plant.price.toLocaleString("en-IN")}</span>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((plant, i) => {
              const finalPrice = getDiscountedPrice(plant.price, plant.discount);
              return (
                <motion.div key={plant.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                  className="flex gap-6 p-4 bg-white dark:bg-dark-100 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all">
                  <Link href={`/plants/${plant.id}`} className="w-24 h-24 shrink-0 relative rounded-xl overflow-hidden">
                    <Image
                      src={plant.images[0]}
                      alt={plant.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/plants/${plant.id}`}><h3 className="font-semibold text-gray-900 dark:text-white">{plant.name}</h3></Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">{plant.scientificName}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="capitalize">{plant.category}</span>
                      <span>{plant.height}</span>
                      <span>{plant.careLevel}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-bold text-forest-700 dark:text-forest-400">₹{finalPrice.toLocaleString("en-IN")}</div>
                    {plant.discount > 0 && <div className="text-sm text-gray-400 line-through">₹{plant.price.toLocaleString("en-IN")}</div>}
                    <Link href={`/plants/${plant.id}`}><Button size="sm" variant="outline" className="mt-2">View Details</Button></Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20"><p className="text-gray-500 dark:text-gray-400">No plants found matching your criteria.</p></div>
        )}
      </div>
      <Footer /><WhatsAppButton /><CallButton /><ScrollToTop />
    </main>
  );
}
