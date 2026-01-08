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

export const CompanyCulture: React.FC = () => {
  return (
    <div id="culture" className="space-y-20 pb-20 scroll-mt-24">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center max-w-4xl mx-auto px-6 pt-12"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
          About Us
        </span>
        <h1 className="text-4xl md:text-6xl font-serif mb-8">
          Company Culture
        </h1>
        <p className="text-xl text-muted leading-relaxed">
          Rugstagram is an online portal of Rolpa Carpet Industries, a team of{" "}
          <span className="text-primary font-medium">
            1,000 dedicated workers
          </span>{" "}
          with the aim of manufacturing and exporting quality hand-knotted
          carpets, flat weave, and felt carpets.
        </p>
      </motion.section>

      {/* Stats / Values Grid */}
      <div className="bg-sand/10 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <span className="block text-4xl font-serif mb-2">30+</span>
            <span className="text-xs font-bold uppercase tracking-widest text-muted">
              Years of Heritage
            </span>
          </div>
          <div className="p-6 border-l border-r border-gray-200">
            <span className="block text-4xl font-serif mb-2">1,000</span>
            <span className="text-xs font-bold uppercase tracking-widest text-muted">
              Skilled Artisans
            </span>
          </div>
          <div className="p-6">
            <span className="block text-4xl font-serif mb-2">Global</span>
            <span className="text-xs font-bold uppercase tracking-widest text-muted">
              Export Network
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1715705717344-880404f93506?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VhdmVycyUyMHdvcmtpZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Weavers Working"
            className="w-full h-auto rounded-sm shadow-xl"
          />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6 text-muted leading-relaxed"
        >
          <h3 className="text-2xl font-serif text-primary">
            Uncompromising Quality
          </h3>
          <p>
            Everything we choose, from the raw material to weaving the carpets,
            ensures our buyers&apos; priority in meeting quality standards.
            Production procedures and various inspections are carried out during
            the process, from the quality of the wool to the final finishing of
            the carpets.
          </p>
          <p>
            Since its inception, we have been able to serve our customers by
            keeping Quality, Affordability, and On-Time Delivery as our top
            priority. Several years after manufacturing carpets, it has been our
            constant endeavor and passion to weave the best hand-knotted rugs in
            the world.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="order-2 lg:order-1 space-y-6 text-muted leading-relaxed"
        >
          <h3 className="text-2xl font-serif text-primary">
            Global Reach, Local Roots
          </h3>
          <p>
            We take pride in the joy of manufacturing Nepalese hand-knotted rugs
            for the past 28 years. We make sure that our creations are
            recognized for their excellent craftsmanship & traditional weaving.
            Strict quality control is maintained from the choice of wool to the
            final touches of a carpet.
          </p>
          <p>
            We have been actively participating in various carpet export
            associations like NCEA (Nepal Carpet Export Association) and CCIA to
            help promote Nepalese Carpets globally and maintain quality
            standards.
          </p>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <img
            src="https://images.unsplash.com/photo-1716688046364-3288a11c80ba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29vbHN8ZW58MHx8MHx8fDA%3D"
            alt="Raw Materials"
            className="w-full h-auto rounded-sm shadow-xl"
          />
        </motion.div>
      </div>

      <div className="text-center max-w-3xl mx-auto px-6 pt-8">
        <h3 className="text-2xl font-serif mb-4">Innovation & Collaboration</h3>
        <p className="text-muted">
          Our offering includes hand-knotted rugs of superior quality, Flat
          weave (Nepali Kilim), and Felt carpets. We collaborate with designers
          to create carpets that comfort the end-user and allure interior
          spaces. Every year we display our new creations in international trade
          shows.
        </p>
      </div>
    </div>
  );
};
