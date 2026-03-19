"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const pillars = [
    {
        icon: "🎯",
        title: "Precision",
        desc: "Every campaign, message, and creative asset is crafted with surgical intent — no guesswork, only data.",
    },
    {
        icon: "⚡",
        title: "Speed",
        desc: "We move at the speed of culture. Trend-responsive, agile, and always ahead of the feed.",
    },
    {
        icon: "🔗",
        title: "Authenticity",
        desc: "Real creators, real audiences, real results. We build trust between brands and communities.",
    },
];

export default function MissionSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const revealEls = sectionRef.current?.querySelectorAll(".reveal-up, .reveal-left");
        revealEls?.forEach((el, i) => {
            gsap.fromTo(
                el,
                {
                    opacity: 0,
                    y: el.classList.contains("reveal-up") ? 80 : 0,
                    x: el.classList.contains("reveal-left") ? -60 : 0,
                },
                {
                    opacity: 1, y: 0, x: 0,
                    duration: 1.4,
                    ease: "power4.out",
                    delay: i * 0.07,
                    scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
                }
            );
        });

        // Pillar cards stagger
        gsap.fromTo(
            sectionRef.current?.querySelectorAll(".pillar-card") ?? [],
            { opacity: 0, y: 60, scale: 0.97 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 1.1,
                stagger: 0.15,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current?.querySelector(".pillars-grid"),
                    start: "top 88%",
                },
            }
        );

        // Glowing line draw
        gsap.fromTo(
            sectionRef.current?.querySelector(".mission-line") ?? {},
            { scaleX: 0, transformOrigin: "left center" },
            {
                scaleX: 1,
                duration: 1.8,
                ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="mission" id="mission">
            {/* Background accent */}
            <div className="mission-bg-accent" />

            <div className="mission-inner">
                {/* Header */}
                <div className="mission-header">
                    <div className="section-tag reveal-up">Our Mission</div>
                    <h2 className="section-title reveal-up" style={{ maxWidth: "700px" }}>
                        Built To Make<br />
                        <span style={{ color: "var(--color-accent)" }}>Brands Impossible</span><br />
                        To Ignore
                    </h2>
                    <div className="mission-line" />
                    <p className="section-desc reveal-up" style={{ maxWidth: "560px", marginTop: "2rem" }}>
                        Vertex Media exists to close the gap between ambitious brands and their audiences.
                        We combine cultural intelligence, creator relationships, and performance marketing
                        to build equity that compounds over time.
                    </p>
                </div>

                {/* Big quote */}
                <div className="mission-quote reveal-up">
                    <div className="mission-quote-mark">"</div>
                    <blockquote>
                        We don&apos;t just run campaigns.<br />
                        We build movements.
                    </blockquote>
                    <div className="mission-quote-attr">— The Vertex Way</div>
                </div>

                {/* Pillars */}
                <div className="pillars-grid">
                    {pillars.map((p, i) => (
                        <div key={i} className="pillar-card">
                            <div className="pillar-icon">{p.icon}</div>
                            <div className="pillar-title">{p.title}</div>
                            <p className="pillar-desc">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
