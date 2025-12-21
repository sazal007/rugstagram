"use client";

import { motion } from "motion/react";

export const AboutHero: React.FC = () => {
  return (
    <div className="relative h-[40vh] bg-primary overflow-hidden">
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        src="https://images.unsplash.com/photo-1620613904351-5062c3f87b89?auto=format&fit=crop&q=80&w=2000"
        alt="Loom Background"
        className="absolute inset-0 w-full h-full object-cover grayscale"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-serif text-white z-10"
        >
          About Us
        </motion.h1>
      </div>
    </div>
  );
};

