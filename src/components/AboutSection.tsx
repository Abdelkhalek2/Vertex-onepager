"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const revealEls = sectionRef.current?.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
        revealEls?.forEach((el, i) => {
            gsap.fromTo(
                el,
                {
                    opacity: 0, y: el.classList.contains("reveal-up") ? 100 : 0,
                    x: el.classList.contains("reveal-left") ? -80 : el.classList.contains("reveal-right") ? 80 : 0
                },
                {
                    opacity: 1, y: 0, x: 0, duration: 1.5, ease: "power4.out",
                    delay: i * 0.08,
                    scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
                }
            );
        });
    }, []);

    return (
        <section ref={sectionRef} className="about px-5 md:px-10 lg:px-[6vw] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center" id="about">


            {/* Visual (left) */}
            <div className="about-visual reveal-left">
                <div className="about-img-wrap">
                    <div className="about-img-placeholder" style={{
                        background: "linear-gradient(135deg, rgba(0,229,255,0.15) 0%, rgba(0,129,167,0.1) 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: "100%", height: "100%", minHeight: "500px",
                    }}>
                        {/* Replace with <Image src="..." /> when client provides photos */}
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "6rem" }}>🚀</div>
                            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", marginTop: "1rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                Your Image Here
                            </p>
                        </div>
                    </div>
                    <div className="about-badge">
                        <div className="about-badge-num">8+</div>
                        <div className="about-badge-label">Years of<br />Excellence</div>
                    </div>
                </div>
            </div>

            {/* Content (right) */}
            <div>
                <div className="section-tag reveal-up">About Us</div>
                <h2 className="section-title reveal-up text-4xl md:text-5xl lg:text-inherit">

                    We Are A<br />
                    <span style={{ color: "var(--color-accent)" }}>New Generation</span><br />
                    Creative Agency
                </h2>
                <p className="section-desc reveal-up">
                    We blend creativity with strategy to craft digital experiences that captivate
                    audiences and drive measurable results. Our team of passionate creatives,
                    strategists, and technologists work hand-in-hand to bring brands to life
                    in the digital world.
                </p>
                <p className="section-desc reveal-up" style={{ marginBottom: "2.5rem" }}>
                    From concept to execution, we ensure every pixel, every word, and every
                    interaction tells a powerful story that resonates with your audience.
                </p>

                <div className="reveal-up" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                    {["Strategy", "Creativity", "Innovation", "Results"].map((tag) => (
                        <span key={tag} style={{
                            padding: "0.5rem 1.2rem",
                            background: "rgba(0,229,255,0.1)",
                            border: "1px solid rgba(0,229,255,0.25)",
                            borderRadius: "100px",
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            color: "var(--color-accent)",
                            letterSpacing: "0.08em",
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
