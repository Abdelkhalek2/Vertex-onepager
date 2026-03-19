"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spline from '@splinetool/react-spline';
import MagneticWrapper from "./MagneticWrapper";


export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);   // wrapper for scroll parallax
    const astroRef = useRef<HTMLDivElement>(null); // the actual container for Spline orbit
    const blobRef1 = useRef<HTMLDivElement>(null);
    const blobRef2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Kill any existing tweens to prevent clashes with quickTo re-initialization
        if (astroRef.current) gsap.killTweensOf(astroRef.current);

        // ── 1. PHONE 360° SPIN ENTRANCE ─────────────────────────────────
        gsap.set(astroRef.current, {
            rotationY: 360,
            opacity: 0,
            scale: 0.85,
            transformPerspective: 1000,
            transformOrigin: "center center",
        });

        gsap.set(imageRef.current, { opacity: 1 });

        const tl = gsap.timeline({ delay: 1.8 });

        tl.fromTo(tagRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        )
            .fromTo(
                titleRef.current?.querySelectorAll(".title-line") ?? [],
                { yPercent: 110, skewY: 3 },
                { yPercent: 0, skewY: 0, duration: 1, stagger: 0.12, ease: "power4.out" },
                "-=0.3"
            )
            .fromTo(descRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(actionsRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
                "-=0.4"
            )
            .to(astroRef.current, {
                rotationY: 0,
                opacity: 1,
                scale: 0.85, // Zoom Out: 0.85 matches initial, keeping the model perfectly small and visible
                duration: 1.4,
                ease: "power2.out",
            }, "-=0.5")

            .fromTo(indicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5 },
                "-=0.3"
            );

        // ── 2. SCROLL PARALLAX — vertical only, no rotation ────────────
        gsap.to(imageRef.current, {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.5,
            },
        });

        gsap.to(titleRef.current, {
            yPercent: 14,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            },
        });

        // ── 3. MOUSE ORBIT PARALLAX ──────────────────────────────────────
        const MAX_X = 28;
        const MAX_Y = 18;
        const BLOB_X = 40;

        const astroQuickX = gsap.quickTo(astroRef.current, "x", { duration: 1.5, ease: "power3.out" });
        const astroQuickY = gsap.quickTo(astroRef.current, "y", { duration: 1.5, ease: "power3.out" });
        const astroQuickRX = gsap.quickTo(astroRef.current, "rotationX", { duration: 1.8, ease: "power3.out" });
        const astroQuickRY = gsap.quickTo(astroRef.current, "rotationY", { duration: 1.8, ease: "power3.out" });


        const blob1QuickX = gsap.quickTo(blobRef1.current, "x", { duration: 2.2, ease: "power3.out" });


        const blob1QuickY = gsap.quickTo(blobRef1.current, "y", { duration: 2.2, ease: "power3.out" });
        const blob2QuickX = gsap.quickTo(blobRef2.current, "x", { duration: 2.8, ease: "power3.out" });
        const blob2QuickY = gsap.quickTo(blobRef2.current, "y", { duration: 2.8, ease: "power3.out" });

        const onMouseMove = (e: MouseEvent) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            astroQuickX(mouseX * MAX_X * 2);
            astroQuickY(mouseY * MAX_Y * 2);
            astroQuickRX(-mouseY * 8);
            astroQuickRY(mouseX * 8);
            blob1QuickX(mouseX * -BLOB_X);
            blob1QuickY(mouseY * -BLOB_X * 0.6);
            blob2QuickX(mouseX * BLOB_X * 0.5);
            blob2QuickY(mouseY * BLOB_X * 0.4);
        };

        const section = sectionRef.current;
        section?.addEventListener("mousemove", onMouseMove);

        const onMouseLeave = () => {
            gsap.to(astroRef.current, {
                x: 0, y: 0, rotationX: 0, rotationY: 0,
                duration: 1.2, ease: "power3.out", overwrite: "auto",
            });

            gsap.to([blobRef1.current, blobRef2.current], {
                x: 0, y: 0, duration: 1.5, ease: "power3.out", overwrite: "auto",
            });
        };
        section?.addEventListener("mouseleave", onMouseLeave);

        // ── 4. WATERMARK KILLER — DOM + Shadow DOM + MutationObserver ───
        const killWatermark = (root: Node) => {
            if (root instanceof HTMLElement) {
                const el = root as HTMLElement;
                // Check common attributes and text
                if (
                    el.id?.includes("spline") ||
                    (el.tagName === "A" && el.getAttribute("href")?.includes("spline.design")) ||
                    el.innerText?.includes("Built with Spline") ||
                    el.textContent?.includes("Built with Spline")
                ) {
                    el.style.setProperty("display", "none", "important");
                    el.style.setProperty("opacity", "0", "important");
                    el.style.setProperty("visibility", "hidden", "important");
                    el.style.setProperty("z-index", "-1", "important");
                }
            }
            if (root instanceof Element && root.shadowRoot) killWatermark(root.shadowRoot);
            root.childNodes.forEach((c) => killWatermark(c));
        };

        const wmInterval = setInterval(() => {
            killWatermark(document.body);
            // Also check all elements with shadowRoot
            document.querySelectorAll('*').forEach(el => {
                if (el.shadowRoot) killWatermark(el.shadowRoot);
            });
        }, 300);

        const wmObserver = new MutationObserver(() => killWatermark(document.body));
        wmObserver.observe(document.body, { childList: true, subtree: true });


        return () => {
            section?.removeEventListener("mousemove", onMouseMove);
            section?.removeEventListener("mouseleave", onMouseLeave);
            clearInterval(wmInterval);
            wmObserver.disconnect();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);


    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        e.preventDefault();
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section ref={sectionRef} className="hero px-5 md:px-10 lg:px-[6vw]" id="home">
            {/* Cinematic grain overlay */}
            <div className="hero-grain" />

            {/* Soft radial glow blobs — also orbit on mouse */}
            <div ref={blobRef1} className="hero-blob hero-blob-1" />
            <div ref={blobRef2} className="hero-blob hero-blob-2" />

            {/* Left: Text Content */}
            <div className="hero-content">
                <div ref={tagRef} className="hero-tag" style={{ opacity: 0 }}>
                    Creative Agency · Est. 2024
                </div>

                <h1 ref={titleRef} className="hero-title text-5xl md:text-7xl lg:text-[clamp(4rem,8.5vw,9.5rem)]">


                    <div>
                        <span className="title-line" style={{ display: "block" }}>Marketing</span>
                    </div>
                    <div className="mt-[-0.2em]">
                        <span className="title-line highlight" style={{ display: "block" }}>Unique.</span>
                    </div>
                </h1>




                <p ref={descRef} className="hero-desc" style={{ opacity: 0 }}>
                    We create powerful, innovative, fun, and memorable content that elevates
                    your brand to new heights. Let&apos;s build something extraordinary together.
                </p>

                <div ref={actionsRef} className="hero-actions" style={{ opacity: 0 }}>
                    <MagneticWrapper>
                        <a href="#contact" className="btn-primary" onClick={(e) => handleScroll(e, "#contact")}>
                            Start Your Project
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </MagneticWrapper>
                    <MagneticWrapper>
                        <a href="#portfolio" className="btn-secondary" onClick={(e) => handleScroll(e, "#portfolio")}>
                            View Our Work
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" /><path d="M10 15l5-3-5-3v6z" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                    </MagneticWrapper>
                </div>
            </div>

            {/* Right: 3D Scene Wrapper with Scroll Parallax */}
            <div
                ref={imageRef}
                className="hero-image-wrap"
                style={{
                    opacity: 0,
                    position: 'relative',
                    zIndex: 10,
                    overflow: 'visible' // Let blobs show
                }}
            >
                {/* 1. ULTIMATE INVISIBLE CROP: Clips the watermark area below the viewport */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'flex-start'
                }} className="h-[350px] md:h-[450px] lg:h-[650px] relative">



                    {/* 2. THE MODEL LAYER: Triple-Layer clipping strategy (TranslateY + Clip-Path + Overflow) */}
                    <div
                        ref={astroRef}
                        style={{
                            width: '100%',
                            height: '750px', // Extra height for clipping
                            position: 'relative',
                            transform: 'translateY(-60px)', // Raised UP significantly
                            transformStyle: "preserve-3d",
                            willChange: "transform",
                            // NUCLEAR OPTION: Physically crop the bottom 10% of the canvas where the watermark lives
                            clipPath: 'inset(0 0 8% 0)',
                            WebkitClipPath: 'inset(0 0 8% 0)',
                            // Soft fade at the edges for premium aesthetic
                            WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 98%)',
                            maskImage: 'linear-gradient(to bottom, black 90%, transparent 98%)'
                        }}
                        className="z-0"
                    >
                        {/* INVISIBLE SHIELD: Blocks Spline interaction */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 1000,
                            pointerEvents: 'auto',
                            cursor: 'default'
                        }}></div>

                        <Spline
                            scene="https://prod.spline.design/5ZDYg02Zy6cXaeaX/scene.splinecode"
                            className="w-full h-full"
                        />
                    </div>


                </div>


                {/* Floating badge — Responsive positioning */}
                <div className="hero-float-badge absolute !top-auto bottom-6 md:bottom-10 lg:bottom-16 left-6 md:left-0 lg:-left-4">

                    <span className="badge-emoji">🚀</span>
                    <div>
                        <div className="badge-title">Marketing Elevated</div>
                        <div className="badge-sub">100+ Projects Delivered</div>
                    </div>
                </div>
            </div>


            {/* Scroll indicator */}
            <div ref={indicatorRef} className="hero-scroll-indicator" style={{ opacity: 0 }}>
                <div className="scroll-line" />
                <span>Scroll</span>
            </div>
        </section>
    );
}
