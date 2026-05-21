"use client";

import React from "react";
import { Home, Trophy, Compass, User } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "social", label: "Feed", icon: Compass },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 h-16 border-t border-[#2a2a2a] bg-[#1a1a1a] px-4">
      <div className="mx-auto flex h-full max-w-4xl items-center justify-between gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-button flex min-h-[44px] min-w-[64px] flex-1 flex-col items-center justify-center gap-1 rounded-3xl px-2 text-[11px] font-semibold transition-all duration-150 focus-visible:outline-none ${
                isActive
                  ? "text-[#F97316]"
                  : "text-[#A8A29E]"
              } ${isActive ? "bg-white/5" : "bg-transparent"}`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "text-[#F97316]" : "text-[#A8A29E]"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
