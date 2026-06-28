"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { siteConfig } from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallButton from "@/components/shared/CallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const contactInfo = [
  { icon: MapPin, label: "Address", value: siteConfig.address },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
  { icon: MessageCircle, label: "WhatsApp", value: siteConfig.phone, href: `https://wa.me/917909173649` },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Clock, label: "Working Hours", value: "Mon-Sat: 9:00 AM - 7:00 PM, Sun: Closed" },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({ resolver: zodResolver(contactFormSchema) });
  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-12 bg-gradient-to-b from-forest-50 to-white dark:from-dark dark:to-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-400">We&apos;d love to hear from you. Get in touch with us!</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h2>
              <div className="space-y-6">
                {contactInfo.map(info => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-forest-100 dark:bg-forest-900/50 flex items-center justify-center shrink-0"><info.icon className="w-6 h-6 text-forest-700 dark:text-forest-400" /></div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{info.label}</p>
                      {info.href ? <a href={info.href} className="font-medium text-gray-900 dark:text-white hover:text-forest-700 dark:hover:text-forest-400 transition-colors">{info.value}</a>
                        : <p className="font-medium text-gray-900 dark:text-white">{info.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a href="https://wa.me/917909173649" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
                </Button>
              </a>
              <a href="tel:+917909173649">
                <Button size="lg" variant="outline" className="w-full">
                  <Phone className="mr-2 h-5 w-5" /> Call Us Now
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-3xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Send a Message</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label><Input {...register("name")} placeholder="Your name" />{errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label><Input {...register("email")} type="email" placeholder="Your email" />{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label><Input {...register("phone")} placeholder="Your phone" />{errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}</div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label><Input {...register("subject")} placeholder="Subject" />{errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}</div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea {...register("message")} rows={5} placeholder="Your message..." className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500" />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
              </div>
              <Button type="submit" size="lg" className="w-full group" disabled={loading}>
                {loading ? "Sending..." : <><Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /> Send Message</>}
              </Button>
              {submitted && (
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm text-center">
                  Thank you! Your message has been sent. We will get back to you shortly.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
      <Footer /><WhatsAppButton /><CallButton /><ScrollToTop />
    </main>
  );
}
