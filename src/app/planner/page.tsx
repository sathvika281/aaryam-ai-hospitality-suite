"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Map,
  Sparkles,
  Calendar,
  Users,
  Sunrise,
  Sun,
  Moon,
  CheckSquare,
  Loader2,
  Backpack,
  Info,
} from "lucide-react";

const groupTypes = [
  { value: "Family", emoji: "👨‍👩‍👧‍👦" },
  { value: "Couple", emoji: "💑" },
  { value: "Friends", emoji: "👥" },
  { value: "Solo", emoji: "🧭" },
  { value: "Corporate", emoji: "💼" },
];

const interestOptions = [
  "Trekking & Hiking",
  "Photography",
  "Wildlife & Nature",
  "Yoga & Wellness",
  "Local Culture",
  "Adventure Sports",
  "Sightseeing",
  "Food & Cuisine",
  "Star Gazing",
  "Relaxation",
];

type DayPlan = {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  highlight: string;
};

type TravelPlan = {
  title: string;
  summary: string;
  days: DayPlan[];
  packingTips: string[];
  generalTips: string[];
};

export default function PlannerPage() {
  const [form, setForm] = useState({
    days: "3",
    groupType: "Family",
    interests: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [error, setError] = useState("");

  const toggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPlan(null);

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          days: Number(form.days),
          groupType: form.groupType,
          interests: form.interests.length > 0 ? form.interests : ["Sightseeing"],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPlan(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#04070d] pb-20">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 bg-[#080e1a]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-64 h-32 bg-blue-500/5 blur-3xl rounded-full" />
          <div className="absolute top-0 right-1/3 w-64 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
        </div>
        <div className="max-w-5xl mx-auto px-4 py-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-5">
            <Map size={12} />
            AI Travel Planner
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-3">
            Your Personal{" "}
            <span className="emerald-text">Travel Itinerary</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-base">
            Get a detailed day-by-day plan crafted by AI, tailored to your group type and interests for an unforgettable mountain experience.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass border border-white/5 rounded-2xl p-6 space-y-6">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <Map size={16} className="text-blue-400" />
                Plan My Trip
              </h2>

              {/* Duration */}
              <div>
                <label className="block text-white/60 text-sm mb-3 flex items-center gap-1.5">
                  <Calendar size={13} />
                  Duration
                </label>
                <div className="flex gap-2">
                  {["2", "3", "4", "5", "7"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setForm({ ...form, days: d })}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                        form.days === d
                          ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                          : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"
                      }`}
                    >
                      {d}D
                    </button>
                  ))}
                </div>
              </div>

              {/* Group Type */}
              <div>
                <label className="block text-white/60 text-sm mb-3 flex items-center gap-1.5">
                  <Users size={13} />
                  Group Type
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {groupTypes.map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => setForm({ ...form, groupType: g.value })}
                      className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl text-xs transition-all border ${
                        form.groupType === g.value
                          ? "bg-emerald-500/15 border-emerald-500/40 text-white"
                          : "border-white/5 text-white/50 hover:border-white/15"
                      }`}
                    >
                      <span className="text-lg">{g.emoji}</span>
                      <span className="leading-tight text-center">{g.value}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-white/60 text-sm mb-3 flex items-center gap-1.5">
                  <CheckSquare size={13} />
                  Interests{" "}
                  <span className="text-white/30 font-normal">(select any)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-xl text-xs transition-all border ${
                        form.interests.includes(interest)
                          ? "bg-gold-500/15 border-gold-500/40 text-gold-300"
                          : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Planning Your Trip...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Itinerary
                  </>
                )}
              </button>
            </div>
          </motion.form>

          {/* Result */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {!plan && !loading && !error && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex items-center justify-center min-h-[400px]"
                >
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mx-auto">
                      <Map size={36} className="text-blue-400/60" />
                    </div>
                    <p className="text-white/40 text-sm max-w-xs">
                      Configure your trip details on the left and our AI will generate a personalised day-by-day itinerary
                    </p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center justify-center min-h-[400px]">
                  <div className="glass border border-red-500/20 rounded-2xl p-6 text-center max-w-sm">
                    <p className="text-red-400 text-sm">{error}</p>
                    <p className="text-white/40 text-xs mt-2">Ensure GEMINI_API_KEY is configured in .env.local</p>
                  </div>
                </motion.div>
              )}

              {plan && (
                <motion.div
                  key="plan"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-5"
                >
                  {/* Summary */}
                  <div className="glass border border-blue-500/20 rounded-2xl p-6">
                    <h2 className="font-serif text-2xl font-bold text-white mb-2">
                      {plan.title}
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed">{plan.summary}</p>
                  </div>

                  {/* Days */}
                  {plan.days?.map((day, i) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass border border-white/5 rounded-2xl overflow-hidden"
                    >
                      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {day.day}
                        </div>
                        <div>
                          <div className="text-white/40 text-xs uppercase tracking-wider">Day {day.day}</div>
                          <div className="font-semibold text-white text-sm">{day.title}</div>
                        </div>
                        {day.highlight && (
                          <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
                            ⭐ {day.highlight}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
                        {[
                          { label: "Morning", content: day.morning, Icon: Sunrise, color: "text-orange-400" },
                          { label: "Afternoon", content: day.afternoon, Icon: Sun, color: "text-yellow-400" },
                          { label: "Evening", content: day.evening, Icon: Moon, color: "text-blue-400" },
                        ].map(({ label, content, Icon, color }) => (
                          <div key={label} className="p-4">
                            <div className={`flex items-center gap-1.5 text-xs font-semibold mb-1.5 ${color}`}>
                              <Icon size={12} />
                              {label}
                            </div>
                            <p className="text-white/65 text-sm leading-relaxed">{content}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}

                  {/* Tips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="glass border border-white/5 rounded-2xl p-5">
                      <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Backpack size={12} className="text-gold-400" />
                        Packing Tips
                      </h3>
                      <ul className="space-y-1.5">
                        {plan.packingTips?.map((tip, i) => (
                          <li key={i} className="text-sm text-white/65 flex items-start gap-2">
                            <span className="text-gold-400 shrink-0 mt-0.5">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="glass border border-white/5 rounded-2xl p-5">
                      <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Info size={12} className="text-blue-400" />
                        General Tips
                      </h3>
                      <ul className="space-y-1.5">
                        {plan.generalTips?.map((tip, i) => (
                          <li key={i} className="text-sm text-white/65 flex items-start gap-2">
                            <span className="text-blue-400 shrink-0 mt-0.5">•</span>
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
