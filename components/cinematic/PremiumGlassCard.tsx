"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ReactNode, MouseEvent } from "react";

interface PremiumGlassCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  tag?: string;
  index?: number;
}

/**
 * PremiumGlassCard
 * Features:
 * 1. Mouse-tracking spotlight effect
 * 2. Specular edge highlights (1px inset)
 * 3. Multi-layered glass blur
 * 4. Micro-interactions for depth
 */
export function PremiumGlassCard({
  title,
  description,
  icon,
  tag,
  index = 0,
}: PremiumGlassCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      className="group relative h-full"
    >
      {/* Dynamic Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 132, 31, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Main Card Body */}
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl transition-colors duration-500 group-hover:bg-white/[0.04]">
        
        {/* Specular Highlight (Top Edge) */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Content Container */}
        <div className="relative flex h-full flex-col p-8">
          
          {/* Tag / Metadata */}
          {tag && (
            <div className="mb-6 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-500">
                {tag}
              </span>
              <div className="h-[1px] w-8 bg-amber-500/30" />
            </div>
          )}

          {/* Icon with glow background */}
          {icon && (
            <div className="relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-transform duration-500 group-hover:scale-110 group-hover:border-amber-500/30">
              <div className="absolute inset-0 rounded-xl bg-amber-500/10 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">{icon}</div>
            </div>
          )}

          {/* Typography */}
          <h3 className="mb-3 font-display text-xl font-bold tracking-tight text-white">
            {title}
          </h3>
          <p className="flex-grow text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
            {description}
          </p>

          {/* Subtle Bottom Reveal */}
          <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white opacity-0 transition-all duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
            <span>Explore Details</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Noise Texture Overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </motion.div>
  );
}
