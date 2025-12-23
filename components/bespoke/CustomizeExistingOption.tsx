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

export const CustomizeExistingOption: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white border border-gray-100 p-8 md:p-12 rounded-xl"
    >
      <div className="order-2 lg:order-1 space-y-6">
        <span className="text-accent text-xs font-bold uppercase tracking-widest">
          Option 01
        </span>
        <h2 className="text-3xl md:text-4xl font-serif">
          Customize Existing Design
        </h2>
        <p className="text-muted leading-relaxed">
          Love a design from our collection but need it in a different color
          palette or size? We can adapt any of our stock designs to perfectly
          match your interior scheme.
        </p>
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-center gap-2">
            ✓ Select any pattern from our library
          </li>
          <li className="flex items-center gap-2">
            ✓ Adjust colors to match your swatches
          </li>
          <li className="flex items-center gap-2">✓ Lead time: 10-14 weeks</li>
        </ul>
        <CustomButton variant="hero-primary" size="hero" className="mt-4">
          Start Customization
        </CustomButton>
      </div>
      <div className="order-1 lg:order-2 aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
        <Image
          src="/images/DAD-1.avif"
          alt="Rug Sample"
          fill
          className="object-cover"
        />
      </div>
    </motion.div>
  );
};
