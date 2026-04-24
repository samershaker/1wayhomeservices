"use client";

import { motion } from "framer-motion";

/**
 * BeforeAfterPhones
 *
 * Two schematic phone mockups side by side, the left phone represents
 * the current site (sparse, generic content, slow load), the right phone
 * represents the new site (structured, specific, compliant, fast).
 *
 * Pure SVG, crisp at any resolution, perfect brand match, no AI-art
 * spelling artifacts.
 */

export function BeforeAfterPhones() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="w-full overflow-x-auto -mx-4 md:mx-0"
      aria-labelledby="before-after-title"
    >
      <svg
        viewBox="0 0 860 560"
        className="w-full h-auto min-w-[600px]"
        role="img"
        aria-labelledby="before-after-title before-after-desc"
      >
        <title id="before-after-title">
          Your current website on a phone, next to the new one
        </title>
        <desc id="before-after-desc">
          Two phone mockups side by side. The left phone shows the current
          site as sparse, generic, and slow to load. The right phone shows
          the new site with structured address, licensing, reviews, and a
          clear call to action, loading in 1.2 seconds.
        </desc>

        {/* LEFT PHONE, CURRENT SITE */}
        <g>
          <text
            x="180"
            y="28"
            textAnchor="middle"
            fill="#9CA3AF"
            fontSize="11"
            fontWeight="700"
            letterSpacing="2"
            fontFamily="system-ui, sans-serif"
          >
            YOUR CURRENT SITE
          </text>

          {/* Phone frame */}
          <rect
            x="60"
            y="50"
            width="240"
            height="470"
            rx="30"
            fill="#0A0A0A"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1.5"
          />
          {/* Notch */}
          <rect x="150" y="50" width="60" height="16" rx="8" fill="#0A0A0A" />

          {/* Screen */}
          <rect
            x="75"
            y="80"
            width="210"
            height="420"
            rx="14"
            fill="rgba(255, 255, 255, 0.02)"
          />

          {/* Loading progress bar (still loading) */}
          <rect x="85" y="100" width="190" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />
          <rect x="85" y="100" width="65" height="3" rx="1.5" fill="#6B9FE8" opacity="0.6" />

          {/* Generic gray blocks representing unspecified content */}
          <rect x="85" y="125" width="120" height="14" rx="3" fill="rgba(255,255,255,0.12)" />
          <rect x="85" y="148" width="190" height="8" rx="2" fill="rgba(255,255,255,0.06)" />
          <rect x="85" y="162" width="170" height="8" rx="2" fill="rgba(255,255,255,0.06)" />
          <rect x="85" y="176" width="140" height="8" rx="2" fill="rgba(255,255,255,0.06)" />

          {/* Vague location */}
          <text
            x="180"
            y="210"
            textAnchor="middle"
            fill="#9CA3AF"
            fontSize="11"
            fontFamily="system-ui, sans-serif"
          >
            El Cajon, CA
          </text>

          {/* More generic gray blocks */}
          <rect x="85" y="235" width="190" height="80" rx="6" fill="rgba(255,255,255,0.04)" />
          <rect x="95" y="250" width="100" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
          <rect x="95" y="266" width="150" height="6" rx="2" fill="rgba(255,255,255,0.06)" />
          <rect x="95" y="280" width="130" height="6" rx="2" fill="rgba(255,255,255,0.06)" />
          <rect x="95" y="294" width="120" height="6" rx="2" fill="rgba(255,255,255,0.06)" />

          <rect x="85" y="325" width="190" height="50" rx="6" fill="rgba(255,255,255,0.04)" />
          <rect x="85" y="385" width="190" height="40" rx="6" fill="rgba(255,255,255,0.04)" />
          <rect x="85" y="435" width="190" height="40" rx="6" fill="rgba(255,255,255,0.04)" />

          {/* Missing: no license, no address detail, no structured schema */}
          <text
            x="180"
            y="495"
            textAnchor="middle"
            fill="#6B7280"
            fontSize="9"
            fontStyle="italic"
            fontFamily="system-ui, sans-serif"
          >
            no license visible, no full address, no schema
          </text>

          {/* Load time badge (red, slow) */}
          <g>
            <rect
              x="115"
              y="528"
              width="130"
              height="22"
              rx="11"
              fill="rgba(220, 38, 38, 0.15)"
              stroke="rgba(220, 38, 38, 0.45)"
              strokeWidth="1"
            />
            <text
              x="180"
              y="543"
              textAnchor="middle"
              fill="#F87171"
              fontSize="10"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
            >
              4.2s to first paint
            </text>
          </g>
        </g>

        {/* MIDDLE, arrow */}
        <g>
          <path
            d="M 330 285 L 520 285"
            stroke="#6B9FE8"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="5 5"
            opacity="0.5"
          />
          <path
            d="M 510 278 L 520 285 L 510 292"
            stroke="#6B9FE8"
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />
        </g>

        {/* RIGHT PHONE, NEW SITE */}
        <g>
          <text
            x="680"
            y="28"
            textAnchor="middle"
            fill="#6B9FE8"
            fontSize="11"
            fontWeight="700"
            letterSpacing="2"
            fontFamily="system-ui, sans-serif"
          >
            THE NEW SITE
          </text>

          {/* Phone frame */}
          <rect
            x="560"
            y="50"
            width="240"
            height="470"
            rx="30"
            fill="#0A0A0A"
            stroke="rgba(107, 159, 232, 0.35)"
            strokeWidth="1.5"
          />
          {/* Notch */}
          <rect x="650" y="50" width="60" height="16" rx="8" fill="#0A0A0A" />

          {/* Screen, subtle navy tint */}
          <rect
            x="575"
            y="80"
            width="210"
            height="420"
            rx="14"
            fill="rgba(37, 87, 168, 0.08)"
          />

          {/* Mini nav bar */}
          <g>
            <rect x="585" y="92" width="50" height="14" rx="3" fill="rgba(255,255,255,0.18)" />
            <rect x="640" y="92" width="40" height="14" rx="3" fill="rgba(255,255,255,0.07)" />
            <rect x="685" y="92" width="40" height="14" rx="3" fill="rgba(255,255,255,0.07)" />
            <rect x="730" y="92" width="45" height="14" rx="3" fill="rgba(255,255,255,0.07)" />
          </g>

          {/* Hero block */}
          <text
            x="680"
            y="140"
            textAnchor="middle"
            fill="#F9FAFB"
            fontSize="12"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            1Way Home Services
          </text>
          <text
            x="680"
            y="158"
            textAnchor="middle"
            fill="#6B9FE8"
            fontSize="9"
            fontFamily="system-ui, sans-serif"
          >
            Tax &amp; Real Estate · El Cajon
          </text>

          {/* Address block, specific */}
          <rect
            x="585"
            y="175"
            width="190"
            height="44"
            rx="6"
            fill="rgba(37, 87, 168, 0.15)"
            stroke="rgba(37, 87, 168, 0.45)"
            strokeWidth="1"
          />
          <text
            x="680"
            y="193"
            textAnchor="middle"
            fill="#F9FAFB"
            fontSize="10"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            250 E Chase Ave, Suite 107
          </text>
          <text
            x="680"
            y="208"
            textAnchor="middle"
            fill="#CBD5E1"
            fontSize="9"
            fontFamily="system-ui, sans-serif"
          >
            El Cajon, CA 92020
          </text>

          {/* License row */}
          <rect x="585" y="230" width="190" height="30" rx="6" fill="rgba(255,255,255,0.04)" />
          <text x="595" y="249" fill="#9CA3AF" fontSize="9" fontFamily="system-ui, sans-serif">
            CA DRE License
          </text>
          <text
            x="765"
            y="249"
            textAnchor="end"
            fill="#6B9FE8"
            fontSize="10"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            #02223420
          </text>

          {/* Rating row */}
          <rect x="585" y="270" width="190" height="38" rx="6" fill="rgba(255,255,255,0.04)" />
          <g>
            {[0, 1, 2, 3, 4].map((i) => (
              <text
                key={i}
                x={598 + i * 11}
                y="294"
                fill="#FBBF24"
                fontSize="12"
              >
                ★
              </text>
            ))}
          </g>
          <text x="665" y="294" fill="#F9FAFB" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">
            5.0
          </text>
          <text x="686" y="294" fill="#9CA3AF" fontSize="9" fontFamily="system-ui, sans-serif">
            · 417 Google reviews
          </text>

          {/* Service chips */}
          <g fontSize="8" fontFamily="system-ui, sans-serif">
            <rect x="585" y="320" width="45" height="18" rx="9" fill="rgba(107,159,232,0.18)" />
            <text x="607.5" y="332" textAnchor="middle" fill="#CBD5E1">
              Tax prep
            </text>
            <rect x="635" y="320" width="55" height="18" rx="9" fill="rgba(107,159,232,0.18)" />
            <text x="662.5" y="332" textAnchor="middle" fill="#CBD5E1">
              Real estate
            </text>
            <rect x="695" y="320" width="50" height="18" rx="9" fill="rgba(107,159,232,0.18)" />
            <text x="720" y="332" textAnchor="middle" fill="#CBD5E1">
              Mortgage
            </text>
          </g>

          {/* CTA button */}
          <rect x="585" y="355" width="190" height="34" rx="6" fill="#2557A8" />
          <text
            x="680"
            y="377"
            textAnchor="middle"
            fill="#F9FAFB"
            fontSize="10"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            Schedule free consultation
          </text>

          {/* Compliance strip */}
          <rect x="585" y="400" width="190" height="22" rx="3" fill="rgba(255,255,255,0.04)" />
          <text
            x="680"
            y="414"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="8"
            fontFamily="system-ui, sans-serif"
          >
            Equal Housing · CCPA · Terms
          </text>

          {/* Hours strip */}
          <rect x="585" y="428" width="190" height="22" rx="3" fill="rgba(255,255,255,0.04)" />
          <text
            x="680"
            y="442"
            textAnchor="middle"
            fill="#CBD5E1"
            fontSize="8"
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
          >
            Mon – Fri · 9 AM – 6 PM
          </text>

          {/* Copyright strip */}
          <rect x="585" y="456" width="190" height="20" rx="3" fill="rgba(255,255,255,0.03)" />
          <text
            x="680"
            y="469"
            textAnchor="middle"
            fill="#6B7280"
            fontSize="7"
            fontFamily="system-ui, sans-serif"
          >
            © 1 Way Home Real Estate and Mortgage Services Inc.
          </text>

          {/* Load time badge (green, fast) */}
          <g>
            <rect
              x="615"
              y="528"
              width="130"
              height="22"
              rx="11"
              fill="rgba(34, 197, 94, 0.15)"
              stroke="rgba(34, 197, 94, 0.45)"
              strokeWidth="1"
            />
            <text
              x="680"
              y="543"
              textAnchor="middle"
              fill="#4ADE80"
              fontSize="10"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
            >
              1.2s to first paint
            </text>
          </g>
        </g>
      </svg>
    </motion.figure>
  );
}
