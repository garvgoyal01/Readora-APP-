"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReadoraStore } from "@/store/useReadoraStore";
import { ArrowLeft, Bell, Heart, MessageSquare, Flame, Award, Check } from "lucide-react";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const NotificationsScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const { notifications, readNotification } = useReadoraStore();

  const handleMarkAllRead = () => {
    notifications.forEach((n) => readNotification(n.id));
  };

  const handleClearAll = () => {
    useReadoraStore.setState({ notifications: [] });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-4 h-4 text-[#C46A2D]" />;
      case "comment":
        return <MessageSquare className="w-4 h-4 text-[#8B7355]" />;
      case "streak":
        return <Flame className="w-4 h-4 text-[#D97706]" />;
      case "rank":
        return <Award className="w-4 h-4 text-[#E6B566]" />;
      default:
        return <Bell className="w-4 h-4 text-[#A8A29E]" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case "like":
        return "bg-[#C46A2D]/10 border-[#C46A2D]/20";
      case "comment":
        return "bg-[#8B7355]/10 border-[#8B7355]/20";
      case "streak":
        return "bg-[#D97706]/10 border-[#D97706]/20";
      case "rank":
        return "bg-[#E6B566]/10 border-[#E6B566]/20";
      default:
        return "bg-white/5 border-white/5";
    }
  };

  return (
    <div className="min-h-full bg-[#0F0F0F] text-[#F5F1E8] p-5 pb-8 overflow-y-auto bg-grain relative flex flex-col">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-[-5%] right-[-10%] w-[100%] h-[30%] bg-gradient-to-b from-[#8B7355]/15 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none" />

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
            Alert Chamber
          </span>
        </div>

        {notifications.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleMarkAllRead}
              className="text-[9px] uppercase tracking-wider text-[#C46A2D] font-bold"
            >
              Read All
            </button>
            <span className="text-white/10">|</span>
            <button
              onClick={handleClearAll}
              className="text-[9px] uppercase tracking-wider text-[#A8A29E]"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Notifications list */}
      <div className="flex-1 space-y-3 relative z-10">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-3 py-20"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[#A8A29E]/30 mb-2">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-sm font-semibold">Chamber is Silent</h3>
              <p className="text-[10px] text-[#A8A29E] font-light max-w-[200px] leading-relaxed mx-auto">
                No new activity alerts currently. Pour a cup of coffee and dive into your readings.
              </p>
            </motion.div>
          ) : (
            notifications.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => readNotification(n.id)}
                className={`glass-card rounded-2xl p-4 flex gap-3.5 border transition-all cursor-pointer relative overflow-hidden ${
                  n.read ? "border-white/5 opacity-60" : "border-[#C46A2D]/20"
                }`}
              >
                {/* Visual Unread dot */}
                {!n.read && (
                  <span className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#C46A2D]" />
                )}

                {/* Left Type Icon wrapper */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${getBg(n.type)}`}>
                  {getIcon(n.type)}
                </div>

                {/* Right detail */}
                <div className="space-y-1 pr-4">
                  <h4 className="text-xs font-bold text-[#F5F1E8] leading-tight">
                    {n.title}
                  </h4>
                  <p className="text-[10px] text-[#D6D3CE] font-light leading-relaxed">
                    {n.description}
                  </p>
                  <span className="text-[8px] text-[#A8A29E] font-semibold tracking-wider uppercase block pt-1">
                    {n.timestamp}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
