"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mountain, Sparkles } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/assistant", label: "AI Concierge" },
  { href: "/packages", label: "Packages" },
  { href: "/planner", label: "Travel Planner" },
  { href: "/social", label: "Social Studio" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/5 shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-gold-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Mountain size={18} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-serif font-bold text-lg tracking-wide text-white">
                Aaryam
              </span>
              <span className="text-xs text-gold-400 font-medium ml-1 tracking-wider uppercase">
                Resorts
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                  pathname === link.href
                    ? "text-gold-400"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {pathname === link.href && (
                  <span className="absolute inset-0 rounded-lg bg-white/5 border border-gold-500/20" />
                )}
                <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors" />
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/assistant"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white text-sm font-semibold shadow-lg hover:shadow-gold-500/25 hover:scale-105 transition-all duration-200"
            >
              <Sparkles size={14} />
              Chat Now
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg glass-light text-white/80 hover:text-white transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden glass border-t border-white/5">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "bg-gold-500/10 text-gold-400 border border-gold-500/20"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/assistant"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white text-sm font-semibold"
            >
              <Sparkles size={14} />
              Start AI Chat
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
