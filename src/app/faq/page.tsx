"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallButton from "@/components/shared/CallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";

const categories = [...new Set(faqItems.map(f => f.category))];

export default function FAQPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-12 bg-gradient-to-b from-forest-50 to-white dark:from-dark dark:to-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">FAQ</h1>
          <p className="text-gray-600 dark:text-gray-400">Frequently asked questions about our plants and services</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-6">
        {categories.map(cat => (
          <div key={cat} className="mb-8">
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{cat}</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.filter(f => f.category === cat).map(faq => (
                <AccordionItem key={faq.id} value={faq.id} className="bg-white dark:bg-dark-100 rounded-2xl px-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <AccordionTrigger className="text-left text-sm font-medium text-gray-900 dark:text-white hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
      <Footer /><WhatsAppButton /><CallButton /><ScrollToTop />
    </main>
  );
}
