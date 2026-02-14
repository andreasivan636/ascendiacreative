"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
// Import semua icon di sini (HANYA SEKALI)
import { ArrowRight, Star, Globe, PenTool, Layout, Instagram, Mail, Phone } from "lucide-react";
import TextReveal from "./TextReveal";

/* --- ABOUT SECTION --- */
export function AboutSection() {
    return (
        <section className="min-h-screen bg-black text-white px-6 py-20 flex items-center justify-center">
            <div className="max-w-5xl">
                <TextReveal text="Kami menciptakan pengalaman digital yang melampaui batas biasa. Setiap piksel, setiap interaksi, dirancang untuk membantu bisnis Anda tumbuh dan menginspirasi." />
            </div>
        </section>
    );
}

/* --- BENTO GRID (LAYANAN) --- */
export function BentoGrid() {
    return (
        <section className="min-h-screen bg-zinc-950 text-white px-6 py-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 h-full">

                {/* Card 1: UMKM Landing Page */}
                <div className="md:col-span-2 row-span-2 bg-zinc-900 rounded-3xl p-8 min-h-[400px] flex flex-col justify-between hover:border-cyan-500 border border-transparent transition-all duration-500 group">
                    <div className="w-full h-full bg-zinc-800 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:scale-105 transition-transform duration-700" />
                        <Layout className="w-24 h-24 text-cyan-400 opacity-50 relative z-10" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold mb-2">UMKM Landing Page</h3>
                        <p className="text-zinc-400">Website satu halaman yang ringan, cepat, dan fokus pada konversi penjualan untuk bisnis lokal.</p>
                        <div className="flex gap-2 mt-4">
                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800 text-cyan-300 border border-cyan-900">Fast Loading</span>
                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800 text-cyan-300 border border-cyan-900">SEO Ready</span>
                        </div>
                    </div>
                </div>

                {/* Card 2: Company Profile */}
                <div className="bg-zinc-900 rounded-3xl p-8 min-h-[200px] flex flex-col justify-center items-center text-center hover:border-purple-500 border border-transparent transition-all duration-500">
                    <Globe className="w-12 h-12 mb-4 text-purple-500" />
                    <h3 className="text-xl font-bold mb-2">Company Profile</h3>
                    <p className="text-zinc-400 text-sm">Tingkatkan kredibilitas profesional.</p>
                </div>

                {/* Card 3: Social Media Asset */}
                <div className="bg-zinc-900 rounded-3xl p-8 min-h-[200px] flex flex-col justify-center items-center text-center hover:border-pink-500 border border-transparent transition-all duration-500">
                    <Instagram className="w-12 h-12 mb-4 text-pink-500" />
                    <h3 className="text-xl font-bold mb-2">Social Media</h3>
                    <p className="text-zinc-400 text-sm">Desain konten feeds & story kreatif.</p>
                </div>

                {/* Card 4: Branding Identity (Lebar) */}
                <div className="md:col-span-3 bg-zinc-900 rounded-3xl p-8 min-h-[300px] flex items-center relative overflow-hidden group hover:border-green-500 border border-transparent transition-all duration-500">
                    <div className="z-10 max-w-xl">
                        <h3 className="text-4xl font-bold mb-4">Branding Identity</h3>
                        <p className="text-zinc-400 text-lg">Membangun karakter visual yang kuat agar brand Anda mudah dikenali dan diingat pelanggan.</p>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-green-500/10 to-transparent" />
                    <PenTool className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-48 text-green-500/5 rotate-12" />
                </div>
            </div>
        </section>
    );
}

/* --- STATS --- */
export function Stats() {
    return (
        <section className="py-20 bg-black text-white px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatItem end={10} suffix="+" label="UMKM Mitra" />
                <StatItem end={100} suffix="%" label="Kepuasan Klien" />
                <StatItem end={24} suffix="/7" label="Support Teknis" />
                <StatItem end={2026} suffix="" label="Ready for P2MW" />
            </div>
        </section>
    )
}

function StatItem({ end, suffix, label }: { end: number, suffix: string, label: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, end]);

    return (
        <div ref={ref} className="text-center">
            <h3 className="text-4xl md:text-6xl font-bold mb-2 flex justify-center items-start text-cyan-400">
                {count}<span className="text-2xl mt-2 text-white">{suffix}</span>
            </h3>
            <p className="uppercase tracking-widest text-sm text-zinc-500">{label}</p>
        </div>
    )
}

/* --- TESTIMONIALS --- */
export function Testimonials() {
    const testimonials = [
        "Website Acendia bikin omzet naik drastis!",
        "Desainnya sangat estetik dan profesional.",
        "Pelayanan cepat, sangat membantu UMKM.",
        "Hasilnya melebihi ekspektasi kami."
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <section className="h-[50vh] bg-white text-black flex items-center justify-center px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
            <div className="max-w-4xl text-center z-10">
                <p className="text-sm uppercase tracking-widest mb-10 text-zinc-400">Kata Klien Kami</p>
                <div className="h-40 flex items-center justify-center">
                    <motion.p
                        key={index}
                        initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -50, opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-serif italic"
                    >
                        "{testimonials[index]}"
                    </motion.p>
                </div>
            </div>
        </section>
    );
}

/* --- CTA & FOOTER (UPDATED) --- */
export function CTA() {
    const nomerWA = "6285236415053";
    const pesan = "Halo Acendia, saya tertarik untuk konsultasi project digital.";

    return (
        <section className="min-h-[60vh] bg-zinc-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
            <div className="relative z-20 text-center px-6">
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 mix-blend-overlay">GO DIGITAL</h2>

                <a
                    href={`https://wa.me/${nomerWA}?text=${encodeURIComponent(pesan)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="group relative px-10 py-5 bg-cyan-500 text-black rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <span className="relative z-10 font-bold uppercase tracking-widest flex items-center gap-2">
                            Hubungi Kami <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </a>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="bg-black text-white py-20 px-6 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
                <div>
                    <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 text-cyan-400">Acendia Creative</h3>
                    <p className="text-zinc-500 max-w-xs mb-4">Solusi digital kreatif untuk masa depan bisnis Anda.</p>
                    <a href="mailto:creativeascendia@gmail.com" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                        <Mail className="w-4 h-4" /> creativeascendia@gmail.com
                    </a>
                </div>

                <div className="flex gap-8 text-sm uppercase tracking-widest text-zinc-400">
                    <a
                        href="https://www.instagram.com/ascendia.creative/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                    >
                        <Instagram className="w-4 h-4" /> Instagram
                    </a>

                    <a
                        href="https://wa.me/6285236415053"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                    >
                        <Phone className="w-4 h-4" /> WhatsApp
                    </a>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-zinc-900 text-center text-xs text-zinc-600 uppercase tracking-widest">
                © 2026 Acendia Creative. P2MW Project.
            </div>
        </footer>
    );
}