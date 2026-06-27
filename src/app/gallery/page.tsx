"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Play, ChevronDown } from "lucide-react";
import { galleryItems } from "@/data/gallery";
import { GalleryItem } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallButton from "@/components/shared/CallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";

const categories = ["all", "plants", "flowers", "fruit", "landscaping", "customers", "events", "nursery"];
const ITEMS_PER_PAGE = 30;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loaderRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "all" ? galleryItems : galleryItems.filter(item => item.category === activeCategory);
  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(loader);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = "";
  };

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-12 bg-gradient-to-b from-forest-50 to-white dark:from-dark dark:to-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">Gallery</h1>
          <p className="text-gray-600 dark:text-gray-400">Explore our collection of beautiful gardens, plants, and happy customers</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{filtered.length} items</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "bg-forest-700 text-white shadow-lg shadow-forest-700/30" : "bg-white dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark border border-gray-200 dark:border-gray-800"}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {visibleItems.map((item) => (
            <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }} onClick={() => openLightbox(item)}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-2xl">
              <div className="relative" style={{ aspectRatio: `${item.width}/${item.height}` }}>
                {item.type === "video" ? (
                  <>
                    <video src={item.src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" muted playsInline preload="metadata" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                        <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                      </div>
                    </div>
                  </>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{item.alt}</p>
                  <p className="text-white/60 text-xs capitalize">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div ref={loaderRef} className="flex justify-center py-12">
            <button onClick={loadMore} className="flex items-center gap-2 px-6 py-3 rounded-full bg-forest-700 text-white hover:bg-forest-800 transition-colors">
              <span>Load more</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}

        {!hasMore && visibleItems.length > 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">All {filtered.length} items loaded</div>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeLightbox}>
            <button onClick={closeLightbox} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10">
              <X className="w-6 h-6" />
            </button>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
              <div className="w-full rounded-2xl overflow-hidden relative bg-black" style={{ aspectRatio: "16/9" }}>
                {selectedItem.type === "video" ? (
                  <video src={selectedItem.src} className="w-full h-full object-contain" controls autoPlay />
                ) : (
                  <Image src={selectedItem.src} alt={selectedItem.alt} fill className="object-contain" sizes="100vw" />
                )}
              </div>
              <div className="mt-3 text-center">
                <p className="text-white font-medium">{selectedItem.alt}</p>
                <p className="text-white/50 text-sm capitalize">{selectedItem.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer /><WhatsAppButton /><CallButton /><ScrollToTop />
    </main>
  );
}
