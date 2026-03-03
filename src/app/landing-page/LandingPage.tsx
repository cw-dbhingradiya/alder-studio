import { ReactLenis } from "lenis/react";
import Navbar from "./sections/Navbar";
import HeroSection from "./sections/HeroSection";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Profile from "./sections/Profile";
import Experience from "./sections/Experience";
import TestimonialsSection from "./sections/Testimonials";
import Awards from "./sections/Awards";
import Pricing from "./sections/Pricing";
import Blog from "./sections/Blog";
import { Footer } from "@/components/ui/Footer";
import Faq from "./sections/Faq";

/**
 * Alder® — Furniture Design Studio landing page.
 * Uses Lenis root mode for smooth scrolling on the document so
 * IntersectionObserver-based Motion animations fire correctly.
 */
export default function LandingPage() {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.075, duration: 1.4, smoothWheel: true }}
    >
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Navbar />
        <HeroSection />
        <About />
        <Projects />
        <Services />
        <Profile />
        <Experience />
        <TestimonialsSection />
        <Awards />
        <Pricing />
        <Blog />
        <Faq />
        <Footer />
      </div>
    </ReactLenis>
  );
}
