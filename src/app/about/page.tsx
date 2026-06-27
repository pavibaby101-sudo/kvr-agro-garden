import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/AboutSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallButton from "@/components/shared/CallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about KVR Agro Gardens - your trusted plant nursery in Nemmara, Palakkad, Kerala.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24" />
      <AboutSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
      <CallButton />
      <ScrollToTop />
    </main>
  );
}
