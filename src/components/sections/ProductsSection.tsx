"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star, Eye, ArrowRight } from "lucide-react";
import { getDiscountedPrice } from "@/lib/utils";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PlantData {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  price: number;
  discount: number;
  available: boolean;
  images: string[];
  rating: number;
  reviews: number;
}

interface ProductsSectionProps {
  plants: PlantData[];
}

export default function ProductsSection({ plants: featuredPlants }: ProductsSectionProps) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured Plants"
          subtitle="Our most popular plants, handpicked for their beauty and easy care"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredPlants.slice(0, 8).map((plant, i) => {
            const hasDiscount = plant.discount > 0;
            const finalPrice = getDiscountedPrice(plant.price, plant.discount);

            return (
              <motion.div
                key={plant.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white dark:bg-dark-100 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <Link href={`/plants/${plant.id}`}>
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-forest-50 to-forest-100 dark:from-forest-900 dark:to-forest-800 overflow-hidden">
                    <Image
                      src={plant.images?.[0] || "/images/plants/snake-plant.jpg"}
                      alt={plant.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized={!plant.images?.[0]}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {hasDiscount && (
                        <Badge variant="secondary" className="text-xs font-bold">
                          -{plant.discount}% OFF
                        </Badge>
                      )}
                      {plant.available ? (
                        <Badge variant="success" className="text-xs">In Stock</Badge>
                      ) : (
                        <Badge variant="danger" className="text-xs">Out of Stock</Badge>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(plant.id); }}
                        className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            wishlist.includes(plant.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                      <Link href={`/plants/${plant.id}`} onClick={(e) => e.stopPropagation()}>
                        <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 capitalize">
                    {plant.category}
                  </div>
                  <Link href={`/plants/${plant.id}`}>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-forest-700 dark:group-hover:text-forest-400 transition-colors line-clamp-1">
                      {plant.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-400 dark:text-gray-500 italic mt-0.5">
                    {plant.scientificName}
                  </p>

                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(plant.rating)
                            ? "fill-gold-500 text-gold-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      ({plant.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-forest-700 dark:text-forest-400">
                        ₹{finalPrice.toLocaleString("en-IN")}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{plant.price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <button className="w-9 h-9 rounded-full bg-forest-100 dark:bg-forest-900/50 flex items-center justify-center hover:bg-forest-700 hover:text-white transition-all">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/plants">
            <Button variant="outline" size="lg" className="group">
              View All Plants <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
