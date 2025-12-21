"use client";

import { motion, Variants } from "motion/react";
import { Twitter, Linkedin, Mail } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const MeetFounder: React.FC = () => {
  return (
    <div id="founder" className="pb-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Founder Image */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-4/5 bg-gray-200 rounded-sm overflow-hidden relative shadow-2xl">
              {/* Using a placeholder that looks like a business portrait */}
              <img
                src="/images/DAD-1.avif"
                alt="Shambhu Bikram Thapa"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 text-white">
                <h2 className="text-2xl font-serif">Shambhu Bikram Thapa</h2>
                <span className="text-xs uppercase tracking-widest opacity-80">
                  Managing Director
                </span>
              </div>
            </div>

            <div className="flex gap-4 mt-6 justify-center lg:justify-start">
              <a
                href="#"
                className="p-3 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Letter */}
          <div className="lg:col-span-7 space-y-8 lg:pt-8">
            <span className="text-xs font-bold uppercase tracking-widest text-accent block">
              A Message from the Founder
            </span>
            <h1 className="text-4xl md:text-5xl font-serif leading-tight">
              Preserving a Legacy
            </h1>

            <div className="space-y-6 text-lg text-gray-600 font-light leading-relaxed font-serif">
              <p>&quot;Namaste and Welcome to Rugstagram.&quot;</p>
              <p>
                Rugstagram is an online initiative of Rolpa Carpet Industry. It
                was 1989 when Rolpa Carpet Industry started in Bouddha,
                Kathmandu, Nepal as a small cottage industry with the vision of
                manufacturing and exporting an extensive range of hand-knotted
                carpets worldwide.
              </p>
              <p>
                After years and years of specialization and experience in
                manufacturing hand-knotted rugs, we make sure that each and
                every piece of rug we produce is exquisite and hand-woven
                precisely to the desired choice, size, color, and practical
                requirements of our buyers.
              </p>
              <p>
                Rolpa Carpet Industry has come a long way from its beginnings.
                It was all about persistent effort, dedication, consistency, and
                teamwork that has helped us evolve into a better manufacturing
                company.
              </p>
              <p>
                At Rugstagram, We take joy in manufacturing hand-knotted carpets
                and delivering the choice of your rug at your doorstep with an
                aim of creating a Direct Factory Outlet, making our Rugs
                affordable to our buyers.
              </p>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg"
                alt="Signature"
                className="h-12 opacity-60"
              />
              <p className="text-sm font-bold mt-2">Shambhu Bikram Thapa</p>
              <p className="text-xs text-muted uppercase tracking-widest">
                Managing Director
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
