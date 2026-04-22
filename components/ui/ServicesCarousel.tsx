"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ServiceSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const services: ServiceSlide[] = [
  {
    id: "ac-repair",
    title: "AC Repair",
    subtitle: "Same-day emergency service",
    image: "/images/carousel/ac-repair.jpg",
    href: "/en/services/diagnosis",
  },
  {
    id: "installation",
    title: "New Installation",
    subtitle: "Premium systems, expert fitting",
    image: "/images/carousel/installation.jpg",
    href: "/en/services/new-ac-installation",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    subtitle: "Preventive care, lasting comfort",
    image: "/images/carousel/maintenance.jpg",
    href: "/en/services/basic-tune-up",
  },
  {
    id: "heat-pump",
    title: "Heat Pumps",
    subtitle: "Energy-efficient climate control",
    image: "/images/carousel/heat-pump.jpg",
    href: "/en/services/heat-pump",
  },
  {
    id: "ductwork",
    title: "Ductwork",
    subtitle: "Clean airflow, perfect distribution",
    image: "/images/carousel/ductwork.jpg",
    href: "/en/services/ductwork",
  },
];

interface CarouselCardProps {
  service: ServiceSlide;
  isActive: boolean;
  index: number;
}

function CarouselCard({ service, isActive, index }: CarouselCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      className="group relative flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] lg:w-[500px] snap-center"
    >
      <Link href={service.href} className="block cursor-pointer">
        {/* Mouse-tracking spotlight glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                rgba(245, 132, 31, 0.2),
                transparent 80%
              )
            `,
          }}
        />

        {/* Main card */}
        <div className="relative h-[320px] sm:h-[360px] md:h-[400px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-everglade-orange/20">
          
          {/* Specular highlight (top edge) */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-20" />
          
          {/* Image container */}
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 85vw, (max-width: 768px) 400px, (max-width: 1024px) 450px, 500px"
            />
            
            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-br from-everglade-navy/30 via-transparent to-transparent" />
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
            {/* Tag line */}
            <motion.div 
              className="mb-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-everglade-orange">
                Everglade Service
              </span>
              <div className="h-[1px] w-8 bg-everglade-orange/40" />
            </motion.div>
            
            {/* Title */}
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 transition-transform duration-500 group-hover:-translate-y-1">
              {service.title}
            </h3>
            
            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-300 transition-all duration-500 group-hover:text-gray-200">
              {service.subtitle}
            </p>
            
            {/* CTA hint */}
            <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-everglade-orange opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <span>Learn More</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Noise texture overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]" />
        </div>
      </Link>
    </motion.div>
  );
}

/* Chevron arrow button for desktop navigation */
function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`Scroll ${direction}`}
      className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/60 hover:bg-white/10 hover:text-white hover:border-everglade-orange/30 transition-all duration-300 flex-shrink-0"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "left" ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  );
}

export function ServicesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate active index based on scroll position
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.scrollWidth / services.length;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(newIndex, 0), services.length - 1));
  }, []);

  // Scroll to specific index
  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / services.length;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const scrollPrev = () => {
    const prev = Math.max(activeIndex - 1, 0);
    scrollToIndex(prev);
  };

  const scrollNext = () => {
    const next = Math.min(activeIndex + 1, services.length - 1);
    scrollToIndex(next);
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-label mb-3">Our Expertise</p>
          <h2 className="font-display text-display-sm font-bold tracking-tight">
            Services We <span className="text-gradient-orange">Master</span>
          </h2>
        </motion.div>
      </div>

      {/* Carousel with arrow buttons */}
      <div className="relative max-w-[100vw]">
        {/* Left arrow */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
          <ArrowButton direction="left" onClick={scrollPrev} />
        </div>

        {/* Carousel container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 md:px-12 pb-6 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            touchAction: "pan-x",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Spacer for centering first card */}
          <div className="flex-shrink-0 w-[calc((100vw-85vw)/2-1.5rem)] sm:w-[calc((100vw-400px)/2-1.5rem)] md:w-[calc((100vw-450px)/2-1.5rem)] lg:w-[calc((100vw-500px)/2-1.5rem)]" />
          
          {services.map((service, index) => (
            <CarouselCard
              key={service.id}
              service={service}
              isActive={index === activeIndex}
              index={index}
            />
          ))}
          
          {/* Spacer for centering last card */}
          <div className="flex-shrink-0 w-[calc((100vw-85vw)/2-1.5rem)] sm:w-[calc((100vw-400px)/2-1.5rem)] md:w-[calc((100vw-450px)/2-1.5rem)] lg:w-[calc((100vw-500px)/2-1.5rem)]" />
        </div>

        {/* Right arrow */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
          <ArrowButton direction="right" onClick={scrollNext} />
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-8">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-everglade-orange w-6"
                : "bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* CSS to hide scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
