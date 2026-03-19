"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import MagneticWrapper from "./MagneticWrapper";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar({ loaded }: { loaded: boolean }) {
    const navRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const linksRef = useRef<HTMLUListElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!loaded) return;

        // Entrance Animation
        const tl = gsap.timeline({ delay: 0.5 });
        tl.fromTo(logoRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
            .fromTo(linksRef.current?.querySelectorAll("li") ?? [], { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6")
            .fromTo(ctaRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4");

        const handleScroll = () => {
            if (navRef.current) {
                navRef.current.classList.toggle("scrolled", window.scrollY > 50);
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loaded]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav ref={navRef} className="navbar px-5 md:px-10 lg:px-[4vw]" id="navbar" style={{ opacity: loaded ? 1 : 0 }}>

            <a ref={logoRef} href="#" className="flex items-center" style={{ opacity: 0 }}>
                <img
                    src="/logo-white.svg"
                    alt="Vertex Media"
                    style={{ width: 'clamp(144px, 15vw, 180px)', height: 'auto', display: 'block' }}
                    className="object-contain"
                />
            </a>






            <ul ref={linksRef} className="nav-links">
                {navLinks.map((link) => (
                    <li key={link.label} style={{ opacity: 0 }}>
                        <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
            <div ref={ctaRef} style={{ opacity: 0 }}>
                <MagneticWrapper strength={0.3}>
                    <a href="#contact" className="nav-cta" onClick={(e) => handleNavClick(e, "#contact")}>
                        Get Started
                    </a>
                </MagneticWrapper>
            </div>
        </nav>
    );
}
