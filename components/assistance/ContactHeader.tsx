"use client";

import { motion } from "motion/react";
import { Clock } from "lucide-react";

export const ContactHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-3xl mx-auto"
    >
      <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">
        Get In Touch
      </span>
      <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact Us</h1>
      <p className="text-muted text-lg leading-relaxed">
        Please choose any means to communicate with us, and we are glad to
        respond to your any inquiries as quick as possible. You can also visit
        the FAQ page below where you can find the most frequently asked
        questions.
      </p>
      <div className="mt-8 p-4 bg-sand/10 inline-block rounded-lg">
        <div className="flex items-center justify-center gap-2 mb-2 text-primary font-medium">
          <Clock className="w-5 h-5" />
          <span>Our advisors are glad to respond to your inquiries</span>
        </div>
        <p className="text-sm text-muted">
          TIMINGS: Sunday to Friday (10 A.M - 5 PM)
        </p>
      </div>
    </motion.div>
  );
};

