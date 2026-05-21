"use client";

import { motion } from "framer-motion";

export const SplashScreen = () => {
  return (
    <div className="min-h-screen w-full bg-[#090909] text-[#F5F1E8] overflow-hidden relative flex items-center justify-center px-6 py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#101010] to-[#171717]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(196,106,45,0.18),_transparent_34%)]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 max-w-xl w-full"
      >
        <div className="mx-auto w-fit rounded-3xl border border-white/10 bg-[#141414]/80 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-[#C46A2D] to-[#D97706] shadow-lg shadow-[#C46A2D]/25 overflow-hidden">
              <img
                src="/readora-logo.png"
                alt="Readora"
                style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#E6B566] font-semibold pb-1">
                Readora
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-white">
                A new kind of reading ritual.
              </h1>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-[#D6D3CE] max-w-md mx-auto mb-7">
            Welcome to a premium mobile reading sanctuary that blends cinematic calm, purposeful focus, and communal reflection.
          </p>

          <div className="grid gap-3 text-sm">
            <div className="rounded-3xl bg-[#0F0F0F] border border-white/10 p-4">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#A8A29E] font-semibold">
                Full-screen mobile UI
              </span>
              <p className="mt-2 text-[11px] text-[#D6D3CE] leading-relaxed">
                Immersive app screens built for modern iOS and Android experiences.
              </p>
            </div>
            <div className="rounded-3xl bg-[#0F0F0F] border border-white/10 p-4">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#A8A29E] font-semibold">
                Effective reading flow
              </span>
              <p className="mt-2 text-[11px] text-[#D6D3CE] leading-relaxed">
                Daily habits, premium feed, reading chamber, journal prompts and streak progress.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
