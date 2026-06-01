"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  ArrowRight,
  MessageSquare,
  Package,
  Map,
  Share2,
  Bot,
  Shield,
  Heart,
  Compass,
  Waves,
  UtensilsCrossed,
  Mountain,
  ChevronDown,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04070d] via-[#0a1628] to-[#04070d]" />

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full bg-emerald-500/8 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/6 w-96 h-96 rounded-full bg-gold-500/6 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-navy-600/20 blur-3xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Mountain silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden opacity-20">
          <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M0,200 L120,120 L240,160 L360,80 L480,140 L600,60 L720,100 L840,40 L960,110 L1080,70 L1200,130 L1320,90 L1440,150 L1440,200 Z"
              fill="rgba(16,185,129,0.4)"
            />
            <path
              d="M0,200 L180,150 L300,170 L420,110 L540,160 L660,90 L780,140 L900,80 L1020,130 L1140,100 L1260,155 L1380,120 L1440,140 L1440,200 Z"
              fill="rgba(15,36,71,0.8)"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={12} />
            Powered by Google Gemini AI
            <Sparkles size={12} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Experience Luxury
            <br />
            <span className="gold-text">with AI-Powered</span>
            <br />
            Hospitality
          </motion.h1>

          <motion.p
            className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Get instant travel guidance, personalised room recommendations, and resort assistance — your AI concierge is available 24/7 at Aaryam Resorts, Nainital.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link
              href="/assistant"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold text-base shadow-2xl shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-105 transition-all duration-300"
            >
              <MessageSquare size={18} />
              Start AI Chat
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/packages"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl glass border border-white/10 text-white font-semibold text-base hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-300"
            >
              <Package size={18} />
              Find My Package
            </Link>
          </motion.div>

          {/* Stars */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-10 text-white/40 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-gold-500 text-gold-500" />
              ))}
            </div>
            <span>Rated 4.9/5 by 1,200+ guests</span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ── Resort Highlights ─────────────────────────────────── */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#04070d] to-[#080e1a]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
              What We Offer
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              Resort Highlights
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 max-w-xl mx-auto">
              Discover the luxury, serenity, and adventure that await you at Aaryam Resorts
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                icon: Mountain,
                title: "Luxury Rooms",
                desc: "Elegantly designed rooms from ₹5,000/night with stunning mountain panoramas",
                gradient: "from-blue-500/20 to-navy-600/10",
                iconColor: "text-blue-400",
              },
              {
                icon: Compass,
                title: "Scenic Views",
                desc: "Breathtaking Himalayan vistas from every corner — Snow View, Sunset Peak, and more",
                gradient: "from-emerald-500/20 to-emerald-600/10",
                iconColor: "text-emerald-400",
              },
              {
                icon: UtensilsCrossed,
                title: "Fine Dining",
                desc: "The Summit Bistro serving multi-cuisine delights with locally sourced Uttarakhandi ingredients",
                gradient: "from-gold-500/20 to-gold-600/10",
                iconColor: "text-gold-400",
              },
              {
                icon: Waves,
                title: "Adventure & Wellness",
                desc: "From mountain treks and rock climbing to spa treatments and sunrise yoga",
                gradient: "from-purple-500/20 to-purple-600/10",
                iconColor: "text-purple-400",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className={`group p-6 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${card.gradient}`}
              >
                <div className="w-12 h-12 rounded-xl glass-light flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <card.icon size={22} className={card.iconColor} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{card.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Aaryam ─────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080e1a] via-[#0a1628] to-[#080e1a]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/3 blur-[100px] rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
                Why Aaryam
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                The Smarter Way to{" "}
                <span className="emerald-text">Experience Hospitality</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                We combine premium mountain luxury with cutting-edge AI to give every guest a personalised, seamless experience — from planning to checkout.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-gold-400 font-semibold hover:gap-3 transition-all"
              >
                Learn more about us <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={stagger}
            >
              {[
                {
                  icon: Bot,
                  title: "AI Concierge",
                  desc: "24/7 intelligent assistant that knows everything about the resort and local area",
                  accent: "gold",
                },
                {
                  icon: Heart,
                  title: "Personalised",
                  desc: "Tailor-made recommendations for your unique travel style, group, and budget",
                  accent: "emerald",
                },
                {
                  icon: Shield,
                  title: "Premium Service",
                  desc: "5-star hospitality standards with genuine care for every guest's comfort",
                  accent: "blue",
                },
                {
                  icon: Compass,
                  title: "Local Expertise",
                  desc: "Deep knowledge of Uttarakhand's hidden gems, trails, and cultural experiences",
                  accent: "purple",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="p-5 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                      item.accent === "gold"
                        ? "bg-gold-500/15 text-gold-400"
                        : item.accent === "emerald"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : item.accent === "blue"
                        ? "bg-blue-500/15 text-blue-400"
                        : "bg-purple-500/15 text-purple-400"
                    }`}
                  >
                    <item.icon size={18} />
                  </div>
                  <h3 className="font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── AI Features Grid ─────────────────────────────────── */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-[#04070d]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">
              AI Features
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything You Need,{" "}
              <span className="gold-text">Powered by AI</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                icon: MessageSquare,
                title: "AI Travel Concierge",
                desc: "Chat with our AI assistant about rooms, amenities, local attractions, and get instant answers to all your questions.",
                href: "/assistant",
                cta: "Start Chatting",
                color: "gold",
              },
              {
                icon: Package,
                title: "Package Recommender",
                desc: "Enter your budget, group size, and travel purpose. Our AI crafts the perfect package recommendation just for you.",
                href: "/packages",
                cta: "Find Package",
                color: "emerald",
              },
              {
                icon: Map,
                title: "Travel Planner",
                desc: "Get a personalised day-by-day itinerary tailored to your interests, group type, and the number of days you're staying.",
                href: "/planner",
                cta: "Plan Trip",
                color: "blue",
              },
              {
                icon: Share2,
                title: "Social Media Studio",
                desc: "Generate professional Instagram captions, WhatsApp promos, and Facebook posts for resort offers and events.",
                href: "/social",
                cta: "Create Content",
                color: "purple",
              },
              {
                icon: Star,
                title: "Review Response AI",
                desc: "Turn guest reviews into professional management responses that reflect genuine hospitality and care.",
                href: "/reviews",
                cta: "Try Now",
                color: "pink",
              },
              {
                icon: Compass,
                title: "About the Resort",
                desc: "Discover the story, vision, and world-class amenities that make Aaryam Resorts a destination unlike any other.",
                href: "/about",
                cta: "Discover More",
                color: "teal",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="group p-6 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${
                    feature.color === "gold"
                      ? "bg-gold-500/15 text-gold-400"
                      : feature.color === "emerald"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : feature.color === "blue"
                      ? "bg-blue-500/15 text-blue-400"
                      : feature.color === "purple"
                      ? "bg-purple-500/15 text-purple-400"
                      : feature.color === "pink"
                      ? "bg-pink-500/15 text-pink-400"
                      : "bg-teal-500/15 text-teal-400"
                  }`}
                >
                  <feature.icon size={22} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{feature.desc}</p>
                <Link
                  href={feature.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white group-hover:gap-2.5 transition-all"
                >
                  {feature.cta} <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Rooms Preview ─────────────────────────────────────── */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#04070d] via-[#080e1a] to-[#04070d]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
              Accommodations
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              Our Rooms & Suites
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              {
                name: "Deluxe Room",
                price: "₹5,000",
                capacity: "2 guests",
                desc: "Elegant mountain-view room with modern luxury amenities",
                color: "from-blue-500/15 to-transparent",
                badge: "Best Value",
              },
              {
                name: "Family Suite",
                price: "₹9,000",
                capacity: "4 guests",
                desc: "Spacious suite with separate living area and private balcony",
                color: "from-emerald-500/15 to-transparent",
                badge: "Most Popular",
              },
              {
                name: "Honeymoon Suite",
                price: "₹12,000",
                capacity: "2 guests",
                desc: "Ultimate romance with panoramic views and butler service",
                color: "from-gold-500/15 to-transparent",
                badge: "Luxury Pick",
              },
            ].map((room) => (
              <motion.div
                key={room.name}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-3xl glass border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Room visual */}
                <div className={`h-52 bg-gradient-to-br ${room.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Mountain size={80} className="text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#080e1a]/80" />
                  <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30">
                    {room.badge}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif font-semibold text-white text-xl">{room.name}</h3>
                    <div className="text-right">
                      <span className="gold-text text-xl font-bold">{room.price}</span>
                      <span className="text-white/40 text-xs">/night</span>
                    </div>
                  </div>
                  <p className="text-white/50 text-xs mb-1">{room.capacity}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{room.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a] via-[#0f2447] to-[#0a0e1a]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-8">
            <Sparkles size={12} />
            Start Your Journey
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Your Perfect Mountain Escape{" "}
            <span className="gold-text">Awaits</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Let our AI concierge craft your dream stay. Start a conversation, find your perfect package, or plan your entire trip — all in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/assistant"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold shadow-2xl shadow-gold-500/20 hover:scale-105 transition-all duration-300"
            >
              <Sparkles size={16} />
              Chat with AI Concierge
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/packages"
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl glass border border-emerald-500/30 text-emerald-400 font-semibold hover:bg-emerald-500/5 transition-all"
            >
              <Package size={16} />
              Explore Packages
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
