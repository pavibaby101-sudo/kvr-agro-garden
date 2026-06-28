import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { getBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallButton from "@/components/shared/CallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";

export const metadata: Metadata = {
  title: "Blog",
  description: "Gardening tips, plant care guides, and expert advice from KVR Agro Gardens.",
};

export default function BlogPage() {
  const blogPosts = getBlogPosts();
  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-12 bg-gradient-to-b from-forest-50 to-white dark:from-dark dark:to-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">Our Blog</h1>
          <p className="text-gray-600 dark:text-gray-400">Gardening tips, plant care guides, and expert advice</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-6">
        {blogPosts.filter(p => p.featured).slice(0, 1).map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block mb-12">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-forest-100 to-forest-200 dark:from-forest-900 dark:to-forest-800">
              <div className="relative aspect-[2/1]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>
              <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex items-center">
                <div className="max-w-2xl">
                  <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">{post.category}</span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mt-2 mb-4 group-hover:text-gold-400 transition-colors">{post.title}</h2>
                  <p className="text-white/80 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.filter(p => !p.featured).map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white dark:bg-dark-100 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-forest-700 dark:text-forest-400 uppercase tracking-wider">{post.category}</span>
                <h3 className="font-semibold text-gray-900 dark:text-white mt-1 mb-2 group-hover:text-forest-700 dark:group-hover:text-forest-400 transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer /><WhatsAppButton /><CallButton /><ScrollToTop />
    </main>
  );
}
