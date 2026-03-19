"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const onMouseMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
            // Dot follows exactly
            gsap.set(dot, { x: e.clientX, y: e.clientY });
        };

        const animate = () => {
            // Ring follows with intense lerp/inertia
            const lerpFactor = 0.15;
            ringPos.current.x += (pos.current.x - ringPos.current.x) * lerpFactor;
            ringPos.current.y += (pos.current.y - ringPos.current.y) * lerpFactor;

            gsap.set(ring, { x: ringPos.current.x, y: ringPos.current.y });
            requestAnimationFrame(animate);
        };
        const animId = requestAnimationFrame(animate);

        const onMouseEnter = () => setIsHovering(true);
        const onMouseLeave = () => setIsHovering(false);

        const interactiveElements = document.querySelectorAll("a, button, .service-card, .portfolio-item, .nav-cta");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", onMouseEnter);
            el.addEventListener("mouseleave", onMouseLeave);
        });

        document.addEventListener("mousemove", onMouseMove);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animId);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", onMouseEnter);
                el.removeEventListener("mouseleave", onMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div
                ref={ringRef}
                className={`cursor-ring ${isHovering ? "hovering" : ""}`}
            />
        </>
    );
}
