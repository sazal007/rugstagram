"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { CustomButton } from "@/components/ui/custom-button";
import { ArrowRight } from "lucide-react";

const STORY_IMAGES = [
  {
    src: "/images/home-weaving.png",
    title: "Weaving",
    description: "Traditional Tibetan weaving techniques",
  },
  {
    src: "/images/weaving/dyeing.avif",
    title: "Dyeing",
    description: "Natural color preparation",
  },
  {
    src: "/images/weaving/trimming.avif",
    title: "Trimming",
    description: "Precision craftsmanship",
  },
  {
    src: "/images/weaving/spinning.avif",
    title: "Spinning",
    description: "Yarn preparation",
  },
];

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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface BentoCardProps {
  image: (typeof STORY_IMAGES)[0];
  className?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ image, className = "" }) => {
  return (
    <motion.div
      variants={imageVariants}
      className={`group relative overflow-hidden bg-surface border border-border shadow-lg transition-all duration-700 hover:shadow-2xl  ${className}`}
    >
      <div className="relative w-full h-full">
        <Image
          src={image.src}
          alt={image.title}
          fill
          className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
          <div className="space-y-1.5">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
              Process
            </p>
            <h3 className="text-base sm:text-lg md:text-xl font-serif italic text-white/90">
              {image.title}
            </h3>
            <p className="text-[11px] sm:text-xs text-white/70 mt-1.5 line-clamp-2">
              {image.description}
            </p>
          </div>
        </div>

        {/* Subtle ambient glow */}
        <div className="absolute -inset-10 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-1000 bg-accent/30" />
      </div>
    </motion.div>
  );
};

export const BrandStory: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="bg-background py-12 sm:py-16 md:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-16">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          className="mb-12 sm:mb-16 md:mb-20 lg:mb-24"
        >
          <span className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.8em] sm:tracking-[1em] md:tracking-[1.2em] text-muted font-bold block mb-3 sm:mb-4 md:mb-6">
            Since 1994
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif tracking-tighter leading-[0.9] text-foreground">
            Our Story
          </h2>
        </motion.div>

        {/* Bento Grid - Improved Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
          {/* Large Featured Image - Left Side */}
          <motion.div
            variants={imageVariants}
            className="lg:col-span-7 relative overflow-hidden bg-surface border border-border shadow-lg group transition-all duration-700 hover:shadow-2xl min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
          >
            <div className="relative w-full h-full">
              <Image
                src={STORY_IMAGES[0].src}
                alt={STORY_IMAGES[0].title}
                fill
                className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 lg:p-12 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
                    Craftsmanship
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-white/90">
                    {STORY_IMAGES[0].title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 mt-3 max-w-md">
                    {STORY_IMAGES[0].description}
                  </p>
                </div>
              </div>
              <div className="absolute -inset-10 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-1000 bg-accent/30" />
            </div>
          </motion.div>

          {/* Right Column - Story Content + Images */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6 md:gap-8">
            {/* Story Content Card */}
            <motion.div
              variants={fadeInUp}
              className="relative bg-surface border border-border shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between group hover:shadow-2xl transition-all duration-700 min-h-[300px] sm:min-h-[350px]"
            >
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="space-y-4">
                  <p className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed font-light">
                    Rugstagram (rugstagram.com) is the online initiative of
                    Rolpa Carpet Industries located in Bouddha, Nepal. We are
                    able to take a pride in the joy of manufacturing and
                    exporting Nepalese hand knotted rugs from the past 30 years.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed font-light">
                    We make sure that our hand knotted rugs creation are
                    recognized for their excellent craftsmanship & traditional
                    Tibetan weaving. Decades of specializing in manufacturing
                    hand knotted carpet, it has been our constant endeavor and
                    passion to weave the best hand knotted rugs in the world.
                  </p>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <CustomButton
                  href="/assistance"
                  variant="default"
                  size="hero-sm"
                  className="group/btn"
                >
                  Get in Touch{" "}
                  <ArrowRight className="inline-block w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform group-hover/btn:translate-x-1" />
                </CustomButton>
              </div>
            </motion.div>

            {/* Process Images Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <BentoCard
                image={STORY_IMAGES[1]}
                className="min-h-[200px] sm:min-h-[250px] md:min-h-[280px]"
              />
              <BentoCard
                image={STORY_IMAGES[2]}
                className="min-h-[200px] sm:min-h-[250px] md:min-h-[280px]"
              />
            </div>

            {/* Bottom Wide Image */}
            <BentoCard
              image={STORY_IMAGES[3]}
              className="min-h-[200px] sm:min-h-[250px] md:min-h-[280px]"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
