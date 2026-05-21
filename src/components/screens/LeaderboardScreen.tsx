"use client";

import React, { useState } from "react";
import { Trophy, Users, Flame, Crown } from "lucide-react";
import { useReadoraStore } from "@/store/useReadoraStore";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const LeaderboardScreen: React.FC<ScreenProps> = () => {
  const { leaderboard } = useReadoraStore();
  const [activeTab, setActiveTab] = useState<"global" | "friends">("global");

  // Filter podium users (1, 2, 3)
  const topThree = leaderboard.slice(0, 3);
  
  // Arrange top three in standard visual order: 2nd, 1st, 3rd
  const podiumArrangement = [topThree[1], topThree[0], topThree[2]];

  return (
    <div className="min-h-full bg-[#0F0F0F] text-[#F5F1E8] p-5 pb-28 overflow-y-auto bg-grain relative">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-[-5%] left-[-10%] w-[100%] h-[35%] bg-gradient-to-b from-[#C46A2D]/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center pt-2 mb-4 relative z-10">
        <div>
          <span className="text-[9px] uppercase tracking-widest text-[#A8A29E] font-semibold">
            Weekly League
          </span>
          <h2 className="font-serif text-lg font-medium text-[#F5F1E8] mt-0.5 leading-tight">
            Scholarly Assembly
          </h2>
        </div>
        <div className="p-2 rounded-xl bg-[#151515] border border-white/5 text-[#E6B566]">
          <Trophy className="w-4.5 h-4.5" />
        </div>
      </div>

      {/* Filter Toggle Chips */}
      <div className="flex bg-[#151515] rounded-xl p-0.5 border border-white/5 mb-6 relative z-10">
        <button
          onClick={() => setActiveTab("global")}
          className={`flex-1 py-2 text-[10px] uppercase tracking-wider font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "global" ? "bg-[#C46A2D] text-white" : "text-[#A8A29E] hover:text-current"
          }`}
        >
          <Crown className="w-3 h-3" />
          <span>Global Sages</span>
        </button>
        <button
          onClick={() => setActiveTab("friends")}
          className={`flex-1 py-2 text-[10px] uppercase tracking-wider font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "friends" ? "bg-[#C46A2D] text-white" : "text-[#A8A29E] hover:text-current"
          }`}
        >
          <Users className="w-3 h-3" />
          <span>Friend Circle</span>
        </button>
      </div>

      {/* Premium Podium Showcase */}
      <div className="flex justify-center items-end gap-3.5 pt-6 pb-6 mb-4 relative z-10 border-b border-white/5">
        
        {/* Render 2nd, 1st, 3rd */}
        {podiumArrangement.map((user) => {
          if (!user) return null;
          
          // Determine place based on user object original rank
          const place = user.rank;
          const height = place === 1 ? "h-32" : place === 2 ? "h-26" : "h-22";
          const borderGlow = place === 1 
            ? "border-[#E6B566] ring-4 ring-[#E6B566]/10" 
            : place === 2 ? "border-[#D6D3CE] ring-2 ring-white/5" : "border-[#C46A2D]";

          return (
            <div key={user.name} className="flex flex-col items-center relative w-20">
              
              {/* Placement badge over avatar */}
              {place === 1 && (
                <div className="absolute top-[-22px] z-10 animate-bounce">
                  <Crown className="w-6 h-6 text-[#E6B566] fill-[#E6B566]/20" />
                </div>
              )}

              {/* Avatar Frame */}
              <div className={`relative w-12 h-12 rounded-full border-2 overflow-hidden ${borderGlow}`}>
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>

              {/* User short name */}
              <div className="text-[10px] font-serif font-bold text-center text-[#F5F1E8] mt-2 truncate w-full">
                {user.name.split(" ")[0]}
              </div>
              <div className="text-[8px] text-[#A8A29E] font-light mt-0.5">{user.title}</div>

              {/* Podium Block Column */}
              <div className={`w-full ${height} bg-[#1B1B1B]/80 backdrop-blur-md rounded-t-2xl mt-3 border border-white/5 flex flex-col justify-between p-2.5 text-center`}>
                <div className="text-sm font-serif font-bold text-[#E6B566]">{place}</div>
                <div>
                  <div className="text-[9px] font-bold text-[#F5F1E8]">{user.xp}</div>
                  <div className="text-[7px] text-[#A8A29E] uppercase tracking-wider font-semibold">XP</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Competitor scrollable list */}
      <div className="space-y-3 relative z-10">
        
        {/* Your rank highlighted banner if outside top 3 (represented here as list item showing your active score) */}
        {leaderboard.map((user) => {
          // Render only list users (top 3 and others)
          if (user.rank <= 3) return null;

          return (
            <div
              key={user.name}
              className={`glass-card rounded-2xl p-3 flex items-center justify-between border ${
                user.isSelf ? "border-[#C46A2D]/40 bg-[#C46A2D]/5" : "border-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Placement No */}
                <span className="w-5 text-center text-xs font-serif font-bold text-[#A8A29E]">
                  {user.rank}
                </span>

                {/* Avatar */}
                <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>

                <div>
                  <div className="text-xs font-bold text-[#F5F1E8] flex items-center gap-1">
                    {user.name}
                    {user.isSelf && (
                      <span className="text-[7px] uppercase tracking-wider bg-[#C46A2D]/20 text-[#C46A2D] px-1.5 py-0.5 rounded-full font-bold">
                        You
                      </span>
                    )}
                  </div>
                  <div className="text-[8px] text-[#A8A29E] font-light mt-0.5">
                    {user.title} • Level {user.level}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Streak flame details */}
                <div className="flex items-center gap-1 text-[#D97706]">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span className="text-[10px] font-bold">{user.streak}d</span>
                </div>

                {/* XP */}
                <div className="text-right min-w-[50px]">
                  <div className="text-[10px] font-serif font-bold text-[#F5F1E8]">{user.xp}</div>
                  <div className="text-[7px] text-[#A8A29E] uppercase tracking-wider font-semibold">XP</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
