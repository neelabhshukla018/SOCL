"use client";

import React, { useState, useEffect } from "react";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "./ui/card-3d";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Radio,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";
import PlatformPngIcon from "./PlatformPngIcon";

export function PRCommandCenter3D() {
  const [pulseAngle, setPulseAngle] = useState(0);
  const [activeAlert, setActiveAlert] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Completely static on mobile: no interval or rotation timer
    if (isMobile) return;
    const interval = setInterval(() => {
      setPulseAngle((prev) => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isMobile]);

  // Aligned with SocialInt's actual platform data: Instagram, Facebook, Reddit, X, YouTube
  const alertFeeds = [
    {
      platform: "instagram",
      source: "Instagram Reel Analysis",
      text: "Viral review reel reached 84k views & 1.2k comments • Audience tone: Highly supportive",
      sentiment: "Positive 92%",
      status: "High Engagement",
      badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      platform: "x",
      source: "X (Twitter) Conversation",
      text: "Customer inquiry thread regarding shipping times analyzed • 0 viral crisis escalation",
      sentiment: "Neutral 74%",
      status: "Monitored Signal",
      badgeColor: "text-amber-700 bg-amber-50 border-amber-200",
    },
    {
      platform: "reddit",
      source: "Reddit r/technology",
      text: "Community discussion thread analyzed in 18s • Bot spam filtered, real user sentiment steady",
      sentiment: "Positive 84%",
      status: "Stable Sentiment",
      badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      platform: "facebook",
      source: "Facebook & YouTube",
      text: "Creator unprompted video review drove positive referral lift across product forums",
      sentiment: "Positive 89%",
      status: "Organic Reach Surge",
      badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto px-0 sm:px-2 overflow-hidden sm:overflow-visible">
      {/* ======================================================= */}
      {/* AMBIENT BACKGROUND LIGHT                                */}
      {/* On mobile: Purely static soft ambient light             */}
      {/* On desktop: Subtle animated glowing light               */}
      {/* ======================================================= */}
      <div className="pointer-events-none absolute -inset-1 sm:-inset-4 rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-r from-[#163832]/15 via-[#235347]/15 to-[#8EB69B]/20 blur-xl sm:blur-3xl opacity-80 md:animate-pulse-slow -z-10" />
      <div 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-radial from-[#235347]/20 via-[#8EB69B]/10 to-transparent blur-2xl sm:blur-3xl -z-10 md:animate-pulse"
        style={{ animationDuration: "4.5s" }}
      />

      <CardContainer containerClassName="w-full py-1 sm:py-4 p-0 sm:p-2" className="w-full max-w-full">
        <CardBody className="relative w-full rounded-2xl sm:rounded-3xl border border-[#8EB69B]/30 bg-white/95 p-3.5 sm:p-6 lg:p-8 shadow-sm sm:shadow-[0_20px_50px_rgba(11,43,38,0.06)] backdrop-blur-xl transition-all overflow-hidden">
          
          {/* Top Telemetry Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DAF1DE] pb-3.5 sm:pb-5 gap-2.5 sm:gap-3.5">
            <CardItem translateZ={isMobile ? 0 : 25} className="flex items-center gap-2.5 min-w-0">
              <div className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
                <span className="hidden md:inline-flex md:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8EB69B] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#235347]"></span>
              </div>
              <div className="min-w-0">
                <p className="font-display text-xs sm:text-base text-[#051F20] tracking-wide truncate">
                  Live Brand Radar &amp; Post Intelligence
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="flex items-center -space-x-1 shrink-0">
                    <PlatformPngIcon platform="instagram" size={13} className="rounded-full ring-1 ring-white" />
                    <PlatformPngIcon platform="facebook" size={13} className="rounded-full ring-1 ring-white" />
                    <PlatformPngIcon platform="youtube" size={13} className="rounded-full ring-1 ring-white" />
                    <PlatformPngIcon platform="x" size={13} className="rounded-full ring-1 ring-white" />
                    <PlatformPngIcon platform="reddit" size={13} className="rounded-full ring-1 ring-white" />
                  </div>
                  <p className="text-[9px] sm:text-[11px] font-mono text-[#235347]/80 uppercase tracking-wider truncate">
                    Instagram, Facebook, YouTube, X &amp; Reddit
                  </p>
                </div>
              </div>
            </CardItem>

            <CardItem
              translateZ={isMobile ? 0 : 35}
              className="self-start sm:self-auto flex items-center gap-1.5 rounded-full border border-[#8EB69B]/50 bg-[#DAF1DE] px-2.5 sm:px-3.5 py-1 text-[10px] sm:text-xs text-[#0B2B26] font-semibold shadow-xs shrink-0"
            >
              <ShieldCheck size={13} className="shrink-0 text-[#235347] sm:w-3.5 sm:h-3.5" />
              <span>Normal (+84% Positive)</span>
            </CardItem>
          </div>

          {/* Center Grid: Radar Screen + Signal Intelligence */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
            {/* Radar Screen Area (Compact & responsive on mobile) */}
            <div className="lg:col-span-5 xl:col-span-6 flex flex-col items-center justify-center relative w-full">
              <CardItem
                translateZ={isMobile ? 0 : 50}
                className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full border border-[#163832] bg-[#051F20] flex items-center justify-center shadow-lg sm:shadow-xl overflow-hidden shrink-0"
              >
                {/* Concentric rings */}
                <div className="absolute inset-3 sm:inset-4 rounded-full border border-[#235347]/40" />
                <div className="absolute inset-8 sm:inset-12 rounded-full border border-[#8EB69B]/30 border-dashed" />
                <div className="absolute inset-14 sm:inset-20 rounded-full border border-[#235347]/30" />

                {/* Crosshairs */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-[#235347]/30" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-[#235347]/30" />

                {/* Sweep Beam */}
                {!isMobile ? (
                  <div
                    className="absolute inset-0 rounded-full origin-center pointer-events-none"
                    style={{
                      transform: `rotate(${pulseAngle}deg)`,
                      background:
                        "conic-gradient(from 0deg, rgba(142, 182, 155, 0.65) 0deg, rgba(35, 83, 71, 0.3) 40deg, transparent 80deg)",
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 rounded-full bg-radial from-[#8EB69B]/25 via-transparent to-transparent pointer-events-none" />
                )}

                {/* Signal Blip 1 */}
                <div className="absolute top-[28%] left-[62%] flex items-center justify-center">
                  <span className="hidden md:inline-flex md:animate-ping absolute h-3.5 w-3.5 rounded-full bg-[#DAF1DE] opacity-75"></span>
                  <span className="relative h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#8EB69B] shadow-[0_0_8px_#8eb69b]"></span>
                </div>

                {/* Signal Blip 2 */}
                <div className="absolute bottom-[35%] left-[26%] flex items-center justify-center">
                  <span className="relative h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#DAF1DE] shadow-[0_0_8px_#daf1de]"></span>
                </div>

                {/* Signal Blip 3 */}
                <div className="absolute top-[62%] right-[24%] flex items-center justify-center">
                  <span className="relative h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#8EB69B] shadow-[0_0_8px_#8eb69b]"></span>
                </div>

                {/* Center Beacon */}
                <div className="relative z-10 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#0B2B26] border border-[#8EB69B]/70 shadow-[0_0_15px_rgba(142,182,155,0.7)]">
                  <Radio size={14} className="text-[#DAF1DE] md:animate-pulse sm:w-4 sm:h-4" />
                </div>
              </CardItem>

              {/* Radar Status Indicators */}
              <CardItem
                translateZ={isMobile ? 0 : 60}
                className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[9px] sm:text-[11px] font-mono text-zinc-500 w-full"
              >
                <span className="flex items-center gap-1 font-medium whitespace-nowrap text-[#0B2B26]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#235347]" />
                  Positive: 84%
                </span>
                <span className="flex items-center gap-1 font-medium whitespace-nowrap text-[#0B2B26]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#163832]" />
                  Signals: 12.4k
                </span>
                <span className="flex items-center gap-1 font-medium whitespace-nowrap text-[#0B2B26]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8EB69B]" />
                  Risk: None
                </span>
              </CardItem>
            </div>

            {/* Right Column: Real-World Social Mentions & Signal Feed */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-2 sm:space-y-2.5 w-full">
              <CardItem translateZ={isMobile ? 0 : 30} className="w-full">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <p className="text-[10px] sm:text-xs uppercase font-mono font-bold tracking-wider text-[#163832]">
                    Live Analyzed Post Signals
                  </p>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#0B2B26] bg-[#DAF1DE] px-2 py-0.5 rounded-full border border-[#8EB69B]/50 font-bold">
                    Auto-Streaming
                  </span>
                </div>
              </CardItem>

              {alertFeeds.map((feed, idx) => (
                <CardItem
                  key={idx}
                  translateZ={isMobile ? 0 : 40 + idx * 8}
                  className="w-full"
                >
                  <div
                    onClick={() => setActiveAlert(idx)}
                    className={`p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer ${
                      activeAlert === idx
                        ? "border-[#235347] bg-[#DAF1DE]/40 shadow-xs"
                        : "border-zinc-200/80 bg-zinc-50/60 hover:border-[#8EB69B]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] mb-1 gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <PlatformPngIcon platform={feed.platform} size={15} className="shrink-0" />
                        <span className="font-bold text-[#051F20] truncate">
                          {feed.source}
                        </span>
                      </div>
                      <span
                        className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-medium border shrink-0 ${feed.badgeColor}`}
                      >
                        {feed.sentiment}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#163832] font-medium leading-snug line-clamp-2 sm:line-clamp-none">
                      {feed.text}
                    </p>
                    <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[9px] sm:text-[11px] text-zinc-500">
                      <span className="font-medium text-[#235347] truncate mr-2">{feed.status}</span>
                      <span className="text-[#163832] font-semibold flex items-center gap-0.5 hover:underline shrink-0">
                        View Analysis <ArrowUpRight size={11} />
                      </span>
                    </div>
                  </div>
                </CardItem>
              ))}

              <CardItem
                translateZ={isMobile ? 0 : 50}
                className="pt-1 flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-500"
              >
                <div className="flex items-center gap-1.5 text-[#163832] font-medium truncate">
                  <Zap size={12} className="text-[#235347] shrink-0" />
                  <span className="truncate">Sentiment Analysis: ~1.8s</span>
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] text-[#8EB69B] shrink-0">Real-time Stream</span>
              </CardItem>
            </div>
          </div>

          {/* Bottom Metrics Bar */}
          <div className="mt-5 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-[#DAF1DE]">
            <CardItem translateZ={isMobile ? 0 : 30} className="rounded-xl sm:rounded-2xl bg-[#DAF1DE]/40 border border-[#8EB69B]/30 p-2.5 sm:p-3.5 min-w-0">
              <p className="text-[9px] sm:text-[11px] font-mono uppercase text-[#235347] font-medium truncate">Sentiment</p>
              <p className="text-base sm:text-xl font-bold text-[#0B2B26] mt-0.5 sm:mt-1 flex items-center gap-1">
                84% <TrendingUp size={14} className="text-[#235347]" />
              </p>
              <p className="text-[9px] sm:text-[11px] text-[#235347]/80 mt-0.5 truncate">↑ 12% this week</p>
            </CardItem>

            <CardItem translateZ={isMobile ? 0 : 40} className="rounded-xl sm:rounded-2xl bg-[#DAF1DE]/40 border border-[#8EB69B]/30 p-2.5 sm:p-3.5 min-w-0">
              <p className="text-[9px] sm:text-[11px] font-mono uppercase text-[#235347] font-medium truncate">Signals</p>
              <p className="text-base sm:text-xl font-bold text-[#051F20] mt-0.5 sm:mt-1 flex items-center gap-1">
                12.4k <Activity size={14} className="text-[#235347]" />
              </p>
              <p className="text-[9px] sm:text-[11px] text-[#235347]/80 mt-0.5 truncate">Posts &amp; comments</p>
            </CardItem>

            <CardItem translateZ={isMobile ? 0 : 50} className="rounded-xl sm:rounded-2xl bg-[#DAF1DE]/40 border border-[#8EB69B]/30 p-2.5 sm:p-3.5 min-w-0">
              <p className="text-[9px] sm:text-[11px] font-mono uppercase text-[#235347] font-medium truncate">Crisis Risk</p>
              <p className="text-base sm:text-xl font-bold text-[#0B2B26] mt-0.5 sm:mt-1">LOW</p>
              <p className="text-[9px] sm:text-[11px] text-[#235347]/80 mt-0.5 truncate">0 anomalies</p>
            </CardItem>

            <CardItem translateZ={isMobile ? 0 : 60} className="rounded-xl sm:rounded-2xl bg-[#DAF1DE]/40 border border-[#8EB69B]/30 p-2.5 sm:p-3.5 min-w-0">
              <p className="text-[9px] sm:text-[11px] font-mono uppercase text-[#235347] font-medium truncate">Confidence</p>
              <p className="text-base sm:text-xl font-bold text-[#163832] mt-0.5 sm:mt-1 flex items-center gap-1">
                96% <CheckCircle2 size={13} className="text-[#235347]" />
              </p>
              <p className="text-[9px] sm:text-[11px] text-[#235347]/80 mt-0.5 truncate">Verified confidence</p>
            </CardItem>
          </div>

        </CardBody>
      </CardContainer>
    </div>
  );
}
