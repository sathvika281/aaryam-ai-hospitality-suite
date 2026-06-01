"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Sparkles,
  Instagram,
  Facebook,
  MessageCircle,
  Twitter,
  Copy,
  CheckCheck,
  Loader2,
  Tag,
  Mail,
} from "lucide-react";

const audienceTypes = [
  "Couples & Honeymooners",
  "Families",
  "Adventure Seekers",
  "Corporate Professionals",
  "Solo Travelers",
  "Luxury Travelers",
];

type SocialContent = {
  instagram: { caption: string; hashtags: string[] };
  whatsapp: { message: string };
  facebook: { post: string };
  twitter: { tweet: string };
  emailSubject: string;
  callToAction: string;
};

export default function SocialPage() {
  const [form, setForm] = useState({
    offerName: "",
    eventDetails: "",
    roomDetails: "",
    audienceType: "Couples & Honeymooners",
  });
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<SocialContent | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setContent(null);

    try {
      const res = await fetch("/api/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate content");
    } finally {
      setLoading(false);
    }
  };

  const platforms = content
    ? [
        {
          key: "instagram",
          label: "Instagram",
          icon: Instagram,
          color: "from-pink-500 to-purple-600",
          textColor: "text-pink-400",
          borderColor: "border-pink-500/20",
          text: `${content.instagram.caption}\n\n${content.instagram.hashtags.join(" ")}`,
          extra: content.instagram.hashtags,
        },
        {
          key: "whatsapp",
          label: "WhatsApp",
          icon: MessageCircle,
          color: "from-green-500 to-emerald-600",
          textColor: "text-emerald-400",
          borderColor: "border-emerald-500/20",
          text: content.whatsapp.message,
        },
        {
          key: "facebook",
          label: "Facebook",
          icon: Facebook,
          color: "from-blue-500 to-blue-700",
          textColor: "text-blue-400",
          borderColor: "border-blue-500/20",
          text: content.facebook.post,
        },
        {
          key: "twitter",
          label: "Twitter/X",
          icon: Twitter,
          color: "from-sky-400 to-sky-600",
          textColor: "text-sky-400",
          borderColor: "border-sky-500/20",
          text: content.twitter.tweet,
        },
      ]
    : [];

  return (
    <div className="min-h-screen pt-20 bg-[#04070d] pb-20">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 bg-[#080e1a]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-64 h-32 bg-pink-500/5 blur-3xl rounded-full" />
          <div className="absolute top-0 right-1/3 w-64 h-32 bg-purple-500/5 blur-3xl rounded-full" />
        </div>
        <div className="max-w-5xl mx-auto px-4 py-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-widest mb-5">
            <Share2 size={12} />
            Social Media Studio
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-3">
            AI Content{" "}
            <span className="gold-text">Generator</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-base">
            Generate compelling social media content for Instagram, WhatsApp, Facebook, and Twitter — all at once with Gemini AI.
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
            <div className="glass border border-white/5 rounded-2xl p-6 space-y-5">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <Sparkles size={16} className="text-pink-400" />
                Campaign Details
              </h2>

              <div>
                <label className="block text-white/60 text-sm mb-2">Offer / Campaign Name</label>
                <input
                  type="text"
                  value={form.offerName}
                  onChange={(e) => setForm({ ...form, offerName: e.target.value })}
                  placeholder="e.g. Monsoon Special Offer"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-pink-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Event / Offer Details</label>
                <textarea
                  value={form.eventDetails}
                  onChange={(e) => setForm({ ...form, eventDetails: e.target.value })}
                  placeholder="e.g. 30% off on all rooms, complimentary dinner included, valid July-August 2025"
                  required
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-pink-500/50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Room / Package Featured</label>
                <input
                  type="text"
                  value={form.roomDetails}
                  onChange={(e) => setForm({ ...form, roomDetails: e.target.value })}
                  placeholder="e.g. Honeymoon Suite at ₹12,000/night"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-pink-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-3">Target Audience</label>
                <div className="grid grid-cols-2 gap-2">
                  {audienceTypes.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setForm({ ...form, audienceType: a })}
                      className={`px-3 py-2 rounded-xl text-xs text-left transition-all border ${
                        form.audienceType === a
                          ? "bg-pink-500/15 border-pink-500/40 text-white"
                          : "border-white/5 text-white/50 hover:border-white/15 hover:text-white/80"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Generating...</>
                ) : (
                  <><Sparkles size={16} /> Generate Content</>
                )}
              </button>
            </div>
          </motion.form>

          {/* Results */}
          <div className="lg:col-span-3 space-y-5">
            <AnimatePresence mode="wait">
              {!content && !loading && !error && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-pink-500/10 flex items-center justify-center mx-auto">
                      <Share2 size={36} className="text-pink-400/60" />
                    </div>
                    <p className="text-white/40 text-sm max-w-xs">
                      Fill in your campaign details and generate ready-to-post content for all major social platforms
                    </p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center justify-center min-h-[400px]">
                  <div className="glass border border-red-500/20 rounded-2xl p-6 text-center">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                </motion.div>
              )}

              {content && (
                <motion.div key="content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }} className="space-y-4">
                  {/* CTA bar */}
                  <div className="glass border border-gold-500/20 rounded-2xl px-5 py-3.5 flex items-center gap-3">
                    <Tag size={14} className="text-gold-400 shrink-0" />
                    <div>
                      <span className="text-white/40 text-xs">Call to Action: </span>
                      <span className="text-white/80 text-sm">{content.callToAction}</span>
                    </div>
                  </div>
                  <div className="glass border border-blue-500/10 rounded-2xl px-5 py-3.5 flex items-center gap-3">
                    <Mail size={14} className="text-blue-400 shrink-0" />
                    <div>
                      <span className="text-white/40 text-xs">Email Subject: </span>
                      <span className="text-white/80 text-sm">{content.emailSubject}</span>
                    </div>
                  </div>

                  {/* Platform cards */}
                  {platforms.map((p, i) => (
                    <motion.div
                      key={p.key}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`glass border ${p.borderColor} rounded-2xl overflow-hidden`}
                    >
                      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                            <p.icon size={14} className="text-white" />
                          </div>
                          <span className={`text-sm font-semibold ${p.textColor}`}>{p.label}</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(p.text, p.key)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white glass-light transition-all"
                        >
                          {copied === p.key ? (
                            <><CheckCheck size={12} className="text-emerald-400" /> Copied!</>
                          ) : (
                            <><Copy size={12} /> Copy</>
                          )}
                        </button>
                      </div>
                      <div className="p-5">
                        <p className="text-white/75 text-sm leading-relaxed whitespace-pre-wrap">{p.text}</p>
                        {p.extra && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {p.extra.map((tag: string) => (
                              <span key={tag} className="text-xs text-pink-400/80 bg-pink-500/10 px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
