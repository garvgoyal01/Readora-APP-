"use client";

import React, { useState } from "react";
import { useReadoraStore } from "@/store/useReadoraStore";
import { ArrowLeft, TrendingUp, Users, BookOpen, Clock, Activity, ShieldCheck, Plus, Sparkles } from "lucide-react";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const AdminDashboardScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const { notifications } = useReadoraStore();
  const [injectedCount, setInjectedCount] = useState(0);
  const [successToast, setSuccessToast] = useState(false);

  // Mock sessions list
  const [sessions, setSessions] = useState([
    { id: "s1", user: "Clara Kim", action: "Published Reflection", target: "The Book of Tea", time: "3 mins ago" },
    { id: "s2", user: "Marcus Sterling", action: "Completed daily target", target: "15 minutes read", time: "12 mins ago" },
    { id: "s3", user: "Sophia Chen", action: "Highlighted quote", target: "Letters of Van Gogh", time: "32 mins ago" },
    { id: "s4", user: "Julian Vane", action: "Ascended to level 3", target: "Earned Scholar rank", time: "1 hour ago" },
  ]);

  const handleInjectSession = () => {
    const mockUsers = ["Aurelia Thorne", "Silas Vance", "Elena Rostova", "Kaelen Drake"];
    const mockActions = ["Protected reading streak", "Highlighted custom quote", "Shared beautiful reflection", "Entered reading chamber"];
    const mockTargets = ["Meditations", "Beyond Good & Evil", "Letters of Van Gogh", "30 minutes deep focus"];

    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const randomAction = mockActions[Math.floor(Math.random() * mockActions.length)];
    const randomTarget = mockTargets[Math.floor(Math.random() * mockTargets.length)];

    const newSession = {
      id: `injected-${Date.now()}`,
      user: randomUser,
      action: randomAction,
      target: randomTarget,
      time: "Just now"
    };

    setSessions([newSession, ...sessions]);
    setInjectedCount((prev) => prev + 1);
    
    // Inject notification alert dynamically to signify system event
    notifications.unshift({
      id: `injected-notif-${Date.now()}`,
      type: "like",
      title: "System Session Logged",
      description: `${randomUser} just executed action: ${randomAction}.`,
      timestamp: "Just now",
      read: false
    });

    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
    }, 1500);
  };

  return (
    <div className="min-h-full bg-[#0F0F0F] text-[#F5F1E8] p-5 pb-8 bg-grain relative flex flex-col">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-[-5%] right-[-10%] w-[100%] h-[30%] bg-gradient-to-b from-[#C46A2D]/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Header controls */}
      <div className="flex justify-between items-center pt-2 mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("settings")}
            className="p-2 rounded-xl bg-[#151515] border border-white/5 text-[#D6D3CE] active:scale-[0.9]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="font-serif font-semibold tracking-widest text-[#F5F1E8] uppercase text-xs">
            Admin Chambers
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#E6B566]" />
          <span className="text-[9px] uppercase tracking-wider text-[#E6B566] font-bold">Secure Root Access</span>
        </div>
      </div>

      {/* Grid of growth numbers */}
      <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
        {[
          { label: "Daily Readers", val: "1,452", icon: Users, change: "+12.4% today", col: "text-[#E6B566]" },
          { label: "Deep-Read Mins", val: "32,490", icon: Clock, change: "+8.2% this wk", col: "text-[#C46A2D]" },
          { label: "Active Streaks", val: "842", icon: Activity, change: "92% protection", col: "text-[#D97706]" },
          { label: "Top Book", val: "Meditations", icon: BookOpen, change: "562 reads today", col: "text-[#F5F1E8] font-serif" },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="glass-panel rounded-2xl p-3.5 border border-white/5">
              <div className="flex justify-between items-start text-[#A8A29E] mb-2">
                <span className="text-[8px] uppercase tracking-wider font-bold">{m.label}</span>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className={`text-base font-serif font-bold ${m.col} truncate`}>{m.val}</div>
              <span className="text-[8px] text-[#A8A29E] font-light block mt-1">{m.change}</span>
            </div>
          );
        })}
      </div>

      {/* SVG Mock Analytics chart */}
      <div className="glass-panel rounded-3xl p-5 border border-white/5 mb-6 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-[8px] uppercase tracking-wider text-[#A8A29E] font-bold">Habit Analytics</span>
            <h4 className="font-serif text-xs font-bold text-[#F5F1E8]">Peak Reading Sessions (Weekly)</h4>
          </div>
          <TrendingUp className="w-4 h-4 text-[#C46A2D]" />
        </div>

        {/* SVG Graph visualizer */}
        <div className="h-28 w-full relative flex items-end">
          {/* Vertical axis guides */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
            <div className="h-[1px] w-full bg-white" />
            <div className="h-[1px] w-full bg-white" />
            <div className="h-[1px] w-full bg-white" />
          </div>

          {/* Styled graph bars */}
          <div className="flex justify-between items-end w-full h-full px-2 z-10">
            {[45, 60, 52, 78, 85, 95, 70].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 w-7">
                <div 
                  className="w-2.5 rounded-t-sm bg-gradient-to-t from-[#7C2D12] to-[#C46A2D] relative group hover:from-[#C46A2D] hover:to-[#E6B566] transition-all"
                  style={{ height: `${h}%` }}
                >
                  {/* Floating tooltip on hover */}
                  <div className="absolute top-[-22px] left-1/2 -translate-x-1/2 bg-[#252525] border border-white/10 text-[7px] text-[#E6B566] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 font-bold">
                    {h * 10} reads
                  </div>
                </div>
                <span className="text-[7px] text-[#A8A29E] font-bold uppercase tracking-wider">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Developer Actions trigger bar */}
      <div className="glass-panel rounded-3xl p-4.5 border border-[#C46A2D]/20 mb-6 relative overflow-hidden bg-gradient-to-tr from-[#7C2D12]/5 to-[#D97706]/5">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[8px] uppercase tracking-wider text-[#A8A29E] font-bold">Simulator Controls</span>
            <div className="text-[10px] text-[#D6D3CE] font-light mt-0.5">
              Simulate active platform requests
            </div>
          </div>
          {successToast && (
            <span className="text-[8px] text-[#E6B566] font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E6B566]" /> Session Logged!
            </span>
          )}
        </div>

        <button
          onClick={handleInjectSession}
          className="w-full py-2.5 rounded-xl bg-[#202020] hover:bg-[#252525] border border-[#C46A2D]/30 text-[#E6B566] text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <Plus className="w-4 h-4 text-[#C46A2D]" />
          <span>Inject Mock Reader Session ({injectedCount})</span>
        </button>
      </div>

      {/* Recent active sessions table */}
      <div className="glass-panel rounded-3xl p-4.5 border border-white/5 flex-1 relative z-10">
        <div className="flex items-center gap-1.5 mb-4">
          <Activity className="w-4 h-4 text-[#C46A2D] animate-pulse" />
          <h4 className="font-serif text-xs font-bold text-[#F5F1E8]">Live Activity Chronicle</h4>
        </div>

        <div className="space-y-3.5">
          {sessions.map((ses) => (
            <div key={ses.id} className="flex justify-between items-start border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
              <div>
                <span className="text-[10px] font-bold text-[#F5F1E8]">{ses.user}</span>
                <p className="text-[9px] text-[#D6D3CE] font-light mt-0.5 leading-tight">
                  {ses.action} • <span className="text-[#A8A29E] italic">{ses.target}</span>
                </p>
              </div>
              <span className="text-[8px] text-[#A8A29E] font-semibold tracking-wider uppercase shrink-0 pt-0.5">
                {ses.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
