"use client";

const items = [
    "Social Media Marketing",
    "Video Production",
    "Brand Identity",
    "Web Design",
    "Digital Advertising",
    "Content Strategy",
];

export default function MarqueeSection() {
    const doubled = [...items, ...items];
    return (
        <div className="marquee-wrap">
            <div className="marquee-track">
                {doubled.map((item, i) => (
                    <div key={i} className="marquee-item">
                        {item}
                        <span className="dot" />
                    </div>
                ))}
            </div>
        </div>
    );
}
