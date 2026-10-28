"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Activity, Menu, X, ArrowRight } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/src/lib/utils";
import NeonBorderBeam from "./ui/NeonBorderBeam";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold of 25px: when scrolled down, navbar shrinks; when at top, it expands
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    // If on homepage or landing page, smooth scroll to top
    if (typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "")) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  };

  return (
    <header
      className={cn(
        "sticky z-50 mx-auto w-full px-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isScrolled
          ? "top-2.5 sm:top-3 max-w-3xl lg:max-w-4xl"
          : "top-5 max-w-5xl lg:max-w-6xl"
      )}
    >
      <nav
        className={cn(
          "relative flex items-center justify-between rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled
            ? "py-2 px-5 bg-[#DAF1DE] dark:bg-[#DAF1DE] backdrop-blur-xl border border-[#235347]/20 dark:border-[#163832]/30 shadow-[0_20px_45px_-8px_rgba(5,31,32,0.18),0_8px_18px_-4px_rgba(5,31,32,0.08)]"
            : "py-3 px-6 sm:px-7 bg-[#DAF1DE] dark:bg-[#DAF1DE] backdrop-blur-md border border-[#235347]/15 dark:border-[#163832]/25 shadow-[0_14px_34px_-6px_rgba(5,31,32,0.14),0_4px_12px_-2px_rgba(5,31,32,0.06)]"
        )}
      >
        {/* Glowing Neon Chasing Border Beam */}
        <NeonBorderBeam colorFrom="#DAF1DE" colorMid="#8EB69B" colorTo="#235347" />

        {/* LEFT 2 LINKS */}
        <div
          className={cn(
            "hidden md:flex items-center transition-all duration-300",
            isScrolled ? "gap-5 lg:gap-6" : "gap-7 lg:gap-8"
          )}
        >
          <a
            href="#features"
            className="text-xs font-semibold uppercase tracking-wider text-[#051F20] hover:text-[#163832] dark:text-[#051F20] dark:hover:text-[#163832] transition-colors"
          >
            Features
          </a>
          <a
            href="#privacy"
            className="text-xs font-semibold uppercase tracking-wider text-[#051F20] hover:text-[#163832] dark:text-[#051F20] dark:hover:text-[#163832] transition-colors"
          >
            Privacy
          </a>
        </div>

        {/* LOGO IN MIDDLE */}
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label="SocialInt - Scroll to top"
          className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
        >
          <div
            className={cn(
              "flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#051F20] via-[#163832] to-[#235347] text-[#DAF1DE] shadow-sm shadow-[#163832]/25 transition-all duration-300 group-hover:scale-105",
              isScrolled ? "h-7 w-7 rounded-lg" : "h-8 w-8 rounded-xl"
            )}
          >
            <Activity
              size={isScrolled ? 15 : 18}
              className="stroke-[2.5] transition-all duration-300"
            />
          </div>
          <div className="flex flex-col transition-all duration-300">
            <span
              className={cn(
                "font-display tracking-tight text-[#051F20] dark:text-[#051F20] font-bold leading-none transition-all duration-300",
                isScrolled ? "text-base" : "text-xl"
              )}
            >
              SocialInt
            </span>
            <span
              className={cn(
                "font-mono tracking-widest text-[#163832] uppercase transition-all duration-300",
                isScrolled
                  ? "text-[0px] h-0 opacity-0 overflow-hidden -mt-0"
                  : "text-[9px] h-auto opacity-100 -mt-0.5"
              )}
            >
              
            </span>
          </div>
        </Link>

        {/* RIGHT 2 LINKS + GET STARTED */}
        <div
          className={cn(
            "hidden md:flex items-center transition-all duration-300",
            isScrolled ? "gap-5 lg:gap-6" : "gap-6 lg:gap-7"
          )}
        >
          <a
            href="#solutions"
            className="text-xs font-semibold uppercase tracking-wider text-[#051F20] hover:text-[#163832] dark:text-[#051F20] dark:hover:text-[#163832] transition-colors"
          >
            Use Cases
          </a>
          <a
            href="#workflow"
            className="text-xs font-semibold uppercase tracking-wider text-[#051F20] hover:text-[#163832] dark:text-[#051F20] dark:hover:text-[#163832] transition-colors"
          >
            How it Works
          </a>

          <SignUpButton mode="modal">
            <button
              type="button"
              className={cn(
                "inline-flex items-center rounded-full bg-gradient-to-r from-[#0B2B26] via-[#163832] to-[#235347] hover:from-[#051F20] hover:to-[#163832] text-[#DAF1DE] shadow-[0_4px_16px_rgba(11,43,38,0.28)] hover:shadow-[0_6px_20px_rgba(11,43,38,0.38)] active:scale-95 transition-all duration-300 font-semibold cursor-pointer",
                isScrolled
                  ? "px-3.5 py-1.5 text-xs gap-1"
                  : "px-4.5 py-2 text-xs gap-1.5"
              )}
            >
              <span>Get Started</span>
              <ArrowRight size={isScrolled ? 12 : 13} className="transition-all duration-300" />
            </button>
          </SignUpButton>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-2 md:hidden">
          <SignUpButton mode="modal">
            <button
              type="button"
              className={cn(
                "rounded-full bg-[#0B2B26] text-[#DAF1DE] font-semibold transition-all duration-300",
                isScrolled ? "px-3 py-1.5 text-xs" : "px-3.5 py-1.5 text-xs"
              )}
            >
              Register
            </button>
          </SignUpButton>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#051F20] hover:text-[#0B2B26] dark:text-[#051F20] dark:hover:text-[#0B2B26] rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mt-2 rounded-2xl border border-[#235347]/20 bg-[#DAF1DE] dark:bg-[#DAF1DE] backdrop-blur-xl p-4 shadow-xl md:hidden flex flex-col gap-3"
          >
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#051F20] hover:text-[#0B2B26] py-1"
            >
              Features
            </a>
            <a
              href="#privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#051F20] hover:text-[#0B2B26] py-1"
            >
              Privacy Policy
            </a>
            <a
              href="#solutions"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#051F20] hover:text-[#0B2B26] py-1"
            >
              Use Cases
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#051F20] hover:text-[#0B2B26] py-1"
            >
              How it Works
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
