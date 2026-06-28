"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  image: string;
  plantCount: number;
}

interface CategoriesSectionProps {
  categories: CategoryData[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-24 bg-gray-50 dark:bg-dark-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Explore Our Categories"
          subtitle="Discover our wide range of plant categories curated for every need"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.slice(0, 20).map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <Link
                href={`/categories/${category.slug}`}
                className="group block relative overflow-hidden rounded-2xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-semibold text-sm text-white group-hover:text-gold-400 transition-colors line-clamp-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-white/70 mt-1">
                      {category.plantCount} Plants
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10">
          <Link href="/categories" className="inline-flex items-center gap-2 text-forest-700 dark:text-forest-400 font-medium hover:gap-3 transition-all">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
