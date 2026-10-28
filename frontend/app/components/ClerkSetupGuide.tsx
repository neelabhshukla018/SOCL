"use client";

import React, { useState } from "react";
import { Key, Terminal, ExternalLink, Check, Copy, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";

export default function ClerkSetupGuide() {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);

  const terminalCmd = "cd c:\\socialint\\Socialint\\frontend\nnpx clerk@latest init";
  const envSnippet = "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE\nCLERK_SECRET_KEY=sk_test_YOUR_KEY_HERE\nNEXT_PUBLIC_API_URL=http://localhost:5000";

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(terminalCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(envSnippet);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#080b12] text-zinc-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Dynamic Background Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="w-full max-w-3xl relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            SocialIntel Local Development
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Connect Your Clerk Authentication
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            SocialIntel uses Clerk for secure user authentication. A real Clerk publishable key (<code className="text-cyan-300 font-mono text-xs bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">pk_test_...</code>) is required to initialize the browser authentication SDK.
          </p>
        </div>

        {/* Warning Note */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Why am I seeing this?</span>
            <p className="text-zinc-300 text-xs mt-1 leading-relaxed">
              Your <code className="text-amber-200">.env.local</code> currently contains a placeholder key. Clerk requires an active development instance to load <code className="text-amber-200">clerk.browser.js</code>. Choose one of the quick options below to connect.
            </p>
          </div>
        </div>

        {/* Setup Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option 1: CLI Setup */}
          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl backdrop-blur-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400 font-semibold text-base">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Terminal className="w-4 h-4" />
                </div>
                Option 1: Automatic CLI
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Run this command in your terminal. When prompted with <code className="text-zinc-200 bg-zinc-800 px-1 py-0.5 rounded">■ Select a Clerk application</code>, use the arrow keys to select your app or create a new one, then press <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px] text-zinc-200 font-mono">Enter</kbd>.
              </p>
              <div className="relative group">
                <pre className="p-3 rounded-lg bg-black/60 border border-zinc-800 text-xs text-cyan-300 font-mono overflow-x-auto">
                  {terminalCmd}
                </pre>
                <button
                  onClick={handleCopyCmd}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                  title="Copy command"
                  aria-label="Copy command"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 mt-4 flex items-center gap-1">
              <ArrowRight className="w-3 h-3 text-cyan-400" /> Automatically writes keys to <code className="text-zinc-400">.env.local</code>
            </p>
          </div>

          {/* Option 2: Dashboard Setup */}
          <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xl backdrop-blur-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-cyan-400 font-semibold text-base">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Key className="w-4 h-4" />
                  </div>
                  Option 2: Copy from Dashboard
                </div>
                <a
                  href="https://dashboard.clerk.com/last-active?path=api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Dashboard <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Create a free application at <a href="https://dashboard.clerk.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">clerk.com</a> and paste your keys into <code className="text-zinc-200 bg-zinc-800 px-1 py-0.5 rounded">frontend/.env.local</code>:
              </p>
              <div className="relative group">
                <pre className="p-3 rounded-lg bg-black/60 border border-zinc-800 text-[11px] text-zinc-300 font-mono overflow-x-auto leading-relaxed">
                  {envSnippet}
                </pre>
                <button
                  onClick={handleCopyEnv}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                  title="Copy snippet"
                  aria-label="Copy snippet"
                >
                  {copiedEnv ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 mt-4 flex items-center gap-1">
              <ArrowRight className="w-3 h-3 text-cyan-400" /> Instant setup in under 30 seconds
            </p>
          </div>
        </div>

        {/* Footer Guidance */}
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-center text-xs text-zinc-400">
          Once keys are placed in <code className="text-zinc-300">frontend/.env.local</code>, restart the frontend (<kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-[10px] text-zinc-300 font-mono">Ctrl + C</kbd> then <code className="text-cyan-400">npm run dev</code>). This screen will be replaced by your SocialIntel app!
        </div>
      </main>
    </div>
  );
}
