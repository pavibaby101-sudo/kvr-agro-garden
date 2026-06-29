"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber = "917909173649";

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[5.5rem] right-6 z-40 h-12 w-12 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 flex items-center justify-center hover:bg-green-600 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ boxShadow: ["0 0 0 0 rgba(34,197,94,0.4)", "0 0 0 20px rgba(34,197,94,0)", "0 0 0 0 rgba(34,197,94,0)"] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <MessageCircle className="h-6 w-6" />
    </motion.a>
  );
}
