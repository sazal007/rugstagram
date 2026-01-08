"use client";

import { useState } from "react";
import { FAQItem } from "./FAQItem";

interface FAQItemData {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItemData[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    title: "Shipping & Delivery",
    items: [
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship worldwide. Shipping is included in the price for most major destinations. Duties and taxes are calculated at checkout.",
      },
      {
        question: "What is the shipping cost?",
        answer:
          "Shipping cost is calculated at checkout based on the destination and the size of the rug. Please refer to the shipping page for more information.",
      },
      {
        question: "What is the shipping time?",
        answer:
          "Shipping time is calculated at checkout based on the destination and the size of the rug. Please refer to the shipping page for more information.",
      },
    ],
  },
  {
    title: "Custom Orders",
    items: [
      {
        question: "What is the lead time for custom rugs?",
        answer:
          "Custom orders typically take 10-14 weeks, depending on the complexity of the design and the size of the rug. We will provide updates throughout the process.",
      },
      {
        question: "What is the lead time for custom rugs?",
        answer:
          "Custom orders typically take 10-14 weeks, depending on the complexity of the design and the size of the rug. We will provide updates throughout the process.",
      },
    ],
  },
  {
    title: "Care & Maintenance",
    items: [
      {
        question: "How do I clean my handmade rug?",
        answer:
          "Regular vacuuming without a beater bar is recommended. For deep cleaning, we suggest professional professional rug cleaning services only. Do not use harsh chemicals.",
      },
    ],
  },
  {
    title: "Samples & Orders",
    items: [
      {
        question: "Can I order samples?",
        answer:
          "Yes, we offer 1x1 ft samples for all our stock collections, and we create strike-off samples for all bespoke orders for your approval.",
      },
    ],
  },
];

export const FAQSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#fafaf8] border-t border-black/5">
      <div className="max-w-5xl mx-auto">
        {/* Header Area */}
        <div className="mb-10">
          <h2 className="text-5xl font-serif mb-12 text-center">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Navigation Tabs - Underlined Style */}
        <div className="flex space-x-8 mb-8 overflow-x-auto no-scrollbar border-b border-black/5">
          {FAQ_DATA.map((category, idx) => (
            <button
              key={category.title}
              onClick={() => {
                setActiveTab(idx);
                setOpenItem(null);
              }}
              className={`pb-4 text-[12px] uppercase tracking-[0.2em] font-bold transition-all duration-300 whitespace-nowrap border-b-2 cursor-pointer ${
                activeTab === idx
                  ? "text-[#c7a17a] border-[#c7a17a]"
                  : "text-[#1c1c1c]/30 border-transparent hover:text-[#1c1c1c]/60"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Accordion List - Compact & Clean */}
        <div className="divide-y divide-black/8 cursor-pointer">
          {FAQ_DATA[activeTab].items.map((item, idx) => {
            const isOpen = openItem === idx;
            return (
              <FAQItem
                key={idx}
                question={item.question}
                answer={item.answer}
                isOpen={isOpen}
                onToggle={() => toggleItem(idx)}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
