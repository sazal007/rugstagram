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

interface ColorEpoch {
  id: string;
  name: string;
  year: string;
  hex: string;
  description: string;
  significance: string;
  imageUrl: string;
  href: string;
}

interface TimelineItemProps {
  epoch: ColorEpoch;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ epoch, index }) => {
  const isEven = index % 2 === 1; // Even numbers (1-indexed: 2nd, 4th items)

  // Content JSX
  const contentArea = (
    <motion.div
      variants={contentVariants}
      className="w-full md:w-1/2 flex flex-col justify-center pt-16 pb-8 md:py-20 md:min-h-[80vh] px-6 md:px-12 space-y-6 z-10"
    >
      <div className="space-y-3">
        <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter leading-[0.9] text-foreground">
          {epoch.name}
        </h2>
      </div>

      <div className="space-y-5 max-w-lg">
        <div className="space-y-2">
          <h3 className="text-[10px] uppercase tracking-widest text-accent/40 font-black">
            The Narrative
          </h3>
          <p className="text-base md:text-lg text-foreground/70 leading-relaxed font-light">
            {epoch.description}
          </p>
        </div>
        <div className="pt-2">
          <Link
            href={epoch.href}
            className="text-xs sm:text-sm uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors inline-block"
          >
            View More{" "}
            <ArrowRight className="inline-block w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );

  // Image JSX
  const imageArea = (
    <div className="w-full md:w-1/2 h-auto md:h-screen md:sticky md:top-0 md:self-start max-[320px]:static">
      <motion.div
        variants={imageVariants}
        className="flex items-center justify-center px-6 md:px-12 py-6 md:py-8 h-full"
      >
        <Link
          href={epoch.href}
          className="relative w-full max-w-sm md:max-w-md aspect-3/4 md:aspect-4/5 rounded-lg overflow-hidden group border border-foreground/10 bg-background shadow-2xl"
        >
          {/* Subtle Ambient Color Glow */}
          <div
            className="absolute -inset-10 opacity-10 blur-3xl transition-opacity duration-1000 group-hover:opacity-30"
            style={{ backgroundColor: epoch.hex }}
          />

          {/* Main Content Image */}
          <Image
            src={epoch.imageUrl}
            alt={epoch.name}
            fill
            className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Minimalist Image Labels */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-1">
                Visual Core
              </p>
              <p className="text-xl font-serif italic text-white/90">
                {epoch.name}
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
      className="relative flex flex-col md:flex-row items-start min-h-[50vh] md:min-h-[80vh] border-b border-foreground/5 last:border-0 bg-background overflow-visible"
    >
      {/* Timeline Visual Line - Center aligned on desktop, left aligned on mobile */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 z-20 pointer-events-none">
        <div className="h-full w-px bg-gradient-to-b from-foreground/5 via-accent/30 to-foreground/5" />
        <div className="absolute top-16 md:top-1/2 md:-translate-y-1/2 -left-1.5 w-3 h-3 rounded-full border-2 border-accent/30 bg-accent z-30 shadow-[0_0_15px_rgba(139,94,60,0.3)]" />
      </div>

      {/* Conditionally render based on even/odd index */}
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

const epochs: ColorEpoch[] = [
  {
    id: "originals",
    name: "Originals",
    year: "2020",
    hex: "#1c1c1c",
    description:
      "The Originals palette reflects the true essence of each design, combining colors from traditional and history with new hues for the Abstract, Modern, and Ombre collections. This blend of classic and contemporary shades ensures timeless appeal.",
    significance:
      "The foundation of our color philosophy, Originals represents the heritage and authenticity that sets our rugs apart in the world of fine textiles.",
    imageUrl: "/colors/originals.png",
    href: "/shop?color=originals",
  },
  {
    id: "silver-greiges",
    name: "Silver & Greiges",
    year: "2021",
    hex: "#8b8b7a",
    description:
      "The Greys palette includes Green Gray Beige, Blue Green Gray, and Green Gray, offering sophisticated, understated tones that bring depth and tranquility to modern spaces. These versatile shades anchor designs with a serene, calm aesthetic that complements both warm and cool interiors.",
    significance:
      "A revolutionary shift towards minimalist elegance, this palette has become synonymous with modern luxury interiors and architectural harmony.",
    imageUrl: "/colors/silver&greiges.png",
    href: "/shop?color=silver-greiges",
  },
  {
    id: "beiges",
    name: "Beiges",
    year: "2022",
    hex: "#c7a17a",
    description:
      "The Beige palette includes shades like Pink Beige, Yellow Beige, Gold Beige, Orange Beige, and Green Beige, offering a warm and inviting spectrum perfect for cozy interiors. These versatile tones bring warmth and balance to any space, making them ideal for creating a welcoming atmosphere.",
    significance:
      "Celebrated for their versatility and universal appeal, Beiges have transformed countless interiors into sanctuaries of calm and sophistication.",
    imageUrl: "/colors/beiges.png",
    href: "/shop?color=beiges",
  },
  {
    id: "toupes",
    name: "Toupes",
    year: "2023",
    hex: "#8b5e3c",
    description:
      "Taupe, the chameleon of colors, adapts effortlessly to both warm and cool interiors. Its subtle blend of gray and brown creates depth, while it pairs seamlessly with any color, making it a flexible choice for diverse design needs. Whether enhancing warm tones or balancing cooler hues, taupe provides timeless elegance. Greige—a mix of grey and beige—further amplifies this adaptability, blending harmoniously with all shades in the collection.",
    significance:
      "The latest evolution in our color journey, Toupes have redefined what it means to create spaces that are both bold and understated, modern and timeless.",
    imageUrl: "/colors/toupes.png",
    href: "/shop?color=toupes",
  },
];

export const ColorShowcase: React.FC = () => {
  return (
    <main className="relative bg-background">
      {/* Title Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="text-accent text-xs font-bold uppercase tracking-widest">
              Color Palette
            </span>
            <h2 className="text-2xl md:text-3xl font-serif mt-2 mb-3">
              Explore Our Colorways
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-sm md:text-base">
              Discover the perfect shade for your space. Each palette tells a
              story of craftsmanship and timeless beauty.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto overflow-visible">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="overflow-visible"
        >
          {epochs.map((epoch, index) => (
            <TimelineItem key={epoch.id} epoch={epoch} index={index} />
          ))}
        </motion.div>
      </div>
    </main>
  );
};
