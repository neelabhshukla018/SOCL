"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  Download,
  Eye,
  FileText,
  Globe,
  Heart,
  HelpCircle,
  Layers,
  Link2,
  Loader2,
  Lock,
  MessageCircle,
  Play,
  Radio,
  Search,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import PlatformPngIcon from "./PlatformPngIcon";

interface PresetSample {
  id: string;
  platform: "instagram" | "x" | "youtube" | "reddit" | "facebook";
  platformName: string;
  url: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  sentimentScore: number;
  sentimentLabel: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  emotions: { name: string; score: number }[];
  topics: string[];
  commentsSample: {
    user: string;
    text: string;
    sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
    likes: number;
  }[];
}

const PRESET_SAMPLES: PresetSample[] = [
  {
    id: "sample-ig",
    platform: "instagram",
    platformName: "Instagram",
    url: "https://www.instagram.com/reel/C8kP2qA1x4/",
    author: "@techfuture_labs",
    content: "Unboxing the revolutionary AI Neural Headset. Hands down the smoothest latency we've ever tested on a consumer device! 🎧⚡",
    likes: 42800,
    comments: 1340,
    shares: 8900,
    views: 380000,
    sentimentScore: 92,
    sentimentLabel: "POSITIVE",
    emotions: [
      { name: "Excitement", score: 88 },
      { name: "Awe", score: 76 },
      { name: "Curiosity", score: 64 },
    ],
    topics: ["Neural Interface", "Hardware Review", "Low Latency Audio"],
    commentsSample: [
      {
        user: "sarah_codes",
        text: "The audio separation is unmatched, worth every penny!",
        sentiment: "POSITIVE",
        likes: 312,
      },
      {
        user: "alex_designs",
        text: "Battery life was my only concern but 14 hours is solid.",
        sentiment: "POSITIVE",
        likes: 184,
      },
      {
        user: "musicproducer_dan",
        text: "How does it handle FLAC 24-bit streams?",
        sentiment: "NEUTRAL",
        likes: 45,
      },
    ],
  },
  {
    id: "sample-x",
    platform: "x",
    platformName: "X / Twitter",
    url: "https://x.com/product_insider/status/183920194819",
    author: "@product_insider",
    content: "Major announcement: We just open-sourced our entire real-time vector inference pipeline. Zero rate limits, 100% self-hostable. 🚀",
    likes: 18500,
    comments: 890,
    shares: 4300,
    views: 245000,
    sentimentScore: 89,
    sentimentLabel: "POSITIVE",
    emotions: [
      { name: "Gratitude", score: 85 },
      { name: "Inspiration", score: 82 },
      { name: "Interest", score: 79 },
    ],
    topics: ["Open Source", "Vector Search", "Developer Tools"],
    commentsSample: [
      {
        user: "dev_marcus",
        text: "This is a massive win for the developer community. Thank you!",
        sentiment: "POSITIVE",
        likes: 142,
      },
      {
        user: "ai_researcher",
        text: "Testing the docker compose setup right now. Worked in 30 seconds.",
        sentiment: "POSITIVE",
        likes: 98,
      },
      {
        user: "cloud_admin",
        text: "What are the minimum RAM requirements for the 7B index?",
        sentiment: "NEUTRAL",
        likes: 27,
      },
    ],
  },
  {
    id: "sample-yt",
    platform: "youtube",
    platformName: "YouTube",
    url: "https://youtube.com/watch?v=kY9q018bZ7",
    author: "Marques Tech Reviews",
    content: "The 30-Day Honest Long Term Review: Is this the smartphone upgrade you've actually been waiting for?",
    likes: 89400,
    comments: 4210,
    shares: 12400,
    views: 1250000,
    sentimentScore: 78,
    sentimentLabel: "POSITIVE",
    emotions: [
      { name: "Trust", score: 84 },
      { name: "Rationality", score: 79 },
      { name: "Enthusiasm", score: 70 },
    ],
    topics: ["Camera Sensor", "Thermal Throttling", "Value Proposition"],
    commentsSample: [
      {
        user: "tech_enthusiast99",
        text: "Appreciate the honest camera samples in direct sunlight.",
        sentiment: "POSITIVE",
        likes: 840,
      },
      {
        user: "jordan_vids",
        text: "The titanium finish holds up way better than expected.",
        sentiment: "POSITIVE",
        likes: 412,
      },
      {
        user: "gadget_guy",
        text: "Still wish charging speed was 65W instead of 30W.",
        sentiment: "NEUTRAL",
        likes: 189,
      },
    ],
  },
  {
    id: "sample-reddit",
    platform: "reddit",
    platformName: "Reddit",
    url: "https://reddit.com/r/technology/comments/1f8a9e/new_update/",
    author: "u/silicon_watcher",
    content: "Discussion thread on the newly passed digital privacy and AI watermark standard across browser engines.",
    likes: 6400,
    comments: 1120,
    shares: 1950,
    views: 89000,
    sentimentScore: 68,
    sentimentLabel: "NEUTRAL",
    emotions: [
      { name: "Curiosity", score: 74 },
      { name: "Caution", score: 68 },
      { name: "Analytical", score: 62 },
    ],
    topics: ["Digital Privacy", "Browser Governance", "AI Attribution"],
    commentsSample: [
      {
        user: "net_security_pro",
        text: "The metadata standard looks solid, glad they preserved encryption.",
        sentiment: "POSITIVE",
        likes: 310,
      },
      {
        user: "privacy_first",
        text: "Need to make sure small open source models aren't overburdened.",
        sentiment: "NEUTRAL",
        likes: 215,
      },
      {
        user: "openweb_fan",
        text: "Let's see how fast browser vendors actually implement this.",
        sentiment: "NEUTRAL",
        likes: 95,
      },
    ],
  },
];

