import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aaryam AI Hospitality Suite | Your Personal AI Travel Concierge",
  description:
    "Experience luxury mountain hospitality with AI-powered concierge, package recommendations, and personalized travel planning at Aaryam Resorts, Nainital.",
  keywords:
    "Aaryam Resorts, luxury resort Nainital, AI concierge, mountain resort, Uttarakhand travel, hotel booking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#04070d] text-white antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
