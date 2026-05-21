"use client";

import React, { useState } from "react";
import { useReadoraStore } from "@/store/useReadoraStore";
import { Confetti } from "../Confetti";
import { ArrowRight, Feather } from "lucide-react";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const ReflectionScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const {
    books,
    activeBookId,
    savedQuotes,
    addReflection
  } = useReadoraStore();

  const book = books.find((b) => b.id === activeBookId) || books[0];
  
  // Get the latest saved quote for this book, or fallback to default
  const activeQuote = savedQuotes.find((q) => q.bookTitle === book.title)?.text || book.content[0];

  const [reflectionText, setReflectionText] = useState("");
  const [celebrate, setCelebrate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wordCount = reflectionText.trim() === "" ? 0 : reflectionText.trim().split(/\s+/).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reflectionText.trim().length < 5) return;

    setIsSubmitting(true);
    // Add reflection to Zustand (which dynamically prepends a post to feed!)
    addReflection(book.id, activeQuote, reflectionText);

    // Launch celebration confetti
    setTimeout(() => {
      setCelebrate(true);
    }, 200);

    // After 2.3 seconds transition to Streak screen
    setTimeout(() => {
      onNavigate("streak");
    }, 2200);
  };

  return (
    <div className="min-h-full bg-[#0F0F0F] text-[#F5F1E8] p-6 flex flex-col justify-between relative overflow-y-auto bg-grain pb-8">
      {/* Cinematic ambient glow */}
      <div className="absolute top-[-5%] left-[-10%] w-[110%] h-[40%] bg-gradient-to-b from-[#7C2D12]/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Confetti Celebration overlay */}
      <Confetti active={celebrate} />

      {/* Top Header */}
      <div className="flex justify-between items-center z-10 pt-2 pb-4 mb-2">
        <div className="flex items-center gap-2">
          <Feather className="w-4 h-4 text-[#C46A2D]" />
          <span className="font-serif font-semibold tracking-widest text-[#F5F1E8] uppercase text-xs">
            Daily Journal
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-wider text-[#E6B566] font-semibold bg-[#E6B566]/10 px-2 py-0.5 rounded-full">
          +50 XP Reflection Payout
        </span>
      </div>

      {/* Main Form */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full relative z-10 space-y-5">
        
        {/* Selected Quote Panel */}
        <div className="bg-[#151515] rounded-2xl p-4 border border-white/5 relative overflow-hidden shadow-md">
          <div className="absolute top-0 left-0 w-[3px] h-full bg-[#C46A2D]" />
          <span className="text-[8px] uppercase tracking-widest text-[#A8A29E] font-bold block mb-2">
            Selected Passage from {book.title}
          </span>
          <p className="font-serif text-xs italic text-[#D6D3CE] leading-relaxed">
            &quot;{activeQuote}&quot;
          </p>
        </div>

        {/* Dynamic Writing Box */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[9px] uppercase tracking-wider font-semibold text-[#A8A29E]">
                Write your Reflection
              </label>
              <span className="text-[9px] text-[#A8A29E] font-light">
                {wordCount} words
              </span>
            </div>

            <div className="relative">
              <textarea
                required
                rows={5}
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="How does Marcus Aurelius' mindset redefine your current focus? Let your thoughts flow..."
                className="w-full bg-[#151515] border border-white/5 focus:border-[#C46A2D] focus:ring-1 focus:ring-[#C46A2D]/30 outline-none rounded-2xl p-4 text-xs font-light transition-all placeholder:text-white/20 text-[#F5F1E8] resize-none leading-relaxed glow-bronze-focus"
              />
            </div>
          </div>

          {/* Inspirational Prompt box */}
          <div className="bg-[#202020] rounded-xl p-3 border border-white/5 flex items-start gap-2.5">
            <span className="text-base text-[#E6B566] leading-none pt-0.5">💡</span>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-[#E6B566]">Journal Prompt</div>
              <p className="text-[9px] text-[#D6D3CE] font-light leading-relaxed mt-0.5">
                {book.quotePrompt || "How does this idea apply to your current obstacles? Keep it honest."}
              </p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={wordCount < 3 || isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#C46A2D] to-[#7C2D12] text-white text-xs font-semibold flex items-center justify-center gap-2 border border-[#E6B566]/20 active:scale-[0.98] transition-transform disabled:opacity-50 mt-4 shadow-lg shadow-[#7C2D12]/20"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            ) : (
              <>
                <span>Secure Streak & Earn XP</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Discard / Back to home */}
      <footer className="text-center relative z-10 pt-4">
        <button
          onClick={() => onNavigate("home")}
          className="text-[10px] text-[#A8A29E] hover:text-[#C46A2D] uppercase font-bold tracking-widest transition-colors"
        >
          Discard Session
        </button>
      </footer>
    </div>
  );
};
