"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
    isLoading: boolean;
}

export default function Preloader({ isLoading }: PreloaderProps) {
    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black text-white"
                >
                    <div className="flex flex-col items-center gap-4">
                        {/* Awwwards style loader could go here */}
                        <div className="h-px w-32 bg-white/20 overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                className="h-full w-full bg-white"
                            />
                        </div>
                        <p className="text-sm uppercase tracking-widest font-light">Loading Experience</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
