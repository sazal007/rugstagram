"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const timelineItemVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

import { useColors } from "@/hooks/use-colors";
import { Color } from "@/types/colors";

interface TimelineItemProps {
  color: Color;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ color, index }) => {
  const isEven = index % 2 === 1; // Even numbers (1-indexed: 2nd, 4th items)

  // Fallback description related to the color
  const description = `The ${color.name} palette reflects our commitment to timeless elegance and Himalayan artistry. Each rug in this collection is hand-knotted using the finest materials, ensuring a unique depth of texture and a serene aesthetic for your home.`;

  // Content JSX
  const contentArea = (
    <motion.div
      variants={contentVariants}
      className="w-full md:w-1/2 flex flex-col justify-center pt-12 pb-6 min-[375px]:pt-16 min-[375px]:pb-8 md:py-20 md:min-h-[80vh] pl-10 min-[375px]:pl-12 sm:pl-16 md:pl-12 pr-3 min-[375px]:pr-4 sm:pr-6 space-y-4 min-[375px]:space-y-5 sm:space-y-6 z-10 order-1 md:order-0"
    >
      <div className="space-y-2 min-[375px]:space-y-3">
        <h2 className="text-3xl min-[375px]:text-4xl sm:text-5xl md:text-6xl font-serif italic tracking-tighter leading-[0.9] text-foreground">
          {color.name}
        </h2>
      </div>

      <div className="space-y-3 min-[375px]:space-y-4 sm:space-y-5 max-w-lg">
        <div className="space-y-1.5 min-[375px]:space-y-2">
          <h3 className="text-[9px] min-[375px]:text-[10px] uppercase tracking-widest text-accent/40 font-black">
            The Narrative
          </h3>
          <p className="text-sm min-[375px]:text-base sm:text-base md:text-lg text-foreground/70 leading-relaxed font-light">
            {description}
          </p>
        </div>
        <div className="pt-1 min-[375px]:pt-2">
          <Link
            href={`/shop?color=${color.slug}`}
            className="text-[10px] min-[375px]:text-xs sm:text-sm uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors inline-block"
          >
            View More{" "}
            <ArrowRight className="inline-block w-2.5 h-2.5 min-[375px]:w-3 min-[375px]:h-3 sm:w-4 sm:h-4 ml-0.5 min-[375px]:ml-1 sm:ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );

  // Image JSX
  const imageArea = (
    <div className="w-full md:w-1/2 h-auto md:h-screen md:sticky md:top-0 md:self-start max-[320px]:static order-2 md:order-0">
      <motion.div
        variants={imageVariants}
        className="flex items-center justify-center px-3 min-[375px]:px-4 sm:px-6 md:px-12 py-4 min-[375px]:py-5 sm:py-6 md:py-8 h-full"
      >
        <Link
          href={`/shop?color=${color.slug}`}
          className="relative w-full max-w-[240px] min-[375px]:max-w-[280px] sm:max-w-sm md:max-w-md aspect-3/4 md:aspect-4/5 rounded-lg overflow-hidden group border border-foreground/10 bg-background"
        >
          {/* Subtle Ambient Color Glow - If hex code is missing, use a transparent primary as fallback */}
          <div
            className="absolute -inset-10 opacity-10 blur-3xl transition-opacity duration-1000 group-hover:opacity-30 bg-primary/20"
          />

          {/* Main Content Image */}
          <Image
            src={color.image || "/colors/originals.png"}
            alt={color.image_alt_description || color.name}
            fill
            className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Minimalist Image Labels */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />

          <div className="absolute bottom-4 min-[375px]:bottom-6 left-4 min-[375px]:left-6 right-4 min-[375px]:right-6 flex items-end justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
            <div>
              <p className="text-[9px] min-[375px]:text-[10px] uppercase tracking-[0.3em] text-white/50 mb-0.5 min-[375px]:mb-1">
                Visual Core
              </p>
              <p className="text-lg min-[375px]:text-xl font-serif italic text-white/90">
                {color.name}
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={timelineItemVariants}
      className="relative flex flex-col md:flex-row items-start min-h-[40vh] min-[375px]:min-h-[50vh] md:min-h-[80vh] border-b border-foreground/5 last:border-0 bg-background overflow-visible"
    >
      {/* Timeline Visual Line - Center aligned on desktop, left aligned on mobile */}
      <div className="absolute left-4 min-[375px]:left-5 sm:left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 z-20 pointer-events-none">
        <div className="h-full w-px bg-gradient-to-b from-foreground/5 via-accent/30 to-foreground/5" />
        <div className="absolute top-12 min-[375px]:top-14 sm:top-16 md:top-1/2 md:-translate-y-1/2 -left-1.5 w-2.5 h-2.5 min-[375px]:w-3 min-[375px]:h-3 rounded-full border-2 border-accent/30 bg-accent z-30 shadow-[0_0_15px_rgba(139,94,60,0.3)]" />
      </div>

      {/* On mobile: always content first, image second. On desktop: alternate based on even/odd */}
      {isEven ? (
        <>
          {imageArea}
          {contentArea}
        </>
      ) : (
        <>
          {contentArea}
          {imageArea}
        </>
      )}
    </motion.section>
  );
};

export const ColorShowcase: React.FC = () => {
  const { data: colors = [], isLoading, error } = useColors();

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <p className="text-muted tracking-widest uppercase text-xs animate-pulse">Loading Color Palette...</p>
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <main className="relative bg-background">
      {/* Title Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-12 min-[375px]:py-16 sm:py-20 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-3 min-[375px]:px-4 sm:px-6">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-10 min-[375px]:mb-12 sm:mb-16"
          >
            <span className="text-accent text-[10px] min-[375px]:text-xs font-bold uppercase tracking-widest">
              Color Palette
            </span>
            <h2 className="text-xl min-[375px]:text-2xl sm:text-2xl md:text-3xl font-serif mt-2 mb-2 min-[375px]:mb-3">
              Explore Our Colorways
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-xs min-[375px]:text-sm sm:text-sm md:text-base px-2 min-[375px]:px-0">
              Discover the perfect shade for your space. Each palette tells a
              story of craftsmanship and timeless beauty.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto overflow-visible px-0 min-[375px]:px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="overflow-visible"
        >
          {colors.map((color, index) => (
            <TimelineItem key={color.id} color={color} index={index} />
          ))}
        </motion.div>
      </div>
    </main>
  );
};
