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
      staggerChildren: 0.2,
    },
  },
};

const collections = [
  { name: "Contemporary", imageIndex: 10 },
  { name: "Shaded", imageIndex: 11 },
  { name: "Abstract", imageIndex: 12 },
];

export const FeaturedCollections: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-6 pt-24"
    >
      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4"
      >
        <h2 className="text-3xl md:text-4xl font-serif">Curated Collections</h2>
        <Link
          href="/shop"
          className="text-sm uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors"
        >
          View All
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <motion.div key={collection.name} variants={fadeInUp}>
            <Link
              href={`/collections/${collection.name}`}
              className="group relative aspect-4/5 block overflow-hidden rounded-sm"
            >
              <img
                src={`https://picsum.photos/600/800?random=${collection.imageIndex}`}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl text-white font-serif italic mb-2">
                  {collection.name}
                </h3>
                <span className="text-white/80 text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
