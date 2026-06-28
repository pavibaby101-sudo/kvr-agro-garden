import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Heart, ShoppingBag, Share2, Check, X, Droplets, Sun, Ruler, Swords, Leaf } from "lucide-react";
import { getPlantById, getPlantsByCategory } from "@/data/plants";
import { getDiscountedPrice } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallButton from "@/components/shared/CallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props { params: Promise<{ id: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const plant = getPlantById(id);
  if (!plant) return { title: "Plant Not Found" };
  return { title: plant.name, description: plant.description };
}

export default async function PlantDetailPage({ params }: Props) {
  const { id } = await params;
  const plant = getPlantById(id);
  if (!plant) notFound();

  const finalPrice = getDiscountedPrice(plant.price, plant.discount);
  const related = getPlantsByCategory(plant.category).filter(p => p.id !== plant.id).slice(0, 4);

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/plants" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-forest-700 dark:hover:text-forest-400 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Plants
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl relative overflow-hidden bg-gradient-to-br from-forest-50 to-forest-100 dark:from-forest-900/50 dark:to-forest-800/50">
                <Image
                  src={plant.images[0]}
                  alt={plant.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {plant.discount > 0 && <Badge variant="secondary" className="absolute top-4 left-4 text-sm px-3 py-1">-{plant.discount}% OFF</Badge>}
              </div>
            </div>

            <div>
              <div className="text-sm text-forest-700 dark:text-forest-400 font-medium mb-2 capitalize">{plant.category}</div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">{plant.name}</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 italic mb-4">{plant.scientificName}</p>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.floor(plant.rating) ? "fill-gold-500 text-gold-500" : "text-gray-300 dark:text-gray-600"}`} />)}</div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{plant.rating} ({plant.reviews} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-forest-700 dark:text-forest-400">₹{finalPrice.toLocaleString("en-IN")}</span>
                {plant.discount > 0 && <><span className="text-xl text-gray-400 line-through">₹{plant.price.toLocaleString("en-IN")}</span><Badge variant="secondary">Save ₹{(plant.price - finalPrice).toLocaleString("en-IN")}</Badge></>}
              </div>

              <div className="flex items-center gap-2 mb-6">
                {plant.available ? <><Check className="w-5 h-5 text-green-500" /><span className="text-sm text-green-600 dark:text-green-400 font-medium">In Stock</span></>
                  : <><X className="w-5 h-5 text-red-500" /><span className="text-sm text-red-600 dark:text-red-400 font-medium">Currently Out of Stock</span></>}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[{ icon: Ruler, label: "Height", value: plant.height }, { icon: Droplets, label: "Water", value: plant.waterNeeds }, { icon: Sun, label: "Sunlight", value: plant.sunlight }, { icon: Swords, label: "Care Level", value: plant.careLevel }, { icon: Leaf, label: "Pot Size", value: plant.potSize }].map((spec) => (
                  <div key={spec.label} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-100">
                    <spec.icon className="w-5 h-5 text-forest-600 dark:text-forest-400 mt-0.5" />
                    <div><div className="text-xs text-gray-500 dark:text-gray-400">{spec.label}</div><div className="text-sm font-medium text-gray-900 dark:text-white">{spec.value}</div></div>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{plant.description}</p>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" variant="default"><ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart</Button>
                <Button size="lg" variant="outline"><Heart className="mr-2 h-4 w-4" /> Wishlist</Button>
                <Button size="lg" variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
                <a href={`https://wa.me/917909173649?text=I'm interested in ${plant.name}`} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">Order via WhatsApp</Button>
                </a>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Related Plants</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map(rp => (
                  <Link key={rp.id} href={`/plants/${rp.id}`} className="group p-4 rounded-2xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all">
                    <div className="aspect-square rounded-xl relative overflow-hidden mb-3">
                      <Image
                        src={rp.images[0]}
                        alt={rp.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-forest-700 transition-colors">{rp.name}</h3>
                    <p className="text-sm font-bold text-forest-700 dark:text-forest-400 mt-1">₹{getDiscountedPrice(rp.price, rp.discount).toLocaleString("en-IN")}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer /><WhatsAppButton /><CallButton /><ScrollToTop />
    </main>
  );
}
