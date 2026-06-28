import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CallButton from "@/components/shared/CallButton";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { getCategories } from "@/data/categories";
import { getFeaturedPlants } from "@/data/plants";

export default function Home() {
  const categories = getCategories();
  const featuredPlants = getFeaturedPlants();

  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CategoriesSection categories={categories} />
      <ProductsSection plants={featuredPlants} />
      <ServicesSection />
      <TestimonialsSection />
      <WhyChooseUs />
      <FAQSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
      <CallButton />
      <ScrollToTop />
    </main>
  );
}
