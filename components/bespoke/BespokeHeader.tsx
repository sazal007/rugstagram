"use client";

import { motion, Variants } from "motion/react";
import { CustomButton } from "@/components/ui/custom-button";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
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
      staggerChildren: 0.15,
    },
  },
};

export const BespokeHeader: React.FC = () => {
  return (
    <div className="bg-background overflow-hidden pt-26">
      <div className="max-w-7xl mx-auto">
        {/* Floating Intro Chapter */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mb-24"
        >
          <motion.div
            variants={fadeInUp}
            className="absolute -top-12 left-1/2 -translate-x-1/2 text-center z-10"
          >
            <span className="bg-background px-6 py-2 text-[10px] uppercase tracking-[0.6em] text-sand font-black">
              Exclusivity
            </span>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="border border-black/8 p-12 md:p-24 rounded-[40px] text-center space-y-10 relative"
          >
            <h2 className="text-5xl md:text-8xl font-serif italic text-foreground leading-none tracking-tighter">
              Custom Rugs,
              <br />
              <span className="text-sand/80">Made to Order</span>
            </h2>
            <div className="max-w-2xl mx-auto space-y-6 text-muted font-light text-xl leading-relaxed">
              <p>
                Rugstagram welcomes you to discover the world of Bespoke, an
                exclusive service dedicated to creating your personalized Rugs.
              </p>
              <p className="text-base italic">
                Exceptional hand-knotted craftsmanship and exclusive fabrics are
                the two fundamental pillars upon which every Rugstagram Bespoke
                item is made.
              </p>
            </div>

            <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <CustomButton
                variant="sand"
                size="hero-lg"
                className="px-12 py-5 rounded-full hover:shadow-2xl hover:-translate-y-1 transition-all"
                href="/assistance"
              >
                Customize Existing
              </CustomButton>
              <CustomButton
                variant="outline"
                size="hero-lg"
                className="px-12 py-5 rounded-full border-black/10 hover:bg-black hover:text-white hover:border-black transition-all"
                href="/assistance"
              >
                Design Your Own
              </CustomButton>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
