"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Compass, Trophy, User } from "lucide-react";
import { useReadoraStore } from "@/store/useReadoraStore";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const notifications = useReadoraStore((state) => state.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "social", label: "Feed", icon: Compass },
    { id: "leaderboard", label: "Leagues", icon: Trophy },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-40">
      <div className="glass-panel rounded-2xl py-3 px-4 flex justify-between items-center shadow-lg shadow-black/40">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative p-2.5 rounded-xl transition-all duration-150 active:scale-[0.9] flex flex-col items-center gap-0.5 select-none"
            >
              {/* Active Tab Glow/Background */}
              {isActive && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-[#C46A2D]/10 rounded-xl border border-[#C46A2D]/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    isActive ? "text-[#C46A2D]" : "text-[#A8A29E]"
                  }`}
                />
                
                {/* Special Notification badge on Feed tab just for visual flare, or let's place it next to profile */}
                {tab.id === "profile" && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D97706] ring-2 ring-[#151515]" />
                )}
              </div>

              <span
                className={`text-[8px] font-semibold tracking-wider uppercase transition-colors ${
                  isActive ? "text-[#C46A2D]" : "text-[#A8A29E]/60"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
