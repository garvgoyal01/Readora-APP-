"use client";

import React, { useEffect, useState } from "react";
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
import { SplashScreen } from "@/components/screens/SplashScreen";

import { Navigation } from "@/components/Navigation";

export default function Page() {
  const { currentScreen, setScreen } = useReadoraStore();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsSplashVisible(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  const handleNavigate = (screen: string) => {
    setScreen(screen);
  };

  const showNavigation = ["home", "social", "leaderboard", "profile"].includes(currentScreen);

  return (
    <main className="min-h-screen w-full bg-[#0F0F0F] text-[#F5F1E8] overflow-hidden">
      {isSplashVisible ? (
        <SplashScreen />
      ) : (
        <div className="min-h-screen w-full flex flex-col relative">
          <div className="flex-1 w-full overflow-auto">
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

          {showNavigation && (
            <div className="sticky bottom-0 left-0 z-30 w-full px-4 pb-4 pt-2 bg-[#0F0F0F]/85 backdrop-blur-xl border-t border-white/10">
              <Navigation activeTab={currentScreen} onTabChange={handleNavigate} />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
