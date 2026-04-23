"use client";

import { motion } from "framer-motion";

/**
 * AIFlowDiagram
 *
 * Shows the core value proposition of the new site in one image:
 * structured facts on the website flow outward to the AI search tools
 * that matter. Replaces about 200 words of text with a single scannable
 * diagram.
 *
 * Pure SVG — no AI generation, crisp at every resolution, locked to
 * the 1Way brand palette (navy #0A2342 / royal blue #2557A8 /
 * light blue #6B9FE8).
 */

const DATA_PILLS = [
  "Business name",
  "Street address",
  "Phone number",
  "California DRE license",
  "Office hours",
  "Google rating + reviews",
  "Seven service lines",
] as const;

const AI_TOOLS = [
  { y: 60, name: "ChatGPT", sub: "OpenAI · search" },
  { y: 200, name: "Perplexity", sub: "live web search" },
  { y: 340, name: "Google AI", sub: "AI Overviews + Gemini" },
] as const;

export function AIFlowDiagram() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="w-full overflow-x-auto -mx-4 md:mx-0"
      aria-labelledby="ai-flow-diagram-title"
    >
      <svg
        viewBox="0 0 860 500"
        className="w-full h-auto min-w-[640px]"
        role="img"
        aria-labelledby="ai-flow-diagram-title ai-flow-diagram-desc"
      >
        <title id="ai-flow-diagram-title">
          How structured data flows from your site to AI search
        </title>
        <desc id="ai-flow-diagram-desc">
          A diagram showing the new website on the left — containing
          seven specific facts about the business — with flowing arrows
          carrying each fact to three AI search tools on the right:
          ChatGPT, Perplexity, and Google AI.
        </desc>

        <defs>
          <marker
            id="aiflow-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B9FE8" />
          </marker>

          <linearGradient id="aiflow-website-glow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2557A8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2557A8" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Website box — the source of truth */}
        <g>
          <rect
            x="30"
            y="70"
            width="300"
            height="360"
            rx="20"
            fill="url(#aiflow-website-glow)"
            stroke="#2557A8"
            strokeWidth="1.5"
          />
          <text
            x="180"
            y="105"
            textAnchor="middle"
            fill="#F9FAFB"
            fontSize="15"
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
            letterSpacing="0.5"
          >
            YOUR WEBSITE
          </text>
          <text
            x="180"
            y="126"
            textAnchor="middle"
            fill="#6B9FE8"
            fontSize="11"
            fontFamily="system-ui, sans-serif"
          >
            1wayhomeservices.com
          </text>

          {/* Data pills */}
          {DATA_PILLS.map((label, i) => {
            const y = 160 + i * 36;
            return (
              <g key={label}>
                <rect
                  x="55"
                  y={y}
                  width="250"
                  height="26"
                  rx="13"
                  fill="rgba(107, 159, 232, 0.1)"
                  stroke="rgba(107, 159, 232, 0.35)"
                  strokeWidth="1"
                />
                <text
                  x="180"
                  y={y + 17}
                  textAnchor="middle"
                  fill="#E2E8F0"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </g>

        {/* Flowing arrows from site to each AI tool */}
        <g fill="none" strokeWidth="1.8" opacity="0.7" markerEnd="url(#aiflow-arrow)">
          {/* to ChatGPT (top) */}
          <path d="M 330 160 C 450 130, 520 100, 595 95" stroke="#6B9FE8" />
          {/* to Perplexity (middle) */}
          <path d="M 330 250 L 595 235" stroke="#6B9FE8" />
          {/* to Google AI (bottom) */}
          <path d="M 330 340 C 450 370, 520 395, 595 375" stroke="#6B9FE8" />
        </g>

        {/* Floating data chips along the arrows (illustrative snippets) */}
        <g fontSize="10" fontFamily="system-ui, sans-serif" fill="#94A3B8">
          <g>
            <rect
              x="430"
              y="95"
              width="70"
              height="18"
              rx="9"
              fill="#0A2342"
              stroke="rgba(107, 159, 232, 0.3)"
            />
            <text x="465" y="108" textAnchor="middle" fill="#CBD5E1">
              address
            </text>
          </g>
          <g>
            <rect
              x="430"
              y="236"
              width="70"
              height="18"
              rx="9"
              fill="#0A2342"
              stroke="rgba(107, 159, 232, 0.3)"
            />
            <text x="465" y="249" textAnchor="middle" fill="#CBD5E1">
              reviews
            </text>
          </g>
          <g>
            <rect
              x="430"
              y="375"
              width="70"
              height="18"
              rx="9"
              fill="#0A2342"
              stroke="rgba(107, 159, 232, 0.3)"
            />
            <text x="465" y="388" textAnchor="middle" fill="#CBD5E1">
              license
            </text>
          </g>
        </g>

        {/* AI tool nodes on the right */}
        {AI_TOOLS.map((tool) => (
          <g key={tool.name}>
            <rect
              x="595"
              y={tool.y}
              width="235"
              height="80"
              rx="14"
              fill="rgba(10, 35, 66, 0.7)"
              stroke="rgba(107, 159, 232, 0.4)"
              strokeWidth="1.5"
            />
            <text
              x="712.5"
              y={tool.y + 35}
              textAnchor="middle"
              fill="#F9FAFB"
              fontSize="16"
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
            >
              {tool.name}
            </text>
            <text
              x="712.5"
              y={tool.y + 56}
              textAnchor="middle"
              fill="#6B9FE8"
              fontSize="11"
              fontFamily="system-ui, sans-serif"
            >
              {tool.sub}
            </text>
          </g>
        ))}
      </svg>
    </motion.figure>
  );
}
