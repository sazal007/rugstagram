"use client";

import { motion, Variants } from "motion/react";
import { sanitizeHtmlContent } from "@/utils/htmlSanitizer";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const SHIPPING_SECTIONS = [
  {
    title: "What are the shipping charges?",
    content: `
      <p>We offer free shipping on every item purchased through our website.</p>
    `,
  },
  {
    title: "When will my order arrive?",
    content: `
      <p>We aim to dispatch all orders within 48 business hours. The estimated delivery time may vary product to product and can be delivered the next day or maximum in 10 business days from the time of placing the order. The estimated delivery can be checked on the product detail page.</p>
      <p>Due to high volume of orders during the sale, there might be a delay of 5-7 days in delivery.</p>
    `,
  },
  {
    title: "How do I check the estimated delivery date for any product?",
    content: `
      <p>Enter your delivery pin code on the product detail page to know the estimated delivery days for it.</p>
    `,
  },
  {
    title: "How will I know whether my order is confirmed?",
    content: `
      <p>Once the order is successfully placed, you will receive the following notifications via email:-</p>
      <ul class="list-disc pl-5 space-y-2 mt-2">
        <li>Email order confirmation</li>
        <li>Text message order confirmation</li>
      </ul>
    `,
  },
  {
    title: "How can I cancel my order?",
    content: `
      <p>You can cancel your order by calling us or email us at - shop@rugkala.com. Order cancellation will only be accepted before the shipment has been dispatched.</p>
      <p>Once the order is cancelled, the refund shall be initiated and it should reflect in your account within 48 business hours through the original mode of payment.</p>
    `,
  },
  {
    title: "Is there any hidden cost?",
    content: `
      <p>There are extra duties and local taxes applicable, depending on the custom laws of respective countries. You have to pay it to our shipping partner at the time of delivery. For more information, kindly get in touch with us at shop@rugkala.com.</p>
    `,
  },
];

const Section: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => (
  <div className="mb-10">
    <h3 className="text-3xl md:text-3xl font-bold font-serif mb-4 text-primary">{title}</h3>
    <div
      className="text-gray-600 text-lg font-serif leading-relaxed space-y-4"
      dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(content) }}
    />
  </div>
);

export const ShippingPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="space-y-12"
      >
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent block">
            Customer Service
          </span>
          <h1 className="text-4xl md:text-5xl font-serif leading-tight">
            Shipping Policy
          </h1>
          <p className="text-gray-500 font-serif italic">
            Free shipping worldwide on all orders
          </p>
        </div>

        {SHIPPING_SECTIONS.map((section, index) => (
          <Section key={index} title={section.title} content={section.content} />
        ))}
      </motion.div>
    </div>
  );
};
