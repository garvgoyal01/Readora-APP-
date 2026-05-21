"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReadoraStore } from "@/store/useReadoraStore";
import { ArrowLeft, Type, Sparkles, Clock } from "lucide-react";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const ReadingScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const {
    books,
    activeBookId,
    fontSize,
    setFontSize,
    readingBackground,
    setReadingBackground,
    zenMusic,
    setZenMusic,
    saveQuote,
    incrementReadTime
  } = useReadoraStore();

  const book = books.find((b) => b.id === activeBookId) || books[0];
  const [currentPage, setCurrentPage] = useState(0);
  const [highlightedText, setHighlightedText] = useState<string | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const [secondsRead, setSecondsRead] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRead((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format active time (mm:ss)
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const handleParagraphClick = (pText: string) => {
    // Treat paragraph as selectable quote
    setHighlightedText(pText);
    saveQuote(book.title, book.author, pText);
    
    // Trigger a beautiful visual toast
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const handleComplete = () => {
    // Increment reading time in store based on actual stopwatch
    const minsRead = Math.max(1, Math.round(secondsRead / 60));
    incrementReadTime(minsRead);
    
    // Save highlighted quote or default quote to the active buffer
    const finalQuote = highlightedText || book.content[0];
    useReadoraStore.setState({
      savedQuotes: [
        ...useReadoraStore.getState().savedQuotes.filter((q) => q.text !== finalQuote),
        { bookTitle: book.title, author: book.author, text: finalQuote, date: "Just now" }
      ]
    });
    
    onNavigate("reflection");
  };

  // Theme styling configurations
  const bgStyles = {
    cream: "bg-[#FBF8F3] text-[#2B2927]",
    sepia: "bg-[#F4ECD8] text-[#433422]",
    obsidian: "bg-[#0F0F0F] text-[#F5F1E8]"
  };

  const fontStyles = {
    sm: "text-sm leading-relaxed",
    base: "text-base leading-relaxed sm:text-lg",
    lg: "text-lg leading-relaxed sm:text-xl",
    xl: "text-xl leading-relaxed sm:text-2xl"
  };

  const isDark = readingBackground === "obsidian";

  return (
    <div className={`min-h-full flex flex-col justify-between relative transition-colors duration-300 p-6 ${bgStyles[readingBackground]} bg-grain`}>
      
      {/* Floating Quote Saved Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-50 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C46A2D] to-[#D97706] text-white flex items-center gap-2 shadow-lg text-[10px] uppercase font-bold tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" /> Quote Saved to Journal!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Controls */}
      <div className="flex justify-between items-center z-10 pt-2 pb-4 border-b border-white/5 relative">
        <button
          onClick={() => onNavigate("home")}
          className={`p-2 rounded-xl transition-all active:scale-[0.9] ${
            isDark ? "bg-[#151515] border border-white/5 text-[#D6D3CE]" : "bg-black/5 text-[#2B2927]"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Live Stopwatch Counter */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${
          isDark ? "bg-[#151515] border border-white/5 text-[#E6B566]" : "bg-black/5 text-[#C46A2D]"
        }`}>
          <Clock className="w-3 h-3 animate-pulse" />
          <span>{formatTime(secondsRead)}</span>
        </div>

        {/* Reader settings */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className={`p-2 rounded-xl active:scale-[0.9] ${
              isDark ? "bg-[#151515] border border-white/5 text-[#D6D3CE]" : "bg-black/5 text-[#2B2927]"
            }`}
          >
            <Type className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reader preferences modal */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute top-20 right-6 z-40 p-4 rounded-2xl shadow-xl w-60 border ${
              isDark ? "bg-[#202020] border-white/5 text-[#F5F1E8]" : "bg-white border-black/5 text-[#2B2927]"
            }`}
          >
            <div className="space-y-4">
              {/* Font selector */}
              <div className="space-y-1.5">
                <span className="text-[9px] uppercase tracking-wider font-semibold text-[#A8A29E]">Font Size</span>
                <div className="flex bg-black/10 rounded-lg p-0.5">
                  {(["sm", "base", "lg", "xl"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`flex-1 text-[10px] py-1 capitalize font-medium rounded-md transition-colors ${
                        fontSize === size 
                          ? (isDark ? "bg-[#C46A2D] text-white" : "bg-[#2B2927] text-white") 
                          : "text-[#A8A29E] hover:text-current"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme selector */}
              <div className="space-y-1.5">
                <span className="text-[9px] uppercase tracking-wider font-semibold text-[#A8A29E]">Environment</span>
                <div className="grid grid-cols-3 gap-1 bg-black/10 rounded-lg p-0.5">
                  {(["cream", "sepia", "obsidian"] as const).map((bg) => (
                    <button
                      key={bg}
                      onClick={() => setReadingBackground(bg)}
                      className={`text-[9px] py-1 rounded-md capitalize font-medium transition-colors ${
                        readingBackground === bg 
                          ? (isDark ? "bg-[#C46A2D] text-white" : "bg-[#2B2927] text-white")
                          : "text-[#A8A29E] hover:text-current"
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sound selector */}
              <div className="flex justify-between items-center pt-2 border-t border-black/5">
                <span className="text-[9px] uppercase tracking-wider font-semibold text-[#A8A29E]">Zen Focus Audio</span>
                <button
                  onClick={() => setZenMusic(!zenMusic)}
                  className={`w-8 h-4.5 rounded-full p-0.5 transition-colors ${
                    zenMusic ? "bg-[#C46A2D]" : "bg-black/20"
                  }`}
                >
                  <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${
                    zenMusic ? "translate-x-3.5" : "translate-x-0"
                  }`} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Reading Sheet */}
      <main className="flex-1 flex flex-col justify-center py-6">
        <div className="space-y-4 max-w-md mx-auto">
          <div className="text-center space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#C46A2D]">
              {book.category}
            </span>
            <h1 className="font-serif text-2xl font-bold tracking-tight">
              {book.title}
            </h1>
            <p className="text-[10px] text-[#A8A29E] font-light">
              by {book.author}
            </p>
          </div>

          {/* Interactive Content Container */}
          <div className={`font-serif px-2 transition-all duration-300 ${fontStyles[fontSize]} min-h-[180px] sm:min-h-[220px] flex flex-col justify-center`}>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleParagraphClick(book.content[currentPage])}
                className={`cursor-pointer p-4 rounded-2xl border transition-all text-justify ${
                  highlightedText === book.content[currentPage]
                    ? "bg-[#C46A2D]/10 border-[#C46A2D]/40 shadow-inner glow-amber"
                    : "hover:bg-white/5 border-transparent"
                }`}
              >
                {book.content[currentPage]}
              </motion.p>
            </AnimatePresence>
          </div>
          
          <div className="text-center text-[10px] text-[#A8A29E] italic font-light pt-2 pl-4 pr-4">
            * Tap the paragraph above to highlight and save it to your daily reflection journal. *
          </div>
        </div>
      </main>

      {/* Progress & Bottom Actions */}
      <div className="space-y-4 z-10">
        {/* Horizontal Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-[9px] text-[#A8A29E] tracking-wider uppercase font-semibold">
            <span>Progress</span>
            <span>Page {currentPage + 1} of {book.content.length}</span>
          </div>
          <div className="h-1 bg-black/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C46A2D] transition-all duration-300"
              style={{ width: `${((currentPage + 1) / book.content.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {currentPage > 0 ? (
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
                setHighlightedText(null);
              }}
              className={`flex-1 py-3.5 text-xs font-semibold rounded-xl active:scale-[0.98] transition-transform ${
                isDark ? "bg-[#151515] border border-white/5 text-[#D6D3CE]" : "bg-black/5 text-[#2B2927]"
              }`}
            >
              Previous Page
            </button>
          ) : null}

          {currentPage < book.content.length - 1 ? (
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
                setHighlightedText(null);
              }}
              className="flex-1 py-3.5 bg-gradient-to-r from-[#C46A2D] to-[#D97706] text-white text-xs font-semibold rounded-xl active:scale-[0.98] transition-transform shadow-md"
            >
              Next Page
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex-1 py-3.5 bg-gradient-to-r from-[#C46A2D] to-[#7C2D12] text-white text-xs font-bold rounded-xl active:scale-[0.98] transition-transform shadow-lg border border-[#E6B566]/20 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Proceed to Reflection</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
