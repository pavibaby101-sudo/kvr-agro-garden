import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallButton from "@/components/shared/CallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) notFound();

  return (
    <main>
      <Navbar />
      <article className="pt-24 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-forest-700 dark:hover:text-forest-400 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="mb-8">
            <span className="text-sm font-semibold text-forest-700 dark:text-forest-400 uppercase tracking-wider">{post.category}</span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mt-2 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(post.date)}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map(tag => <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-forest-50 dark:bg-forest-900/50 text-forest-700 dark:text-forest-400 text-xs"><Tag className="w-3 h-3" />{tag}</span>)}
            </div>
          </div>
          <div className="aspect-[16/9] rounded-3xl relative overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
          <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
            <p className="text-lg">{post.excerpt}</p>
            <p>At KVR Agro Gardens, we believe in providing the best care tips and guidance to help your plants thrive. Stay tuned for more informative articles on gardening, plant care, and sustainable living.</p>
            <p>Our team of expert horticulturists brings years of experience in tropical gardening, specifically tailored for Kerala&apos;s unique climate. Whether you are a beginner or an experienced gardener, our blog has something for everyone.</p>
          </div>
        </div>
      </article>
      <Footer /><WhatsAppButton /><CallButton /><ScrollToTop />
    </main>
  );
}
