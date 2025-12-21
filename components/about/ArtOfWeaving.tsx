"use client";

import { motion, Variants } from "motion/react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

interface WeavingStep {
  title: string;
  desc: string;
  img: string;
}

const steps: WeavingStep[] = [
  {
    title: "Wool Sorting & Washing",
    desc: "We import finest Wool from New Zealand and Tibet in a raw, natural state (4-6 inches mean fiber length). Wool is thoroughly washed to remove fat and wax, then sun-dried.",
    img: "/images/weaving/wool-sorting.avif",
  },
  {
    title: "Carding",
    desc: "Previously done by hand, now machine carding is used due to high demand, separating fibers as per various thickness requirements.",
    img: "/images/weaving/carding.avif",
  },
  {
    title: "Spinning",
    desc: "The carded wool is hand-spun into yarn by using a traditional spinning tool referred to as 'Chakra'. This creates the unique texture of handmade rugs.",
    img: "/images/weaving/spinning.avif",
  },
  {
    title: "Pot Dyeing",
    desc: "Small-batch machine dyeing allows for consistent color from various shades. The dyed yarn is sun-dried for 1-3 days.",
    img: "/images/weaving/dyeing.avif",
  },
  {
    title: "Graph Creation",
    desc: "In-house designers translate artistic visions into a pixel-perfect traceable graph for weavers to follow knot-by-knot.",
    img: "/images/weaving/graph.avif",
  },
  {
    title: "Hand Knotting",
    desc: "A double knotting system ensures firmness. Weavers work in teams, tying individual knots row by row (60 to 100 knots per inch).",
    img: "/images/weaving/weaving.avif",
  },
  {
    title: "Trimming",
    desc: "Initial inspection and pre-trimming are done evenly to make the pattern and design visible immediately after leaving the loom.",
    img: "/images/weaving/trimming.avif",
  },
  {
    title: "Washing",
    desc: "Carpets are washed in filtered water using eco-friendly detergents and rinsed back and forth to bring out the sheen.",
    img: "/images/weaving/wash-drying.avif",
  },
  {
    title: "Stretching",
    desc: "Stretching is done on metal frames to ensure exact dimensions. Eco-friendly latex is applied to the back for stability.",
    img: "/images/weaving/stretching.avif",
  },
  {
    title: "Finishing",
    desc: "Final re-trimming (shearing) to make the pile height even, followed by careful polishing and removal of loose threads.",
    img: "/images/weaving/Trimming-and-Finishing.avif",
  },
  {
    title: "Packing & Shipping",
    desc: "Environment-friendly packing materials are used before the rug is shipped directly to the buyer's destination.",
    img: "/images/weaving/pakaging.avif",
  },
];

export const ArtOfWeaving: React.FC = () => {
  return (
    <div id="weaving" className="pb-24 scroll-mt-24">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center max-w-4xl mx-auto px-6 pt-12 mb-20"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
          The Process
        </span>
        <h1 className="text-4xl md:text-6xl font-serif mb-6">
          The Art of Weaving
        </h1>
        <p className="text-xl text-muted leading-relaxed">
          Beauty lies in the weave. Every handcrafted rug represents the
          teamwork and dedication of many skilled workers. It is a slow process,
          but there is no better way to make rugs that last for generations.
        </p>
      </motion.section>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            className="group cursor-default"
          >
            <div className="aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden mb-6 relative">
              <img
                src={step.img}
                alt={step.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-widest">
                Step {idx + 1}
              </div>
            </div>
            <h3 className="text-xl font-serif mb-3 group-hover:text-accent transition-colors">
              {step.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
