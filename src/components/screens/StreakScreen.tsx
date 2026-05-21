"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReadoraStore } from "@/store/useReadoraStore";
import { Flame, Sparkles, Home } from "lucide-react";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const StreakScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const {
    userRank,
    userXp,
    userLevel,
    userStreak,
    userBadges,
    resetProgress
  } = useReadoraStore();

  const nextLevelXp = userLevel * 1000;
  const prevLevelXp = (userLevel - 1) * 1000;
  const currentLevelProgressXp = userXp - prevLevelXp;
  const levelXpRequired = nextLevelXp - prevLevelXp;
  const progressPercent = Math.min(100, Math.round((currentLevelProgressXp / levelXpRequired) * 100));

  const ranks = [
    { title: "Reader", level: 1 },
    { title: "Thinker", level: 2 },
    { title: "Scholar", level: 3 },
    { title: "Sage", level: 4 },
    { title: "Legend", level: 5 },
  ];

  return (
    <div className="min-h-full bg-[#0F0F0F] text-[#F5F1E8] p-5 pb-28 overflow-y-auto bg-grain relative">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-gradient-to-b from-[#D97706]/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center z-10 pt-2 mb-6">
        <span className="text-[10px] uppercase tracking-widest text-[#A8A29E] font-semibold">
          Insight & Growth
        </span>
        <button
          onClick={() => onNavigate("home")}
          className="text-[10px] uppercase tracking-widest text-[#C46A2D] font-bold flex items-center gap-1 active:scale-[0.95]"
        >
          <Home className="w-3.5 h-3.5" /> Home
        </button>
      </div>

      {/* Flame Showcase */}
      <div className="flex flex-col items-center text-center space-y-3 mb-8 relative z-10">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            y: [0, -3, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
          className="relative w-28 h-28 rounded-full bg-[#D97706]/15 border border-[#D97706]/20 flex items-center justify-center shadow-2xl shadow-[#D97706]/20 glow-amber"
        >
          <Flame className="w-16 h-16 text-[#D97706] fill-current" />
          <motion.div 
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute inset-0 rounded-full border border-[#E6B566]/40"
          />
        </motion.div>

        <div>
          <h2 className="font-serif text-3xl font-bold tracking-tight">
            {userStreak} Days
          </h2>
          <span className="text-[10px] uppercase tracking-widest text-[#E6B566] font-bold flex items-center justify-center gap-1 mt-1">
            <Sparkles className="w-3 h-3 animate-spin" /> Consistent Mind Flame
          </span>
          <p className="text-[10px] text-[#A8A29E] font-light max-w-[220px] mx-auto mt-2 leading-relaxed">
            Your habit is protected for today. The flame burns bright, keeping distractions at bay.
          </p>
        </div>
      </div>

      {/* XP Level progression block */}
      <div className="glass-panel rounded-3xl p-5 border border-white/5 mb-6 relative overflow-hidden">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#A8A29E] font-semibold">Current Rank</span>
            <h3 className="font-serif text-base font-bold text-[#F5F1E8]">{userRank}</h3>
          </div>
          <div className="text-right">
            <span className="text-[9px] uppercase tracking-wider text-[#A8A29E] font-semibold">Level {userLevel}</span>
            <div className="text-xs text-[#E6B566] font-bold font-serif">{userXp} total XP</div>
          </div>
        </div>

        {/* Progression Bar */}
        <div className="space-y-1.5">
          <div className="h-2 bg-[#0F0F0F] rounded-full overflow-hidden border border-white/5 relative">
            <div
              className="h-full bg-gradient-to-r from-[#C46A2D] to-[#E6B566] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[8px] text-[#A8A29E] uppercase tracking-wider font-semibold">
            <span>Level {userLevel}</span>
            <span>{nextLevelXp - userXp} XP to Level {userLevel + 1}</span>
            <span>Level {userLevel + 1}</span>
          </div>
        </div>
      </div>

      {/* Ranks Ladder */}
      <div className="glass-card rounded-3xl p-4 border border-white/5 mb-6">
        <h4 className="font-serif text-xs font-semibold text-[#F5F1E8] uppercase tracking-wider mb-4 pl-1">
          Rank Hierarchy Progress
        </h4>

        <div className="relative pl-6 space-y-4">
          <div className="absolute top-1 left-2.5 w-[1px] h-[85%] bg-white/5" />
          
          {ranks.map((r) => {
            const isCompleted = userLevel > r.level;
            const isActive = userLevel === r.level;

            return (
              <div key={r.title} className="flex items-center justify-between relative">
                {/* Node dot indicator */}
                <div className={`absolute left-[-21px] w-3 h-3 rounded-full border transition-all ${
                  isActive 
                    ? "bg-[#C46A2D] border-[#E6B566] ring-4 ring-[#C46A2D]/20" 
                    : isCompleted ? "bg-[#7C2D12] border-transparent" : "bg-[#151515] border-white/10"
                }`} />

                <div>
                  <span className={`text-xs font-semibold ${isActive ? "text-[#C46A2D]" : isCompleted ? "text-[#F5F1E8]" : "text-[#A8A29E]/50"}`}>
                    {r.title}
                  </span>
                  <span className="text-[8px] text-[#A8A29E] font-light block">
                    {r.level === 1 ? "Start level" : `Requires Level ${r.level}`}
                  </span>
                </div>

                {isActive && (
                  <span className="text-[8px] uppercase tracking-wider bg-[#C46A2D]/10 text-[#C46A2D] border border-[#C46A2D]/20 px-2 py-0.5 rounded-full font-bold">
                    Active Rank
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Earned Badges block */}
      <div>
        <h4 className="font-serif text-xs font-semibold text-[#F5F1E8] uppercase tracking-wider mb-4 pl-1">
          Aesthetic Badge Collection ({userBadges.length})
        </h4>

        <div className="grid grid-cols-2 gap-3">
          {userBadges.map((badge) => (
            <div
              key={badge.id}
              className="glass-card rounded-2xl p-4 border border-white/5 text-center flex flex-col items-center space-y-2 relative overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/5 blur-lg rounded-full" />
              <span className="text-3xl filter drop-shadow-md select-none">{badge.icon}</span>
              <div>
                <h5 className="font-serif text-xs font-bold text-[#F5F1E8] leading-tight">
                  {badge.name}
                </h5>
                <span className="text-[8px] text-[#A8A29E] font-light block mt-0.5">
                  {badge.desc}
                </span>
                <span className="text-[7px] text-[#C46A2D] font-medium tracking-wide block mt-2 uppercase">
                  Unlocked {badge.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Progress Action for testing */}
      <div className="mt-8 border-t border-white/5 pt-6 text-center">
        <button
          onClick={() => {
            resetProgress();
            onNavigate("home");
          }}
          className="text-[9px] uppercase tracking-widest text-[#A8A29E]/40 hover:text-[#7C2D12] transition-colors"
        >
          Reset Demo Habits Stats
        </button>
      </div>
    </div>
  );
};
