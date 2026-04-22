"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface SectionSnapProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullHeight?: boolean;
  stagger?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function SectionSnap({
  children,
  className = "",
  id,
  fullHeight = true,
  stagger = true,
}: SectionSnapProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={stagger ? containerVariants : undefined}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`relative ${
        fullHeight ? "min-h-screen" : ""
      } flex flex-col justify-center px-6 py-24 md:py-32 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function SectionSnapItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
