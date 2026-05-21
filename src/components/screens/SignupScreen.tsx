"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Sparkles, CheckSquare } from "lucide-react";
import { useReadoraStore } from "@/store/useReadoraStore";

interface ScreenProps {
  onNavigate: (screen: string) => void;
}

export const SignupScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const login = useReadoraStore((state) => state.login);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate setup delay
    setTimeout(() => {
      login("auth-token-demo");
      onNavigate("home");
    }, 1500);
  };

  const handleDemoSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      login("auth-token-demo");
      onNavigate("home");
    }, 800);
  };

  return (
    <div className="min-h-full bg-[#0F0F0F] text-[#F5F1E8] flex flex-col justify-between p-6 relative bg-grain pb-8">
      {/* Cinematic ambient glow */}
      <div className="absolute top-[-10%] right-[-15%] w-[130%] h-[40%] bg-gradient-to-b from-[#D97706]/15 via-[#8B7355]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <div className="flex justify-center items-center gap-2 mt-4 relative z-10">
        <div className="w-11 h-11 rounded-2xl overflow-hidden border border-[#E6B566]/20 bg-[#151515]">
          <img
            src="/readora-logo.png"
            alt="Readora"
            style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <span className="font-serif font-semibold tracking-widest text-[#F5F1E8] uppercase text-base">
          Readora
        </span>
      </div>

      {/* Main Signup Form */}
      <div className="flex-1 flex flex-col justify-center py-6 relative z-10 max-w-sm mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <div className="space-y-1.5 text-center">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold tracking-tight">Initiate Chamber</h2>
            <p className="text-[11px] text-[#A8A29E] font-light leading-relaxed">
              Create your profile and start building your daily intellectual focus.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-3.5">
            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider font-semibold text-[#A8A29E] pl-1">
                Your Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Julian Vane"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#151515] border border-white/5 focus:border-[#C46A2D] focus:ring-1 focus:ring-[#C46A2D]/30 outline-none rounded-xl py-2.5 pl-9 pr-4 text-xs font-light transition-all placeholder:text-white/20 text-[#F5F1E8]"
                />
                <User className="w-4 h-4 text-[#A8A29E]/50 absolute left-3 top-3" />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider font-semibold text-[#A8A29E] pl-1">
                Chamber Key (Email)
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="julian@readora.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#151515] border border-white/5 focus:border-[#C46A2D] focus:ring-1 focus:ring-[#C46A2D]/30 outline-none rounded-xl py-2.5 pl-9 pr-4 text-xs font-light transition-all placeholder:text-white/20 text-[#F5F1E8]"
                />
                <Mail className="w-4 h-4 text-[#A8A29E]/50 absolute left-3 top-3" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider font-semibold text-[#A8A29E] pl-1">
                Secret Passage (Password)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#151515] border border-white/5 focus:border-[#C46A2D] focus:ring-1 focus:ring-[#C46A2D]/30 outline-none rounded-xl py-2.5 pl-9 pr-4 text-xs font-light transition-all placeholder:text-white/20 text-[#F5F1E8]"
                />
                <Lock className="w-4 h-4 text-[#A8A29E]/50 absolute left-3 top-3" />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 pt-1 pl-1">
              <input 
                type="checkbox" 
                required 
                defaultChecked 
                className="mt-0.5 accent-[#C46A2D]"
              />
              <span className="text-[9px] text-[#A8A29E] leading-tight font-light">
                I agree to dedicate mindful time to personal growth and support others on their reading pathway.
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C46A2D] to-[#7C2D12] text-[#F5F1E8] text-xs font-medium flex items-center justify-center gap-2 border border-[#E6B566]/20 active:scale-[0.98] transition-transform disabled:opacity-50 mt-4 shadow-md shadow-[#7C2D12]/20"
            >
              {isLoading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
              ) : (
                <>
                  <CheckSquare className="w-4 h-4" />
                  <span>Establish Chamber</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 text-[9px] text-[#A8A29E] uppercase tracking-widest font-semibold py-1">
            <div className="flex-1 h-[1px] bg-white/5" />
            <span>or bypass directly</span>
            <div className="flex-1 h-[1px] bg-white/5" />
          </div>

          {/* Demo account click */}
          <button
            onClick={handleDemoSignup}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-[#202020] hover:bg-[#252525] text-[#E6B566] text-xs font-semibold flex items-center justify-center gap-2 border border-[#E6B566]/10 active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Demo Chamber</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Switch Link */}
      <footer className="text-center text-[11px] text-[#D6D3CE] relative z-10">
        Already have a chamber?{" "}
        <button 
          onClick={() => onNavigate("login")}
          className="text-[#C46A2D] font-medium hover:underline cursor-pointer ml-1"
        >
          Sign In
        </button>
      </footer>
    </div>
  );
};
