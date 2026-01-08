"use client";

import { motion, Variants } from "motion/react";
import { Phone, Mail, MessageCircle, MapPin, Instagram, Facebook } from "lucide-react";
import { ContactCard } from "./ContactCard";

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const ContactGrid: React.FC = () => {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {/* Call Us */}
      <ContactCard icon={Phone} title="Call Us">
        <div className="space-y-2">
          <a
            href="tel:+977014820053"
            className="block text-muted hover:text-primary transition-colors"
          >
            +977-01-4820053
          </a>
          <a
            href="tel:+9779843199444"
            className="block text-muted hover:text-primary transition-colors"
          >
            +977-9843199444
          </a>
        </div>
      </ContactCard>

      {/* Email Us */}
      <ContactCard icon={Mail} title="Email Us">
        <p className="text-muted mb-4 text-sm">
          We will get to your mail within 24 hours.
        </p>
        <a
          href="mailto:hello@rugstagram.com"
          className="text-sm font-bold uppercase tracking-widest border-b border-gray-200 pb-1 hover:border-accent hover:text-accent transition-colors"
        >
          Send an Email
        </a>
      </ContactCard>

      {/* Connect Online */}
      <ContactCard icon={MessageCircle} title="Connect Online">
        <p className="text-muted mb-6 text-sm">
          Stay connected by chat on social media.
        </p>
        <div className="flex justify-center gap-4 text-gray-400">
          <a
            href="https://www.instagram.com/rugstagramm/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/rugstagramm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <span
            className="hover:text-accent transition-colors cursor-pointer"
            title="WeChat"
          >
            <MessageCircle className="w-5 h-5" />
          </span>
        </div>
      </ContactCard>

      {/* Visit Factory */}
      <ContactCard icon={MapPin} title="Visit Factory">
        <p className="text-muted text-sm leading-relaxed">
          Upon your request, we would make arrangements to show our company
          production facility, warehouse, and showroom.
        </p>
      </ContactCard>
    </motion.div>
  );
};

