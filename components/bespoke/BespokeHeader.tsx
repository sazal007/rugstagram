"use client";

import { motion } from "motion/react";

export const BespokeHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-sand/10 py-20 px-6 text-center"
    >
      <h1 className="text-4xl md:text-6xl font-serif mb-6">Bespoke Service</h1>
      <p className="text-lg text-muted max-w-2xl mx-auto">
        Experience the luxury of creating a rug that is uniquely yours. From
        modifying colors of our existing collection to realizing a completely
        original vision.
      </p>
    </motion.div>
  );
};

