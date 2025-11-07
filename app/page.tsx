import Header from "@/components/header";
import HeroSlider from "@/components/hero-slider";
import BrandsSection from "@/components/brands-section";
import BirkinShowcase from "@/components/birkin-showcase";
import KellyShowcase from "@/components/kelly-showcase";
import CategoriesSection from "@/components/categories-section";
import BestSellers from "@/components/best-sellers";
import AboutSection from "@/components/about-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSlider />
      <BrandsSection />
      <BirkinShowcase />
      <KellyShowcase />
      <CategoriesSection />
      <BestSellers />
      <AboutSection />
      <Footer />
    </div>
  );
}
