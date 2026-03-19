"use client";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer px-5 md:px-10 lg:px-[6vw]">

            <div className="footer-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                <div className="footer-brand">
                    <img
                        src="/logo-white.svg"
                        alt="Vertex Media"
                        style={{ width: 'clamp(144px, 15vw, 180px)', height: 'auto', marginBottom: '2rem', display: 'block' }}
                        className="object-contain"
                    />





                    <p>Elevating brands through visionary marketing and cutting-edge digital experiences.</p>
                    <div className="social-links" style={{ marginTop: "1.5rem" }}>
                        {["in", "ig", "tw", "yt"].map((s) => (
                            <a key={s} href="#" className="social-link">{s}</a>
                        ))}
                    </div>
                </div>

                {[
                    {
                        title: "Services",
                        links: ["Social Media", "Video Production", "Brand Identity", "Web Design", "Digital Ads"],
                    },
                    {
                        title: "Company",
                        links: ["About Us", "Our Work", "Blog", "Careers", "Contact"],
                    },
                    {
                        title: "Contact",
                        links: ["hello@agency.com", "+966 50 000 0000", "Riyadh, KSA"],
                    },
                ].map((col) => (
                    <div key={col.title}>
                        <div className="footer-col-title">{col.title}</div>
                        <ul className="footer-links">
                            {col.links.map((link) => (
                                <li key={link}>
                                    <a href="#">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="footer-bottom">
                <span>© {year} Agency. All rights reserved.</span>
                <span>Built with passion ❤️</span>
            </div>
        </footer>
    );
}
