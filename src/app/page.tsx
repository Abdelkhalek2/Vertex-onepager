"use client";

import { useState, useEffect } from "react";

import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import MarqueeSection from "@/components/MarqueeSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Load heavy client-only components dynamically
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });
const SmoothScrollProvider = dynamic(() => import("@/components/SmoothScrollProvider"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // Suppress GSAP 'not eligible for reset' warnings from the console
  useEffect(() => {
    if (typeof window !== "undefined") {
      const originalWarn = console.warn;
      const originalError = console.error;

      console.warn = (...args) => {
        if (typeof args[0] === 'string' && args[0].includes('not eligible for reset')) return;
        originalWarn.apply(console, args);
      };
      console.error = (...args) => {
        if (typeof args[0] === 'string' && args[0].includes('not eligible for reset')) return;
        originalError.apply(console, args);
      };

      return () => {
        console.warn = originalWarn;
        console.error = originalError;
      };
    }
  }, []);

  return (

    <>
      {/* Loading screen shown on first visit */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      {/* Smooth scroll wraps the page */}
      <SmoothScrollProvider>
        <CustomCursor />
        <Navbar loaded={loaded} />

        <main>
          <HeroSection />


          <StatsSection />
          <AboutSection />
          <MarqueeSection />
          <ServicesSection />
          <PortfolioSection />
          <TestimonialsSection />
          <ContactSection />
        </main>

        <Footer />
        <WhatsAppFloat />
      </SmoothScrollProvider>
    </>
  );
}
