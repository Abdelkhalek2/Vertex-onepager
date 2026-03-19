"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
    {
        title: "Digital Ecosystem Build",
        category: "Visual Identity · UX/UI",
        bg: "linear-gradient(135deg, #070b19 0%, #00e5ff 100%)",
        emoji: "🎨",
    },
    {
        title: "Campaign Momentum",
        category: "Marketing Strategy",
        bg: "linear-gradient(135deg, #0b1426 0%, #0081a7 100%)",
        emoji: "🎬",
    },
    {
        title: "Growth Accelerator",
        category: "Performance Ads",
        bg: "linear-gradient(135deg, #0f172a 0%, #00e5ff 100%)",
        emoji: "📊",
    },
];

export default function PortfolioSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            sectionRef.current?.querySelector(".portfolio-header") ?? {},
            { opacity: 0, y: 80 },
            {
                opacity: 1, y: 0, duration: 1.5, ease: "power4.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
            }
        );

        gsap.fromTo(
            sectionRef.current?.querySelectorAll(".portfolio-item") ?? [],
            { opacity: 0, y: 100, scale: 0.96 },
            {
                opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.2, ease: "power4.out",
                scrollTrigger: { trigger: sectionRef.current?.querySelector(".portfolio-grid"), start: "top 85%" }
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="portfolio px-5 md:px-10 lg:px-[6vw]" id="portfolio">

            <div className="portfolio-header" style={{ opacity: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
                    <div>
                        <div className="section-tag">Our Work</div>
                        <h2 className="section-title text-4xl md:text-5xl lg:text-inherit" style={{ marginBottom: 0 }}>
                            Featured<br />
                            <span style={{ color: "var(--color-accent)" }}>Projects</span>
                        </h2>

                    </div>
                    <a href="#contact" className="btn-primary" style={{ whiteSpace: "nowrap" }}
                        onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                        View All Work
                    </a>
                </div>
            </div>

            <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 gap-6">

                {projects.map((proj, i) => (
                    <div key={i} className="portfolio-item" style={{ opacity: 0 }}>
                        <div className="portfolio-bg" style={{ background: proj.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "clamp(4rem, 10vw, 8rem)", opacity: 0.25 }}>{proj.emoji}</span>
                        </div>
                        <div className="portfolio-overlay">
                            <div className="portfolio-info">
                                <div className="portfolio-cat">{proj.category}</div>
                                <div className="portfolio-name">{proj.title}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
