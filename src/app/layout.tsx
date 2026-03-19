import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creative Agency | Marketing Elevated",
  description: "We create powerful, innovative, fun, and memorable content that elevates your brand to new heights.",
  keywords: "creative agency, marketing, digital, branding, content creation",
  openGraph: {
    title: "Creative Agency | Marketing Elevated",
    description: "We create powerful, innovative, fun, and memorable content.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
