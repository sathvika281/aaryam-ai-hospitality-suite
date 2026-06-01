"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mountain,
  MapPin,
  Phone,
  Mail,
  Clock,
  Wifi,
  Utensils,
  Waves,
  TreePine,
  Compass,
  Star,
  ArrowRight,
  Sparkles,
  Car,
  Shield,
  Coffee,
} from "lucide-react";
import { resortData } from "@/lib/resort-data";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 bg-[#04070d] pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#080e1a] border-b border-white/5">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 blur-3xl rounded-full" />
          {/* Mountain silhouette */}
          <div className="absolute bottom-0 left-0 right-0 opacity-10">
            <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0,200 L120,100 L240,140 L360,60 L480,120 L600,40 L720,90 L840,20 L960,100 L1080,60 L1200,120 L1320,80 L1440,130 L1440,200 Z"
                fill="rgba(16,185,129,0.6)" />
            </svg>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Mountain size={12} />
              About Aaryam Resorts
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {resortData.tagline}
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
              Nestled in the lap of the Himalayas in {resortData.location}, Aaryam Resorts has been redefining luxury mountain hospitality since {resortData.established}.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-12 space-y-16">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          {[
            { value: "15+", label: "Years of Excellence", icon: Star },
            { value: "1,200+", label: "Happy Guests", icon: Sparkles },
            { value: "4.9★", label: "Average Rating", icon: Star },
            { value: "3", label: "Room Categories", icon: Mountain },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="glass border border-white/5 rounded-2xl p-5 text-center"
            >
              <stat.icon size={20} className="text-gold-400 mx-auto mb-2" />
              <div className="gold-text text-2xl font-bold font-serif">{stat.value}</div>
              <div className="text-white/50 text-xs mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Story */}
        <motion.div
          className="grid lg:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
              A Legacy of Mountain Luxury
            </h2>
            <div className="space-y-4 text-white/60 text-sm leading-relaxed">
              <p>
                Founded in {resortData.established}, Aaryam Resorts was born from a simple yet powerful vision: to create a haven where discerning travellers could experience the raw magnificence of the Himalayas without compromising on luxury or comfort.
              </p>
              <p>
                Over the years, we have welcomed guests from across the world — honeymooners seeking romance, families creating lifelong memories, solo adventurers pushing boundaries, and corporate teams reconnecting with purpose.
              </p>
              <p>
                Today, we continue to evolve — most recently by embracing AI-powered hospitality to give every guest instant, personalised, and delightful service experiences. Because at Aaryam, every stay should feel like it was designed just for you.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { title: "Sustainability First", desc: "Solar-powered amenities and zero-plastic initiative across the resort", icon: TreePine, color: "text-emerald-400" },
              { title: "Farm to Table", desc: "Fresh produce sourced from local Uttarakhandi farms for our restaurant", icon: Utensils, color: "text-gold-400" },
              { title: "Community Support", desc: "30% of staff hired from local villages, supporting the local economy", icon: Compass, color: "text-blue-400" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 glass border border-white/5 rounded-xl p-4">
                <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${item.color}`}>
                  <item.icon size={16} />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">{item.title}</h4>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rooms */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">Accommodations</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">Our Rooms & Suites</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {resortData.rooms.map((room, i) => (
              <motion.div key={room.id} variants={fadeUp}
                className="glass border border-white/5 hover:border-gold-500/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-serif font-semibold text-white text-lg">{room.name}</h3>
                    <p className="text-white/40 text-xs mt-0.5">{room.capacity} guests · {i === 0 ? "Best Value" : i === 1 ? "Most Popular" : "Luxury"}</p>
                  </div>
                  <div className="text-right">
                    <span className="gold-text text-lg font-bold">₹{room.price.toLocaleString("en-IN")}</span>
                    <span className="text-white/30 text-xs">/night</span>
                  </div>
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-4">{room.description}</p>
                <div className="space-y-1.5">
                  {room.amenities.slice(0, 4).map((a) => (
                    <div key={a} className="flex items-center gap-2 text-xs text-white/50">
                      <span className="w-1 h-1 rounded-full bg-gold-500/50 shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-emerald-400 font-medium">{room.highlight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Amenities */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-2">Facilities</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">World-Class Amenities</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: "Infinity Pool", icon: Waves },
              { label: "Fine Dining", icon: Utensils },
              { label: "Free WiFi", icon: Wifi },
              { label: "Campfire Evenings", icon: Coffee },
              { label: "Travel Desk", icon: Compass },
              { label: "Mountain Treks", icon: Mountain },
              { label: "Airport Transfer", icon: Car },
              { label: "24/7 Security", icon: Shield },
            ].map((a) => (
              <motion.div key={a.label} variants={fadeUp}
                className="glass border border-white/5 rounded-xl p-4 flex items-center gap-3">
                <a.icon size={16} className="text-gold-400 shrink-0" />
                <span className="text-white/70 text-sm">{a.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Nearby Attractions */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2">Explore Around</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">Nearby Attractions</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resortData.nearbyAttractions.map((a) => (
              <motion.div key={a.name} variants={fadeUp}
                className="glass border border-white/5 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-white/80 text-sm font-medium">{a.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">{a.distance}</span>
                </div>
                <p className="text-white/45 text-xs leading-relaxed">{a.description}</p>
                <span className="mt-2 inline-block text-xs text-white/30 uppercase tracking-wider">{a.type}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Policies */}
        <motion.div
          className="glass border border-white/5 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-2xl font-bold text-white mb-6 text-center">Resort Policies</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Clock, label: "Check-in", value: resortData.policies.checkIn, note: "Earliest arrival" },
              { icon: Clock, label: "Check-out", value: resortData.policies.checkOut, note: "Latest departure" },
              { icon: Coffee, label: "Breakfast", value: "Included", note: "All room types", positive: true },
              { icon: Shield, label: "Cancellation", value: "Free", note: "48 hours prior", positive: true },
            ].map((policy) => (
              <div key={policy.label} className="text-center">
                <policy.icon size={20} className="text-gold-400 mx-auto mb-2" />
                <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{policy.label}</div>
                <div className={`font-semibold text-base ${policy.positive ? "text-emerald-400" : "text-white"}`}>
                  {policy.value}
                </div>
                <div className="text-white/30 text-xs">{policy.note}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="grid lg:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { icon: MapPin, label: "Address", value: resortData.contact.address, color: "text-emerald-400" },
            { icon: Phone, label: "Phone", value: resortData.contact.phone, color: "text-gold-400" },
            { icon: Mail, label: "Email", value: resortData.contact.email, color: "text-blue-400" },
          ].map((contact) => (
            <div key={contact.label} className="glass border border-white/5 rounded-2xl p-5 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${contact.color}`}>
                <contact.icon size={18} />
              </div>
              <div>
                <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{contact.label}</div>
                <div className="text-white/80 text-sm leading-relaxed">{contact.value}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block glass border border-gold-500/20 rounded-3xl p-10">
            <h2 className="font-serif text-3xl font-bold text-white mb-3">
              Ready to Experience Aaryam?
            </h2>
            <p className="text-white/50 mb-7 max-w-md mx-auto">
              Chat with our AI concierge, find your perfect package, or plan your complete trip today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assistant"
                className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold hover:scale-105 transition-all shadow-lg shadow-gold-500/20">
                <Sparkles size={15} />
                Chat with AI Concierge
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/packages"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl glass border border-emerald-500/30 text-emerald-400 font-semibold hover:bg-emerald-500/5 transition-all">
                View Packages
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
