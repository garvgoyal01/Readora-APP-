"use client";

import React, { useState } from "react";
import { useReadoraStore } from "@/store/useReadoraStore";
import { ArrowLeft, Eye, Volume2, ShieldAlert, Check } from "lucide-react";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const SettingsScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const {
    userName,
    userBio,
    dailyGoalMins,
    fontSize,
    zenMusic,
    setZenMusic,
    setFontSize
  } = useReadoraStore();

  const [inputName, setInputName] = useState(userName);
  const [inputBio, setInputBio] = useState(userBio);
  const [inputGoal, setInputGoal] = useState(dailyGoalMins);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    useReadoraStore.setState({
      userName: inputName,
      userBio: inputBio,
      dailyGoalMins: inputGoal
    });
    
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 1500);
  };

  return (
    <div className="min-h-full bg-[#0F0F0F] text-[#F5F1E8] p-5 pb-8 bg-grain relative flex flex-col">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-[-5%] left-[-10%] w-[100%] h-[30%] bg-gradient-to-b from-[#7C2D12]/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Header controls */}
      <div className="flex justify-between items-center pt-2 mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("home")}
            className="p-2 rounded-xl bg-[#151515] border border-white/5 text-[#D6D3CE] active:scale-[0.9]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-serif font-semibold tracking-widest text-[#F5F1E8] uppercase text-xs">
            Settings Chamber
          </span>
        </div>

        {/* Live Saved Toast */}
        {showSavedToast && (
          <span className="text-[9px] uppercase tracking-wider text-[#E6B566] font-bold flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-[#E6B566]" /> Preferences Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="flex-1 space-y-6 relative z-10 max-w-md mx-auto w-full">
        {/* Profile Card */}
        <div className="glass-panel rounded-3xl p-4.5 border border-white/5 space-y-4">
          <span className="text-[9px] uppercase tracking-wider text-[#A8A29E] font-bold block">
            Profile Settings
          </span>
          
          {/* Name input */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-wider font-semibold text-[#A8A29E] pl-1">
              Scholar Name
            </label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-full bg-[#0F0F0F] border border-white/5 focus:border-[#C46A2D] outline-none rounded-xl py-2.5 px-3 text-xs font-light text-[#F5F1E8]"
            />
          </div>

          {/* Bio input */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase tracking-wider font-semibold text-[#A8A29E] pl-1">
              Chamber Chronicle (Bio)
            </label>
            <textarea
              rows={2}
              value={inputBio}
              onChange={(e) => setInputBio(e.target.value)}
              className="w-full bg-[#0F0F0F] border border-white/5 focus:border-[#C46A2D] outline-none rounded-xl py-2.5 px-3 text-xs font-light text-[#F5F1E8] resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Reading Settings */}
        <div className="glass-panel rounded-3xl p-4.5 border border-white/5 space-y-4">
          <span className="text-[9px] uppercase tracking-wider text-[#A8A29E] font-bold block">
            Reading Chamber Settings
          </span>

          {/* Daily commitment goal */}
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-wider font-semibold text-[#A8A29E] pl-1">
              Daily Target Commitment
            </span>
            <div className="grid grid-cols-3 gap-2 bg-[#0F0F0F] rounded-xl p-1 border border-white/5">
              {[5, 15, 30].map((mins) => (
                <button
                  type="button"
                  key={mins}
                  onClick={() => setInputGoal(mins)}
                  className={`text-[10px] py-1.5 rounded-lg transition-colors font-medium ${
                    inputGoal === mins
                      ? "bg-[#C46A2D] text-white"
                      : "text-[#A8A29E] hover:text-current"
                  }`}
                >
                  {mins} Mins
                </button>
              ))}
            </div>
          </div>

          {/* Quick theme control */}
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#A8A29E]" />
              <span className="text-xs font-medium">Font Sizing ({fontSize})</span>
            </div>
            <button
              type="button"
              onClick={() => {
                const nextSize = fontSize === "sm" ? "base" : fontSize === "base" ? "lg" : fontSize === "lg" ? "xl" : "sm";
                setFontSize(nextSize);
              }}
              className="text-[9px] uppercase tracking-wider text-[#C46A2D] font-bold bg-[#C46A2D]/10 px-3 py-1 rounded-full animate-pulse"
            >
              Adjust
            </button>
          </div>

          {/* Sound control */}
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#A8A29E]" />
              <span className="text-xs font-medium">Zen Study Acoustics</span>
            </div>
            <button
              type="button"
              onClick={() => setZenMusic(!zenMusic)}
              className={`w-8 h-4.5 rounded-full p-0.5 transition-colors ${
                zenMusic ? "bg-[#C46A2D]" : "bg-white/10"
              }`}
            >
              <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${
                zenMusic ? "translate-x-3.5" : "translate-x-0"
              }`} />
            </button>
          </div>
        </div>

        {/* Golden Admin Operations trigger */}
        <div className="glass-panel rounded-3xl p-4.5 border border-[#E6B566]/20 space-y-3 relative overflow-hidden bg-gradient-to-r from-[#E6B566]/5 to-[#C46A2D]/5 glow-amber">
          <div className="flex items-center gap-2 text-[#E6B566] text-[10px] font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>Developer Space Portal</span>
          </div>
          <p className="text-[9px] text-[#D6D3CE] leading-relaxed font-light">
            Access administrative metrics, study daily growth rates, and audit platform session summaries.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("admin")}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C46A2D] text-white text-[10px] uppercase font-bold tracking-widest active:scale-[0.98] transition-transform"
          >
            Open Admin Dashboard
          </button>
        </div>

        {/* Global Submit CTA */}
        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl bg-[#202020] text-[#F5F1E8] text-xs font-semibold border border-white/5 active:scale-[0.98] transition-all hover:bg-[#252525]"
        >
          Commit All Settings
        </button>
      </form>
    </div>
  );
};
