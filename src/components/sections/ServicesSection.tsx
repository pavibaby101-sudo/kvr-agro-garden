"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Trees, Sprout, Leaf, Wallpaper, Sun, UtensilsCrossed, Flower2, Calendar, Building2, ClipboardList, Stethoscope, Truck, Package, Sofa } from "lucide-react";
import { services } from "@/data/services";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trees, Sprout, Leaf, Wallpaper, Sun, UtensilsCrossed, Flower2,
  Calendar, Building2, ClipboardList, Stethoscope, Truck, Package, Sofa,
};

export default function ServicesSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-dark-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive gardening and landscaping services for every need"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 9).map((service, i) => {
            const Icon = iconMap[service.icon] || Leaf;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="group p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-forest-100 dark:bg-forest-900/50 flex items-center justify-center mb-4 group-hover:bg-forest-700 dark:group-hover:bg-forest-600 transition-colors duration-500">
                  <Icon className="w-7 h-7 text-forest-700 dark:text-forest-400 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <ul className="space-y-1.5 mb-4">
                  {service.features.slice(0, 4).map((f) => (
                    <li key={f} className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-forest-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services#${service.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-forest-700 dark:text-forest-400 group-hover:gap-2 transition-all"
                >
                  Learn More <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/services">
            <Button variant="outline" size="lg">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
