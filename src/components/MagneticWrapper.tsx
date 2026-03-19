"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MagneticWrapperProps {
    children: React.ReactElement;
    strength?: number; // 0 to 1 normally, can be higher
}

export default function MagneticWrapper({ children, strength = 0.5 }: MagneticWrapperProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // The child is what actually moves
        const target = container.children[0] as HTMLElement;
        if (!target) return;

        const xTo = gsap.quickTo(target, "x", {
            duration: 1,
            ease: "power3.out", // Elastic can be too jittery for some designs, power3 is very smooth
        });
        const yTo = gsap.quickTo(target, "y", {
            duration: 1,
            ease: "power3.out",
        });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = container.getBoundingClientRect();

            const centerX = left + width / 2;
            const centerY = top + height / 2;

            // Adjust strength relative to the distance from center
            const moveX = (clientX - centerX) * strength;
            const moveY = (clientY - centerY) * strength;

            xTo(moveX);
            yTo(moveY);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={containerRef} style={{ display: "inline-block" }}>
            {children}
        </div>
    );
}