export function InteractiveHeroSimulator() {
  const [selectedSample, setSelectedSample] = useState<PresetSample>(PRESET_SAMPLES[0]);
  const [inputUrl, setInputUrl] = useState<string>(PRESET_SAMPLES[0].url);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analyzedData, setAnalyzedData] = useState<PresetSample>(PRESET_SAMPLES[0]);
  const [progressStep, setProgressStep] = useState<number>(3);
  const [activeTourTab, setActiveTourTab] = useState<"sentiment" | "radar" | "audience" | "reports">("sentiment");

  const detectPlatform = (url: string) => {
    const lower = url.toLowerCase();
    if (lower.includes("instagram.com")) return "instagram";
    if (lower.includes("x.com") || lower.includes("twitter.com")) return "x";
    if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
    if (lower.includes("reddit.com")) return "reddit";
    if (lower.includes("facebook.com")) return "facebook";
    return "instagram";
  };

  const handleSelectPreset = (sample: PresetSample) => {
    setSelectedSample(sample);
    setInputUrl(sample.url);
    setActiveTourTab("sentiment");
    triggerAnalysis(sample);
  };

  const triggerAnalysis = (targetSample?: PresetSample) => {
    const sample = targetSample || selectedSample;
    setIsAnalyzing(true);
    setProgressStep(1);

    setTimeout(() => {
      setProgressStep(2);
    }, 400);

    setTimeout(() => {
      setProgressStep(3);
      setAnalyzedData(sample);
      setIsAnalyzing(false);
    }, 850);
  };

  const handleCustomAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    const platform = detectPlatform(inputUrl);
    const matched = PRESET_SAMPLES.find((s) => s.platform === platform) || PRESET_SAMPLES[0];
    const customSample: PresetSample = {
      ...matched,
      url: inputUrl,
    };
    setSelectedSample(customSample);
    setActiveTourTab("sentiment");
    triggerAnalysis(customSample);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10">
      {/* Outer Glow Halo - Forest & Mint Light Bloom */}
      <div className="pointer-events-none absolute -inset-2 sm:-inset-4 rounded-3xl bg-gradient-to-r from-[#163832]/15 via-[#235347]/15 to-[#8EB69B]/20 blur-2xl opacity-80 md:animate-pulse -z-10" />

      {/* Terminal Container */}
      <div className="rounded-3xl border border-[#8EB69B]/30 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 shadow-[0_20px_50px_-12px_rgba(11,43,38,0.08)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden transition-all text-left">
        {/* Terminal Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DAF1DE] dark:border-zinc-800/80 px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#DAF1DE]/40 via-white to-[#DAF1DE]/20 dark:bg-zinc-950/60 gap-3">
          <div className="flex items-center gap-3">
            {/* Window controls */}
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-400/85 border border-rose-500/20" />
              <span className="h-3 w-3 rounded-full bg-amber-400/85 border border-amber-500/20" />
              <span className="h-3 w-3 rounded-full bg-[#8EB69B] border border-[#235347]/20" />
            </div>

            <span className="h-4 w-px bg-[#8EB69B]/30 dark:bg-zinc-800 hidden sm:inline-block" />

            {/* Badge */}
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-[#051F20] dark:text-zinc-300">
              <Sparkles size={13} className="text-[#235347] dark:text-[#8EB69B]" />
              <span>Interactive Post Analysis Simulator</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full bg-[#DAF1DE] dark:bg-emerald-950/40 text-[#0B2B26] dark:text-[#DAF1DE] border border-[#8EB69B]/50 dark:border-emerald-800/60 font-semibold shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#235347] animate-pulse" />
              Gemini 2.5 Flash Engine
            </span>
          </div>
        </div>

        {/* URL Bar & 1-Click Samples */}
        <div className="p-4 sm:p-6 border-b border-[#DAF1DE] dark:border-zinc-800/60 bg-white dark:bg-zinc-900/40">
          <form onSubmit={handleCustomAnalyze} className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1 flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none">
                <PlatformPngIcon platform={detectPlatform(inputUrl)} size={20} />
              </div>
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Paste Instagram, YouTube, X, Reddit, or Facebook post URL..."
                className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm rounded-xl border border-[#8EB69B]/40 dark:border-zinc-700/80 bg-[#DAF1DE]/15 dark:bg-zinc-950/50 text-[#051F20] dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#235347]/20 focus:border-[#235347] transition font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0B2B26] via-[#163832] to-[#235347] hover:from-[#051F20] hover:to-[#163832] text-[#DAF1DE] text-xs sm:text-sm font-semibold shadow-[0_6px_20px_rgba(11,43,38,0.25)] transition active:scale-98 disabled:opacity-75 cursor-pointer shrink-0"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={16} className="animate-spin text-white" />
                  <span>Analyzing Post...</span>
                </>
              ) : (
                <>
                  <Zap size={16} className="fill-[#DAF1DE]" />
                  <span>Analyze Instant</span>
                </>
              )}
            </button>
          </form>

          {/* Quick-Click Sample Presets */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-medium text-[#235347] dark:text-zinc-400">
              Try a sample link:
            </span>
            {PRESET_SAMPLES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectPreset(sample)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  selectedSample.id === sample.id && activeTourTab === "sentiment"
                    ? "border-[#235347] bg-[#DAF1DE] text-[#0B2B26] dark:text-[#DAF1DE] dark:border-[#8EB69B]/40 font-semibold shadow-2xs"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-[#8EB69B] hover:text-[#235347] dark:hover:border-zinc-700"
                }`}
              >
                <PlatformPngIcon platform={sample.platform} size={14} />
                <span>{sample.platformName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Simulation Visual Area */}
        <div className="p-4 sm:p-6 relative min-h-[380px]">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="analyzing-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="py-16 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200/80 shadow-inner">
                  <Cpu size={26} className="animate-pulse" />
                  <span className="absolute -inset-1 rounded-2xl border border-indigo-400/40 animate-ping opacity-60" />
                </div>

                <div className="space-y-1.5 max-w-sm">
                  <h4 className="font-display text-base font-bold text-zinc-900 dark:text-white">
                    {progressStep === 1
                      ? "Ingesting Public Post & Audience Comments..."
                      : progressStep === 2
                      ? "Running Google Gemini Multi-Vector Analysis..."
                      : "Synthesizing Real Sentiment Metrics..."}
                  </h4>
                  <p className="text-xs text-zinc-500 font-mono">
                    Scraping public engagement signals • Filtering spam
                  </p>
                </div>

                {/* Simulated Progress Track */}
                <div className="w-64 h-1.5 rounded-full bg-indigo-50 dark:bg-zinc-800 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-400 rounded-full"
                    initial={{ width: "15%" }}
                    animate={{ width: progressStep === 1 ? "40%" : progressStep === 2 ? "80%" : "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>
            ) : activeTourTab === "sentiment" ? (
              /* TAB 1: POST SENTIMENT ENGINE */
              <motion.div
                key="tab-sentiment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {/* Post Summary Header Card */}
                <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <PlatformPngIcon platform={analyzedData.platform} size={28} className="mt-0.5 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display text-sm font-bold text-zinc-950 dark:text-white">
                          {analyzedData.author}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500">
                          {analyzedData.platformName} Post
                        </span>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                        &ldquo;{analyzedData.content}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Real-time telemetry counter pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center shrink-0">
                    <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                      <span className="block text-[10px] font-mono uppercase text-zinc-400">Likes</span>
                      <span className="text-xs font-bold text-zinc-900 dark:text-white font-mono">
                        {analyzedData.likes.toLocaleString()}
                      </span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                      <span className="block text-[10px] font-mono uppercase text-zinc-400">Comments</span>
                      <span className="text-xs font-bold text-zinc-900 dark:text-white font-mono">
                        {analyzedData.comments.toLocaleString()}
                      </span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                      <span className="block text-[10px] font-mono uppercase text-zinc-400">Shares</span>
                      <span className="text-xs font-bold text-zinc-900 dark:text-white font-mono">
                        {analyzedData.shares.toLocaleString()}
                      </span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
                      <span className="block text-[10px] font-mono uppercase text-zinc-400">Views</span>
                      <span className="text-xs font-bold text-zinc-900 dark:text-white font-mono">
                        {analyzedData.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-2xs">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                        AI Sentiment Index
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        {analyzedData.sentimentLabel}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        {analyzedData.sentimentScore}%
                      </span>
                      <span className="text-xs text-zinc-500 font-medium">Positive Audience Tone</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
                      <div style={{ width: `${analyzedData.sentimentScore}%` }} className="bg-emerald-500" />
                      <div style={{ width: `${100 - analyzedData.sentimentScore}%` }} className="bg-sky-400" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-2xs">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                        Emotion Vector
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-indigo-50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70">
                        96% Confidence
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {analyzedData.emotions.map((em) => (
                        <span
                          key={em.name}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50/40 dark:bg-zinc-800/80 border border-indigo-100 dark:border-zinc-700 text-indigo-950 dark:text-zinc-200"
                        >
                          <span>{em.name}</span>
                          <span className="font-mono text-[10px] text-indigo-500 font-semibold">{em.score}%</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-2xs">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                        PR Crisis Risk
                      </span>
                      <ShieldCheck size={18} className="text-emerald-500" />
                    </div>
                    <p className="font-display text-base font-bold text-zinc-900 dark:text-white">
                      Zero Escalation Danger
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                      Real sentiment is steady across commenters. Negative spam bot velocity is 0%.
                    </p>
                  </div>
                </div>

                {/* Sample Audience Comments */}
                <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">
                      Extracted Audience Voices (Sample)
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {analyzedData.commentsSample.length} verified comments analyzed
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {analyzedData.commentsSample.map((c, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 shadow-2xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-zinc-900 dark:text-white">@{c.user}</span>
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                            {c.sentiment}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">&ldquo;{c.text}&rdquo;</p>
                        <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1 pt-1">
                          <Heart size={10} className="fill-rose-300 text-rose-400" />
                          {c.likes} likes
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : activeTourTab === "radar" ? (
              /* TAB 2: PR CRISIS RADAR */
              <motion.div
                key="tab-radar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 border border-indigo-200 dark:border-indigo-800">
                      <Radio size={22} className="animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-zinc-900 dark:text-white">
                        24/7 Crisis Anomaly Radar
                      </h4>
                      <p className="text-xs text-zinc-500">
                        Autonomous early-detection network across X, Reddit, Instagram, and YouTube.
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 self-start md:self-auto">
                    ALL SIGNALS CALM
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Volume Velocity</span>
                    <p className="text-xl font-bold font-mono text-zinc-900 dark:text-white">1.2x Normal</p>
                    <p className="text-[11px] text-emerald-600 font-medium">Safe baseline traffic</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Negative Spike Trigger</span>
                    <p className="text-xl font-bold font-mono text-zinc-900 dark:text-white">0 Alerts</p>
                    <p className="text-[11px] text-emerald-600 font-medium">Zero hostile coordination</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Bot Spam Filtered</span>
                    <p className="text-xl font-bold font-mono text-zinc-900 dark:text-white">142 Accounts</p>
                    <p className="text-[11px] text-zinc-500 font-medium">Automated PII &amp; astroturf mask</p>
                  </div>
                </div>

                {/* Radar Event Stream */}
                <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-2">
                  <span className="text-xs font-mono font-bold text-zinc-500 uppercase">Live Intercept Stream</span>
                  <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                    <div className="py-2 flex items-center justify-between">
                      <span className="font-mono text-indigo-600 font-semibold">Reddit r/technology</span>
                      <span className="text-zinc-600 dark:text-zinc-300">Feature release inquiry answered in 14m</span>
                      <span className="font-mono text-[10px] text-zinc-400">2m ago</span>
                    </div>
                    <div className="py-2 flex items-center justify-between">
                      <span className="font-mono text-violet-600 font-semibold">X (Twitter)</span>
                      <span className="text-zinc-600 dark:text-zinc-300">Customer sentiment shifted +18% positive</span>
                      <span className="font-mono text-[10px] text-zinc-400">8m ago</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTourTab === "audience" ? (
              /* TAB 3: AUDIENCE DEMOGRAPHICS */
              <motion.div
                key="tab-audience"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 p-4 sm:p-5 flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-base font-bold text-zinc-950 dark:text-white">
                      Audience Demographic Breakdown
                    </h4>
                    <p className="text-xs text-zinc-500">
                      AI classifies commenter profiles by authenticity, role, and influence score.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 text-indigo-700 dark:text-indigo-300 border border-indigo-200">
                    68.4% Real Engagement Rate
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-zinc-700 dark:text-zinc-200">Verified Customers</span>
                      <span className="font-mono text-emerald-600">62%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[62%]" />
                    </div>
                    <span className="block text-[10px] text-zinc-400">High brand advocacy ratio</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-zinc-700 dark:text-zinc-200">Tech &amp; PR Media</span>
                      <span className="font-mono text-indigo-600 font-semibold">24%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full w-[24%]" />
                    </div>
                    <span className="block text-[10px] text-zinc-400">Industry journalists &amp; analysts</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-zinc-700 dark:text-zinc-200">General Public</span>
                      <span className="font-mono text-violet-600 font-semibold">14%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full w-[14%]" />
                    </div>
                    <span className="block text-[10px] text-zinc-400">Organic viral viewers</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* TAB 4: EXECUTIVE INTELLIGENCE REPORTS */
              <motion.div
                key="tab-reports"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200">
                      <FileText size={22} />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-zinc-950 dark:text-white">
                        One-Click Executive Intelligence Reports
                      </h4>
                      <p className="text-xs text-zinc-500">
                        Automatically synthesized from your analyzed posts, feeds, and sentiment trends.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 inline-flex items-center gap-1.5 shadow-2xs">
                      <Download size={13} /> PDF
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 inline-flex items-center gap-1.5 shadow-2xs">
                      <Download size={13} /> CSV
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-indigo-100/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-600 uppercase">
                      WEEKLY INTELLIGENCE REPORT • SIR-2026-DEMO
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">Ready to Export</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
                    Multi-Platform Brand Reputation &amp; Signal Synthesis
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Comprehensive intelligence compiled across verified Instagram, X, Reddit, and YouTube conversations. Audience response is 92% positive with zero PR crisis escalations recorded.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Visual Product Tour Switcher Bar */}
        <div className="border-t border-[#DAF1DE] dark:border-zinc-800 bg-gradient-to-r from-[#DAF1DE]/30 via-white to-[#DAF1DE]/20 dark:bg-zinc-950/80 p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold text-[#051F20] dark:text-zinc-400 uppercase mr-1">
              Explore Suite:
            </span>
            <button
              type="button"
              onClick={() => setActiveTourTab("sentiment")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTourTab === "sentiment"
                  ? "bg-[#163832] text-[#DAF1DE] shadow-xs"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-[#8EB69B] hover:text-[#235347]"
              }`}
            >
              1. Sentiment Engine
            </button>
            <button
              type="button"
              onClick={() => setActiveTourTab("radar")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTourTab === "radar"
                  ? "bg-[#163832] text-[#DAF1DE] shadow-xs"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-[#8EB69B] hover:text-[#235347]"
              }`}
            >
              2. PR Crisis Radar
            </button>
            <button
              type="button"
              onClick={() => setActiveTourTab("audience")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTourTab === "audience"
                  ? "bg-[#163832] text-[#DAF1DE] shadow-xs"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-[#8EB69B] hover:text-[#235347]"
              }`}
            >
              3. Audience Demographics
            </button>
            <button
              type="button"
              onClick={() => setActiveTourTab("reports")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTourTab === "reports"
                  ? "bg-[#163832] text-[#DAF1DE] shadow-xs"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-[#8EB69B] hover:text-[#235347]"
              }`}
            >
              4. Executive Reports
            </button>
          </div>

          <SignUpButton mode="modal">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0B2B26] via-[#163832] to-[#235347] hover:from-[#051F20] hover:to-[#163832] text-[#DAF1DE] text-xs font-bold shadow-[0_4px_14px_rgba(11,43,38,0.25)] transition active:scale-98 cursor-pointer shrink-0"
            >
              <span>Analyze Real Post Free</span>
              <ArrowRight size={14} />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}

export default InteractiveHeroSimulator;
