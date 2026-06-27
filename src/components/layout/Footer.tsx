"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Camera, Play, MessageCircle, Send } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { categories } from "@/data/categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Plants", href: "/plants" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const circles = [
    { top: 10, left: 5, scale: 1.2 }, { top: 25, left: 80, scale: 1.5 }, { top: 45, left: 30, scale: 0.8 },
    { top: 60, left: 70, scale: 1.8 }, { top: 80, left: 20, scale: 1.0 }, { top: 15, left: 50, scale: 1.6 },
    { top: 35, left: 90, scale: 0.9 }, { top: 55, left: 10, scale: 1.4 }, { top: 70, left: 60, scale: 1.1 },
    { top: 90, left: 85, scale: 1.7 }, { top: 5, left: 35, scale: 0.7 }, { top: 40, left: 75, scale: 1.3 },
    { top: 65, left: 15, scale: 0.6 }, { top: 85, left: 45, scale: 1.9 }, { top: 20, left: 95, scale: 1.5 },
    { top: 50, left: 55, scale: 0.8 }, { top: 75, left: 40, scale: 1.2 }, { top: 30, left: 25, scale: 0.5 },
    { top: 95, left: 65, scale: 1.8 }, { top: 12, left: 78, scale: 1.4 },
  ];

  return (
    <footer className="relative bg-dark text-white overflow-hidden">
      {/* Background Pattern */}
      {mounted && (
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-500 to-transparent" />
          {circles.map((c, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 rounded-full border border-white/5"
              style={{ top: `${c.top}%`, left: `${c.left}%`, transform: `scale(${c.scale})` }}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img src="/images/logo.png" alt="KVR Agro Gardens" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-lg font-heading font-bold text-white">KVR</span>
                <span className="text-lg font-heading font-light text-forest-400"> Agro Gardens</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              {[Globe, Camera, Play, MessageCircle].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-forest-600 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-400 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-forest-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-400 mb-4">Categories</h3>
            <ul className="space-y-3">
              {categories.slice(0, 8).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-forest-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-forest-400 mb-4">Get In Touch</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-forest-400 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-forest-400 shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="text-gray-400 hover:text-white text-sm transition-colors">{siteConfig.phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-forest-400 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="text-gray-400 hover:text-white text-sm transition-colors">{siteConfig.email}</a>
              </div>
            </div>
            <h4 className="text-sm font-medium text-white mb-3">Subscribe to Newsletter</h4>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="h-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
              />
              <Button size="icon" className="h-10 w-10 shrink-0 rounded-full bg-forest-600 hover:bg-forest-500">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
