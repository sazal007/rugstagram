"use client";

import { motion } from "motion/react";
import { CreditCard } from "lucide-react";

export const PaymentHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-3xl mx-auto"
    >
      <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
        Payment Methods
      </span>
      <h1 className="text-4xl md:text-5xl font-serif mb-6">Payments</h1>
      <p className="text-muted text-lg leading-relaxed">
        We offer multiple secure payment options tailored to your location.
        Choose from local payment methods in Nepal or international payment
        options for customers worldwide.
      </p>
      <div className="mt-8 p-4 bg-sand/10 inline-block rounded-lg">
        <div className="flex items-center justify-center gap-2 mb-2 text-primary font-medium">
          <CreditCard className="w-5 h-5" />
          <span>Secure and convenient payment options</span>
        </div>
        <p className="text-sm text-muted">
          All transactions are processed securely and safely
        </p>
      </div>
    </motion.div>
  );
};

