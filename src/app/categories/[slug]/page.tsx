import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star } from "lucide-react";
import { getPlantsByCategory } from "@/data/plants";
import { categories } from "@/data/categories";
import { getDiscountedPrice } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallButton from "@/components/shared/CallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { Badge } from "@/components/ui/badge";

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find(c => c.slug === slug);
  if (!cat) return { title: "Category Not Found" };
  return { title: cat.name, description: cat.description };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = categories.find(c => c.slug === slug);
  if (!cat) notFound();

  const categoryPlants = getPlantsByCategory(slug);

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-12 bg-gradient-to-b from-forest-50 to-white dark:from-dark dark:to-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/categories" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-forest-700 mb-4 transition-colors"><ArrowLeft className="w-4 h-4" /> All Categories</Link>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">{cat.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{cat.description} ({categoryPlants.length} plants)</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-6">
        {categoryPlants.length === 0 ? <div className="text-center py-20 text-gray-500">No plants in this category yet.</div> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryPlants.map(plant => (
              <Link key={plant.id} href={`/plants/${plant.id}`} className="group bg-white dark:bg-dark-100 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={plant.images[0]}
                    alt={plant.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {plant.discount > 0 && <Badge variant="secondary" className="absolute top-3 left-3">-{plant.discount}%</Badge>}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-forest-700 transition-colors">{plant.name}</h3>
                  <p className="text-xs text-gray-400 italic">{plant.scientificName}</p>
                  <div className="flex items-center gap-1 mt-2">{[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(plant.rating) ? "fill-gold-500 text-gold-500" : "text-gray-300"}`} />)}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-forest-700 dark:text-forest-400">₹{getDiscountedPrice(plant.price, plant.discount).toLocaleString("en-IN")}</span>
                    {plant.discount > 0 && <span className="text-xs text-gray-400 line-through">₹{plant.price.toLocaleString("en-IN")}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer /><WhatsAppButton /><CallButton /><ScrollToTop />
    </main>
  );
}
