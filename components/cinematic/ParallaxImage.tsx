"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  overlay?: boolean;
  caption?: string;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.5,
  className = "",
  overlay = true,
  caption,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-30 * speed}%`, `${30 * speed}%`]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-[-20%] will-change-transform"
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            backgroundColor: "#263958",
          }}
          role="img"
          aria-label={alt}
        />
      </motion.div>

      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 via-transparent to-transparent z-10" />
      )}

      {caption && (
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
          <p className="text-white/80 text-sm font-mono">{caption}</p>
        </div>
      )}

      {/* Aspect ratio spacer */}
      <div className="relative z-0 aspect-[16/9]" />
    </div>
  );
}
