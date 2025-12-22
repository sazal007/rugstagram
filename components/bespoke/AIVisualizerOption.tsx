"use client";

import { motion, Variants } from "motion/react";
import { ArrowRight, Palette, Wand2 } from "lucide-react";
import { CustomButton } from "../ui/custom-button";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const AIVisualizerOption: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900 to-black text-white"
    >
      <div className="absolute inset-0 opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-16">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-yellow-400">
            <Wand2 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Option 02: AI Powered
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif">
            Interactive Rug Visualizer
          </h2>
          <p className="text-indigo-100 leading-relaxed text-lg">
            Instant gratification. Select a template, choose your palette, and
            watch as our AI engine visualizes your custom rug in seconds. No
            waiting for renderings.
          </p>
          <CustomButton
            href="/bespoke/visualizer"
            variant="default"
            size="hero"
            className="inline-flex items-center gap-3 bg-white text-primary hover:bg-yellow-400 hover:text-black transition-colors mt-4 rounded-sm"
          >
            Launch Visualizer <ArrowRight className="w-4 h-4" />
          </CustomButton>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4 flex items-center justify-center">
            <div className="text-center space-y-2 opacity-80">
              <Palette className="w-12 h-12 mx-auto mb-2 text-yellow-400" />
              <p className="font-serif text-xl">Select Template + Colors</p>
              <p className="text-sm text-indigo-200">AI Generates Preview</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

