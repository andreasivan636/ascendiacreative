"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Phone, Mail } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Fungsi untuk scroll ke section
    const scrollToSection = (id: string) => {
        setIsOpen(false); // Tutup menu dulu
        const element = document.getElementById(id);
        if (element) {
            // Tunggu sebentar biar animasi tutup menu selesai, baru scroll
            setTimeout(() => {
                element.scrollIntoView({ behavior: "smooth" });
            }, 300);
        } else if (id === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const menuItems = [
        { label: "HOME", id: "home" },
        { label: "ABOUT", id: "about" },
        { label: "WORK", id: "work" },
        { label: "CONTACT", id: "contact" },
    ];

    return (
        <>
            {/* Tombol Navbar Tetap (Sticky) */}
            <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
                <h1 className="text-xl font-bold tracking-widest uppercase cursor-pointer" onClick={() => scrollToSection("home")}>
                    ASCENDIA
                </h1>
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 text-sm font-bold tracking-widest hover:opacity-70 transition-opacity"
                >
                    MENU <Menu className="w-6 h-6" />
                </button>
            </nav>

            {/* Overlay Menu Fullscreen */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 bg-black z-[60] flex flex-col justify-between p-6 text-white"
                    >
                        {/* Header Menu */}
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-bold tracking-widest uppercase text-zinc-500">Navigation</h1>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 text-sm font-bold tracking-widest hover:opacity-70 transition-opacity"
                            >
                                CLOSE <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* List Menu Utama */}
                        <div className="flex flex-col items-center justify-center gap-4">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    <button
                                        onClick={() => scrollToSection(item.id)}
                                        className="text-5xl md:text-8xl font-bold tracking-tighter hover:text-cyan-400 transition-colors uppercase"
                                    >
                                        {item.label}
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer Menu Sosmed */}
                        <div className="flex justify-center gap-8 text-sm uppercase tracking-widest text-zinc-500">
                            <a
                                href="https://www.instagram.com/ascendia.creative/"
                                target="_blank"
                                className="hover:text-white transition-colors flex items-center gap-2"
                            >
                                <Instagram className="w-4 h-4" /> Instagram
                            </a>
                            <a
                                href="https://wa.me/6285236415053"
                                target="_blank"
                                className="hover:text-white transition-colors flex items-center gap-2"
                            >
                                <Phone className="w-4 h-4" /> WhatsApp
                            </a>
                            <a
                                href="mailto:creativeascendia@gmail.com"
                                className="hover:text-white transition-colors flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" /> Email
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}