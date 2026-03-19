"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    num: "01",
    title: "Influencer Marketing",
    desc: "Data-driven creator partnerships that put your brand in front of real, engaged audiences at scale.",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=390&h=844&fit=crop",
    color: "#00e5ff",
  },
  {
    num: "02",
    title: "Ad Campaigns",
    desc: "ROI-obsessed paid media across Meta, TikTok, Snapchat & Google — every dirham works harder.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=390&h=844&fit=crop",
    color: "#a78bfa",
  },
  {
    num: "03",
    title: "Events Coordination",
    desc: "Immersive brand activations and launch events that generate real-world buzz and viral content.",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=390&h=844&fit=crop",
    color: "#f59e0b",
  },
  {
    num: "04",
    title: "SMS & WhatsApp",
    desc: "High-converting direct messaging flows that nurture leads and retain customers at scale.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=390&h=844&fit=crop",
    color: "#34d399",
  },
  {
    num: "05",
    title: "Brand Identity",
    desc: "Visual systems, logos, and brand guidelines that make your business impossible to forget.",
    img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=390&h=844&fit=crop",
    color: "#fb7185",
  },
  {
    num: "06",
    title: "Content Strategy",
    desc: "Research-backed content plans and SEO copywriting that compound authority over time.",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=390&h=844&fit=crop",
    color: "#38bdf8",
  },
];

// ── Shared Subcomponents ──────────────────────────────────────────

