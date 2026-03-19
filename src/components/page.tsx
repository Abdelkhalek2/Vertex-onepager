"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import MarqueeSection from "@/components/MarqueeSection";
import ServicesSection from "@/components/ServicesSection";
import MissionSection from "@/components/MissionSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CareersSection from "@/components/CareersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Load heavy client-only components dynamically
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });
const SmoothScrollProvider = dynamic(() => import("@/components/SmoothScrollProvider"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);

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
          <MissionSection />
          <PortfolioSection />
          <TestimonialsSection />
          <CareersSection />
          <ContactSection />
        </main>

        <Footer />
        <WhatsAppFloat />
      </SmoothScrollProvider>
    </>
  );
}
