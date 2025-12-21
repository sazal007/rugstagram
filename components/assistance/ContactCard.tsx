"use client";

import { motion, Variants } from "motion/react";
import { LucideIcon } from "lucide-react";

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  title,
  children,
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white p-8 border border-gray-100 rounded-lg text-center hover:shadow-lg transition-shadow"
    >
      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-serif font-bold mb-4">{title}</h3>
      {children}
    </motion.div>
  );
};

