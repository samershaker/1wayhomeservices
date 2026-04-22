"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassmorphicCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  metric?: string;
  metricLabel?: string;
  index?: number;
}

export function GlassmorphicCard({
  title,
  description,
  icon,
  metric,
  metricLabel,
  index = 0,
}: GlassmorphicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      {/* Card body */}
      <div className="glass-card relative rounded-2xl p-8 h-full">
        {/* Subtle inner glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            boxShadow:
              "inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 0 40px rgba(245, 132, 31, 0.06)",
          }}
        />

        {/* Icon */}
        {icon && (
          <div className="relative mb-6 w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500/20 transition-colors duration-300">
            {icon}
          </div>
        )}

        {/* Metric */}
        {metric && (
          <div className="relative mb-4">
            <span className="text-4xl md:text-5xl font-bold text-gradient-orange font-mono">
              {metric}
            </span>
            {metricLabel && (
              <span className="block text-sm text-gray-500 mt-1 font-mono tracking-wide uppercase">
                {metricLabel}
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <h3 className="relative text-xl font-bold text-white mb-3 tracking-tight">
          {title}
        </h3>
        <p className="relative text-gray-400 leading-relaxed text-sm">
          {description}
        </p>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
