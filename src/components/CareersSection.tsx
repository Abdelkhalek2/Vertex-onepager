"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const openings = [
    {
        title: "Influencer Partnerships Manager",
        type: "Full-time",
        location: "Riyadh, KSA",
        dept: "Growth",
    },
    {
        title: "Performance Marketing Specialist",
        type: "Full-time",
        location: "Riyadh / Remote",
        dept: "Media",
    },
    {
        title: "Creative Content Strategist",
        type: "Full-time",
        location: "Riyadh, KSA",
        dept: "Creative",
    },
    {
        title: "Events & Activations Coordinator",
        type: "Full-time",
        location: "Riyadh, KSA",
        dept: "Events",
    },
];

const perks = [
    { icon: "🚀", label: "Fast-track growth" },
    { icon: "🌍", label: "Regional exposure" },
    { icon: "💡", label: "Creative freedom" },
    { icon: "🎯", label: "Results-first culture" },
    { icon: "🤝", label: "Tight-knit team" },
    { icon: "💰", label: "Competitive comp" },
];

export default function CareersSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Header reveal
        gsap.fromTo(
            sectionRef.current?.querySelector(".careers-header") ?? {},
            { opacity: 0, y: 80 },
            {
                opacity: 1, y: 0, duration: 1.5, ease: "power4.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
            }
        );

        // Job cards stagger
        gsap.fromTo(
            sectionRef.current?.querySelectorAll(".job-card") ?? [],
            { opacity: 0, x: -50 },
            {
                opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current?.querySelector(".jobs-list"), start: "top 88%" },
            }
        );

        // Perks
        gsap.fromTo(
            sectionRef.current?.querySelectorAll(".perk-chip") ?? [],
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1, scale: 1, duration: 0.7, stagger: 0.07, ease: "back.out(1.7)",
                scrollTrigger: { trigger: sectionRef.current?.querySelector(".perks-grid"), start: "top 90%" },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="careers" id="careers">
            {/* Decorative blob */}
            <div className="careers-blob" />

            <div className="careers-inner">
                {/* Left: header + perks */}
                <div className="careers-left">
                    <div className="careers-header" style={{ opacity: 0 }}>
                        <div className="section-tag">Join The Team</div>
                        <h2 className="section-title">
                            Work Where<br />
                            <span style={{ color: "var(--color-accent)" }}>Culture</span><br />
                            Is The Strategy
                        </h2>
                        <p className="section-desc">
                            We&apos;re building the region&apos;s most creative marketing team. If you move
                            fast, think boldly, and care deeply about craft — you belong here.
                        </p>
                    </div>

                    <div className="perks-grid">
                        {perks.map((p, i) => (
                            <div key={i} className="perk-chip" style={{ opacity: 0 }}>
                                <span>{p.icon}</span>
                                {p.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: openings */}
                <div className="careers-right">
                    <div className="jobs-list">
                        {openings.map((job, i) => (
                            <div key={i} className="job-card" style={{ opacity: 0 }}>
                                <div className="job-dept">{job.dept}</div>
                                <div className="job-title">{job.title}</div>
                                <div className="job-meta">
                                    <span className="job-tag">{job.type}</span>
                                    <span className="job-tag">{job.location}</span>
                                </div>
                                <button className="job-apply">
                                    Apply Now
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <p className="careers-open-app">
                        Don&apos;t see your role?{" "}
                        <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
                            Send an open application →
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
