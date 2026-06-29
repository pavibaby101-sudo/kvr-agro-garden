"use client";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function CallButton() {
  return (
    <motion.a
      href="tel:+917909173649"
      className="fixed bottom-[8rem] right-6 z-40 h-11 w-11 rounded-full bg-gold-600 text-white shadow-lg shadow-gold-600/30 flex items-center justify-center hover:bg-gold-700 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Phone className="h-5 w-5" />
    </motion.a>
  );
}
