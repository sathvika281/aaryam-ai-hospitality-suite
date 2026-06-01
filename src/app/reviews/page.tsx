"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Sparkles,
  Loader2,
  Copy,
  CheckCheck,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Lightbulb,
  ClipboardList,
} from "lucide-react";

const sampleReviews = [
  "The room was great but check-in was a bit slow. The mountain views are absolutely breathtaking!",
  "Excellent stay! The staff was incredibly warm and the food at The Summit Bistro was outstanding. Highly recommend the honeymoon suite.",
  "Beautiful location but we faced some WiFi issues. The campfire evening was magical though!",
  "The trekking guided tour was absolutely amazing. Could improve the breakfast variety.",
];

type ReviewResponse = {
  response: string;
  sentiment: "positive" | "mixed" | "negative";
  keyPoints: string[];
  actionItems: string[];
  tone: string;
};

export default function ReviewsPage() {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewResponse | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const copyResponse = () => {
    if (result?.response) {
      navigator.clipboard.writeText(result.response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate response");
    } finally {
      setLoading(false);
    }
  };

  const sentimentConfig = {
    positive: { icon: ThumbsUp, color: "text-emerald-400", bg: "bg-emerald-500/15", border: "border-emerald-500/30", label: "Positive Review" },
    mixed: { icon: Minus, color: "text-yellow-400", bg: "bg-yellow-500/15", border: "border-yellow-500/30", label: "Mixed Review" },
    negative: { icon: ThumbsDown, color: "text-red-400", bg: "bg-red-500/15", border: "border-red-500/30", label: "Negative Review" },
  };

  const sentiment = result?.sentiment ? sentimentConfig[result.sentiment] : null;

  return (
    <div className="min-h-screen pt-20 bg-[#04070d] pb-20">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 bg-[#080e1a]">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-64 h-32 bg-yellow-500/5 blur-3xl rounded-full" />
        </div>
        <div className="max-w-5xl mx-auto px-4 py-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-yellow-500/20 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-5">
            <Star size={12} />
            AI Review Assistant
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-3">
            Guest Review{" "}
            <span className="gold-text">Response Generator</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-base">
            Transform any guest review into a thoughtful, professional management response that showcases premium hospitality values.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="glass border border-white/5 rounded-2xl p-6 space-y-5">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <MessageSquare size={16} className="text-yellow-400" />
                Guest Review
              </h2>

              <div>
                <label className="block text-white/60 text-sm mb-2">Paste the guest review</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Enter the guest review here..."
                  rows={5}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-yellow-500/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !review.trim()}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-yellow-600 to-gold-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <><Loader2 size={16} className="animate-spin" /> Crafting Response...</>
                ) : (
                  <><Sparkles size={16} /> Generate Response</>
                )}
              </button>
            </form>

            {/* Sample reviews */}
            <div className="mt-5 glass border border-white/5 rounded-2xl p-5">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Lightbulb size={11} />
                Sample Reviews to Try
              </p>
              <div className="space-y-2">
                {sampleReviews.map((sample, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setReview(sample)}
                    className="w-full text-left text-xs text-white/50 hover:text-white/80 p-2.5 rounded-lg hover:bg-white/5 transition-all leading-relaxed border border-transparent hover:border-white/10"
                  >
                    &ldquo;{sample}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Output */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {!result && !loading && !error && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center justify-center min-h-[400px]">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-yellow-500/10 flex items-center justify-center mx-auto">
                      <Star size={36} className="text-yellow-400/60" />
                    </div>
                    <p className="text-white/40 text-sm max-w-xs">
                      Paste a guest review on the left and our AI will craft a professional management response
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

              {result && (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }} className="space-y-5">
                  {/* Sentiment + tone */}
                  <div className="flex flex-wrap gap-3">
                    {sentiment && (
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm ${sentiment.bg} ${sentiment.border} border ${sentiment.color}`}>
                        <sentiment.icon size={14} />
                        {sentiment.label}
                      </div>
                    )}
                    {result.tone && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white/60">
                        Tone: <span className="text-white/80 capitalize">{result.tone}</span>
                      </div>
                    )}
                  </div>

                  {/* Response card */}
                  <div className="glass border border-gold-500/20 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center">
                          <MessageSquare size={14} className="text-white" />
                        </div>
                        <span className="text-gold-400 text-sm font-semibold">Management Response</span>
                      </div>
                      <button
                        onClick={copyResponse}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white glass-light transition-all"
                      >
                        {copied ? (
                          <><CheckCheck size={12} className="text-emerald-400" /> Copied!</>
                        ) : (
                          <><Copy size={12} /> Copy</>
                        )}
                      </button>
                    </div>
                    <div className="p-5">
                      <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                        {result.response}
                      </p>
                    </div>
                  </div>

                  {/* Analysis */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="glass border border-white/5 rounded-2xl p-5">
                      <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Lightbulb size={12} className="text-yellow-400" />
                        Key Points Addressed
                      </h3>
                      <ul className="space-y-2">
                        {result.keyPoints?.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                            <span className="text-yellow-400 shrink-0 mt-0.5">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="glass border border-white/5 rounded-2xl p-5">
                      <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                        <ClipboardList size={12} className="text-blue-400" />
                        Follow-up Actions
                      </h3>
                      <ul className="space-y-2">
                        {result.actionItems?.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/65">
                            <span className="text-blue-400 shrink-0 mt-0.5">→</span>
                            {action}
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
