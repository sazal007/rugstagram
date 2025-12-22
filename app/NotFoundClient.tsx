"use client";

import { motion } from "motion/react";
import { CustomButton } from "@/components/ui/custom-button";
import { Home, ArrowLeft } from "lucide-react";

export function NotFoundClient() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center space-y-8"
      >
        {/* Large 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative"
        >
          <h1 className="text-8xl md:text-9xl font-serif font-light text-primary/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Home className="w-24 h-24 md:w-32 md:h-32 text-sand/30" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-primary">
            Coming Soon
          </h2>
          <p className="text-lg md:text-xl max-w-md mx-auto font-light leading-relaxed">
            We are working on this page and it will be available soon.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          <CustomButton href="/" variant="default" size="hero">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </CustomButton>
          <CustomButton href="/shop" variant="outline-primary" size="hero">
            Shop Collection
          </CustomButton>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="pt-12"
        >
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="w-8 h-px bg-border"></span>
            <span>Rugstagram</span>
            <span className="w-8 h-px bg-border"></span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

