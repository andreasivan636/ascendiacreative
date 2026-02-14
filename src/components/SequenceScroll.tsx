"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

// Sesuaikan angka ini dengan jumlah file gambar di folder public/sequence kamu
const FRAME_COUNT = 100;

interface SequenceScrollProps {
    onLoadComplete?: () => void;
}

export default function SequenceScroll({ onLoadComplete }: SequenceScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const loadImages = async () => {
            const promises = [];
            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new Image();
                // Pastikan nama file sesuai: ezgif-frame-001.jpg, dst.
                const src = `/sequence/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
                img.src = src;
                promises.push(
                    new Promise<HTMLImageElement>((resolve) => {
                        img.onload = () => resolve(img);
                        img.onerror = () => resolve(img);
                    })
                );
            }
            const loadedImages = await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
            if (onLoadComplete) onLoadComplete();
        };
        loadImages();
    }, [onLoadComplete]);

    const renderFrame = useCallback(
        (index: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            const img = images[index];

            if (!ctx || !canvas || !img) return;

            // Logika agar gambar selalu full screen (Cover) tapi tidak gepeng
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgWidth = img.width;
            const imgHeight = img.height;

            const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
            const x = (canvasWidth - imgWidth * scale) / 2;
            const y = (canvasHeight - imgHeight * scale) / 2;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
        },
        [images]
    );

    const resizeCanvas = useCallback(() => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
    }, []);

    useEffect(() => {
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [resizeCanvas]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded) return;
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(latest * (FRAME_COUNT - 1))
        );
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    // Render frame pertama saat selesai loading
    useEffect(() => {
        if (isLoaded && images.length > 0) {
            resizeCanvas();
            renderFrame(0);
        }
    }, [isLoaded, images, resizeCanvas, renderFrame]);

    return (
        <div ref={containerRef} className="relative h-[300vh] w-full bg-white">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full object-cover" />
                {/* Tidak ada lagi elemen overlay di sini. Bersih! */}
            </div>
        </div>
    );
}