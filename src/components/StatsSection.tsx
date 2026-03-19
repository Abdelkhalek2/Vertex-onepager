"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
    { number: 150, suffix: "+", label: "Projects Delivered" },
    { number: 50, suffix: "+", label: "Happy Clients" },
    { number: 8, suffix: "", label: "Years Experience" },
    { number: 12, suffix: "", label: "Creative Experts" },
];

export default function StatsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        // Fade-in cards stagger
        gsap.fromTo(
            sectionRef.current.querySelectorAll(".stat-item"),
            { opacity: 0, y: 80 },
            {
                opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: "power4.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
            }
        );

        // Animated counters
        const valueEls = sectionRef.current.querySelectorAll<HTMLSpanElement>(".stat-number-value");
        valueEls.forEach((el, i) => {
            const obj = { val: 0 };
            gsap.to(obj, {
                val: stats[i].number,
                duration: 1.6,
                ease: "power2.out",
                onUpdate() { el.textContent = Math.round(obj.val).toString(); },
                scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
            });
        });
    }, []);

    return (
        <div ref={sectionRef} className="stats-bar px-5 md:px-10 lg:px-[6vw]">

            {stats.map((stat, i) => (
                <div key={i} className="stat-item" style={{ opacity: 0 }}>
                    <div className="stat-number">
                        <span className="stat-number-value">0</span>
                        <span className="plus">{stat.suffix}</span>
                    </div>
                    <div className="stat-label">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}
