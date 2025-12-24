"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CustomButton } from "@/components/ui/custom-button";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1603913996638-c01100417b4a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cnVnc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cnVnc3xlbnwwfHwwfHx8MA%3D%3D",
];

export const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentImageIndex}
          src={HERO_IMAGES[currentImageIndex]}
          alt="Luxury Carpet"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto space-y-8">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="block text-sm md:text-base font-bold tracking-[0.2em] uppercase text-sand"
        >
          Heritage Meets Modernity
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-5xl md:text-8xl font-serif font-light leading-tight"
        >
          The Art of <br /> <span className="italic">Tibetan Weaving</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light"
        >
          Hand-knotted in Nepal using century-old techniques, designed for
          contemporary living spaces.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <CustomButton href="/shop" variant="hero-primary" size="hero">
            Shop Collection
          </CustomButton>
          <CustomButton href="/bespoke" variant="hero-outline" size="hero">
            Bespoke Rugs
          </CustomButton>
        </motion.div>
      </div>
    </section>
  );
};