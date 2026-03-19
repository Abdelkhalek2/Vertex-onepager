"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<{ value: number }>({ value: 0 });

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Cinematic Exit: Scaling and Fade out with blur
                gsap.to(loaderRef.current, {
                    scale: 1.1,
                    opacity: 0,
                    filter: "blur(20px)",
                    duration: 1.2,
                    ease: "power4.inOut",
                    onComplete: () => {
                        if (loaderRef.current) loaderRef.current.style.display = "none";
                        onComplete();
                    },
                });
            },
        });

        // Counter Animation
        tl.to(progressRef.current, {
            value: 100,
            duration: 2.5,
            ease: "power2.inOut",
            onUpdate: () => {
                setCounter(Math.round(progressRef.current.value));
            },
        });

        // Entrance for the brand & counter
        tl.fromTo(
            [logoRef.current, counterRef.current],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
            0.5
        );

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div ref={loaderRef} className="loader" style={{ background: "#070b19" }}>
            <div className="flex flex-col items-center">
                <div ref={logoRef} className="mb-8" style={{ opacity: 0 }}>
                    <img
                        src="/logo-white.svg"
                        alt="Vertex Media"
                        style={{ width: 'clamp(200px, 25vw, 260px)', height: 'auto', display: 'block' }}
                        className="object-contain"
                    />
                </div>




                <div ref={counterRef} className="loader-counter" style={{ opacity: 0 }}>
                    {counter}%
                </div>

                <div className="loader-bar-wrap-v2 mt-8">
                    <div
                        className="loader-bar-v2"
                        style={{ width: `${counter}%` }}
                    />
                </div>
            </div>
        </div>

    );
}
