"use client";

import React from "react";
import { motion } from "motion/react";
import { PRODUCTS } from "@/constants";
import { ProductCard } from "../ProductCard";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const FeaturedProducts: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <motion.div variants={fadeInUp} className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif mb-4">
          New Arrivals
        </h2>
        <p className="text-muted">Fresh from the loom, ready for your home.</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRODUCTS.slice(0, 4).map((product) => (
          <motion.div key={product.id} variants={fadeInUp}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

