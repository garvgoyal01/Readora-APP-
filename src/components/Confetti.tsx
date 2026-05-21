"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotate: number;
  dx: number;
  dy: number;
}

const COLORS = ["#C46A2D", "#D97706", "#E6B566", "#7C2D12", "#8B7355", "#F5F1E8"];

export const Confetti: React.FC<ConfettiProps> = ({ active, onComplete }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    // Generate elegant luxury-palette particles
    const newParticles: Particle[] = Array.from({ length: 80 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 5 + Math.random() * 8;
      return {
        id: i,
        x: 50, // center source percentage
        y: 60,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 8,
        rotate: Math.random() * 360,
        dx: Math.cos(angle) * velocity,
        dy: Math.sin(angle) * velocity - 6, // lean upwards initially
      };
    });

    setParticles(newParticles);

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[99] rounded-[40px]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm opacity-90"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            x: [0, p.dx * 20],
            y: [0, p.dy * 20 + 350], // gravity pull down
            rotate: [p.rotate, p.rotate + 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [1, 1, 0.7, 0],
          }}
          transition={{
            duration: 2.2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};
