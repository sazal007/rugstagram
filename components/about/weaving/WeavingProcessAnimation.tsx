"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Wool Sorting",
    description:
      "Raw wool from New Zealand is sorted and washed to remove impurities.",
    image: "/images/weaving/wool-sorting.avif",
    x: 100,
    y: 80,
    tooltipPosition: "bottom",
  },
  {
    id: 2,
    title: "Carding",
    description:
      "Fibers are separated and straightened by machine to prepare for spinning.",
    image: "/images/weaving/carding.avif",
    x: 366,
    y: 80,
    tooltipPosition: "bottom",
  },
  {
    id: 3,
    title: "Spinning",
    description:
      "Carded wool is spun into yarn using traditional tools for unique texture.",
    image: "/images/weaving/spinning.avif",
    x: 633,
    y: 80,
    tooltipPosition: "bottom",
  },
  {
    id: 4,
    title: "Pot Dyeing",
    description:
      "Yarn is dyed in small batches and sun-dried for rich, consistent color.",
    image: "/images/weaving/dyeing.avif",
    x: 900,
    y: 80,
    tooltipPosition: "bottom",
  },
  {
    id: 5,
    title: "Graph Creation",
    description:
      "Designers create a pixel-perfect graph for weavers to follow knot-by-knot.",
    image: "/images/weaving/graph.avif",
    x: 900,
    y: 280,
    tooltipPosition: "top",
  },
  {
    id: 6,
    title: "Hand Knotting",
    description:
      "Weavers tie individual knots row by row, creating the rug's foundation.",
    image: "/images/weaving/weaving.avif",
    x: 633,
    y: 280,
    tooltipPosition: "top",
  },
  {
    id: 7,
    title: "Trimming",
    description:
      "Initial trimming makes the pattern visible immediately after weaving.",
    image: "/images/weaving/trimming.avif",
    x: 366,
    y: 280,
    tooltipPosition: "top",
  },
  {
    id: 8,
    title: "Washing",
    description:
      "Rugs are washed with eco-friendly detergents to bring out the natural sheen.",
    image: "/images/weaving/wash-drying.avif",
    x: 100,
    y: 280,
    tooltipPosition: "top",
  },
  {
    id: 9,
    title: "Stretching",
    description:
      "The rug is stretched on a metal frame to ensure exact dimensions.",
    image: "/images/weaving/stretching.avif",
    x: 100,
    y: 480,
    tooltipPosition: "top",
  },
  {
    id: 10,
    title: "Finishing",
    description:
      "Final shearing, polishing, and detailing for a perfect pile height.",
    image: "/images/weaving/Trimming-and-Finishing.avif",
    x: 366,
    y: 480,
    tooltipPosition: "top",
  },
  {
    id: 11,
    title: "Shipping",
    description: "Carefully packed and shipped directly to its new home.",
    image: "/images/weaving/pakaging.avif",
    x: 633,
    y: 480,
    tooltipPosition: "top",
  },
  {
    id: 12,
    title: "To you",
    description: "The rug is shipped directly to the buyer's destination.",
    image:
      "https://images.unsplash.com/photo-1643116712744-6ee1ee41b740?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9vcnN0ZXB8ZW58MHx8MHx8fDA%3D",
    x: 900,
    y: 480,
    tooltipPosition: "top",
  },
];

