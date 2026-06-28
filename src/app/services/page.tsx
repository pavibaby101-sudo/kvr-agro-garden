import { Metadata } from "next";
import Image from "next/image";
import { Trees, Sprout, Leaf, Wallpaper, Sun, UtensilsCrossed, Flower2, Calendar, Building2, ClipboardList, Stethoscope, Truck, Sofa } from "lucide-react";
import { services } from "@/data/services";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallButton from "@/components/shared/CallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Trees, Sprout, Leaf, Wallpaper, Sun, UtensilsCrossed, Flower2, Calendar, Building2, ClipboardList, Stethoscope, Truck, Sofa };

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our comprehensive gardening and landscaping services at KVR Agro Gardens.",
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-12 bg-gradient-to-b from-forest-50 to-white dark:from-dark dark:to-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">Our Services</h1>
          <p className="text-gray-600 dark:text-gray-400">Comprehensive gardening solutions for every space</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => {
            const Icon = iconMap[service.icon] || Leaf;
            return (
              <div key={service.id} id={service.id} className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-forest-100 dark:bg-forest-900/50 flex items-center justify-center mb-4"><Icon className="w-7 h-7 text-forest-700 dark:text-forest-400" /></div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2">{service.features.map(f => <li key={f} className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-forest-500 shrink-0" />{f}</li>)}</ul>
              </div>
            );
          })}
        </div>
      </div>
      <CTASection />
      <Footer /><WhatsAppButton /><CallButton /><ScrollToTop />
    </main>
  );
}
