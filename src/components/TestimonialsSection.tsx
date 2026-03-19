"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials = [
    {
        text: "Working with this agency transformed our brand completely. The attention to detail and creative vision they brought was beyond anything we expected.",
        author: "Sarah Al-Rashid",
        role: "CEO, TechStart SA",
        initial: "S",
    },
    {
        text: "Our social media engagement tripled within 3 months of launching their strategy. The team is responsive, creative, and truly cares about results.",
        author: "Mohammed Hassan",
        role: "Marketing Director, Luxe Group",
        initial: "M",
    },
    {
        text: "The video production quality was world-class. They captured our brand essence perfectly and our sales video converted at 4x our previous rate.",
        author: "Layla Ibrahim",
        role: "Founder, BeautyBrand",
        initial: "L",
    },
];

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            sectionRef.current?.querySelectorAll(".testimonial-card") ?? [],
            { opacity: 0, y: 100 },
            {
                opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power4.out",
                scrollTrigger: { trigger: sectionRef.current?.querySelector(".testimonials-grid"), start: "top 85%" }
            }
        );

        gsap.fromTo(
            sectionRef.current?.querySelector(".testimonials-header") ?? {},
            { opacity: 0, y: 80 },
            {
                opacity: 1, y: 0, duration: 1.5, ease: "power4.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="testimonials px-5 md:px-10 lg:px-[6vw]" id="testimonials">

            <div className="testimonials-header" style={{ opacity: 0 }}>
                <div className="section-tag">Client Love</div>
                <h2 className="section-title text-4xl md:text-5xl lg:text-inherit">What Our Clients<br /><span style={{ color: "var(--color-accent)" }}>Say</span></h2>

            </div>

            <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {testimonials.map((t, i) => (
                    <div key={i} className="testimonial-card" style={{ opacity: 0 }}>
                        <div className="stars">{"★★★★★"}</div>
                        <p className="testimonial-text">{t.text}</p>
                        <div className="testimonial-author">
                            <div className="author-avatar">{t.initial}</div>
                            <div>
                                <div className="author-name">{t.author}</div>
                                <div className="author-role">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
