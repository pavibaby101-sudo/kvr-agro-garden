"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf, Shield, Heart, Star, Award, TreePine } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/shared/SectionHeading";

const stats = [
  { icon: TreePine, value: "10,000+", label: "Plants Delivered" },
  { icon: Star, value: "500+", label: "Happy Customers" },
  { icon: Award, value: "8+", label: "Years Experience" },
  { icon: Leaf, value: "200+", label: "Plant Varieties" },
];

const reasons = [
  { icon: Shield, title: "Healthy Plants", description: "Every plant is carefully nurtured and inspected before delivery" },
  { icon: Star, title: "Premium Quality", description: "We maintain the highest standards in plant care and selection" },
  { icon: Heart, title: "Expert Advice", description: "Our team provides personalized guidance for your garden" },
  { icon: Leaf, title: "Organic Solutions", description: "Eco-friendly and sustainable gardening practices" },
];

export default function AboutSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-100 dark:bg-forest-900/30 rounded-full blur-[128px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About KVR Agro Gardens"
          subtitle="Your trusted partner in creating beautiful, sustainable gardens since 2016"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <AnimatedSection>
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/about-nursery.jpg"
                    alt="KVR Agro Gardens nursery"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-gold-600 shadow-xl flex items-center justify-center z-20">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">8+</div>
                  <div className="text-xs opacity-80">Years</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white">
                We Bring Nature to Your Doorstep
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Located in the heart of Nemmara, Palakkad, KVR Agro Gardens has been transforming spaces
                into lush green paradises. We specialize in a wide variety of plants, from exotic indoor
                species to robust outdoor varieties.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our mission is to make gardening accessible and enjoyable for everyone. Whether you are
                a seasoned gardener or just starting out, our expert team provides personalized guidance
                and support every step of the way.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {reasons.map((reason, i) => (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-forest-100 dark:bg-forest-900/50 flex items-center justify-center shrink-0">
                      <reason.icon className="w-5 h-5 text-forest-700 dark:text-forest-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{reason.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{reason.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-forest-100 dark:bg-forest-900/50 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-forest-700 dark:text-forest-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

