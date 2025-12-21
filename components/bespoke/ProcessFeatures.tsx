"use client";

import { motion, Variants } from "motion/react";
import { Palette, Ruler, Box } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const features = [
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Choose Your Colors",
    text: "Select from our pom box containing over 1,200 wool and silk color samples.",
  },
  {
    icon: <Ruler className="w-8 h-8" />,
    title: "Custom Sizing",
    text: "Whether a runner for a hallway or a palace-sized rug, we weave to exact dimensions.",
  },
  {
    icon: <Box className="w-8 h-8" />,
    title: "Material Selection",
    text: "Blend Himalayan wool with pure Chinese silk, linen, hemp, or allo for unique textures.",
  },
];

export const ProcessFeatures: React.FC = () => {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {features.map((feature, i) => (
        <motion.div
          key={i}
          variants={fadeInUp}
          className="bg-white p-8 border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full mb-6 text-accent">
            {feature.icon}
          </div>
          <h3 className="text-xl font-serif mb-4">{feature.title}</h3>
          <p className="text-sm text-muted leading-relaxed">{feature.text}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

