"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroRevealProps {
  title: string;
  subtitle: string;
  tagline?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export function HeroReveal({
  title,
  subtitle,
  tagline,
  backgroundImage,
  backgroundVideo,
  ctaPrimary,
  ctaSecondary,
}: HeroRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "15%"]);

  const words = title.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative h-[120vh] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        {backgroundVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : backgroundImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-everglade-navy via-[#0D0D0D] to-[#0D0D0D]" />
        )}
        {/* Rich cinematic gradient overlay with multiple stops */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(245,132,31,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_20%_30%,rgba(27,58,95,0.2)_0%,transparent_50%)]" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity, scale, y: textY }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Tagline */}
        {tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-everglade-sky font-mono text-sm md:text-base tracking-[0.3em] uppercase mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_0_2px_8px_rgb(0_0_0_/_80%)]"
          >
            {tagline}
          </motion.p>
        )}

        {/* Title with word-by-word reveal */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.95] mb-8">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block hero-text-gradient"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-balance"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        {(ctaPrimary || ctaSecondary) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            {ctaPrimary && (
              <motion.a
                href={ctaPrimary.href}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-everglade-orange to-everglade-orange/80 text-everglade-navy font-bold rounded-full text-lg tracking-tight hover:from-everglade-orange/90 hover:to-everglade-orange/70 transition-all shadow-lg shadow-everglade-orange/20 inline-flex items-center gap-2 justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {ctaPrimary.label}
              </motion.a>
            )}
            {ctaSecondary && (
              <motion.a
                href={ctaSecondary.href}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-everglade-royal to-everglade-sky text-white font-bold rounded-full text-lg tracking-tight hover:from-everglade-sky hover:to-everglade-royal transition-all shadow-lg shadow-everglade-royal/20 inline-flex items-center gap-2 justify-center"
              >
                {ctaSecondary.label}
              </motion.a>
            )}
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-6 h-10 rounded-full border-2 border-white/20 mx-auto flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 rounded-full bg-everglade-orange" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
