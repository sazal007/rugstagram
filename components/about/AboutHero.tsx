"use client";

import { motion } from "motion/react";

export const AboutHero: React.FC = () => {
  return (
    <div className="relative h-[40vh] bg-primary overflow-hidden">
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        src="https://images.unsplash.com/photo-1444362408440-274ecb6fc730?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FycGV0c3xlbnwwfHwwfHx8MA%3D%3D"
        alt="Loom Background"
        className="absolute inset-0 w-full h-full object-cover object-center grayscale"
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
