"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReadoraStore } from "@/store/useReadoraStore";

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
import { Navigation } from "@/components/Navigation";

const topScreens = ["home", "leaderboard", "social", "profile"];

export default function Page() {
  const { currentScreen, setScreen, isAuthenticated, login } = useReadoraStore();

  useEffect(() => {
    const token = window.localStorage.getItem("readora_auth_token");
    if (token && !isAuthenticated) {
      login(token);
    }
  }, [isAuthenticated, login]);

  const handleNavigate = (screen: string) => {
    setScreen(screen);
  };

  return (
    <div className="min-h-[100dvh] h-[100dvh] w-full overflow-hidden bg-[#0F0F0F] text-[#F5F1E8]">
      <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-[#2a2a2a] bg-[#0F0F0F]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-full items-center justify-start px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#151515] border border-white/10">
              <span className="text-lg font-serif text-[#F97316]">R</span>
            </div>
            <p className="text-sm font-semibold tracking-[0.08em] text-[#F5F1E8]">Readora</p>
          </div>
        </div>
      </header>

      <main className="relative h-full overflow-hidden pt-14 pb-16">
        <div className="h-full overflow-y-auto pb-6 -webkit-overflow-scrolling-touch">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="min-h-full"
            >
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
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {isAuthenticated && (
        <Navigation activeTab={topScreens.includes(currentScreen) ? currentScreen : ""} onTabChange={handleNavigate} />
      )}
    </div>
  );
}
