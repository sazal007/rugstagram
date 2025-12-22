"use client";

import { motion } from "motion/react";
import { Truck } from "lucide-react";

export const ShippingHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-3xl mx-auto"
    >
      <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
        Shipping Information
      </span>
      <h1 className="text-4xl md:text-5xl font-serif mb-6">Shipping</h1>
      <p className="text-muted text-lg leading-relaxed">
        We deliver worldwide with reliable courier partners and ensure your
        orders arrive safely with high-quality packaging. Track your order
        every step of the way.
      </p>
      <div className="mt-8 p-4 bg-sand/10 inline-block rounded-lg">
        <div className="flex items-center justify-center gap-2 mb-2 text-primary font-medium">
          <Truck className="w-5 h-5" />
          <span>Fast and secure worldwide delivery</span>
        </div>
        <p className="text-sm text-muted">
          Orders dispatched within 48 hours after payment confirmation
        </p>
      </div>
    </motion.div>
  );
};

