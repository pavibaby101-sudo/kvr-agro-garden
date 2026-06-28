"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Egg, Bird, Shield, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hatcheryFormSchema, type HatcheryFormData } from "@/lib/validations";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallButton from "@/components/shared/CallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";
import SectionHeading from "@/components/shared/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const services = [
  { icon: Egg, title: "Egg Hatching Service", description: "Professional egg incubation and hatching services using modern equipment with high success rates." },
  { icon: Bird, title: "Poultry Supply", description: "Healthy, vaccinated chicks and poultry birds for farming and backyard rearing." },
  { icon: Shield, title: "Health Check & Vaccination", description: "Regular health checkups and vaccination programs for your poultry." },
  { icon: Star, title: "Expert Consultation", description: "Professional advice on poultry farming, housing, feeding, and disease management." },
];

const faqs = [
  { q: "What types of eggs do you hatch?", a: "We hatch chicken, duck, quail, and turkey eggs. Custom orders can be arranged for other species." },
  { q: "What is the hatching success rate?", a: "Our success rate is above 85% thanks to modern incubators and experienced staff." },
  { q: "How long does hatching take?", a: "Chicken eggs take 21 days, duck eggs 28 days, quail eggs 17 days, and turkey eggs 28 days." },
  { q: "Do you provide vaccinated chicks?", a: "Yes, all our chicks are vaccinated according to the recommended schedule." },
  { q: "What is the minimum order quantity?", a: "Minimum order is 10 eggs or 5 chicks. Bulk orders receive special pricing." },
];

export default function HatcheryPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<HatcheryFormData>({ resolver: zodResolver(hatcheryFormSchema) });
  const onSubmit = async (data: HatcheryFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/hatchery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      } else {
        alert("Failed to submit request. Please try again.");
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
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">Hatchery Services</h1>
          <p className="text-gray-600 dark:text-gray-400">Professional egg hatching and poultry services in Nemmara, Palakkad</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((svc, i) => (
            <motion.div key={svc.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-forest-100 dark:bg-forest-900/50 flex items-center justify-center mb-4"><svc.icon className="w-7 h-7 text-forest-700 dark:text-forest-400" /></div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{svc.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{svc.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          <SectionHeading title="Hatchery FAQ" subtitle="Common questions about our hatchery services" />
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white dark:bg-dark-100 rounded-2xl px-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                <AccordionTrigger className="text-left text-sm font-medium text-gray-900 dark:text-white">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="max-w-2xl mx-auto">
          <SectionHeading title="Request Hatchery Service" subtitle="Fill out the form and we'll get back to you" />
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-8 rounded-3xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label><Input {...register("name")} placeholder="Your name" />{errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label><Input {...register("email")} type="email" placeholder="Your email" />{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label><Input {...register("phone")} placeholder="Your phone" />{errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service</label>
                <select {...register("service")} className="h-12 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500">
                  <option value="">Select service</option><option value="egg-hatching">Egg Hatching</option><option value="chicks">Chicks Supply</option><option value="poultry">Poultry Birds</option><option value="consultation">Consultation</option>
                </select>
                {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>}
              </div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label><Input {...register("quantity", { valueAsNumber: true })} type="number" placeholder="Number of eggs/birds" />{errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity.message}</p>}</div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea {...register("description")} rows={4} placeholder="Describe your requirements..." className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500" />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
            {submitted && (
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm text-center">
                Thank you! We will contact you about your hatchery request.
              </div>
            )}
          </motion.form>
        </div>
      </div>
      <Footer /><WhatsAppButton /><CallButton /><ScrollToTop />
    </main>
  );
}
