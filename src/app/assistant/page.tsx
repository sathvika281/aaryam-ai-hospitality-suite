"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  ChevronRight,
  Info,
} from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const suggestedQuestions = [
  "What rooms do you offer?",
  "What attractions are nearby?",
  "What activities can I do?",
  "Is breakfast included?",
  "What are check-in timings?",
  "Do you offer honeymoon packages?",
  "What amenities do you have?",
  "How can I reach the resort?",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Namaste! 🙏 Welcome to **Aaryam Resorts**, your luxury mountain escape in Nainital, Uttarakhand.\n\nI'm your personal AI concierge. I can help you with:\n- **Room options & pricing**\n- **Resort amenities & activities**\n- **Nearby attractions**\n- **Check-in/check-out policies**\n- **Package recommendations**\n\nHow can I make your stay unforgettable today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: data.response || data.error || "Sorry, I couldn't get a response. Please try again.",
        },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-[#04070d] flex flex-col">
      {/* Header */}
      <div className="relative border-b border-white/5 bg-[#080e1a]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-gold-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Bot size={20} className="text-white" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#080e1a] animate-pulse" />
            </div>
            <div>
              <h1 className="font-serif font-semibold text-white text-lg">
                AI Concierge
              </h1>
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Online · Powered by Gemini
              </div>
            </div>
          </div>
          <button
            onClick={() =>
              setMessages([
                {
                  role: "assistant",
                  content:
                    "Namaste! 🙏 Welcome back to **Aaryam Resorts**. How can I assist you today?",
                },
              ])
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-light text-white/60 hover:text-white text-sm transition-all hover:border-white/20"
          >
            <RotateCcw size={14} />
            New Chat
          </button>
        </div>
      </div>

      <div className="flex-1 flex max-w-5xl mx-auto w-full px-4 py-6 gap-5">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-4">
          <div className="glass border border-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={12} className="text-gold-400" />
              Suggested Questions
            </div>
            <div className="space-y-1.5">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all flex items-start gap-2 group disabled:opacity-50"
                >
                  <ChevronRight size={12} className="mt-0.5 shrink-0 group-hover:text-gold-400 transition-colors" />
                  {q}
                </button>
              ))}
            </div>
          </div>
          <div className="glass border border-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
              <Info size={12} className="text-emerald-400" />
              Resort Info
            </div>
            <div className="space-y-2 text-xs text-white/50">
              <div className="flex justify-between">
                <span>Check-in</span>
                <span className="text-white/70">2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out</span>
                <span className="text-white/70">11:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span>Breakfast</span>
                <span className="text-emerald-400">Included</span>
              </div>
              <div className="flex justify-between">
                <span>Deluxe Room</span>
                <span className="gold-text font-medium">₹5,000/night</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      msg.role === "assistant"
                        ? "bg-gradient-to-br from-gold-500 to-emerald-600"
                        : "bg-navy-600 border border-white/10"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot size={15} className="text-white" />
                    ) : (
                      <User size={15} className="text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gold-500/10 border border-gold-500/20 text-white/90 rounded-tr-sm"
                        : "glass border border-white/5 text-white/85 rounded-tl-sm"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose-ai">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-500 to-emerald-600 flex items-center justify-center shrink-0">
                  <Bot size={15} className="text-white" />
                </div>
                <div className="glass border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="typing-dots flex gap-1.5 items-center h-5">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Mobile suggested */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {suggestedQuestions.slice(0, 4).map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={loading}
                className="shrink-0 px-3 py-2 rounded-xl text-xs text-white/60 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50 whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="mt-3">
            <div className="glass border border-white/10 rounded-2xl p-3 flex items-end gap-3 focus-within:border-gold-500/30 transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about rooms, activities, nearby places..."
                rows={1}
                className="flex-1 bg-transparent text-white placeholder-white/30 text-sm resize-none outline-none leading-relaxed max-h-32 overflow-y-auto"
                style={{ minHeight: "1.5rem" }}
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shrink-0"
              >
                <Send size={15} />
              </button>
            </div>
            <p className="text-center text-white/20 text-xs mt-2">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
