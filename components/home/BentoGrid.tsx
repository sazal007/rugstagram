"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      staggerChildren: 0.2,
    },
  },
};

export const BentoGrid: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <motion.div variants={fadeInUp} className="text-center mb-12">
        <span className="text-accent text-xs font-bold uppercase tracking-widest">
          Trending
        </span>
        <h2 className="text-3xl md:text-4xl font-serif mt-2">
          Curated Spaces
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
        {/* Main Large Item */}
        <motion.div
          variants={fadeInUp}
          className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden group min-h-[400px] md:min-h-0"
        >
          <img
            src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=1200"
            alt="Living Room"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-serif">The Modern Living Room</h3>
            <Link
              href="/shop?filter=contemporary"
              className="flex items-center gap-2 text-sm mt-2 hover:underline"
            >
              Shop the look <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Secondary Item 1 */}
        <motion.div
          variants={fadeInUp}
          className="relative rounded-xl overflow-hidden group min-h-[300px] md:min-h-0"
        >
          <img
            src="https://images.unsplash.com/photo-1596238638367-9c606540c436?auto=format&fit=crop&q=80&w=800"
            alt="Detail"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-lg font-serif">Texture Focus</h3>
          </div>
        </motion.div>

        {/* Secondary Item 2 */}
        <motion.div
          variants={fadeInUp}
          className="relative rounded-xl overflow-hidden group bg-gray-100 flex items-center justify-center p-8 min-h-[300px] md:min-h-0"
        >
          <div className="text-center">
            <h3 className="text-xl font-serif text-primary mb-2">
              Bespoke Design
            </h3>
            <p className="text-muted text-sm mb-4">
              Create something uniquely yours.
            </p>
            <Button href="/custom-rugs" variant="outline-primary" size="compact">
              Start Now
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

