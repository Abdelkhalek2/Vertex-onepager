"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticWrapper from "./MagneticWrapper";

export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            sectionRef.current?.querySelector(".contact-info") ?? {},
            { opacity: 0, x: -80 },
            {
                opacity: 1, x: 0, duration: 1.5, ease: "power4.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
            }
        );
        gsap.fromTo(
            sectionRef.current?.querySelector(".contact-form") ?? {},
            { opacity: 0, x: 80 },
            {
                opacity: 1, x: 0, duration: 1.5, ease: "power4.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
            }
        );
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: wire to your backend/email service
        alert("Message sent! We'll be in touch soon. 🚀");
    };

    return (
        <section ref={sectionRef} className="contact px-5 md:px-10 lg:px-[6vw] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center" id="contact">


            {/* Left — info */}
            <div className="contact-info" style={{ opacity: 0 }}>
                <div className="section-tag">Let&apos;s Talk</div>
                <h2 className="section-title text-4xl md:text-5xl lg:text-inherit">

                    Ready To<br />
                    <span style={{ color: "var(--color-accent)" }}>Elevate</span><br />
                    Your Brand?
                </h2>
                <p className="section-desc">
                    Tell us about your project and let&apos;s create something extraordinary together.
                    We&apos;re here to turn your vision into a powerful digital reality.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "2.5rem" }}>
                    {[
                        { label: "Email Us", value: "hello@agency.com", icon: "📧" },
                        { label: "Call Us", value: "+966 50 000 0000", icon: "📞" },
                        { label: "Location", value: "Riyadh, Saudi Arabia", icon: "📍" },
                    ].map((item) => (
                        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: "0.75rem",
                                background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.2)",
                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0,
                            }}>
                                {item.icon}
                            </div>
                            <div>
                                <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "0.15rem" }}>
                                    {item.label}
                                </div>
                                <div style={{ fontSize: "0.95rem", color: "white", fontWeight: 500 }}>{item.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right — form */}
            <form className="contact-form" onSubmit={handleSubmit} style={{ opacity: 0 }}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input id="name" type="text" placeholder="John Doe" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="john@vertexmedia.com" required />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="service">Service Needed</label>
                    <select id="service">
                        <option value="">Select a service...</option>
                        <option value="social">Social Media Marketing</option>
                        <option value="video">Video Production</option>
                        <option value="branding">Brand Identity</option>
                        <option value="web">Web Design</option>
                        <option value="ads">Digital Advertising</option>
                        <option value="content">Content Strategy</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="budget">Budget Range</label>
                    <select id="budget">
                        <option value="">Select budget...</option>
                        <option value="5k">$1,000 – $5,000</option>
                        <option value="15k">$5,000 – $15,000</option>
                        <option value="30k">$15,000 – $30,000</option>
                        <option value="30k+">$30,000+</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="message">Tell Us More</label>
                    <textarea id="message" placeholder="Describe your project, goals, and any specific requirements..." required />
                </div>
                <MagneticWrapper strength={0.3}>
                    <button type="submit" className="btn-primary w-full" style={{ border: "none", cursor: "pointer", justifyContent: "center", fontSize: "1rem" }}>
                        Send Message
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                    </button>
                </MagneticWrapper>
            </form>
        </section>
    );
}
