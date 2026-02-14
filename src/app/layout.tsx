import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Acendia Creative | Digital Creative Studio",
  description: "Jasa pembuatan website scrollytelling, branding, dan desain kreatif. Hubungi creativeascendia@gmail.com.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}