"use client";

import { useEffect, useState } from "react";
import SequenceScroll from "@/components/SequenceScroll";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import { AboutSection, BentoGrid, Stats, Testimonials, CTA, Footer } from "@/components/LandingSections";
import Lenis from "lenis";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. PAKSA SCROLL KE ATAS SETIAP REFRESH (Solusi Masalahmu)
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 2. Setup Lenis (Smooth Scroll)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    }
  }, []);

  return (
    <main className="relative bg-black text-white min-h-screen">
      <Preloader isLoading={isLoading} />

      <Navbar />

      <SequenceScroll onLoadComplete={() => {
        // Delay sedikit biar transisinya enak
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }} />

      <div className="relative z-20 -mt-[100vh] bg-black rounded-t-[3rem] overflow-hidden shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        <AboutSection />
        <BentoGrid />
        <Stats />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}