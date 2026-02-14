"use client";

import { useEffect, useState } from "react";
import SequenceScroll from "@/components/SequenceScroll";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
// PERBAIKAN DI SINI: Kita import satu per satu komponennya
import { AboutSection, BentoGrid, Stats, Testimonials, CTA, Footer } from "@/components/LandingSections";
import Lenis from "lenis";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Setup Lenis untuk Smooth Scroll
  useEffect(() => {
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
      {/* 1. Preloader dikontrol oleh state isLoading */}
      <Preloader isLoading={isLoading} />

      <Navbar />

      {/* 2. SequenceScroll memberi sinyal 'onLoadComplete' saat gambar siap */}
      <SequenceScroll onLoadComplete={() => {
        console.log("Semua gambar sequence siap!");
        setIsLoading(false); // Hilangkan preloader hanya jika gambar sudah siap
      }} />

      {/* 3. Konten Website (Sudah saya buka komentarnya) */}
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