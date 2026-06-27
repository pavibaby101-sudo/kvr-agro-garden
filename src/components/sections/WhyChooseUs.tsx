"use client";
import { motion } from "framer-motion";
import { Shield, Leaf, Star, Heart, TreePine, Truck, Award, Sparkles } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const features = [
  { icon: Shield, title: "Healthy Plants", description: "Every plant is nurtured with care and inspected for quality" },
  { icon: Star, title: "Affordable Prices", description: "Premium plants at prices that won't break the bank" },
  { icon: Heart, title: "Expert Guidance", description: "Personalized advice from experienced horticulturists" },
  { icon: TreePine, title: "Large Collection", description: "200+ varieties of plants to choose from" },
  { icon: Leaf, title: "Organic Solutions", description: "Eco-friendly and sustainable gardening practices" },
  { icon: Truck, title: "Home Delivery", description: "Safe and timely delivery across Kerala" },
  { icon: Award, title: "Quality Guarantee", description: "7-day replacement guarantee on all plants" },
  { icon: Sparkles, title: "Customer First", description: "Your satisfaction is our top priority" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Choose KVR Agro Gardens?"
          subtitle="We are committed to providing the best plants and services to our customers"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-forest-100 to-forest-200 dark:from-forest-900 dark:to-forest-800 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-forest-700 dark:text-forest-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