const PhoneMockup = ({ svc, imgRef, glowRef, shownSvc }: { svc: any; imgRef?: any; glowRef?: any; shownSvc?: any }) => {
  const currentSvc = shownSvc || svc;
  return (
    <div className="phone-wrap" style={{ position: "relative", width: "clamp(200px, 60vw, 240px)", margin: "0 auto", zIndex: 10 }}>
      {/* Ambient glow */}
      <div ref={glowRef} style={{
        position: "absolute", inset: "-40px", borderRadius: "50%",
        background: `radial-gradient(circle, ${svc.color}50 0%, transparent 65%)`,
        filter: "blur(30px)", opacity: 0.35, pointerEvents: "none", zIndex: 0,
        transition: "background 0.5s ease"
      }} />

      {/* Phone shell */}
      <div style={{
        position: "relative", zIndex: 1, width: "100%", aspectRatio: "390 / 844",
        borderRadius: "36px", background: "linear-gradient(160deg, #2c2c2e 0%, #1c1c1e 40%, #2c2c2e 100%)",
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.12), 0 0 0 3px #0a0a0a, 0 40px 80px rgba(0,0,0,0.8), 0 0 60px ${svc.color}25`,
        overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", width: "32%", height: "16px", background: "#000", borderRadius: "10px", zIndex: 3 }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden", background: "#000" }}>
          <img ref={imgRef} src={currentSvc.img} alt={currentSvc.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)" }} />
          <div style={{ position: "absolute", bottom: "1.5rem", left: "1.25rem", right: "1.25rem" }}>
            <div style={{ fontSize: "0.6rem", color: svc.color, fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>{svc.num}</div>
            <div style={{ fontSize: "1.1rem", color: "#fff", fontWeight: 700, fontFamily: "var(--font-heading)", lineHeight: 1.1 }}>{svc.title}</div>
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)", pointerEvents: "none", zIndex: 4 }} />
      </div>
    </div>
  );
};

// ── Main Component ──────────────────────────────────────────

export default function InteractiveServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const phoneImgRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isFading = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  }, []);

  useEffect(() => {
    // Mobile always stays in sync immediately
    if (isMobile) {
      if (displayIndex !== activeIndex) setDisplayIndex(activeIndex);
      return;
    }

    // Protection against rapid hover "stuck" state
    if (isFading.current) return;
    
    // If already in sync, nothing to do
    if (activeIndex === displayIndex) return;

    const img = phoneImgRef.current;
    if (!img) {
      setDisplayIndex(activeIndex);
      return;
    }

    isFading.current = true;

    // Fluid crossfade transition
    gsap.to(img, {
      opacity: 0, scale: 1.02, duration: 0.15, ease: "power2.inOut",
      onComplete: () => {
        setDisplayIndex(activeIndex);
        
        // Wait for state to propagate, then fade back in
        requestAnimationFrame(() => {
          if (!img) {
            isFading.current = false;
            return;
          }
          gsap.fromTo(img,
            { opacity: 0, scale: 0.98 },
            {
              opacity: 1, scale: 1, duration: 0.25, ease: "power2.out",
              onComplete: () => { 
                isFading.current = false;
                // If the user moved to a different item while we were animating, 
                // this useEffect will re-run thanks to the activeIndex dependency
              },
            }
          );
        });
      },
    });

    if (glowRef.current) {
      gsap.fromTo(glowRef.current,
        { opacity: 0.8, scale: 1.1 },
        { opacity: 0.35, scale: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activeIndex, isMobile, displayIndex]);

  const active = services[activeIndex];
  const shown = services[displayIndex];

  if (isMobile === null) return <section ref={sectionRef} style={{ height: '80vh' }} />;

  return (
    <section ref={sectionRef} id="services" style={{
      padding: isMobile ? "4rem 1.5rem" : "8rem 6vw",
      background: "var(--color-bg)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background accent */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,229,255,0.03) 0%, transparent 70%)" }} />

      {/* Header */}
      <div ref={headerRef} style={{ marginBottom: isMobile ? "2rem" : "4rem", opacity: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.8rem" }}>
          <div style={{ width: 24, height: 1.5, background: "var(--color-accent)" }} />
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent)", fontWeight: 700 }}>What We Do</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 4.5vw, 4rem)", lineHeight: 1.1, color: "#fff" }}>
            Our Core <span style={{ color: "var(--color-accent)" }}>Services</span>
          </h2>
          {!isMobile && (
            <p style={{ maxWidth: "320px", fontSize: "0.88rem", lineHeight: 1.7, color: "rgba(255,255,255,0.35)" }}>
              Hover any service to preview it — then let&apos;s talk about your brand.
            </p>
          )}
        </div>
      </div>

      {isMobile ? (
        /* ── MOBILE UI ────────────────────────────────────────── */
        <div className="mobile-view-container" style={{ position: "relative", zIndex: 5 }}>
          <div className="mobile-services-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginBottom: "3rem"
          }}>
            {services.map((svc, i) => (
              <button
                key={svc.num}
                onClick={() => setActiveIndex(i)}
                style={{
                  display: "flex", flexDirection: "column", padding: "1.25rem 1rem",
                  background: "rgba(255,255,255,0.03)", borderRadius: "0 8px 8px 0",
                  border: "none", borderLeft: `4px solid ${i === activeIndex ? svc.color : "transparent"}`,
                  opacity: i === activeIndex ? 1 : 0.4, transition: "all 0.3s ease", textAlign: "left"
                }}
              >
                <span style={{ fontSize: "0.6rem", fontWeight: 700, color: i === activeIndex ? svc.color : "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: "4px" }}>{svc.num}</span>
                <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-heading)", lineHeight: 1.2 }}>{svc.title}</span>
              </button>
            ))}
          </div>
          <PhoneMockup svc={active} />
          <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", fontWeight: 700 }}>
            Click service to preview
          </div>
        </div>
      ) : (
        /* ── DESKTOP UI ────────────────────────────────────────── */
        <div style={{ display: "grid", gridTemplateColumns: "1fr clamp(180px, 18vw, 240px) 1fr", gap: "clamp(2rem, 5vw, 6rem)", alignItems: "center", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 5 }}>
          {/* Left Column */}
          <div>
            {services.slice(0, 3).map((svc, i) => (
              <ServiceRow key={svc.num} svc={svc} idx={i} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            ))}
          </div>
          {/* Mockup */}
          <PhoneMockup svc={active} imgRef={phoneImgRef} glowRef={glowRef} shownSvc={shown} />
          {/* Right Column */}
          <div>
            {services.slice(3, 6).map((svc, i) => (
              <ServiceRow key={svc.num} svc={svc} idx={i + 3} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

const ServiceRow = ({ svc, idx, activeIndex, setActiveIndex }: any) => {
  const isActive = idx === activeIndex;
  const rowRef = useRef<HTMLDivElement>(null);
  const handleEnter = () => setActiveIndex(idx);
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
    gsap.to(rowRef.current, { x: relX, y: relY, duration: 0.3, ease: "power2.out" });
  };
  const handleMouseLeave = () => gsap.to(rowRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });

  return (
    <div ref={rowRef} onMouseEnter={handleEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{
      padding: "1.4rem 0", borderTop: "1px solid rgba(255,255,255,0.06)", cursor: "default", position: "relative", transition: "opacity 0.4s"
    }}>
      <div style={{ position: "absolute", top: -1, left: 0, height: "1px", width: isActive ? "100%" : "0%", background: `linear-gradient(90deg, ${svc.color}, transparent)`, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" }} />
      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
        <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", color: isActive ? svc.color : "rgba(255,255,255,0.2)", transition: "color 0.4s" }}>{svc.num}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1rem, 1.6vw, 1.5rem)", color: isActive ? "#fff" : "rgba(255,255,255,0.4)", lineHeight: 1.1, transition: "color 0.4s, transform 0.4s", transform: isActive ? "translateX(6px)" : "translateX(0)", marginBottom: isActive ? "0.5rem" : 0 }}>{svc.title}</div>
          <div style={{ fontSize: "0.8rem", lineHeight: 1.65, color: "rgba(255,255,255,0.4)", maxHeight: isActive ? "65px" : "0px", overflow: "hidden", opacity: isActive ? 1 : 0, transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.35s" }}>{svc.desc}</div>
        </div>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: isActive ? svc.color : "rgba(255,255,255,0.15)", opacity: isActive ? 1 : 0, transform: isActive ? "translateX(0)" : "translateX(-6px)", transition: "opacity 0.3s, transform 0.3s" }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </div>
    </div>
  );
};



