"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

const STORY_IMAGES = [
  "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1594164186835-23ba09e4d6d9?auto=format&fit=crop&q=80&w=800",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const BrandStory: React.FC = () => {
  const [storyImageIndex, setStoryImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStoryImageIndex((prev) => (prev + 1) % STORY_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="bg-white py-32"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <span className="text-accent text-xs font-bold uppercase tracking-widest">
            Since 1994
          </span>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">
            Our Story
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Rugstagram (rugstagram.com) is the online initiative of Rolpa
              Carpet Industries located in Bouddha, Nepal. We are able to take a
              pride in the joy of manufacturing and exporting Nepalese hand
              knotted rugs from the past 30 years.
            </p>
            <p>
              We make sure that our hand knotted rugs creation are recognized
              for their excellent craftsmanship & traditional Tibetean weaving.
              Decades of specializing in manufacturing hand knotted carpet, it
              has been our constant endeavor and passion to weave the best hand
              knotted rugs in the world.
            </p>
          </div>
          <Button
            href="/assistance"
            variant="default"
            size="hero-sm"
            className="mt-6"
          >
            Get in Touch
          </Button>
        </div>

        {/* Story Carousel */}
        <div className="relative aspect-square w-full max-w-md mx-auto lg:ml-auto rounded-sm overflow-hidden bg-gray-100">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={storyImageIndex}
              src={STORY_IMAGES[storyImageIndex]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Weaving Process"
            />
          </AnimatePresence>
          <div className="absolute inset-0 border-12px border-white/10 pointer-events-none" />
        </div>
      </div>
    </motion.section>
  );
};
