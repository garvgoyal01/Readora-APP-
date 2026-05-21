"use client";

import React, { useEffect, useState } from "react";
import { useReadoraStore } from "@/store/useReadoraStore";

// Import Screens
import { LandingScreen } from "@/components/screens/LandingScreen";
import { OnboardingScreen } from "@/components/screens/OnboardingScreen";
import { LoginScreen } from "@/components/screens/LoginScreen";
import { SignupScreen } from "@/components/screens/SignupScreen";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { ReadingScreen } from "@/components/screens/ReadingScreen";
import { ReflectionScreen } from "@/components/screens/ReflectionScreen";
import { StreakScreen } from "@/components/screens/StreakScreen";
import { LeaderboardScreen } from "@/components/screens/LeaderboardScreen";
import { SocialFeedScreen } from "@/components/screens/SocialFeedScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";
import { NotificationsScreen } from "@/components/screens/NotificationsScreen";
import { SettingsScreen } from "@/components/screens/SettingsScreen";
import { AdminDashboardScreen } from "@/components/screens/AdminDashboardScreen";

// Navigation
import { Navigation } from "@/components/Navigation";
import { 
  Smartphone, 
  Database, 
  Feather, 
  Flame
} from "lucide-react";

export default function Page() { 
  const {
    currentScreen,
    setScreen,
    userXp,
    userStreak,
    userRank,
    completedToday,
    readMinsToday,
    savedQuotes,
    reflections,
    posts,
  } = useReadoraStore();

  const [simulatedTime, setSimulatedTime] = useState("10:00 PM");

  // Keep clock updated in phone simulator
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      const mins = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setSimulatedTime(`${hours}:${mins} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (screen: string) => {
    setScreen(screen);
  };

  // Determine whether to show the floating bottom navigation bar inside the mobile simulator
  const showNavbar = ["home", "social", "leaderboard", "profile"].includes(currentScreen);

  // List of all 14 screens for the left panel teleporter
  const teleporterScreens = [
    { id: "landing", name: "1. Landing Page", desc: "Cinematic hero & visual stats" },
    { id: "onboarding", name: "2. Onboarding Flow", desc: "Goal set & pathway select" },
    { id: "login", name: "3. Login UI", desc: "Sleek credentials & demo bypass" },
    { id: "signup", name: "4. Signup UI", desc: "Interactive chamber launch" },
    { id: "home", name: "5. Home Dashboard", desc: "Daily targets & active reading" },
    { id: "reading", name: "6. Daily Reading", desc: "Text highlight & font settings" },
    { id: "reflection", name: "7. Reflection Writing", desc: "Expanding box & XP confettis" },
    { id: "streak", name: "8. Streak & XP Status", desc: "Rank timelines & badges" },
    { id: "leaderboard", name: "9. Leaderboards", desc: "Podiums & global sages" },
    { id: "social", name: "10. Social Feed", desc: "Editorial quotes & likes" },
    { id: "profile", name: "11. User Profile", desc: "Chronicles, quotes & statistics" },
    { id: "notifications", name: "12. Notifications", desc: "Activity logs & rank ascends" },
    { id: "settings", name: "13. Settings Panel", desc: "Profile bios & study acoustics" },
    { id: "admin", name: "14. Admin Dashboard UI", desc: "Mock metrics charts & session inject" },
  ];

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-[#F5F1E8] bg-grain font-sans flex relative overflow-hidden">
      
      {/* Cinematic Ambient Glow (Desktop Showcase backlighting) */}
      <div className="absolute top-[-20%] left-[20%] w-[60%] h-[70%] bg-gradient-to-b from-[#7C2D12]/10 via-[#C46A2D]/5 to-transparent rounded-full blur-[140px] pointer-events-none hidden lg:block" />

      {/* LEFT SIDEBAR: 14-Screen Teleporter (Desktop viewports only) */}
      <section className="w-80 border-r border-white/5 bg-[#151515]/35 backdrop-blur-md p-6 flex flex-col justify-between hidden lg:flex relative z-10 select-none overflow-y-auto">
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C2D12] to-[#C46A2D] flex items-center justify-center border border-[#E6B566]/20 shadow-md">
              <Feather className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-serif font-semibold tracking-widest text-[#F5F1E8] uppercase text-sm leading-none">
                Readora
              </h1>
              <span className="text-[9px] uppercase tracking-wider text-[#A8A29E] font-semibold mt-1 block">
                UX Flow Presentation
              </span>
            </div>
          </div>

          <p className="text-[10px] text-[#A8A29E] leading-relaxed font-light">
            A premium mobile-first growth framework. Use the deck below to instantly warp the device simulator into any of the 14 key screens.
          </p>

          {/* Screen list */}
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-widest font-bold text-[#E6B566] block pb-1 border-b border-white/5">
              14-Screen Teleporter
            </span>
            <div className="space-y-1 max-h-[460px] overflow-y-auto pr-2 scrollbar-thin">
              {teleporterScreens.map((s) => {
                const isActive = currentScreen === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleNavigate(s.id)}
                    className={`w-full p-2 rounded-xl text-left border flex flex-col transition-all duration-150 active:scale-[0.98] ${
                      isActive 
                        ? "bg-[#C46A2D]/15 border-[#C46A2D] text-[#E6B566] shadow-sm shadow-[#C46A2D]/5"
                        : "bg-white/2 border-transparent hover:bg-white/5 hover:border-white/5 text-[#A8A29E]"
                    }`}
                  >
                    <span className="text-[11px] font-bold">{s.name}</span>
                    <span className="text-[8px] font-light mt-0.5 opacity-80">{s.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer specs */}
        <div className="pt-4 border-t border-white/5 text-center text-[9px] text-[#A8A29E] space-y-1">
          <div>Next.js 15 • Tailwind CSS v4 • Zustand</div>
          <div className="font-semibold text-[#E6B566]">Dribbble / Awwwards Grade</div>
        </div>
      </section>

      {/* CENTER STAGE: Mobile Simulator Frame (Responsive) */}
      <section className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        
        {/* Device simulator details */}
        <div className="mb-4 text-center hidden lg:block">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151515] border border-white/5 text-[9px] uppercase tracking-wider font-bold">
            <Smartphone className="w-3.5 h-3.5 text-[#C46A2D]" />
            <span>iPhone 15 Pro Frame Simulator</span>
          </div>
          <p className="text-[10px] text-[#A8A29E] font-light mt-1.5">
            Scroll, tap elements, select text to save quotes, or type reflections inside the phone.
          </p>
        </div>

        {/* Outer Phone Shell Frame */}
        <div className="relative w-full max-w-[390px] h-[100vh] max-h-[810px] bg-[#000000] lg:rounded-[50px] lg:border-[10px] lg:border-[#1E1E1E] lg:shadow-3xl lg:shadow-black/75 overflow-hidden flex flex-col justify-between">
          
          {/* Inner Phone Screen Panel */}
          <div className="flex-1 h-full w-full relative overflow-hidden bg-[#0F0F0F]">
            
            {/* Mock iPhone Dynamic Island Notch (Desktop preview only) */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 pointer-events-none flex items-center justify-center hidden lg:block">
              <div className="w-3 h-3 rounded-full bg-slate-900 absolute right-4" />
            </div>

            {/* Mock iPhone Status Bar (Desktop preview only) */}
            <div className="absolute top-0 inset-x-0 h-10 px-6 flex justify-between items-center text-[10px] font-semibold text-[#F5F1E8] z-40 bg-transparent pointer-events-none hidden lg:flex select-none">
              <span>{simulatedTime}</span>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-2.5 fill-current" viewBox="0 0 100 100">
                  <path d="M10,80 H25 V50 H10 Z M35,80 H50 V30 H35 Z M60,80 H75 V10 H60 Z" />
                </svg>
                <span className="text-[8px]">5G</span>
                {/* Battery */}
                <div className="w-5 h-2.5 rounded-sm border border-current p-0.5 flex items-center">
                  <div className="w-full h-full bg-[#E6B566] rounded-xs" />
                </div>
              </div>
            </div>

            {/* Active Screen Renderer */}
            <div className="absolute inset-0 pt-0 lg:pt-8 h-full w-full select-none md:select-text">
              {currentScreen === "landing" && <LandingScreen onNavigate={handleNavigate} />}
              {currentScreen === "onboarding" && <OnboardingScreen onNavigate={handleNavigate} />}
              {currentScreen === "login" && <LoginScreen onNavigate={handleNavigate} />}
              {currentScreen === "signup" && <SignupScreen onNavigate={handleNavigate} />}
              {currentScreen === "home" && <HomeScreen onNavigate={handleNavigate} />}
              {currentScreen === "reading" && <ReadingScreen onNavigate={handleNavigate} />}
              {currentScreen === "reflection" && <ReflectionScreen onNavigate={handleNavigate} />}
              {currentScreen === "streak" && <StreakScreen onNavigate={handleNavigate} />}
              {currentScreen === "leaderboard" && <LeaderboardScreen onNavigate={handleNavigate} />}
              {currentScreen === "social" && <SocialFeedScreen onNavigate={handleNavigate} />}
              {currentScreen === "profile" && <ProfileScreen onNavigate={handleNavigate} />}
              {currentScreen === "notifications" && <NotificationsScreen onNavigate={handleNavigate} />}
              {currentScreen === "settings" && <SettingsScreen onNavigate={handleNavigate} />}
              {currentScreen === "admin" && <AdminDashboardScreen onNavigate={handleNavigate} />}
            </div>

            {/* Interactive Bottom Tab Floating Bar */}
            {showNavbar && (
              <Navigation activeTab={currentScreen} onTabChange={handleNavigate} />
            )}

            {/* Mock iPhone Swipe Bar Indicator (Desktop preview only) */}
            <div className="absolute bottom-2 inset-x-0 h-1 z-50 pointer-events-none flex justify-center hidden lg:flex">
              <div className="w-32 h-1 bg-white/25 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT SIDEBAR: Zustand Live Store Inspector (Desktop viewports only) */}
      <section className="w-85 border-l border-white/5 bg-[#151515]/35 backdrop-blur-md p-6 flex flex-col justify-between hidden xl:flex relative z-10 select-none overflow-y-auto">
        <div className="space-y-6">
          {/* Inspector Title */}
          <div className="flex items-center gap-2">
            <Database className="w-4.5 h-4.5 text-[#C46A2D]" />
            <span className="font-serif font-semibold tracking-widest text-[#F5F1E8] uppercase text-xs">
              Live State Inspector
            </span>
          </div>

          <p className="text-[10px] text-[#A8A29E] leading-relaxed font-light">
            Readora is loaded with fully reactive client state. Complete reading focus inside the simulator to watch coordinates shift in real-time below.
          </p>

          {/* Zustand Live Database Display */}
          <div className="space-y-3">
            {/* Goal progress */}
            <div className="bg-[#151515] p-3 rounded-2xl border border-white/5 space-y-2">
              <span className="text-[8px] uppercase tracking-widest text-[#E6B566] font-bold block">
                Store user metrics
              </span>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="border border-white/5 bg-[#0F0F0F] p-2 rounded-xl">
                  <span className="text-[7px] text-[#A8A29E] uppercase tracking-wider block">Insight (XP)</span>
                  <span className="font-bold text-[#F5F1E8] font-serif">{userXp} XP</span>
                </div>
                <div className="border border-white/5 bg-[#0F0F0F] p-2 rounded-xl">
                  <span className="text-[7px] text-[#A8A29E] uppercase tracking-wider block">Active Rank</span>
                  <span className="font-bold text-[#C46A2D]">{userRank}</span>
                </div>
                <div className="border border-white/5 bg-[#0F0F0F] p-2 rounded-xl">
                  <span className="text-[7px] text-[#A8A29E] uppercase tracking-wider block">Habit Flame</span>
                  <span className="font-bold text-[#D97706] flex items-center gap-0.5">
                    <Flame className="w-3 h-3 text-[#D97706] fill-current" /> {userStreak} Days
                  </span>
                </div>
                <div className="border border-white/5 bg-[#0F0F0F] p-2 rounded-xl">
                  <span className="text-[7px] text-[#A8A29E] uppercase tracking-wider block">Today&apos;s Focus</span>
                  <span className="font-bold text-[#E6B566]">{readMinsToday}m / 15m</span>
                </div>
              </div>

              {/* Goal Status Indicator Badge */}
              <div className={`py-1.5 px-3 rounded-xl text-[8px] uppercase font-bold text-center border tracking-wider transition-all ${
                completedToday 
                  ? "bg-[#C46A2D]/10 border-[#C46A2D] text-[#C46A2D]" 
                  : "bg-white/5 border-transparent text-[#A8A29E]"
              }`}>
                {completedToday ? "★ Daily Reading Complete ★" : "Reading Goal Pending today"}
              </div>
            </div>

            {/* Collected items lists */}
            <div className="bg-[#151515] p-3 rounded-2xl border border-white/5 space-y-2">
              <span className="text-[8px] uppercase tracking-widest text-[#E6B566] font-bold block">
                Journal Catalog Logs
              </span>
              
              <div className="space-y-1.5 text-[9px]">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-[#A8A29E]">Written Reflections</span>
                  <span className="font-bold text-[#F5F1E8]">{reflections.length} items</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-[#A8A29E]">Saved Excerpts (Quotes)</span>
                  <span className="font-bold text-[#F5F1E8]">{savedQuotes.length} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A8A29E]">Mock social posts</span>
                  <span className="font-bold text-[#F5F1E8]">{posts.length} items</span>
                </div>
              </div>
            </div>

            {/* Style System Tokens */}
            <div className="bg-[#151515] p-3 rounded-2xl border border-white/5 space-y-2.5">
              <span className="text-[8px] uppercase tracking-widest text-[#E6B566] font-bold block">
                Luxury Color System
              </span>

              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { hex: "#0F0F0F", n: "bg" },
                  { hex: "#151515", n: "surf" },
                  { hex: "#202020", n: "card" },
                  { hex: "#C46A2D", n: "bronze" },
                  { hex: "#D97706", n: "amber" },
                ].map((c) => (
                  <div key={c.hex} className="flex flex-col items-center">
                    <div 
                      className="w-7 h-7 rounded-lg border border-white/10" 
                      style={{ backgroundColor: c.hex }} 
                    />
                    <span className="text-[7px] text-[#A8A29E] mt-1 font-light">{c.n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick specs details */}
        <div className="pt-4 border-t border-white/5 text-[9px] text-[#A8A29E] space-y-1">
          <div className="flex justify-between">
            <span>Primary Typography</span>
            <span className="font-semibold text-white">Inter (Sans)</span>
          </div>
          <div className="flex justify-between">
            <span>Editorial Serif</span>
            <span className="font-semibold text-white">Playfair Display</span>
          </div>
        </div>
      </section>
    </main>
  );
}
