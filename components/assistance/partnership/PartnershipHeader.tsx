"use client";

import { motion } from "motion/react";
import { Handshake } from "lucide-react";

export const PartnershipHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-3xl mx-auto"
    >
      <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
        Partnership Opportunities
      </span>
      <h1 className="text-4xl md:text-5xl font-serif mb-6">Partner With Us</h1>
      <p className="text-muted text-lg leading-relaxed">
        We&apos;re always looking for passionate partners to join us in bringing
        exceptional handcrafted rugs to customers worldwide. Fill out the form
        below to explore partnership opportunities with Rugstagram.
      </p>
      <div className="mt-8 p-4 bg-sand/10 inline-block rounded-lg">
        <div className="flex items-center justify-center gap-2 mb-2 text-primary font-medium">
          <Handshake className="w-5 h-5" />
          <span>Let&apos;s build something beautiful together</span>
        </div>
        <p className="text-sm text-muted">
          We&apos;ll review your submission and get back to you within 2-3
          business days
        </p>
      </div>
    </motion.div>
  );
};
