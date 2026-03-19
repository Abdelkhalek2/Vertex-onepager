"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            lerp: 0.05,
            duration: 1.4,
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            ScrollTrigger.update();
            requestAnimationFrame(raf);
        }

        const id = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(id);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
