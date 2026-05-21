"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Flame, Sparkles, Feather } from "lucide-react";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const LandingScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-full bg-[#0F0F0F] text-[#F5F1E8] flex flex-col justify-between relative overflow-y-auto bg-grain pb-8">
      {/* Cinematic ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[50%] bg-gradient-to-b from-[#7C2D12]/20 via-[#C46A2D]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="px-6 pt-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C2D12] to-[#C46A2D] flex items-center justify-center border border-[#E6B566]/20">
            <Feather className="w-4 h-4 text-[#F5F1E8]" />
          </div>
          <span className="font-serif font-semibold tracking-widest text-[#F5F1E8] text-lg uppercase">
            Readora
          </span>
        </div>
        <button 
          onClick={() => onNavigate("login")}
          className="text-xs font-medium text-[#D6D3CE] hover:text-[#C46A2D] transition-colors border border-white/5 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm"
        >
          Sign In
        </button>
      </header>

      {/* Hero Section */}
      <main className="px-6 flex-1 flex flex-col justify-center pt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C2D12]/20 border border-[#C46A2D]/30 text-[#E6B566] text-[10px] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> A new era of intellectual growth
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight font-medium tracking-tight text-[#F5F1E8]">
            Build a reading habit <br />
            <span className="italic text-[#C46A2D] font-normal">that feeds your soul.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#D6D3CE] leading-relaxed max-w-[280px] sm:max-w-md font-light">
            Read daily classical essays, catalog beautiful ideas, preserve consistent streaks, and grow together in a premium aesthetic space.
          </p>
        </motion.div>

        {/* Dynamic CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8"
        >
          <button
            onClick={() => onNavigate("onboarding")}
            className="group w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#C46A2D] to-[#D97706] text-[#F5F1E8] font-medium text-sm flex items-center justify-between shadow-lg shadow-[#7C2D12]/30 active:scale-[0.98] transition-transform duration-150 border border-[#E6B566]/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <span className="tracking-wide">Begin Your Journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[10px] text-center text-[#A8A29E] mt-3 font-light">
            Takes 2 minutes • No subscription required
          </p>
        </motion.div>

        {/* Visual Mock Showcase (Mock stats in cards) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-10 grid grid-cols-2 gap-3"
        >
          {/* Card 1 */}
          <div className="glass-card rounded-2xl p-4 flex flex-col justify-between min-h-[100px] border border-white/5 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full bg-[#C46A2D]/10 blur-xl pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider font-medium">Daily Goal</span>
              <BookOpen className="w-3.5 h-3.5 text-[#C46A2D]" />
            </div>
            <div>
              <div className="text-xl font-serif text-[#F5F1E8] font-semibold">15 mins</div>
              <div className="text-[9px] text-[#D6D3CE] font-light">Focused reading</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-2xl p-4 flex flex-col justify-between min-h-[100px] border border-white/5 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full bg-[#D97706]/10 blur-xl pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider font-medium">Mindful Habit</span>
              <Flame className="w-3.5 h-3.5 text-[#D97706]" />
            </div>
            <div>
              <div className="text-xl font-serif text-[#F5F1E8] font-semibold">12 Days</div>
              <div className="text-[9px] text-[#D6D3CE] font-light">Active streak flame</div>
            </div>
          </div>
        </motion.div>

        {/* Social Proof Quote / Testimonial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 border-t border-white/5 pt-6 text-center space-y-2"
        >
          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-[#E6B566] text-xs">★</span>
            ))}
          </div>
          <p className="text-[11px] italic text-[#D6D3CE] leading-relaxed px-4">
            &quot;Readora has completely re-centered my digital consumption. I deleted TikTok, and now write daily reflections. A luxury café for the mind.&quot;
          </p>
          <p className="text-[9px] text-[#A8A29E] uppercase tracking-wider font-semibold">
            — Sophia Vance, Stoic Reader
          </p>
        </motion.div>
      </main>

      {/* Footer Info */}
      <footer className="text-center text-[9px] text-[#A8A29E] tracking-widest uppercase mt-6 relative z-10">
        © 2026 Readora. Purely Intellectual.
      </footer>
    </div>
  );
};
