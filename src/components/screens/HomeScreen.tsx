"use client";

import React from "react";
import { motion } from "framer-motion";
import { useReadoraStore } from "@/store/useReadoraStore";
import { Flame, Bell, Settings, BookOpen, Clock, Award, ChevronRight, Play } from "lucide-react";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const HomeScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const {
    userName,
    userRank,
    userXp,
    userLevel,
    userStreak,
    completedToday,
    readMinsToday,
    dailyGoalMins,
    books,
    setActiveBook,
    notifications
  } = useReadoraStore();

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const handleStartBook = (bookId: string) => {
    setActiveBook(bookId);
    onNavigate("reading");
  };

  const progressPercent = Math.min(100, Math.round((readMinsToday / dailyGoalMins) * 100));

  return (
    <div className="min-h-full bg-[#0F0F0F] text-[#F5F1E8] p-5 pb-28 bg-grain relative">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-[-5%] right-[-10%] w-[100%] h-[40%] bg-gradient-to-b from-[#C46A2D]/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-center relative z-10 pt-2 mb-6">
        <div>
          <span className="text-[9px] uppercase tracking-widest text-[#A8A29E] font-semibold">
            {userRank} • Level {userLevel}
          </span>
          <h2 className="font-serif text-lg font-medium text-[#F5F1E8] mt-0.5 leading-tight">
            Greetings, {userName.split(" ")[0]}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {/* Notifications Button */}
          <button 
            onClick={() => onNavigate("notifications")}
            className="p-2 rounded-xl bg-[#151515] border border-white/5 relative active:scale-[0.9]"
          >
            <Bell className="w-4 h-4 text-[#D6D3CE]" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C46A2D]" />
            )}
          </button>
          
          {/* Settings Button */}
          <button 
            onClick={() => onNavigate("settings")}
            className="p-2 rounded-xl bg-[#151515] border border-white/5 active:scale-[0.9]"
          >
            <Settings className="w-4 h-4 text-[#D6D3CE]" />
          </button>
        </div>
      </div>

      {/* Stats Quick-Bar */}
      <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
        {/* Streak Stat */}
        <div 
          onClick={() => onNavigate("streak")}
          className="glass-card rounded-2xl p-3.5 flex items-center justify-between border border-white/5 cursor-pointer hover:border-[#D97706]/30 transition-all"
        >
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-wider text-[#A8A29E] font-semibold">Daily Flame</span>
            <div className="text-base font-serif font-bold text-[#F5F1E8]">{userStreak} Days</div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              completedToday ? "bg-[#D97706]/20 border border-[#D97706]/40 text-[#D97706]" : "bg-white/5 border border-white/5 text-[#A8A29E]"
            }`}
          >
            <Flame className="w-5 h-5 fill-current" />
          </motion.div>
        </div>

        {/* XP Stat */}
        <div 
          onClick={() => onNavigate("streak")}
          className="glass-card rounded-2xl p-3.5 flex items-center justify-between border border-white/5 cursor-pointer hover:border-[#C46A2D]/30 transition-all"
        >
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-wider text-[#A8A29E] font-semibold">Total Insight</span>
            <div className="text-base font-serif font-bold text-[#F5F1E8]">{userXp} XP</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#C46A2D]/20 border border-[#C46A2D]/40 flex items-center justify-center text-[#E6B566]">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Action Banner: Today's Focus */}
      <div className="glass-panel rounded-3xl p-5 border border-[#C46A2D]/25 mb-6 relative overflow-hidden glow-bronze">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#C46A2D]/10 blur-xl rounded-full" />
        
        <div className="flex items-center gap-2 text-[9px] uppercase tracking-wider text-[#E6B566] font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" /> <span>Active Focus</span>
        </div>

        <h3 className="font-serif text-xl font-medium leading-snug">
          Meditations
        </h3>
        <p className="text-xs text-[#D6D3CE] font-light">
          by Marcus Aurelius • Chapter 1
        </p>

        {/* Goal progress infocus card */}
        <div className="flex items-center gap-3 mt-4 mb-5 bg-[#0F0F0F]/50 p-3 rounded-xl border border-white/5">
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-10 h-10 transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="17"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="3.5"
                fill="transparent"
              />
              <circle
                cx="20"
                cy="20"
                r="17"
                stroke="#C46A2D"
                strokeWidth="3.5"
                fill="transparent"
                strokeDasharray={106.8}
                strokeDashoffset={106.8 - (106.8 * progressPercent) / 100}
                className="transition-all duration-500"
              />
            </svg>
            <Clock className="w-3.5 h-3.5 text-[#C46A2D] absolute" />
          </div>
          <div>
            <div className="text-[11px] font-semibold">Goal Status</div>
            <div className="text-[9px] text-[#A8A29E] font-light">
              {readMinsToday} of {dailyGoalMins} mins completed today
            </div>
          </div>
        </div>

        <button
          onClick={() => handleStartBook("1")}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C46A2D] to-[#D97706] text-[#F5F1E8] text-xs font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-md"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Enter Reading Chamber</span>
        </button>
      </div>

      {/* Library Title */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-serif text-sm font-semibold tracking-tight">Your Custom Library</h4>
        <span className="text-[10px] text-[#A8A29E] hover:text-[#C46A2D] cursor-pointer transition-colors flex items-center gap-0.5">
          All books <ChevronRight className="w-3 h-3" />
        </span>
      </div>

      {/* Library list */}
      <div className="space-y-3">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => handleStartBook(book.id)}
            className="glass-card rounded-2xl p-3.5 flex items-center justify-between border border-white/5 cursor-pointer hover:border-white/10 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3.5">
              {/* Cover Representation */}
              <div className={`w-10 h-14 rounded-lg bg-gradient-to-br ${book.coverColor} border border-white/10 flex items-center justify-center shadow-md relative overflow-hidden`}>
                <div className="absolute top-1 left-1.5 w-[3px] h-[90%] bg-black/20" />
                <BookOpen className="w-4.5 h-4.5 text-[#F5F1E8]/70" />
              </div>

              <div>
                <span className="text-[8px] uppercase tracking-wider text-[#E6B566] font-semibold">
                  {book.category}
                </span>
                <h5 className="font-serif text-xs font-semibold text-[#F5F1E8] mt-0.5">
                  {book.title}
                </h5>
                <p className="text-[9px] text-[#A8A29E] font-light">
                  {book.author} • {book.minutesToRead} mins
                </p>
              </div>
            </div>

            <button className="w-7 h-7 rounded-full bg-[#151515] border border-white/5 flex items-center justify-center text-[#A8A29E] hover:text-[#C46A2D] hover:border-[#C46A2D]/30 transition-colors">
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
