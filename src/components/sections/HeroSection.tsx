"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, ShoppingBag, MessageCircle, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FloatingLeaves from "@/components/shared/FloatingLeaves";
import ScrollIndicator from "@/components/shared/ScrollIndicator";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-dark">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-forest-500/30 blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-600/10 blur-[128px]" />
        </div>
      </div>

      <FloatingLeaves />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs tracking-widest uppercase">
            <Leaf className="w-3 h-3 text-gold-400" />
            Premium Plant Nursery
            <Leaf className="w-3 h-3 text-gold-400" />
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-4 tracking-tight"
        >
          KVR
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
            {" "}Agro{" "}
          </span>
          <br className="sm:hidden" />
          Gardens
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mb-10 font-light tracking-wide"
        >
          Your Complete Gardening Destination
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          <Link href="/plants">
            <Button size="xl" variant="secondary" className="group">
              Visit Nursery
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/plants">
            <Button size="xl" variant="white">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Shop Plants
            </Button>
          </Link>
          <a href="https://wa.me/917909173649" target="_blank" rel="noopener noreferrer">
            <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </a>
          <a href="tel:+917909173649">
            <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </Button>
          </a>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
