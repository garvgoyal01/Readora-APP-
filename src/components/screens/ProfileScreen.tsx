"use client";

import React, { useState } from "react";
import { useReadoraStore } from "@/store/useReadoraStore";
import { Bookmark, Award, Feather } from "lucide-react";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const ProfileScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const {
    userName,
    userRank,
    userXp,
    userLevel,
    userStreak,
    userAvatar,
    userBio,
    userFollowers,
    userFollowing,
    reflections,
    savedQuotes
  } = useReadoraStore();

  const [activeTab, setActiveTab] = useState<"reflections" | "quotes" | "milestones">("reflections");

  return (
    <div className="min-h-full bg-[#0F0F0F] text-[#F5F1E8] pb-28 bg-grain relative">
      
      {/* Cover Image Simulation */}
      <div className="h-32 bg-gradient-to-r from-[#7C2D12] via-[#C46A2D] to-[#8B7355] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-3 right-4 text-[9px] uppercase tracking-widest bg-black/40 text-[#E6B566] px-2.5 py-1 rounded-full font-bold backdrop-blur-md">
          {userRank} Rank
        </div>
      </div>

      {/* Profile Detail block */}
      <div className="px-5 -mt-10 relative z-10 space-y-4">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full border-4 border-[#0F0F0F] overflow-hidden bg-[#202020] shadow-xl">
          <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
        </div>

        {/* Identity */}
        <div>
          <h2 className="font-serif text-xl font-bold tracking-tight text-[#F5F1E8]">
            {userName}
          </h2>
          <span className="text-[9px] uppercase tracking-widest text-[#E6B566] font-bold">
            Level {userLevel} Scholar • Active Chamber
          </span>
          <p className="text-[10px] text-[#D6D3CE] font-light leading-relaxed mt-2 pr-6">
            {userBio}
          </p>
        </div>

        {/* Stat numbers grid */}
        <div className="grid grid-cols-4 gap-2 bg-[#151515] p-3 rounded-2xl border border-white/5 text-center">
          <div>
            <div className="text-xs font-serif font-bold text-[#F5F1E8]">{userFollowers}</div>
            <div className="text-[8px] text-[#A8A29E] uppercase tracking-wider font-semibold">Followers</div>
          </div>
          <div>
            <div className="text-xs font-serif font-bold text-[#F5F1E8]">{userFollowing}</div>
            <div className="text-[8px] text-[#A8A29E] uppercase tracking-wider font-semibold">Following</div>
          </div>
          <div>
            <div className="text-xs font-serif font-bold text-[#F5F1E8]">{userStreak}d</div>
            <div className="text-[8px] text-[#A8A29E] uppercase tracking-wider font-semibold">Streak</div>
          </div>
          <div>
            <div className="text-xs font-serif font-bold text-[#F5F1E8]">{userXp}</div>
            <div className="text-[8px] text-[#A8A29E] uppercase tracking-wider font-semibold">XP</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-[#151515] rounded-xl p-0.5 border border-white/5">
          {[
            { id: "reflections" as const, label: "Reflections", icon: Feather },
            { id: "quotes" as const, label: "Quotes", icon: Bookmark },
            { id: "milestones" as const, label: "Milestones", icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 text-[9px] uppercase tracking-wider font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                  active ? "bg-[#C46A2D] text-white" : "text-[#A8A29E] hover:text-current"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content sheet */}
        <div className="pt-2">
          {activeTab === "reflections" && (
            <div className="space-y-4">
              {reflections.length === 0 ? (
                <div className="text-center py-10 bg-white/2 rounded-2xl border border-dashed border-white/5 space-y-2">
                  <Feather className="w-6 h-6 text-[#A8A29E]/30 mx-auto" />
                  <p className="text-[10px] text-[#A8A29E] font-light">No reflections recorded yet. Complete today&apos;s focus!</p>
                </div>
              ) : (
                reflections.map((ref) => (
                  <div key={ref.id} className="bg-[#151515] rounded-2xl p-4 border border-white/5 space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] uppercase tracking-widest text-[#E6B566] font-bold">
                        {ref.bookTitle}
                      </span>
                      <span className="text-[8px] text-[#A8A29E] font-light">{ref.createdAt}</span>
                    </div>
                    <p className="font-serif text-[10px] italic text-[#A8A29E] border-l border-white/10 pl-2 leading-relaxed">
                      &quot;{ref.quote}&quot;
                    </p>
                    <p className="text-xs text-[#D6D3CE] leading-relaxed font-light">
                      {ref.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "quotes" && (
            <div className="space-y-3">
              {savedQuotes.length === 0 ? (
                <div className="text-center py-10 bg-white/2 rounded-2xl border border-dashed border-white/5 space-y-2">
                  <Bookmark className="w-6 h-6 text-[#A8A29E]/30 mx-auto" />
                  <p className="text-[10px] text-[#A8A29E] font-light">No saved quotes yet. Highlight text while reading.</p>
                </div>
              ) : (
                savedQuotes.map((q, idx) => (
                  <div key={idx} className="bg-[#151515] rounded-2xl p-4 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-white/2 blur-lg rounded-full" />
                    <p className="font-serif text-xs italic text-[#F5F1E8] leading-relaxed">
                      &quot;{q.text}&quot;
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-[8px] text-[#A8A29E] font-semibold">{q.bookTitle} • {q.author}</span>
                      <span className="text-[7px] text-[#C46A2D] font-bold uppercase tracking-wider">{q.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "milestones" && (
            <div className="space-y-3">
              <div className="bg-[#151515] rounded-2xl p-4 border border-white/5 space-y-4">
                <span className="text-[9px] uppercase tracking-wider text-[#A8A29E] font-bold block">Chamber Credentials</span>
                
                <div className="space-y-3">
                  {[
                    { label: "Stoic Initiate", desc: "Read 1 essay from Marcus Aurelius", done: true },
                    { label: "Flame Holder", desc: "Maintain a 10-day reading streak", done: true },
                    { label: "Insight Curator", desc: "Save 5 aesthetic quotes to journal", done: savedQuotes.length >= 5 },
                    { label: "Deep-Dive Philosopher", desc: "Write 3 detailed reflections", done: reflections.length >= 3 },
                  ].map((m, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-b-0">
                      <div>
                        <div className="text-xs font-semibold text-[#F5F1E8]">{m.label}</div>
                        <div className="text-[8px] text-[#A8A29E] font-light mt-0.5">{m.desc}</div>
                      </div>
                      <span className={`text-[8px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                        m.done ? "bg-[#C46A2D]/10 text-[#C46A2D] border border-[#C46A2D]/20" : "bg-white/5 text-[#A8A29E]"
                      }`}>
                        {m.done ? "Unlocked" : "Locked"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
