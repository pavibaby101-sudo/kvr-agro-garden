"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search } from "lucide-react";
import { navLinks } from "@/lib/constants";
import ThemeToggle from "@/components/shared/ThemeToggle";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-dark/90 backdrop-blur-xl shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-forest-700/30"
              >
                <img src="/images/logo.png" alt="KVR Agro Gardens" className="w-full h-full object-contain" />
              </motion.div>
              <div className="hidden sm:block">
                <span className="text-lg font-heading font-bold text-gray-900 dark:text-white">
                  KVR
                </span>
                <span className="text-lg font-heading font-light text-forest-700 dark:text-forest-400">
                  {" "}Agro Gardens
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-forest-700 dark:text-forest-300"
                        : "text-gray-600 dark:text-gray-300 hover:text-forest-700 dark:hover:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-900/30"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-forest-700 dark:bg-forest-400 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="h-9 w-9 rounded-full bg-gray-100 dark:bg-dark-100 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-forest-700 dark:hover:text-forest-300 transition-colors"
              >
                <Search className="h-4 w-4" />
              </motion.button>
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden h-9 w-9 rounded-full bg-gray-100 dark:bg-dark-100 flex items-center justify-center text-gray-600 dark:text-gray-300"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </div>
        </nav>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100 dark:border-gray-800"
            >
              <div className="max-w-3xl mx-auto px-4 py-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search plants, categories, services..."
                    className="w-full h-12 pl-12 pr-4 rounded-2xl bg-gray-100 dark:bg-dark-100 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery.trim()) {
                        router.push(`/plants?search=${encodeURIComponent(searchQuery.trim())}`);
                        setSearchOpen(false);
                        setSearchQuery("");
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Nav */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
