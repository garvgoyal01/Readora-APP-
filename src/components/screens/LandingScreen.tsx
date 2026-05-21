"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Flame, Sparkles, Feather } from "lucide-react";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const LandingScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  return (
    <div
      style={{
        height: '100dvh',
        overflow: 'hidden',
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0
      }}
      className="bg-[#0F0F0F] text-[#F5F1E8] flex flex-col justify-between relative bg-grain"
    >
      {/* Cinematic ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[50%] bg-gradient-to-b from-[#7C2D12]/20 via-[#C46A2D]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="px-6 pt-4 flex justify-between items-center relative z-10">
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
      <main className="px-6 flex-1 flex flex-col justify-center pt-4 relative z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C2D12]/20 border border-[#C46A2D]/30 text-[#E6B566] text-[10px] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> A new era of intellectual growth
          </div>
          
          <h1 className="font-serif text-2xl sm:text-3xl leading-tight font-medium tracking-tight text-[#F5F1E8]">
            Build a reading habit <br />
            <span className="italic text-[#C46A2D] font-normal">that feeds your soul.</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#D6D3CE] leading-relaxed max-w-[280px] sm:max-w-sm font-light">
            Read daily classical essays, catalog beautiful ideas, preserve consistent streaks, and grow together in a premium aesthetic space.
          </p>
        </motion.div>

        {/* Dynamic CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6"
        >
          <button
            onClick={() => onNavigate("onboarding")}
            className="group w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#C46A2D] to-[#D97706] text-[#F5F1E8] font-medium text-sm flex items-center justify-between shadow-lg shadow-[#7C2D12]/30 active:scale-[0.98] transition-transform duration-150 border border-[#E6B566]/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <span className="tracking-wide">Begin Your Journey</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[9px] text-center text-[#A8A29E] mt-2 font-light">
            Takes 2 minutes • No subscription required
          </p>
        </motion.div>

        {/* Visual Mock Showcase (Mock stats in cards) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-6 grid grid-cols-2 gap-2"
        >
          {/* Card 1 */}
          <div className="glass-card rounded-2xl p-3 flex flex-col justify-between min-h-[80px] border border-white/5 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full bg-[#C46A2D]/10 blur-xl pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="text-[9px] text-[#A8A29E] uppercase tracking-wider font-medium">Daily Goal</span>
              <BookOpen className="w-3.5 h-3.5 text-[#C46A2D]" />
            </div>
            <div>
              <div className="text-lg font-serif text-[#F5F1E8] font-semibold">15 mins</div>
              <div className="text-[8px] text-[#D6D3CE] font-light">Focused reading</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-2xl p-3 flex flex-col justify-between min-h-[80px] border border-white/5 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full bg-[#D97706]/10 blur-xl pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="text-[9px] text-[#A8A29E] uppercase tracking-wider font-medium">Mindful Habit</span>
              <Flame className="w-3.5 h-3.5 text-[#D97706]" />
            </div>
            <div>
              <div className="text-lg font-serif text-[#F5F1E8] font-semibold">12 Days</div>
              <div className="text-[8px] text-[#D6D3CE] font-light">Active streak flame</div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
