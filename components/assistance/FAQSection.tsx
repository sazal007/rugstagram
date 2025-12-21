"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FAQItem } from "./FAQItem";

const FAQS = [
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide. Shipping is included in the price for most major destinations. Duties and taxes are calculated at checkout.",
  },
  {
    q: "What is the lead time for custom rugs?",
    a: "Custom orders typically take 10-14 weeks, depending on the complexity of the design and the size of the rug. We will provide updates throughout the process.",
  },
  {
    q: "How do I clean my handmade rug?",
    a: "Regular vacuuming without a beater bar is recommended. For deep cleaning, we suggest professional professional rug cleaning services only. Do not use harsh chemicals.",
  },
  {
    q: "Can I order samples?",
    a: "Yes, we offer 1x1 ft samples for all our stock collections, and we create strike-off samples for all bespoke orders for your approval.",
  },
];

export const FAQSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="max-w-4xl mx-auto pt-12 border-t border-gray-100"
    >
      <h2 className="text-3xl font-serif mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <FAQItem
            key={idx}
            question={faq.q}
            answer={faq.a}
            isOpen={openFaq === idx}
            onToggle={() => setOpenFaq(openFaq === idx ? null : idx)}
          />
        ))}
      </div>
    </motion.section>
  );
};

