"use client";

import { motion, Variants } from "motion/react";
import Image from "next/image";
import { CustomButton } from "../ui/custom-button";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const steps = [
  {
    title: "1. Consultation",
    description: "Discuss your vision with our design director.",
  },
  {
    title: "2. Rendering",
    description: "Receive digital renderings and a strike-off sample.",
  },
  {
    title: "3. Production",
    description: "Our artisans begin the meticulous hand-knotting process.",
  },
];

export const FullyBespokeOption: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#1c1c1c] text-white p-8 md:p-12 rounded-xl"
    >
      <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden relative">
        <Image
          src="/images/about-banner.jpeg"
          alt="Designer Sketching"
          fill
          className="object-cover opacity-80"
        />
      </div>
      <div className="space-y-6">
        <span className="text-sand text-xs font-bold uppercase tracking-widest">
          Option 02
        </span>
        <h2 className="text-3xl md:text-4xl font-serif">Fully Bespoke</h2>
        <p className="text-gray-400 leading-relaxed">
          Commission a truly one-of-a-kind piece. Upload your artwork, sketch,
          or inspiration, and our design team will translate it into a technical
          graph for weaving.
        </p>
        <div className="space-y-4 pt-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/5 p-4 rounded border border-white/10"
            >
              <h4 className="font-bold text-sm mb-1">{step.title}</h4>
              <p className="text-xs text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
        <CustomButton
          variant="default"
          size="hero-sm"
          className="bg-white text-primary hover:bg-sand hover:text-white transition-colors mt-4"
        >
          Contact For Quote
        </CustomButton>
      </div>
    </motion.div>
  );
};
