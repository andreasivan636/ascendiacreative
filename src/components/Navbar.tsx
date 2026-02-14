"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const menuVariants: any = {
        closed: {
            y: "-100%",
            transition: { duration: 0.8, ease: "easeInOut" },
        },
        open: {
            y: "0%",
            transition: { duration: 0.8, ease: "easeInOut" },
        },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const linkVariants: any = {
        closed: { y: "100%", opacity: 0 },
        open: (i: number) => ({
            y: "0%",
            opacity: 1,
            transition: { duration: 0.6, delay: 0.4 + i * 0.1, ease: "easeInOut" }
        })
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "#about" },
        { name: "Work", href: "#work" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-6 py-6 mix-blend-difference text-white">
                <Link href="/" className="text-xl font-bold tracking-tighter uppercase relative z-101">
                    ASCENDIA
                </Link>

                <button
                    onClick={toggleMenu}
                    className="relative z-101 flex items-center gap-2 uppercase text-sm tracking-widest hover:opacity-70 transition-opacity"
                >
                    {isOpen ? "Close" : "Menu"}
                    <div className="relative w-6 h-6 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                    <X size={24} />
                                </motion.div>
                            ) : (
                                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                                    <Menu size={24} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </button>
            </nav>

            <motion.div
                variants={menuVariants}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                className="fixed inset-0 bg-black z-90 flex flex-col justify-center items-center text-white"
            >
                <div className="flex flex-col gap-4 text-center">
                    {navLinks.map((link, i) => (
                        <div key={i} className="overflow-hidden">
                            <motion.div
                                custom={i}
                                variants={linkVariants}
                                initial="closed"
                                animate={isOpen ? "open" : "closed"}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-6xl md:text-8xl font-bold uppercase tracking-tight hover:text-gray-400 transition-colors block"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 uppercase text-sm tracking-widest text-gray-400">
                    <span className="hover:text-white transition-colors cursor-pointer">Instagram</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Twitter</span>
                    <span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span>
                </div>
            </motion.div>
        </>
    );
}
