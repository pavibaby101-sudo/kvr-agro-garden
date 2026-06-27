"use client";
import { motion } from "framer-motion";
import { Trees, Ruler, ClipboardCheck, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { landscapingFormSchema, type LandscapingFormData } from "@/lib/validations";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallButton from "@/components/shared/CallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const steps = [
  { icon: ClipboardCheck, title: "Consultation", description: "We discuss your vision and assess your space" },
  { icon: Ruler, title: "Design", description: "Our team creates a customized landscape design" },
  { icon: Trees, title: "Installation", description: "Professional installation by our expert team" },
  { icon: CheckCircle2, title: "Maintenance", description: "Ongoing care to keep your garden beautiful" },
];

export default function LandscapingPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LandscapingFormData>({ resolver: zodResolver(landscapingFormSchema) });
  const onSubmit = (data: LandscapingFormData) => { console.log(data); alert("Thank you! We will contact you shortly."); };

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-12 bg-gradient-to-b from-forest-50 to-white dark:from-dark dark:to-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">Landscaping Services</h1>
          <p className="text-gray-600 dark:text-gray-400">Transform your outdoor space into a beautiful paradise</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-6">
        <SectionHeading title="Our Process" subtitle="How we bring your dream garden to life" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, i) => (
            <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-forest-100 to-forest-200 dark:from-forest-900 dark:to-forest-800 flex items-center justify-center mx-auto mb-4"><step.icon className="w-8 h-8 text-forest-700 dark:text-forest-400" /></div>
              <div className="text-2xl font-bold text-forest-700 dark:text-forest-400 mb-2">0{i + 1}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <SectionHeading title="Request a Quote" subtitle="Tell us about your project and we'll get back to you" />
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-8 rounded-3xl bg-white dark:bg-dark-100 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label><Input {...register("name")} placeholder="Your name" />{errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label><Input {...register("email")} type="email" placeholder="Your email" />{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label><Input {...register("phone")} placeholder="Your phone" />{errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Property Type</label>
                <select {...register("propertyType")} className="h-12 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500">
                  <option value="">Select type</option><option value="residential">Residential</option><option value="commercial">Commercial</option><option value="industrial">Industrial</option><option value="institutional">Institutional</option>
                </select>
                {errors.propertyType && <p className="text-xs text-red-500 mt-1">{errors.propertyType.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Area (sq.ft)</label><Input {...register("area")} placeholder="Approximate area" />{errors.area && <p className="text-xs text-red-500 mt-1">{errors.area.message}</p>}</div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget</label>
                <select {...register("budget")} className="h-12 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500">
                  <option value="">Select budget</option><option value="under-25000">Under ₹25,000</option><option value="25000-50000">₹25,000 - ₹50,000</option><option value="50000-100000">₹50,000 - ₹1,00,000</option><option value="100000-200000">₹1,00,000 - ₹2,00,000</option><option value="above-200000">Above ₹2,00,000</option>
                </select>
                {errors.budget && <p className="text-xs text-red-500 mt-1">{errors.budget.message}</p>}
              </div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Description</label>
              <textarea {...register("description")} rows={4} placeholder="Describe your landscaping project..." className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500" />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full">Submit Request</Button>
          </motion.form>
        </div>
      </div>
      <Footer /><WhatsAppButton /><CallButton /><ScrollToTop />
    </main>
  );
}
