"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReadoraStore } from "@/store/useReadoraStore";
import { Check, Clock, Compass, Award, Sparkles } from "lucide-react";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const OnboardingScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState(15);
  const [selectedPathways, setSelectedPathways] = useState<string[]>(["Philosophy"]);
  const [selectedRank, setSelectedRank] = useState<"Thinker" | "Scholar" | "Sage">("Scholar");
  const [isFinishing, setIsFinishing] = useState(false);

  // Zustand Store actions

  const togglePathway = (path: string) => {
    if (selectedPathways.includes(path)) {
      setSelectedPathways(selectedPathways.filter((p) => p !== path));
    } else {
      setSelectedPathways([...selectedPathways, path]);
    }
  };

  const handleFinish = () => {
    setIsFinishing(true);
    
    // Simulate premium "chamber generation" delay
    setTimeout(() => {
      // Update state
      useReadoraStore.setState({
        dailyGoalMins: selectedGoal,
        userRank: selectedRank === "Thinker" ? "Thinker" : selectedRank === "Sage" ? "Sage" : "Scholar",
        userName: selectedRank === "Thinker" ? "Julian the Thinker" : selectedRank === "Sage" ? "Julian the Sage" : "Julian Vane",
        currentScreen: "signup"
      });
      onNavigate("signup");
    }, 2500);
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div
      style={{
        height: '100dvh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="bg-[#0F0F0F] text-[#F5F1E8] relative bg-grain"
    >
      {/* Cinematic ambient glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[50%] bg-gradient-to-b from-[#C46A2D]/15 via-[#8B7355]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Finishing loading splash */}
      <AnimatePresence>
        {isFinishing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0F0F0F] z-50 flex flex-col items-center justify-center p-6 text-center space-y-6"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="w-16 h-16 rounded-full border-t border-r border-[#C46A2D] border-b-0 border-l-0"
              />
              <Sparkles className="w-6 h-6 text-[#E6B566] absolute inset-0 m-auto animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h2 className="font-serif text-xl text-[#F5F1E8]">Sculpting your personal library...</h2>
              <p className="text-xs text-[#A8A29E] max-w-[240px] leading-relaxed mx-auto font-light">
                Setting daily goals, curating custom literary essays, and preparing your intellectual journal.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top indicator - Progress Bar */}
      <div className="flex justify-between items-center relative z-10 px-6 pt-4 pb-3 flex-shrink-0">
        <span className="text-[10px] text-[#A8A29E] tracking-widest uppercase font-semibold">
          Step {step} of 3
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i + 1 === step ? "w-6 bg-[#C46A2D]" : "w-2 bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-4 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#C46A2D]/10 flex items-center justify-center border border-[#C46A2D]/20 text-[#E6B566]">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-2xl font-medium text-[#F5F1E8]">
                  Set your daily commitment.
                </h2>
                <p className="text-xs text-[#D6D3CE] font-light">
                  How many minutes would you like to dedicate to silent deep-reading every day?
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { value: 5, label: "5 Minutes / Day", desc: "A cozy morning espresso read", xp: "+50 XP per day" },
                  { value: 15, label: "15 Minutes / Day", desc: "Standard intellectual workout (Recommended)", xp: "+150 XP per day" },
                  { value: 30, label: "30 Minutes / Day", desc: "Immersion into historical archives", xp: "+300 XP per day" },
                ].map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setSelectedGoal(g.value)}
                    className={`w-full p-4 rounded-2xl flex items-center justify-between text-left border transition-all duration-200 active:scale-[0.99] ${
                      selectedGoal === g.value
                        ? "bg-[#C46A2D]/10 border-[#C46A2D] shadow-md shadow-[#C46A2D]/5"
                        : "bg-white/5 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#F5F1E8]">{g.label}</div>
                      <div className="text-[10px] text-[#A8A29E] font-light mt-0.5">{g.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-[#E6B566] tracking-wider uppercase font-semibold">{g.xp}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#C46A2D]/10 flex items-center justify-center border border-[#C46A2D]/20 text-[#E6B566]">
                  <Compass className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-2xl font-medium text-[#F5F1E8]">
                  Select your pathway.
                </h2>
                <p className="text-xs text-[#D6D3CE] font-light">
                  Pick the topics that trigger your intellectual curiosity. We will tailor your feed accordingly.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: 'repeat(3, 1fr)',
                  gap: '12px',
                  flex: 1,
                  minHeight: 0,
                }}
              >
                {[
                  { name: "Philosophy", desc: "Stoicism, metaphysics, logic" },
                  { name: "Art & Soul", desc: "Biography, poetry, creation" },
                  { name: "Aesthetics", desc: "Minimalism, design, architecture" },
                  { name: "Psychology", desc: "Behavior, focus, habits" },
                  { name: "History", desc: "Classical ages, archive letters" },
                  { name: "Aphorisms", desc: "Timeless maxims, insights" },
                ].map((p) => {
                  const active = selectedPathways.includes(p.name);
                  return (
                    <button
                      key={p.name}
                      onClick={() => togglePathway(p.name)}
                      className={`p-3 rounded-2xl flex flex-col justify-between text-left border transition-all duration-200 active:scale-[0.99] relative overflow-hidden ${
                        active
                          ? "bg-[#C46A2D]/10 border-[#C46A2D]"
                          : "bg-white/5 border-white/5 hover:border-white/10"
                      }`}
                      style={{ height: '100%' }}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm font-semibold text-[#F5F1E8]">{p.name}</span>
                        {active && <Check className="w-3.5 h-3.5 text-[#C46A2D]" />}
                      </div>
                      <span className="text-[11px] text-[#A8A29E] leading-snug font-light mt-auto">
                        {p.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#C46A2D]/10 flex items-center justify-center border border-[#C46A2D]/20 text-[#E6B566]">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-2xl font-medium text-[#F5F1E8]">
                  Choose your archetype.
                </h2>
                <p className="text-xs text-[#D6D3CE] font-light">
                  Every reader starts at level 1. Select the title you aim to build toward.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { id: "Thinker" as const, title: "The Thinker", desc: "Builds clarity, focuses on wisdom and journal entries.", icon: "🏛️" },
                  { id: "Scholar" as const, title: "The Scholar", desc: "Pursues deep understanding, studies classic archives.", icon: "📜" },
                  { id: "Sage" as const, title: "The Sage", desc: "Lives mindfully, values peace and slowest pace aesthetics.", icon: "🌿" },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRank(r.id)}
                    className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left border transition-all duration-200 active:scale-[0.99] ${
                      selectedRank === r.id
                        ? "bg-[#C46A2D]/10 border-[#C46A2D]"
                        : "bg-white/5 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-[#F5F1E8]">{r.title}</div>
                      <div className="text-[10px] text-[#A8A29E] font-light mt-0.5">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom navigation buttons */}
      <div className="flex gap-3 relative z-10 px-6 pt-3 pb-4 flex-shrink-0">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex-1 py-3 border border-white/5 bg-white/5 text-[#D6D3CE] font-medium text-xs rounded-xl active:scale-[0.98] transition-transform"
          >
            Back
          </button>
        )}
        <button
          onClick={() => {
            if (step < 3) setStep(step + 1);
            else handleFinish();
          }}
          disabled={step === 2 && selectedPathways.length === 0}
          className="flex-[2] py-3 bg-gradient-to-r from-[#C46A2D] to-[#D97706] text-[#F5F1E8] font-medium text-xs rounded-xl flex items-center justify-center gap-1 active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          <span>{step === 3 ? "Complete Chamber Setup" : "Continue"}</span>
        </button>
      </div>
    </div>
  );
};
