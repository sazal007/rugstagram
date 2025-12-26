"use client";

import { motion, Variants } from "motion/react";
import Image from "next/image";

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

export const ProcessFeatures: React.FC = () => {
  return (
    <section id="bespoke" className="bg-background overflow-hidden pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Feature 01: The Journey */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-48"
        >
          <motion.div
            variants={fadeInUp}
            className="w-full md:w-1/2 space-y-12 order-2 md:order-1"
          >
            <div className="inline-block">
              <span className="text-[10px] uppercase tracking-[0.5em] text-sand font-black block mb-4">
                Phase One
              </span>
              <h3 className="text-4xl md:text-6xl font-serif italic text-foreground leading-tight">
                Consultation & <br />
                Personalization
              </h3>
            </div>

            <div className="space-y-8 text-muted font-light leading-relaxed text-lg border-l-2 border-sand/20 pl-8">
              <p>
                With the help of our team, we will work together to help you
                manufacture your choice of rug. Every detail is considered: from
                yarn composition to quality density.
              </p>
              <p>
                Collaborate in the privacy of your home via dedicated digital
                sessions or visit our production warehouse in the heart of
                Kathmandu, Nepal.
              </p>
              {/* <div className="pt-4">
                <a
                  href="#"
                  className="inline-flex items-center space-x-3 text-[11px] uppercase tracking-[0.3em] font-black text-foreground group"
                >
                  <span>View Process Detail</span>
                  <div className="w-8 h-px bg-sand transition-all group-hover:w-12" />
                </a>
              </div> */}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="w-full md:w-1/2 order-1 md:order-2"
          >
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -top-6 -right-6 w-full h-full border border-sand/20 rounded-2xl -z-10" />
              <div className="aspect-4/5 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1974&auto=format&fit=crop"
                  alt="Crafting Process"
                  width={1974}
                  height={2468}
                  className="w-full h-full object-cover transition-all duration-1000"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-surface p-6 shadow-sm rounded-xl hidden lg:block max-w-[200px] border border-black/5">
                <p className="text-[10px] uppercase tracking-widest text-muted font-bold mb-2">
                  Heritage
                </p>
                <p className="text-xs font-serif italic text-muted">
                  &ldquo;Each knot represents a moment in time, preserved in
                  wool.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature 02: Material Library */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative flex flex-col md:flex-row items-center gap-12 lg:gap-24"
        >
          <motion.div variants={fadeInUp} className="w-full md:w-1/2">
            <div className="relative group">
              <div className="absolute -bottom-6 -left-6 w-full h-full border border-black/5 rounded-2xl -z-10" />
              <div className="aspect-16/10 rounded-2xl overflow-hidden">
                <Image
                  src="/images/custom-selections.jpg"
                  alt="Yarn Palette"
                  width={2070}
                  height={1294}
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-1000"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="text-[10px] uppercase tracking-[1em] font-black">
                  Material Archive
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="w-full md:w-1/2 space-y-10"
          >
            <div className="inline-block">
              <span className="text-[10px] uppercase tracking-[0.5em] text-sand font-black block mb-4">
                Phase Two
              </span>
              <h3 className="text-4xl md:text-6xl font-serif italic text-foreground leading-tight">
                The Library of <br />
                Raw Materials
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-sand" />
                  <h4 className="text-[11px] uppercase tracking-widest font-black text-foreground">
                    Fibers
                  </h4>
                </div>
                <p className="text-sm text-muted font-light leading-relaxed pl-4">
                  Tibetan Wool, Chinese Silk, Hemp, Jute, and New Zealand pure
                  wool.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-sand" />
                  <h4 className="text-[11px] uppercase tracking-widest font-black text-foreground">
                    Chromatics
                  </h4>
                </div>
                <p className="text-sm text-muted font-light leading-relaxed pl-4">
                  Endless spectrum of shades using our proprietary color
                  reference system.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-sand" />
                  <h4 className="text-[11px] uppercase tracking-widest font-black text-foreground">
                    Geometry
                  </h4>
                </div>
                <p className="text-sm text-muted font-light leading-relaxed pl-4">
                  Square, Rectangular, Ovals, or unique free-form shapes.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-sand" />
                  <h4 className="text-[11px] uppercase tracking-widest font-black text-foreground">
                    Assurance
                  </h4>
                </div>
                <p className="text-sm text-muted font-light leading-relaxed pl-4">
                  Physical samples delivered to inspect color, design, and
                  materiality.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
