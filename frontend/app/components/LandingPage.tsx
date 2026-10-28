"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUp,
  Check,
  CheckCircle2,
  Cpu,
  Database,
  EyeOff,
  FileText,
  Globe,
  Lock,
  MessageSquare,
  Network,
  Radio,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

// Components
import Navbar from "./Navbar";
import { SparklesCore } from "./ui/sparkles";
import { FlipWords } from "./ui/flip-words";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { WobbleCard } from "./ui/wobble-card";
import { CardContainer, CardBody, CardItem } from "./ui/card-3d";
import { PRCommandCenter3D } from "./PRCommandCenter3D";
import { InteractiveHeroSimulator } from "./InteractiveHeroSimulator";

export default function LandingPage() {
  const [activePolicyTab, setActivePolicyTab] = React.useState(0);
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const targetWords = [
    "Your Brand",
    "PR Clients",
    "Key Executives",
    "Product Launches",
    "Public Figures",
  ];

  const policyTabs = [
    {
      id: "public-ingestion",
      title: "Public Ingestion",
      badge: "Ethical Collection",
      headline: "Strictly Public Social Content — Zero Private Intrusion",
      content:
        "SocialInt is architected to exclusively collect and analyze publicly accessible social media posts, comments, captions, and thread metrics across supported channels (X/Twitter, Reddit, Instagram, YouTube, and Facebook). We operate strictly in compliance with public web standards and Apify scraping governance.",
      points: [
        "Zero access to private profiles, gated direct messages (DMs), or closed channels.",
        "Respects platform rate limits, robots.txt, and public API data boundaries.",
        "Automatic caching mechanisms prevent redundant requests to platform endpoints.",
        "Users can submit specific public URLs for on-demand sentiment evaluation without bulk scraping.",
      ],
    },
    {
      id: "ai-privacy",
      title: "Google Gemini AI",
      badge: "Zero Model Training",
      headline: "Enterprise AI Isolation — Your Signals Never Train Models",
      content:
        "All sentiment classifications, emotion breakdowns, and trend detection algorithms leverage enterprise instances of Google Gemini via official developer APIs. Data sent for inference is strictly ephemeral and bounded by enterprise confidentiality.",
      points: [
        "Google Gemini API agreements guarantee prompt data is not used to train public models.",
        "No customer data or social monitoring keywords are retained in model weights or public corpora.",
        "Input text is stripped of irrelevant metadata before sentiment vector calculation.",
        "Cryptographic token isolation ensures multi-tenant separation across client workspaces.",
      ],
    },
    {
      id: "subprocessors",
      title: "Cloud Infrastructure",
      badge: "Zero-Trust Stack",
      headline: "Industry-Standard Subprocessors & Data Encryption",
      content:
        "We partner only with SOC 2, ISO 27001, and GDPR-compliant infrastructure providers to power SocialInt's end-to-end services.",
      points: [
        "Clerk: Multi-factor authentication, salted password hashing, and encrypted JWT tokens.",
        "Neon / PostgreSQL: Database storage protected with TLS 1.3 in transit and AES-256 at rest.",
        "Apify: Enterprise-grade headless scraping cluster adhering to ethical web crawling standards.",
        "Google Cloud Platform: Secure AI compute environment with isolated VPC processing.",
      ],
    },
    {
      id: "ownership-gdpr",
      title: "Ownership & GDPR",
      badge: "User Rights",
      headline: "Complete Ownership, Instant Export, and Right to Erasure",
      content:
        "You retain 100% intellectual property and ownership rights over every report, sentiment digest, query dictionary, and trend analysis generated in your workspace. We never sell or license customer datasets.",
      points: [
        "Export your historical intelligence in JSON, CSV, or formatted PDF anytime.",
        "GDPR Article 17 (Right to be Forgotten) & CCPA §1798 compliance honored automatically.",
        "Instant permanent account wipe: purges all stored query history, reports, and tokens.",
        "Zero sale, barter, or sharing of user queries with third-party ad networks or data brokers.",
      ],
    },
  ];

  const intelligenceFeeds = [
    {
      badge: "Crisis Avoided",
      badgeColor: "text-emerald-700 border-emerald-200 bg-emerald-50",
      title: "Reddit thread flagging checkout bug was spotted within 18 minutes",
      detail: "Product team patched before morning traffic spike",
      source: "Reddit (r/technology)",
      time: "14m ago",
      sentiment: "positive" as const,
    },
    {
      badge: "Sentiment Shift",
      badgeColor: "text-sky-700 border-sky-200 bg-sky-50",
      title: "Customer sentiment turned +34% positive after transparent pricing update",
      detail: "2,400+ organic tweets analyzed across 3 hours",
      source: "X (Twitter)",
      time: "32m ago",
      sentiment: "positive" as const,
    },
    {
      badge: "Early Anomaly",
      badgeColor: "text-rose-700 border-rose-200 bg-rose-50",
      title: "Coordinated bot copy-paste comments detected on brand Instagram post",
      detail: "Filtered spam network • Real fan sentiment remains steady",
      source: "Instagram API",
      time: "1h ago",
      sentiment: "warning" as const,
    },
    {
      badge: "Creator Reach",
      badgeColor: "text-indigo-700 border-indigo-200 bg-indigo-50",
      title: "Tech YouTuber with 650k subscribers published an unprompted positive review",
      detail: "Driving 4.2x referral lift in community forums",
      source: "YouTube & Threads",
      time: "2h ago",
      sentiment: "positive" as const,
    },
    {
      badge: "Regional Pulse",
      badgeColor: "text-amber-700 border-amber-200 bg-amber-50",
      title: "Localized shipping delay feedback noticed across UK customer accounts",
      detail: "Support team alerted to issue proactively",
      source: "Support Mentions",
      time: "3h ago",
      sentiment: "warning" as const,
    },
  ];

  return (
    <main id="top" className="min-h-screen bg-[#F5FBF7] text-[#051F20] selection:bg-[#8EB69B]/30 selection:text-[#051F20] overflow-x-clip">
      {/* NAVBAR: LOGO IN MIDDLE, 2 LINKS LEFT, 2 LINKS RIGHT */}
      <Navbar />

      {/* ================================================== */}
      {/* HERO SECTION: LUMINESCENT SAGE & FOREST LIGHT THEME */}
      {/* ================================================== */}
      <section className="relative pt-16 pb-20 overflow-hidden border-b border-[#8EB69B]/25">
        {/* Directional Sunlight / Ambient Ray inspired by the reference image */}
        <div className="pointer-events-none absolute -top-28 -left-20 h-[650px] w-[650px] rounded-full bg-radial from-[#8EB69B]/35 via-[#235347]/15 to-transparent blur-3xl -z-10" />
        <div className="pointer-events-none absolute top-10 right-1/4 h-[500px] w-[700px] rounded-full bg-gradient-to-b from-[#DAF1DE]/50 via-transparent to-transparent blur-3xl -z-10" />
        <div className="pointer-events-none absolute top-48 right-6 h-[400px] w-[400px] rounded-full bg-radial from-[#8EB69B]/20 via-[#DAF1DE]/20 to-transparent blur-3xl -z-10" />

        {/* Ambient Canvas Sparkles */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <SparklesCore
            id="hero-sparkles-light"
            background="transparent"
            minSize={0.5}
            maxSize={1.8}
            particleDensity={28}
            particleColor="#235347"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Top Live Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8EB69B]/50 bg-white/95 px-4 py-1.5 shadow-xs mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8EB69B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#235347]"></span>
            </span>
            <span className="text-xs font-semibold text-[#0B2B26] tracking-wide">
              ✦ Next-Gen AI Social Listening &amp; PR Radar
            </span>
          </div>

          {/* Headline with animated flip words */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.12] text-[#051F20] max-w-5xl">
            {/* Line 1: Animated text */}
            <span className="inline-block">
              {"Know what people say about".split(" ").map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                  className="inline-block mr-[0.25em] last:mr-0 text-[#051F20]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <br />
            {/* Line 2: Animated Flip Words */}
            <span className="inline-block my-1 sm:my-2">
              <FlipWords
                words={targetWords}
                className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0B2B26] via-[#163832] to-[#235347] tracking-tight"
              />
            </span>
            <br />
            {/* Line 3: Animated text */}
            <span className="inline-block">
              {"before small issues spread.".split(" ").map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.45,
                    delay: 0.45 + i * 0.08,
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                  className="inline-block mr-[0.25em] last:mr-0 text-[#235347]/80 font-medium"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-[#163832]/85">
            Public sentiment moves fast. SocialInt moves faster. Paste any public post URL to extract instant AI sentiment, audience emotion vectors, and viral risk before small issues spread.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <SignUpButton mode="modal">
              <button
                type="button"
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0B2B26] via-[#163832] to-[#235347] hover:from-[#051F20] hover:to-[#163832] px-7 py-3.5 text-sm font-semibold text-[#DAF1DE] shadow-[0_10px_25px_-5px_rgba(11,43,38,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(11,43,38,0.45)] transition-all active:scale-98 cursor-pointer"
              >
                <span>Start Monitoring Free</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </SignUpButton>

            <a
              href="#interactive-demo"
              className="inline-flex items-center gap-2 rounded-full border border-[#8EB69B]/60 bg-white hover:bg-[#DAF1DE]/40 px-6 py-3.5 text-sm font-semibold text-[#0B2B26] hover:border-[#235347] shadow-xs transition active:scale-98 cursor-pointer"
            >
              <Zap size={16} className="text-[#235347]" />
              <span>Try Live Simulator Below</span>
            </a>
          </div>

          {/* Key Value Proposition Stats Strip */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-2xl mx-auto">
            <div className="p-2.5 rounded-xl bg-white/90 border border-[#8EB69B]/30 shadow-2xs">
              <span className="block text-base sm:text-lg font-bold font-mono text-[#0B2B26]">99.4%</span>
              <span className="text-[10px] sm:text-[11px] text-[#235347]/80 font-medium">AI Sentiment Precision</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/90 border border-[#8EB69B]/30 shadow-2xs">
              <span className="block text-base sm:text-lg font-bold font-mono text-[#235347]">&lt; 12s</span>
              <span className="text-[10px] sm:text-[11px] text-[#235347]/80 font-medium">Post Ingestion Latency</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/90 border border-[#8EB69B]/30 shadow-2xs">
              <span className="block text-base sm:text-lg font-bold font-mono text-[#163832]">6 Networks</span>
              <span className="text-[10px] sm:text-[11px] text-[#235347]/80 font-medium">Supported Platforms</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/90 border border-[#8EB69B]/30 shadow-2xs">
              <span className="block text-base sm:text-lg font-bold font-mono text-[#051F20]">Zero</span>
              <span className="text-[10px] sm:text-[11px] text-[#235347]/80 font-medium">AI Model Training</span>
            </div>
          </div>

          {/* Interactive Live Post Analysis Terminal & Simulator */}
          <div id="interactive-demo" className="w-full scroll-mt-20">
            <InteractiveHeroSimulator />
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* INFINITE MOVING CARDS: REAL SOCIAL SIGNALS         */}
      {/* ================================================== */}
      <section className="relative py-8 border-b border-[#8EB69B]/25 bg-white/90 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8EB69B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#235347]"></span>
            </span>
            <span className="text-xs font-mono uppercase font-bold tracking-wider text-[#0B2B26]">
              Live Monitored Feed
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#235347]/70 hidden sm:inline">
            {"// Real-Time Social Signals Across Platforms"}
          </span>
        </div>

        <InfiniteMovingCards
          items={intelligenceFeeds}
          direction="left"
          speed="normal"
        />
      </section>

      {/* ================================================== */}
      {/* 3D HOLOGRAPHIC PR COMMAND CENTER (LIVE RADAR)      */}
      {/* ================================================== */}
      <section id="radar" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8EB69B]/40 bg-[#DAF1DE]/60 px-3.5 py-1 mb-3.5 shadow-xs">
            <Radio size={14} className="text-[#235347] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B2B26]">
              Live 3D Telemetry Radar
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl tracking-tight text-[#051F20]">
            Holographic PR Command Center
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#163832]/85 leading-relaxed max-w-2xl mx-auto">
            Interact with real-time platform signals, sentiment velocity meters, and automated bot anomaly filtering across global social conversations.
          </p>
        </div>

        <div className="w-full">
          <PRCommandCenter3D />
        </div>
      </section>

      {/* ================================================== */}
      {/* THE PR CHALLENGE: PROBLEM CARDS                    */}
      {/* ================================================== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-white via-[#DAF1DE]/20 to-white rounded-3xl my-8 border border-[#8EB69B]/30 shadow-[0_4px_25px_rgba(11,43,38,0.03)]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#235347]">
            The PR Challenge
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl tracking-tight text-[#051F20]">
            Public perception moves faster than manual monitoring.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#163832]/85 leading-relaxed">
            A single viral complaint or misunderstood announcement can circulate to hundreds
            of thousands of people before your communications team starts their morning standup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Problem Card 1 */}
          <CardContainer className="w-full">
            <CardBody className="bg-white border border-[#8EB69B]/30 rounded-2xl p-7 relative shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-[#235347] transition-all">
              <CardItem translateZ={30} className="w-fit p-3 rounded-2xl bg-[#DAF1DE] text-[#0B2B26] border border-[#8EB69B]/40 mb-6">
                <MessageSquare size={22} />
              </CardItem>
              <CardItem translateZ={40} className="font-display text-xl text-[#051F20]">
                Thousands of Comments Daily
              </CardItem>
              <CardItem translateZ={25} className="mt-3 text-xs sm:text-sm text-[#163832]/80 leading-relaxed">
                Reading replies, quote tweets, Reddit comments, and community threads by hand
                is physically impossible. Real complaints get lost in the volume.
              </CardItem>
              <CardItem translateZ={45} className="mt-6 pt-4 border-t border-[#DAF1DE] flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>Coverage: 5+ Platforms</span>
                <span className="text-[#0B2B26] font-bold bg-[#DAF1DE] px-2 py-0.5 rounded-full">Overwhelming</span>
              </CardItem>
            </CardBody>
          </CardContainer>

          {/* Problem Card 2 */}
          <CardContainer className="w-full">
            <CardBody className="bg-white border border-[#8EB69B]/30 rounded-2xl p-7 relative shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-[#235347] transition-all">
              <CardItem translateZ={30} className="w-fit p-3 rounded-2xl bg-[#DAF1DE] text-[#0B2B26] border border-[#8EB69B]/40 mb-6">
                <TrendingUp size={22} />
              </CardItem>
              <CardItem translateZ={40} className="font-display text-xl text-[#051F20]">
                Viral Spread in Minutes
              </CardItem>
              <CardItem translateZ={25} className="mt-3 text-xs sm:text-sm text-[#163832]/80 leading-relaxed">
                Recommendation algorithms reward high-emotion posts. An unanswered customer grievance
                can reach 50,000 views within an hour of posting.
              </CardItem>
              <CardItem translateZ={45} className="mt-6 pt-4 border-t border-[#DAF1DE] flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>Speed: Under 60 Mins</span>
                <span className="text-[#235347] font-bold bg-[#DAF1DE] px-2 py-0.5 rounded-full">Rapid Escalation</span>
              </CardItem>
            </CardBody>
          </CardContainer>

          {/* Problem Card 3 */}
          <CardContainer className="w-full">
            <CardBody className="bg-white border border-[#8EB69B]/30 rounded-2xl p-7 relative shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-[#235347] transition-all">
              <CardItem translateZ={30} className="w-fit p-3 rounded-2xl bg-[#DAF1DE] text-[#0B2B26] border border-[#8EB69B]/40 mb-6">
                <ShieldAlert size={22} />
              </CardItem>
              <CardItem translateZ={40} className="font-display text-xl text-[#051F20]">
                Crises Start Quietly
              </CardItem>
              <CardItem translateZ={25} className="mt-3 text-xs sm:text-sm text-[#163832]/80 leading-relaxed">
                Backlash rarely begins on the front page. It brews in niche subreddits or reply chains
                hours before spreading to mainstream media outlets.
              </CardItem>
              <CardItem translateZ={45} className="mt-6 pt-4 border-t border-[#DAF1DE] flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>Lead Time: 2 - 8 Hours</span>
                <span className="text-[#163832] font-bold bg-[#DAF1DE] px-2 py-0.5 rounded-full">Catchable Early</span>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </section>

      {/* ================================================== */}
      {/* FEATURES: ACETERNITY BENTO GRID (FOREST & MINT)    */}
      {/* ================================================== */}
      <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#235347]">
            Core Features
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl tracking-tight text-[#051F20]">
            Everything your team needs to understand social conversations.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#163832]/85 leading-relaxed">
            Move beyond simple follower counts. Get clear visibility into what audiences think,
            how discussions evolve, and who is leading the conversation.
          </p>
        </div>

        <BentoGrid className="max-w-6xl mx-auto">
          {/* Bento Item 1: Sentiment Tracking Curve */}
          <BentoGridItem
            className="md:col-span-2"
            title="Accurate Sentiment Tracking Over Time"
            description="Measure whether discussions are positive, negative, or neutral. Detect sudden sentiment drops the moment a customer issue or news story breaks."
            header={
              <div className="h-44 sm:h-44 w-full rounded-2xl bg-gradient-to-br from-[#DAF1DE]/40 via-white to-[#DAF1DE]/20 border border-[#8EB69B]/30 p-3 sm:p-5 flex flex-col justify-between relative overflow-hidden">
                {/* Top Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[9px] sm:text-xs font-mono">
                  <span className="flex items-center gap-2 text-[#0B2B26] font-semibold min-w-0">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#235347]" />
                    <span className="truncate">
                      WEEKLY BRAND SENTIMENT CURVE
                    </span>
                  </span>

                  <span className="self-start sm:self-auto whitespace-nowrap text-[#0B2B26] font-bold bg-[#DAF1DE] px-2.5 py-0.5 rounded-full border border-[#8EB69B]/40">
                    +78% Positive Ratio
                  </span>
                </div>

                {/* Chart */}
                <div className="w-full h-20 sm:h-24">
                  <svg
                    className="w-full h-full stroke-[#235347] fill-[#8EB69B]/15"
                    viewBox="0 0 400 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0 60 Q 60 25, 120 45 T 220 30 T 320 65 T 400 20 L 400 100 L 0 100 Z"
                      strokeWidth="2.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>

                {/* Bottom Labels */}
                <div className="grid grid-cols-4 gap-1 text-[8px] sm:text-[11px] font-mono text-[#235347]/70">
                  <span className="truncate text-left">
                    Monday
                  </span>
                  <span className="truncate text-center">
                    Feature Launch
                  </span>
                  <span className="truncate text-center">
                    Brief Dip
                  </span>
                  <span className="truncate text-right">
                    Today
                  </span>
                </div>
              </div>
            }
            icon={<Activity className="h-5 w-5 text-[#235347]" />}
          />

          {/* Bento Item 2: Volume Anomaly Spikes */}
          <BentoGridItem
            className="md:col-span-1"
            title="Real-Time Volume & Spike Alerts"
            description="Receive immediate notifications via Slack or email when conversation volume spikes abnormally around your brand."
            header={
              <div className="h-44 w-full rounded-2xl bg-gradient-to-b from-white to-[#DAF1DE]/30 border border-[#8EB69B]/30 p-5 flex flex-col justify-center items-center relative overflow-hidden">
                <div className="text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DAF1DE] text-[#0B2B26] border border-[#8EB69B]/40 mb-2 shadow-2xs">
                    <TrendingUp size={24} />
                  </div>
                  <p className="text-2xl font-bold font-mono text-[#051F20]">3.8x Surge</p>
                  <p className="text-xs text-[#235347]/80 mt-0.5">Notification triggered in 45s</p>
                </div>
              </div>
            }
            icon={<Activity className="h-5 w-5 text-[#235347]" />}
          />

          {/* Bento Item 3: Audience Understanding */}
          <BentoGridItem
            className="md:col-span-1"
            title="Audience Demographics & Interests"
            description="Know who is participating in the conversation: loyal customers, industry journalists, casual users, or bot networks."
            header={
              <div className="h-44 w-full rounded-2xl bg-white border border-[#8EB69B]/30 p-5 flex flex-col justify-between shadow-2xs">
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-[#0B2B26]">Verified Customers</span>
                      <span className="text-[#051F20] font-mono font-bold">62%</span>
                    </div>
                    <div className="h-2 w-full bg-[#DAF1DE]/40 rounded-full overflow-hidden">
                      <div className="h-full bg-[#0B2B26] rounded-full w-[62%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-[#0B2B26]">Industry Media &amp; Press</span>
                      <span className="text-[#163832] font-mono font-bold">24%</span>
                    </div>
                    <div className="h-2 w-full bg-[#DAF1DE]/40 rounded-full overflow-hidden">
                      <div className="h-full bg-[#235347] rounded-full w-[24%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-[#0B2B26]">General Public</span>
                      <span className="text-[#235347] font-mono font-bold">14%</span>
                    </div>
                    <div className="h-2 w-full bg-[#DAF1DE]/40 rounded-full overflow-hidden">
                      <div className="h-full bg-[#8EB69B] rounded-full w-[14%]" />
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-[#235347]/70 font-mono">Profile analysis across all platforms</p>
              </div>
            }
            icon={<Users className="h-5 w-5 text-[#235347]" />}
          />

          {/* Bento Item 4: Instant Social Post Analysis */}
          <BentoGridItem
            className="md:col-span-2"
            title="Instant Social Post Analysis"
            description="Paste a public social media post URL and let SocialInt analyze its sentiment, tone, emotions, key topics, and overall audience reaction in seconds."
            header={
              <div className="h-44 w-full rounded-2xl bg-gradient-to-r from-[#DAF1DE]/30 via-white to-[#DAF1DE]/20 border border-[#8EB69B]/30 p-4 sm:p-5 flex items-center justify-center overflow-hidden">
                <div className="w-full max-w-2xl">
                  {/* URL Input */}
                  <div className="flex items-center gap-2 rounded-xl border border-[#8EB69B]/40 bg-white p-2 shadow-2xs">
                    <div className="flex-1 min-w-0 px-2">
                      <p className="text-[9px] sm:text-[10px] font-mono text-[#235347]/70 truncate">
                        social.com/post/your-post-url...
                      </p>
                    </div>

                    <div className="shrink-0 rounded-lg bg-[#163832] px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-semibold text-[#DAF1DE] shadow-2xs">
                      Analyze
                    </div>
                  </div>

                  {/* Analysis Result */}
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="rounded-xl border border-[#8EB69B]/30 bg-white p-2.5 sm:p-3 shadow-2xs">
                      <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#235347]/70">
                        Sentiment
                      </p>
                      <p className="mt-1 text-xs sm:text-sm font-semibold text-[#0B2B26]">
                        Positive
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#8EB69B]/30 bg-white p-2.5 sm:p-3 shadow-2xs">
                      <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#235347]/70">
                        Tone
                      </p>
                      <p className="mt-1 text-xs sm:text-sm font-semibold text-[#163832]">
                        Supportive
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#8EB69B]/30 bg-white p-2.5 sm:p-3 shadow-2xs">
                      <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#235347]/70">
                        Confidence
                      </p>
                      <p className="mt-1 text-xs sm:text-sm font-semibold text-[#235347]">
                        94%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }
            icon={<Network className="h-5 w-5 text-[#235347]" />}
          />
        </BentoGrid>
      </section>

      {/* ================================================== */}
      {/* HOW IT WORKS: CLEAR 4-STEP WORKFLOW                */}
      {/* ================================================== */}
      <section id="workflow" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#8EB69B]/25">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#235347]">
            Simple Workflow
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl tracking-tight text-[#051F20]">
            How SocialInt Works in Four Steps
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#163832]/85 leading-relaxed">
            Analyze any social post in seconds and keep every insight organized in your account.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-2xl border border-[#8EB69B]/30 bg-white p-6 shadow-sm hover:shadow-md hover:border-[#051F20] transition-all">
            <span className="text-xs font-mono font-bold text-[#DAF1DE] bg-[#051F20] px-3 py-1 rounded-full border border-[#051F20] shadow-2xs">
              STEP 01
            </span>
            <h4 className="font-display text-lg text-[#051F20] mt-4">Create Your Account</h4>
            <p className="mt-2 text-xs text-[#163832]/80 leading-relaxed">
              Sign in to SocialInt and access your personal workspace for analyzing and managing your social insights.
            </p>
          </div>

          <div className="rounded-2xl border border-[#8EB69B]/30 bg-white p-6 shadow-sm hover:shadow-md hover:border-[#0B2B26] transition-all">
            <span className="text-xs font-mono font-bold text-[#DAF1DE] bg-[#0B2B26] px-3 py-1 rounded-full border border-[#0B2B26] shadow-2xs">
              STEP 02
            </span>
            <h4 className="font-display text-lg text-[#051F20] mt-4">Paste a Post URL</h4>
            <p className="mt-2 text-xs text-[#163832]/80 leading-relaxed">
              Copy the URL of a social media post from a supported platform and paste it into SocialInt.
            </p>
          </div>

          <div className="rounded-2xl border border-[#8EB69B]/30 bg-white p-6 shadow-sm hover:shadow-md hover:border-[#163832] transition-all">
            <span className="text-xs font-mono font-bold text-[#DAF1DE] bg-[#163832] px-3 py-1 rounded-full border border-[#163832] shadow-2xs">
              STEP 03
            </span>
            <h4 className="font-display text-lg text-[#051F20] mt-4">Analyze Post Intelligence</h4>
            <p className="mt-2 text-xs text-[#163832]/80 leading-relaxed">
              Click Analyze and let SocialInt process the post to uncover sentiment, tone, key insights, and important signals.
            </p>
          </div>

          <div className="rounded-2xl border border-[#8EB69B]/40 bg-white p-6 shadow-sm hover:shadow-md transition-all border-l-4 border-l-[#235347]">
            <span className="text-xs font-mono font-bold text-[#DAF1DE] bg-[#235347] px-3 py-1 rounded-full border border-[#235347] shadow-2xs">
              STEP 04
            </span>
            <h4 className="font-display text-lg text-[#051F20] mt-4">View &amp; Save Results</h4>
            <p className="mt-2 text-xs text-[#163832]/80 leading-relaxed">
              Get your analysis instantly and automatically save it to your account history so you can revisit your insights anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* USE CASES: WOBBLE CARDS IN FOREST & MINT           */}
      {/* ================================================== */}
      <section id="solutions" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#235347]">
            Who It&apos;s For
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl tracking-tight text-[#051F20]">
            Built for modern brands and communications teams.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#163832]/85 leading-relaxed">
            Whether managing a global consumer brand, a fast-growing startup, or high-profile public figures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wobble 1: Brands & Enterprises */}
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 min-h-[280px] bg-gradient-to-br from-white via-[#DAF1DE]/40 to-[#F5FBF7] border border-[#8EB69B]/40 shadow-2xs"
          >
            <div className="max-w-md">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#0B2B26]">
                Brands &amp; Enterprises
              </span>
              <h3 className="text-xl sm:text-2xl font-display text-[#051F20] mt-2">
                Protect customer trust and brand reputation.
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#163832]/80 leading-relaxed">
                Catch product bugs, viral customer feedback, and delivery delays the moment they begin trending on Instagram, Facebook, Reddit, X &amp; many more.
              </p>
              <div className="mt-5 flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-semibold border border-[#8EB69B]/50 bg-[#DAF1DE] text-[#0B2B26]">
                  Customer Sentiment Tracking
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold border border-[#8EB69B]/30 bg-white text-[#235347]">
                  Anomaly Alerts
                </span>
              </div>
            </div>
          </WobbleCard>

          {/* Wobble 2: Athletes & Public Figures */}
          <WobbleCard containerClassName="col-span-1 min-h-[280px] bg-gradient-to-br from-white via-[#8EB69B]/20 to-[#F5FBF7] border border-[#8EB69B]/40 shadow-2xs">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#163832]">
              High-Profile Individuals
            </span>
            <h3 className="text-xl font-display text-[#051F20] mt-2">
              Athletes &amp; Creators
            </h3>
            <p className="mt-2.5 text-xs text-[#163832]/80 leading-relaxed">
              Understand fan reactions to performances, interviews, and major announcements across social video platforms.
            </p>
            <p className="mt-4 text-xs font-mono font-bold text-[#0B2B26] flex items-center gap-1.5">
              <Check size={14} className="stroke-[2.5] text-[#235347]" /> Fan sentiment breakdown
            </p>
          </WobbleCard>

          {/* Wobble 3: PR Agencies */}
          <WobbleCard containerClassName="col-span-1 min-h-[280px] bg-gradient-to-br from-white via-[#DAF1DE]/30 to-[#F5FBF7] border border-[#8EB69B]/40 shadow-2xs">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#235347]">
              Agencies &amp; Consultants
            </span>
            <h3 className="text-xl font-display text-[#051F20] mt-2">
              PR &amp; Comms Agencies
            </h3>
            <p className="mt-2.5 text-xs text-[#163832]/80 leading-relaxed">
              Manage reputation for multiple client accounts in one dashboard with clean, exportable weekly executive reports.
            </p>
            <p className="mt-4 text-xs font-mono font-bold text-[#0B2B26] flex items-center gap-1.5">
              <Check size={14} className="stroke-[2.5] text-[#235347]" /> Multi-client workspace
            </p>
          </WobbleCard>

          {/* Wobble 4: Product Launches & Events */}
          <WobbleCard containerClassName="col-span-1 lg:col-span-2 min-h-[280px] bg-gradient-to-br from-white via-[#DAF1DE]/40 to-[#F5FBF7] border border-[#8EB69B]/40 shadow-2xs">
            <div className="max-w-md">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#051F20]">
                Campaign Intelligence
              </span>
              <h3 className="text-xl sm:text-2xl font-display text-[#051F20] mt-2">
                Measure reactions to launches and campaigns.
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#163832]/80 leading-relaxed">
                Track how sentiment compares before, during, and after major marketing launches, keynote presentations, and events.
              </p>
            </div>
          </WobbleCard>
        </div>
      </section>

      {/* ================================================== */}
      {/* PRIVACY & POLICY: FOREST & MINT SECTION            */}
      {/* ================================================== */}
      <section id="privacy" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 rounded-3xl my-8 border border-[#8EB69B]/30 bg-white">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8EB69B]/50 bg-[#DAF1DE] px-3.5 py-1 mb-4 shadow-xs">
            <ShieldCheck size={14} className="text-[#235347]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B2B26]">
              Privacy &amp; Data Governance
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl tracking-tight text-[#051F20]">
            Built for Intelligence. Designed for Privacy.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#163832]/85 leading-relaxed">
            SocialInt is built on strict data boundaries, ethical public collection, and enterprise AI safety.
            We only analyze public discussions—never private communications.
          </p>
        </div>

        {/* TRUST BADGES STRIP */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8EB69B]/40 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0B2B26] shadow-2xs">
            <Globe size={13} className="text-[#235347]" /> Public Data Only
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8EB69B]/40 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0B2B26] shadow-2xs">
            <Cpu size={13} className="text-[#163832]" /> Zero AI Model Training
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8EB69B]/40 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0B2B26] shadow-2xs">
            <Lock size={13} className="text-[#235347]" /> AES-256 &amp; TLS 1.3 Encryption
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8EB69B]/40 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0B2B26] shadow-2xs">
            <ShieldCheck size={13} className="text-[#051F20]" /> GDPR &amp; CCPA Ready
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8EB69B]/40 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0B2B26] shadow-2xs">
            <EyeOff size={13} className="text-[#235347]" /> Automated PII Masking
          </span>
        </div>

        {/* BENTO GRID: 6 CORE PRIVACY PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1 */}
          <div className="rounded-2xl border border-[#8EB69B]/30 bg-white p-7 shadow-xs hover:shadow-md hover:border-[#235347] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="h-10 w-10 rounded-xl bg-[#DAF1DE] text-[#0B2B26] border border-[#8EB69B]/40 flex items-center justify-center">
                  <Globe size={20} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B2B26] bg-[#DAF1DE] px-2 py-0.5 rounded-md border border-[#8EB69B]/40">
                  Ethical Collection
                </span>
              </div>
              <h3 className="font-display text-lg text-[#051F20]">
                100% Public Data Ingestion
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#163832]/80 leading-relaxed">
                SocialInt strictly monitors public posts, open forum discussions, and publicly posted creator content. We never access private direct messages (DMs), closed communities, or bypass account authentication.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DAF1DE] flex items-center gap-2 text-xs font-mono text-[#235347]">
              <CheckCircle2 size={14} className="text-[#235347]" />
              <span>Apify Scraper Ethics Aligned</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-[#8EB69B]/30 bg-white p-7 shadow-xs hover:shadow-md hover:border-[#235347] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="h-10 w-10 rounded-xl bg-[#DAF1DE] text-[#163832] border border-[#8EB69B]/40 flex items-center justify-center">
                  <Cpu size={20} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#163832] bg-[#DAF1DE] px-2 py-0.5 rounded-md border border-[#8EB69B]/40">
                  Google Gemini
                </span>
              </div>
              <h3 className="font-display text-lg text-[#051F20]">
                Zero AI Model Training
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#163832]/80 leading-relaxed">
                Your monitored brand terms, queries, and analyzed posts are processed through secure enterprise AI endpoints. Your confidential queries and brand signals are never fed into public foundation models.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DAF1DE] flex items-center gap-2 text-xs font-mono text-[#235347]">
              <CheckCircle2 size={14} className="text-[#235347]" />
              <span>Enterprise API Confidentiality</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-[#8EB69B]/30 bg-white p-7 shadow-xs hover:shadow-md hover:border-[#235347] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="h-10 w-10 rounded-xl bg-[#DAF1DE] text-[#235347] border border-[#8EB69B]/40 flex items-center justify-center">
                  <Database size={20} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#235347] bg-[#DAF1DE] px-2 py-0.5 rounded-md border border-[#8EB69B]/40">
                  Full Control
                </span>
              </div>
              <h3 className="font-display text-lg text-[#051F20]">
                Total Data Ownership
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#163832]/80 leading-relaxed">
                You retain 100% intellectual ownership of all your generated reports, saved post analyses, sentiment graphs, and alerts. Export your raw data or trigger complete account purging with a single click.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DAF1DE] flex items-center gap-2 text-xs font-mono text-[#235347]">
              <CheckCircle2 size={14} className="text-[#235347]" />
              <span>Instant CSV / JSON / PDF Export</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-[#8EB69B]/30 bg-white p-7 shadow-xs hover:shadow-md hover:border-[#235347] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="h-10 w-10 rounded-xl bg-[#DAF1DE] text-[#051F20] border border-[#8EB69B]/40 flex items-center justify-center">
                  <Lock size={20} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#051F20] bg-[#DAF1DE] px-2 py-0.5 rounded-md border border-[#8EB69B]/40">
                  Clerk Auth
                </span>
              </div>
              <h3 className="font-display text-lg text-[#051F20]">
                Zero-Trust Authentication
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#163832]/80 leading-relaxed">
                Identity and access control are handled by Clerk with salted hashing, encrypted session tokens, and OAuth SSO. SocialInt never has access to or stores your personal social network passwords.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DAF1DE] flex items-center gap-2 text-xs font-mono text-[#235347]">
              <CheckCircle2 size={14} className="text-[#235347]" />
              <span>Token Isolation &amp; MFA Enabled</span>
            </div>
          </div>

          {/* Card 5 */}
          <div className="rounded-2xl border border-[#8EB69B]/30 bg-white p-7 shadow-xs hover:shadow-md hover:border-[#235347] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="h-10 w-10 rounded-xl bg-[#DAF1DE] text-[#163832] border border-[#8EB69B]/40 flex items-center justify-center">
                  <EyeOff size={20} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#163832] bg-[#DAF1DE] px-2 py-0.5 rounded-md border border-[#8EB69B]/40">
                  Privacy Shield
                </span>
              </div>
              <h3 className="font-display text-lg text-[#051F20]">
                Automated PII Redaction
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#163832]/80 leading-relaxed">
                Our ingestion pipelines automatically detect and mask sensitive personally identifiable information (such as personal phone numbers, physical addresses, and email IDs) before generating aggregate sentiment metrics.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DAF1DE] flex items-center gap-2 text-xs font-mono text-[#235347]">
              <CheckCircle2 size={14} className="text-[#235347]" />
              <span>Privacy-by-Design Architecture</span>
            </div>
          </div>

          {/* Card 6 */}
          <div className="rounded-2xl border border-[#8EB69B]/30 bg-white p-7 shadow-xs hover:shadow-md hover:border-[#235347] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="h-10 w-10 rounded-xl bg-[#DAF1DE] text-[#0B2B26] border border-[#8EB69B]/40 flex items-center justify-center">
                  <ShieldAlert size={20} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B2B26] bg-[#DAF1DE] px-2 py-0.5 rounded-md border border-[#8EB69B]/40">
                  No Ad Networks
                </span>
              </div>
              <h3 className="font-display text-lg text-[#051F20]">
                Zero Data Brokering
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#163832]/80 leading-relaxed">
                SocialInt is a purely customer-funded SaaS platform. We do not sell, rent, broker, or trade your analytical data, client names, or search queries to ad brokers, data resellers, or external marketing networks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#DAF1DE] flex items-center gap-2 text-xs font-mono text-[#235347]">
              <CheckCircle2 size={14} className="text-[#235347]" />
              <span>100% Independent SaaS Model</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE DEEP DIVE: TABBED POLICY EXPLORER */}
        <div className="rounded-3xl border border-[#8EB69B]/30 bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#DAF1DE]">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#235347]">
                Detailed Policy Framework
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#051F20] mt-1">
                Explore Our Complete Privacy Commitments
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#235347]/70">
              <span>Version 2.4</span>
              <span>•</span>
              <span>Updated September 2026</span>
            </div>
          </div>

          {/* TAB BUTTONS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-6">
            {policyTabs.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActivePolicyTab(index)}
                className={`flex flex-col text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  activePolicyTab === index
                    ? "border-[#163832] bg-[#163832] text-[#DAF1DE] shadow-xs"
                    : "border-zinc-200 bg-slate-50/50 text-[#0B2B26] hover:bg-[#DAF1DE]/40 hover:border-[#8EB69B]"
                }`}
              >
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                    activePolicyTab === index ? "text-[#8EB69B]" : "text-zinc-400"
                  }`}
                >
                  {tab.badge}
                </span>
                <span className="font-semibold mt-1 truncate">{tab.title}</span>
              </button>
            ))}
          </div>

          {/* TAB CONTENT PANEL */}
          <div className="mt-8 rounded-2xl bg-[#DAF1DE]/25 border border-[#8EB69B]/30 p-6 sm:p-8">
            <div className="max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#235347] font-bold">
                {policyTabs[activePolicyTab].badge}
              </span>
              <h4 className="font-display text-xl sm:text-2xl text-[#051F20] mt-1.5">
                {policyTabs[activePolicyTab].headline}
              </h4>
              <p className="mt-3 text-xs sm:text-sm text-[#163832]/85 leading-relaxed">
                {policyTabs[activePolicyTab].content}
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {policyTabs[activePolicyTab].points.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-2.5 rounded-xl bg-white border border-[#8EB69B]/30 p-3 shadow-2xs text-xs text-[#0B2B26] leading-relaxed"
                  >
                    <CheckCircle2 size={16} className="text-[#235347] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PRIVACY CONTACT & SUMMARY FOOTER */}
          <div className="mt-8 pt-6 border-t border-[#DAF1DE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <p>
              Have specific data privacy questions or need a custom Data Processing Agreement (DPA)?
            </p>
            <a
              href="mailto:supportsocialint@gmail.com"
              className="inline-flex items-center gap-1.5 font-semibold text-[#163832] hover:text-[#051F20] hover:underline"
            >
              Contact Data Protection Office &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* FINAL SIGNATURE CTA: DEEP OBSIDIAN & EMERALD RAY   */}
      {/* (Inspired directly by the reference image)         */}
      {/* ================================================== */}
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 border-t border-[#8EB69B]/25">
        <div className="max-w-4xl mx-auto text-center rounded-3xl border border-[#235347]/60 bg-gradient-to-br from-[#051F20] via-[#0B2B26] to-[#163832] p-10 sm:p-16 shadow-[0_25px_60px_rgba(5,31,32,0.4)] relative overflow-hidden text-white">
          {/* Directional luminous light beam ray from top-left, matching the reference image */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-radial from-[#8EB69B]/35 via-[#235347]/20 to-transparent blur-3xl -z-0" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-radial from-[#DAF1DE]/15 via-transparent to-transparent blur-2xl -z-0" />

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#163832] to-[#235347] text-[#DAF1DE] border border-[#8EB69B]/40 shadow-md shadow-[#051F20]/50 mb-6 relative z-10">
            <Activity size={26} className="stroke-[2.5]" />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white tracking-tight relative z-10">
            Stop reacting to PR problems after they happen.
          </h2>

          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-[#DAF1DE]/85 leading-relaxed relative z-10">
            Start listening across social platforms today and protect your brand reputation with early awareness.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10">
            <SignUpButton mode="modal">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-[#DAF1DE] hover:bg-white px-8 py-3.5 text-sm font-bold text-[#051F20] shadow-[0_10px_25px_-5px_rgba(218,241,222,0.35)] hover:shadow-[0_15px_30px_-5px_rgba(218,241,222,0.5)] active:scale-98 transition cursor-pointer"
              >
                <span>Get Started Instantly</span>
                <ArrowRight size={16} />
              </button>
            </SignUpButton>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#8EB69B] relative z-10">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={15} className="text-[#DAF1DE]" /> Free to start
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={15} className="text-[#DAF1DE]" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={15} className="text-[#DAF1DE]" /> Real-time alerts
            </span>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* FOOTER: CLEAN WHITE & DEEP FOREST                  */}
      {/* ================================================== */}
      <footer className="border-t border-[#8EB69B]/25 bg-white py-12 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#051F20] via-[#163832] to-[#235347] text-[#DAF1DE] shadow-sm shadow-[#163832]/20">
              <Activity size={18} className="stroke-[2.5]" />
            </div>

            <div>
              <p className="font-display text-base text-[#051F20] tracking-wide">
                SocialInt
              </p>
              <p className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-[#8EB69B]">
                Social Listening &amp; PR Intelligence
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#163832] md:flex-nowrap">
            <a href="#features" className="hover:text-[#235347] transition-colors">
              Features
            </a>

            <a href="#radar" className="hover:text-[#235347] transition-colors">
              Live Radar
            </a>

            <a href="#solutions" className="hover:text-[#235347] transition-colors">
              Use Cases
            </a>

            <a href="#workflow" className="hover:text-[#235347] transition-colors">
              Workflow
            </a>

            <a href="#privacy" className="hover:text-[#235347] transition-colors">
              Privacy Policy
            </a>
          </div>

          <p className="text-[11px] sm:text-xs text-zinc-500 text-center md:text-left">
            Designed &amp; developed by{" "}
            <a
              href="https://neel-xdev-ipu2.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#163832] transition hover:text-[#051F20] hover:underline"
            >
              Neelabh
            </a>
          </p>

        </div>
      </footer>

      {/* ================================================== */}
      {/* BACK TO TOP FLOATING BUTTON                        */}
      {/* ================================================== */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#8EB69B]/40 bg-white/95 text-[#051F20] shadow-[0_8px_30px_rgba(5,31,32,0.12)] backdrop-blur-md hover:bg-[#163832] hover:text-[#DAF1DE] hover:border-transparent transition-all cursor-pointer group"
          >
            <ArrowUp size={18} className="stroke-[2.5] transition-transform group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

    </main>
  );
}