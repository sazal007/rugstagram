"use client";

import React from "react";
import Link from "next/link";
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

const colorPalettes = [
  {
    name: "Originals",
    image: "/colors/originals.png",
    href: "/shop?color=originals",
    description: "Classic Elegance",
  },
  {
    name: "Silver & Greiges",
    image: "/colors/silver&greiges.png",
    href: "/shop?color=silver-greiges",
    description: "Modern Neutrals",
  },
  {
    name: "Beiges",
    image: "/colors/beiges.png",
    href: "/shop?color=beiges",
    description: "Warm Tones",
  },
  {
    name: "Toupes",
    image: "/colors/toupes.png",
    href: "/shop?color=toupes",
    description: "Sophisticated Hues",
  },
];

export const ColorShowcase: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="bg-white py-28"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">
            Color Palette
          </span>
          <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
            Explore Our Colorways
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Discover the perfect shade for your space. Each palette tells a
            story of craftsmanship and timeless beauty.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {colorPalettes.map((palette) => (
            <motion.div
              key={palette.name}
              variants={fadeInUp}
              className="group"
            >
              <Link
                href={palette.href}
                className="block relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100"
              >
                <motion.img
                  src={palette.image}
                  alt={palette.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500" />

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-xl font-serif text-white mb-1">
                    {palette.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">
                    {palette.description}
                  </p>
                  <span className="text-white/90 text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Label always visible */}
                <div className="absolute top-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-widest opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    {palette.name}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
