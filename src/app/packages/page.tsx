"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Sparkles,
  Users,
  IndianRupee,
  Calendar,
  Heart,
  Loader2,
  CheckCircle,
  Lightbulb,
  Star,
  MapPin,
} from "lucide-react";

const purposes = [
  { value: "Family Vacation", label: "Family Vacation", emoji: "👨‍👩‍👧‍👦" },
  { value: "Honeymoon", label: "Honeymoon", emoji: "💑" },
  { value: "Friends Trip", label: "Friends Trip", emoji: "👥" },
  { value: "Solo Travel", label: "Solo Travel", emoji: "🧭" },
  { value: "Corporate Retreat", label: "Corporate Retreat", emoji: "💼" },
];

type Recommendation = {
  packageName: string;
  recommendedRoom: string;
  estimatedCost: number;
  duration: string;
  suggestedActivities: string[];
  recommendationReason: string;
  travelTips: string[];
  highlights: string[];
  whatIsIncluded: string[];
  bestTimeToVisit: string;
};

export default function PackagesPage() {
  const [form, setForm] = useState({
    budget: "",
    people: "2",
    purpose: "Family Vacation",
    duration: "2",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Recommendation | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: Number(form.budget),
          people: Number(form.people),
          purpose: form.purpose,
          duration: Number(form.duration),
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get recommendation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#04070d] pb-20">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 bg-[#080e1a]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-64 h-32 bg-gold-500/5 blur-3xl rounded-full" />
          <div className="absolute top-0 right-1/3 w-64 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
        </div>
        <div className="max-w-5xl mx-auto px-4 py-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-5">
            <Package size={12} />
            AI Package Finder
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-3">
            Find Your{" "}
            <span className="gold-text">Perfect Package</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-base">
            Tell us about your trip and our AI will craft the ideal package recommendation tailored exactly to your needs.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass border border-white/5 rounded-2xl p-6 space-y-5">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <Sparkles size={16} className="text-gold-400" />
                Tell Us About Your Trip
              </h2>

              {/* Budget */}
              <div>
                <label className="block text-white/60 text-sm mb-2 flex items-center gap-1.5">
                  <IndianRupee size={13} />
                  Total Budget (₹)
                </label>
                <input
                  type="number"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  placeholder="e.g. 25000"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                />
              </div>

              {/* People */}
              <div>
                <label className="block text-white/60 text-sm mb-2 flex items-center gap-1.5">
                  <Users size={13} />
                  Number of Guests
                </label>
                <select
                  value={form.people}
                  onChange={(e) => setForm({ ...form, people: e.target.value })}
                  className="w-full bg-[#0f2035] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-white/60 text-sm mb-2 flex items-center gap-1.5">
                  <Calendar size={13} />
                  Duration (Nights)
                </label>
                <select
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="w-full bg-[#0f2035] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                >
                  {[1, 2, 3, 4, 5, 7].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Night" : "Nights"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-white/60 text-sm mb-3 flex items-center gap-1.5">
                  <Heart size={13} />
                  Travel Purpose
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {purposes.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setForm({ ...form, purpose: p.value })}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-left transition-all border ${
                        form.purpose === p.value
                          ? "bg-gold-500/10 border-gold-500/40 text-white"
                          : "border-white/5 text-white/50 hover:border-white/15 hover:text-white/80"
                      }`}
                    >
                      <span className="text-base">{p.emoji}</span>
                      {p.label}
                      {form.purpose === p.value && (
                        <CheckCircle size={14} className="ml-auto text-gold-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !form.budget}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Analysing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Get AI Recommendation
                  </>
                )}
              </button>
            </div>
          </motion.form>

          {/* Result */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {!result && !loading && !error && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center min-h-[400px]"
                >
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-gold-500/10 flex items-center justify-center mx-auto">
                      <Package size={36} className="text-gold-400/60" />
                    </div>
                    <p className="text-white/40 text-sm max-w-xs">
                      Fill in your trip details and our AI will suggest the perfect Aaryam Resorts package for you
                    </p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center min-h-[400px]"
                >
                  <div className="glass border border-red-500/20 rounded-2xl p-6 text-center max-w-sm">
                    <p className="text-red-400 text-sm">{error}</p>
                    <p className="text-white/40 text-xs mt-2">
                      Make sure GEMINI_API_KEY is set in .env.local
                    </p>
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-5"
                >
                  {/* Top card */}
                  <div className="relative overflow-hidden rounded-2xl glass border border-gold-500/20 p-6">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/5 blur-2xl rounded-full" />
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">
                          AI Recommendation
                        </span>
                        <h2 className="font-serif text-2xl font-bold text-white mt-1">
                          {result.packageName}
                        </h2>
                      </div>
                      <div className="text-right">
                        <div className="gold-text text-2xl font-bold">
                          ₹{result.estimatedCost?.toLocaleString("en-IN")}
                        </div>
                        <div className="text-white/40 text-xs">{result.duration}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="flex items-center gap-1.5 text-xs text-white/60 px-3 py-1.5 rounded-lg bg-white/5">
                        <Star size={12} className="text-gold-400" />
                        {result.recommendedRoom}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-white/60 px-3 py-1.5 rounded-lg bg-white/5">
                        <MapPin size={12} className="text-emerald-400" />
                        {result.bestTimeToVisit}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {result.recommendationReason}
                    </p>
                  </div>

                  {/* Grid of details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="glass border border-white/5 rounded-2xl p-5">
                      <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <CheckCircle size={12} className="text-emerald-400" />
                        What&apos;s Included
                      </h3>
                      <ul className="space-y-2">
                        {result.whatIsIncluded?.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glass border border-white/5 rounded-2xl p-5">
                      <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Star size={12} className="text-gold-400" />
                        Highlights
                      </h3>
                      <ul className="space-y-2">
                        {result.highlights?.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glass border border-white/5 rounded-2xl p-5">
                      <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <MapPin size={12} className="text-blue-400" />
                        Suggested Activities
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {result.suggestedActivities?.map((a, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="glass border border-white/5 rounded-2xl p-5">
                      <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Lightbulb size={12} className="text-yellow-400" />
                        Travel Tips
                      </h3>
                      <ul className="space-y-2">
                        {result.travelTips?.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                            <span className="text-yellow-400 shrink-0">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
