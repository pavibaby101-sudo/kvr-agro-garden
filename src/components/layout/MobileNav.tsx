"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { navLinks } from "@/lib/constants";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white dark:bg-dark z-50 shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                  <img src="/images/logo.png" alt="KVR Agro Gardens" className="w-full h-full object-contain" />
                </div>
                <span className="font-heading font-bold text-gray-900 dark:text-white">KVR Agro Gardens</span>
              </div>
              <button
                onClick={onClose}
                className="h-9 w-9 rounded-full bg-gray-100 dark:bg-dark-100 flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 space-y-1">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-forest-50 dark:bg-forest-900/50 text-forest-700 dark:text-forest-300"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-400 text-center">
                KVR Agro Gardens &copy; {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
