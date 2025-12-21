"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "motion/react";
import { Button } from "@/components/ui/button";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export const BespokeCTA: React.FC = () => {
  return (
    <section className="relative py-32 bg-[#2a2a2a] text-white overflow-hidden">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.2 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1596238638367-9c606540c436?auto=format&fit=crop&q=80&w=2000"
          alt="Texture"
          fill
          className="object-cover grayscale"
          priority
        />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8"
      >
        <h2 className="text-4xl md:text-6xl font-serif">
          Your Vision, Our Craft
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Create a truly unique masterpiece. Customize existing designs or
          commission a completely new work of art tailored to your space.
        </p>
        <Button href="/custom-rugs" variant="sand" size="hero-lg">
          Start Custom Project
        </Button>
      </motion.div>
    </section>
  );
};
