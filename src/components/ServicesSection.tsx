"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
    {
        num: "01",
        icon: "🌟",
        title: "Influencer Marketing",
        desc: "We connect your brand with the perfect creators — micro to mega. Data-driven matchmaking, campaign strategy, and full performance tracking across all platforms.",
    },
    {
        num: "02",
        icon: "📊",
        title: "Ad Campaigns",
        desc: "ROI-obsessed paid media across Meta, TikTok, Snapchat, and Google. From creative to targeting to optimization — every dirham works harder.",
    },
    {
        num: "03",
        icon: "🎪",
        title: "Events Coordination",
        desc: "From intimate brand activations to large-scale launch events, we produce experiences that generate buzz, content, and lasting brand impressions.",
    },
    {
        num: "04",
        icon: "💬",
        title: "SMS & WhatsApp Campaigns",
        desc: "Direct, personal, and high-converting. We build automated messaging flows that nurture leads and retain customers at scale through the region's most-used channels.",
    },
];

export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            sectionRef.current?.querySelectorAll(".service-card") ?? [],
            { opacity: 0, y: 100 },
            {
                opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power4.out",
                scrollTrigger: { trigger: sectionRef.current?.querySelector(".services-grid"), start: "top 85%" },
            }
        );

        gsap.fromTo(
            sectionRef.current?.querySelector(".services-header") ?? [],
            { opacity: 0, y: 80 },
            {
                opacity: 1, y: 0, duration: 1.5, ease: "power4.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="services px-5 md:px-10 lg:px-[6vw]" id="services">
            <div className="services-header mb-16" style={{ opacity: 0 }}>

                <div>
                    <div className="section-tag">What We Do</div>
                    <h2 className="section-title text-4xl md:text-5xl lg:text-inherit">Our Strategic<br /><span style={{ color: "var(--color-accent)" }}>Solutions</span></h2>
                </div>
                <p style={{ maxWidth: "350px", color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                    Everything you need to dominate the digital landscape and grow your brand in the region.
                </p>
            </div>

            <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {services.map((svc, i) => (
                    <div key={i} className="service-card" style={{ opacity: 0 }}>
                        <div className="service-num">{svc.num}</div>
                        <div className="service-icon">
                            <span style={{ fontSize: "1.5rem" }}>{svc.icon}</span>
                        </div>
                        <div className="service-title">{svc.title}</div>
                        <p className="service-desc">{svc.desc}</p>
                        <div className="service-arrow">
                            Learn More
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
