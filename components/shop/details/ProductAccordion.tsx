"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionSectionProps {
  title: string;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  isOpen,
  toggle,
  children,
}) => (
  <div className="border-b border-gray-100 last:border-0">
    <button
      onClick={toggle}
      className="w-full py-4 flex justify-between items-center text-left hover:text-accent transition-colors"
    >
      <span className="font-serif text-lg">{title}</span>
      {isOpen ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      )}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pb-6 text-sm text-muted leading-relaxed">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const ProductAccordion: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>("origin");

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="border-t border-gray-100">
      <AccordionSection
        title="Origin & Craftsmanship"
        isOpen={activeSection === "origin"}
        toggle={() => toggleSection("origin")}
      >
        All our products are of Nepal Origin, manufactured by skilled artisan
        in Kathmandu itself. Every rug is made from hand spun wool with
        traditional Tibetan double knotting weaving is used in our loom that will
        ensure the longevity of the rug.
      </AccordionSection>

      <AccordionSection
        title="Delivery"
        isOpen={activeSection === "delivery"}
        toggle={() => toggleSection("delivery")}
      >
        Deliveries to (Kathmandu, Bhaktapur and Lalitpur) Nepal addresses are
        free of charge and we endeavour to make them within 2 working days
        (Monday to Friday) for items in stock. We deliver to most national and
        international destinations worldwide for free. Deliveries to all
        international addresses will take longer, but we try to send all orders
        by the quickest route possible.
      </AccordionSection>

      <AccordionSection
        title="Returns"
        isOpen={activeSection === "returns"}
        toggle={() => toggleSection("returns")}
      >
        We want you to be delighted with your purchase, so if you are not
        completely happy, you may inform it to us within 1 days of receipt for
        a full refund or exchange - provided that the item is returned complete
        and in original condition. The Company will cover the cost of shipping
        returns within Nepal, other than items purchased from stock. Charges
        will be incurred for shipping outside of Nepal.
      </AccordionSection>
    </div>
  );
};

