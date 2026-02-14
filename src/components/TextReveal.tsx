"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function TextReveal({ text }: { text: string }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"],
    });

    const words = text.split(" ");

    return (
        <p ref={container} className="flex flex-wrap text-4xl md:text-6xl font-bold leading-tight text-white/20">
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </Word>
                );
            })}
        </p>
    );
}

const Word = ({ children, progress, range }: any) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className="relative mr-3 mt-2">
            <span className="absolute opacity-100 text-white">{children}</span>
            <motion.span style={{ opacity: opacity }} className="text-white">
                {children}
            </motion.span>
        </span>
    );
};
