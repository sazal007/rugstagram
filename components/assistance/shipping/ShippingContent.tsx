"use client";

import { motion } from "motion/react";
import { Package, Phone } from "lucide-react";

const shippingInfo = [
  {
    title: "Delivery Options",
    content: "Rolpa carpet offers international delivery using Air courier, Air cargo, and Ocean Freight.",
  },
  {
    title: "Working Days",
    content: "Days are assumed as Working Days.",
  },
  {
    title: "Team and Packaging",
    content:
      "An experienced team is dedicated to delivering orders within the assured time with high-quality packaging, utilizing reputed courier agencies and freight forwarders.",
  },
  {
    title: "Courier Partners",
    content: "The delivering couriers include Aramex, DHL, and UPS.",
  },
  {
    title: "Dispatch and Delivery Time",
    content:
      "After payment is received, the target is to dispatch all orders within 48 hours. The estimated time of delivery varies based on the chosen shipping method (Air courier, Air cargo, and Ocean Freight) for worldwide dispatch.",
  },
  {
    title: "Delivery Schedule",
    content:
      "Delivery occurs throughout the week. Working days are defined as Sunday to Friday from 10 A.M to 5 P.M (Nepali Time), excluding public holidays in Nepal. Orders placed on Saturday will be processed on the next working day.",
  },
  {
    title: "Order Tracking and Confirmation",
    content:
      "Once an order is shipped, customers will receive an email and a text message confirming the estimated delivery date by the shipping company. Order status can also be checked on 'My account' from rugstagram.com. The tracking number will be emailed to the registered email address and can also be viewed from the website.",
  },
  {
    title: "Exceptions (Custom Orders)",
    content:
      "Custom Orders (Made to order, Special Order) are not eligible for a refund unless there is a defect in the manufacturing process, Design, Size, or Material. A design confirmation will be sent before any custom orders are made.",
  },
];

export const ShippingContent: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Shipping Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-serif mb-2 text-accent">Shipping</h2>
          <div className="h-1 w-20 bg-accent/30 mb-6"></div>
        </div>
        <div className="bg-white border border-gray-100 rounded-lg p-8 space-y-6">
          {shippingInfo.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="border-l-4 border-accent/30 pl-6"
            >
              <h3 className="text-lg font-serif font-semibold mb-2 text-primary">
                {item.title}
              </h3>
              <p className="text-muted leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Labeling and Packaging Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-serif mb-2 text-accent">
            Labeling and Packaging
          </h2>
          <div className="h-1 w-20 bg-accent/30 mb-6"></div>
        </div>
        <div className="bg-white border border-gray-100 rounded-lg p-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-start gap-4"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 text-accent">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-semibold mb-3 text-primary">
                Product Wrapping and Labeling
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                All products are sent with proper wrapping and labeling. The
                outside label includes Bale No, Place of Delivery, and Place of
                Manufacturing.
              </p>
              <h3 className="text-lg font-serif font-semibold mb-3 text-primary">
                Carpet Details
              </h3>
              <p className="text-muted leading-relaxed">
                The product design, Size, Color, and Raw Material are mentioned
                on the back of the carpet.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Information */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-sand/10 border border-accent/20 rounded-lg p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 text-accent">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-semibold mb-3 text-primary">
                Client Service (Buyer Assistance)
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                For more precise information on delivery delays or to reschedule
                delivery, customers are advised to contact Client Service (Buyer
                Assistance) on:
              </p>
              <div className="space-y-2">
                <a
                  href="tel:+977014820053"
                  className="block text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  +977 01 4820053
                </a>
                <a
                  href="tel:+9779843199444"
                  className="block text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  +977 9843199444
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

