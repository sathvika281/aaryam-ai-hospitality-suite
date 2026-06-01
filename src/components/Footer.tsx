import Link from "next/link";
import {
  Mountain,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-navy-950/80">
      {/* Glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-500 to-emerald-600 flex items-center justify-center">
                <Mountain size={18} className="text-white" />
              </div>
              <div>
                <span className="font-serif font-bold text-white text-lg">Aaryam</span>
                <span className="text-xs text-gold-400 font-medium ml-1 tracking-wider uppercase">Resorts</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Experience the perfect blend of luxury and nature in the Himalayas. Your AI-powered mountain escape awaits.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-500/30 transition-all"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/assistant", label: "AI Concierge" },
                { href: "/packages", label: "Packages" },
                { href: "/planner", label: "Travel Planner" },
                { href: "/social", label: "Social Studio" },
                { href: "/reviews", label: "Review Assistant" },
                { href: "/about", label: "About Resort" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-gold-400 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-500/0 group-hover:bg-gold-500 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm leading-relaxed">
                  Valley of Flowers Road, Nainital, Uttarakhand 263001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold-400 shrink-0" />
                <span className="text-white/50 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-gold-400 shrink-0" />
                <span className="text-white/50 text-sm">stay@aaryamresorts.com</span>
              </li>
            </ul>
          </div>

          {/* AI Features */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              AI Features
            </h4>
            <div className="space-y-2.5">
              {[
                "24/7 AI Concierge",
                "Smart Package Finder",
                "Itinerary Planner",
                "Social Media Studio",
                "Review Generator",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Sparkles size={11} className="text-gold-400 shrink-0" />
                  <span className="text-white/50 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © 2025 Aaryam Resorts. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1.5">
            Powered by
            <span className="text-gold-400 font-medium">Google Gemini AI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