const WeavingProcessAnimation = ({ className }: { className?: string }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const pathRef = React.useRef<SVGPathElement>(null);
  const fillPathRef = React.useRef<SVGPathElement>(null);
  const ballGroupRef = React.useRef<SVGGElement>(null);
  const animationFrameRef = React.useRef<number | undefined>(undefined);
  const startTimeRef = React.useRef<number | null>(null);
  const lastStepRef = React.useRef(1);

  // Total cycle duration: 48 seconds for 12 steps (4s per step)
  const CYCLE_DURATION = 48000; // 48 seconds

  useEffect(() => {
    // Initialize start time
    startTimeRef.current = Date.now();

    const animate = () => {
      if (startTimeRef.current === null) return;

      const elapsed = (Date.now() - startTimeRef.current) % CYCLE_DURATION;
      const progress = elapsed / CYCLE_DURATION; // 0 to 1

      // Update path fill directly via DOM (no React re-render)
      if (fillPathRef.current) {
        fillPathRef.current.style.strokeDashoffset = String(1 - progress);
      }

      // Calculate ball position along the path and update directly
      if (pathRef.current && ballGroupRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        const point = pathRef.current.getPointAtLength(pathLength * progress);
        ballGroupRef.current.setAttribute(
          "transform",
          `translate(${point.x}, ${point.y})`
        );
      }

      // Only update React state for step changes (less frequent)
      const step = Math.floor(progress * 12) + 1;
      const clampedStep = Math.min(step, 12);
      if (clampedStep !== lastStepRef.current) {
        lastStepRef.current = clampedStep;
        setActiveStep(clampedStep);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const pathD =
    "M 100 80 L 900 80 C 1000 80 1000 280 900 280 L 100 280 C 0 280 0 480 100 480 L 900 480";

  return (
    <div
      className={cn("relative w-full hidden md:flex flex-col items-center", className)}
    >
      <div className="relative w-full aspect-1000/600 max-w-5xl">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-xl overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(var(--foreground) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* --- SVG Layer: Paths, Ball, and Nodes --- */}
        <svg
          className="w-full h-full relative z-10"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Mask for circular images */}
            <clipPath id="circleView">
              <circle cx="26" cy="26" r="26" />
            </clipPath>
          </defs>

          {/* 1. Base Track */}
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="var(--border)"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* 2. Fill Animation */}
          <path
            ref={fillPathRef}
            d={pathD}
            pathLength="1"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="1"
            strokeDashoffset="1"
            className="weaving-path-fill"
          />

          {/* 3. Steps (Nodes) */}
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            const isPast = activeStep > step.id;

            // We scale the entire group to make the "container" larger
            const scale = isActive ? 1.6 : 1;
            // We push the label down when scaled up so it doesn't overlap
            const labelY = isActive ? 85 : 50;

            return (
              <g key={step.id} transform={`translate(${step.x}, ${step.y})`}>
                {/* Node Visual Group (Circles + Image) - Scaled */}
                <g
                  className="transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ transform: `scale(${scale})` }}
                >
                  {/* Connection Circle Background */}
                  <circle
                    r="32"
                    fill={
                      isPast || isActive
                        ? "var(--background)"
                        : "var(--surface)"
                    }
                    stroke={
                      isActive
                        ? "var(--accent)"
                        : isPast
                        ? "var(--accent)"
                        : "var(--border)"
                    }
                    strokeWidth={isActive ? 3 : 2}
                    strokeOpacity={isPast ? 0.6 : 1}
                    className="transition-colors duration-500 ease-in-out shadow-sm"
                  />

                  {/* Active Pulse Ring */}
                  {isActive && (
                    <circle
                      r="32"
                      fill="none"
                      stroke="var(--sand)"
                      strokeWidth="2"
                    >
                      <animate
                        attributeName="r"
                        from="32"
                        to="48"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="1"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Image Container */}
                  <foreignObject
                    x="-26"
                    y="-26"
                    width="52"
                    height="52"
                    className="pointer-events-none"
                  >
                    <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-muted/20">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className={cn(
                          "w-full h-full object-cover transition-all duration-700",
                          isActive ? "saturate-100" : "saturate-0 opacity-60"
                        )}
                      />
                    </div>
                  </foreignObject>
                </g>

                {/* Text Label Group - Translated */}
                <g
                  className="transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ transform: `translate(0px, ${labelY}px)` }}
                >
                  <rect
                    x="-70"
                    y="-14"
                    width="140"
                    height="28"
                    rx="14"
                    fill="var(--surface)"
                    fillOpacity="0.9"
                    className={cn(
                      "transition-all duration-500",
                      isActive
                        ? "stroke-sand/30 stroke-1"
                        : "stroke-transparent"
                    )}
                  />
                  <text
                    textAnchor="middle"
                    fill={isActive ? "var(--accent)" : "var(--foreground)"}
                    fillOpacity={isActive ? 1 : 0.7}
                    fontSize="13"
                    fontWeight={isActive ? "700" : "600"}
                    style={{ fontFamily: "Geist, sans-serif" }}
                    dy="5"
                    className="transition-all duration-500"
                  >
                    {step.title}
                  </text>
                </g>
              </g>
            );
          })}

          {/* 4. Traveling Ball */}
          <g
            ref={ballGroupRef}
            className="weaving-ball"
            transform="translate(100, 80)"
          >
            <circle r="20" fill="var(--sand)" fillOpacity="0.4">
              <animate
                attributeName="r"
                from="10"
                to="25"
                dur="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.6"
                to="0"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              r="8"
              fill="var(--accent)"
              stroke="var(--surface)"
              strokeWidth="2"
              filter="url(#glow)"
            />
          </g>
        </svg>

        {/* --- HTML Layer: Interactive Tooltips --- */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
          {steps.map((step) => {
            const isReachable = activeStep >= step.id;
            const isHovered = hoveredStep === step.id;
            const isActive = activeStep === step.id;

            const leftPct = (step.x / 1000) * 100;
            const topPct = (step.y / 600) * 100;

            return (
              <div
                key={step.id}
                className="absolute w-0 h-0 pointer-events-auto"
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
              >
                {/* Trigger Area */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full cursor-pointer"
                  onMouseEnter={() => isReachable && setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                />

                {/* Tooltip Content */}
                {isReachable && (
                  <AnimatePresence>
                    {(isHovered || (isActive && !hoveredStep)) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0, y: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: step.id === 12 ? "-100%" : "-50%", // Right-align for step 12 to prevent overflow
                          y: step.tooltipPosition === "top" ? -55 : 55,
                        }}
                        exit={{ opacity: 0, scale: 0, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 25,
                        }}
                        className={cn(
                          "absolute left-0 w-44 p-2 rounded-lg shadow-xl text-center bg-accent text-accent-foreground backdrop-blur-md border border-accent/50 z-50",
                          step.tooltipPosition === "top" ? "bottom-0" : "top-0"
                        )}
                        style={{
                          transformOrigin:
                            step.tooltipPosition === "top"
                              ? step.id === 12
                                ? "bottom right"
                                : "bottom center"
                              : step.id === 12
                              ? "top right"
                              : "top center",
                        }}
                      >
                        <span className="block text-[10px] font-bold text-sand mb-0.5 uppercase tracking-wider">
                          Step {step.id}
                        </span>
                        <p className="text-xs leading-snug font-light text-accent-foreground/90">
                          {step.description}
                        </p>

                        {/* Arrow */}
                        <div
                          className={cn(
                            "absolute w-2.5 h-2.5 bg-accent rotate-45 border-l border-t border-accent/50",
                            step.tooltipPosition === "top"
                              ? "-bottom-1.5 border-l-0 border-t-0 border-r border-b"
                              : "-top-1.5",
                            step.id === 12
                              ? "right-3 left-auto translate-x-0"
                              : "left-1/2 -translate-x-1/2"
                          )}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeavingProcessAnimation;
