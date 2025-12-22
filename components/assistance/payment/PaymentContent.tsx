"use client";

import { motion } from "motion/react";
import Image from "next/image";

interface PaymentMethod {
  name: string;
  image: string;
  description: string;
}

const nepalPayments: PaymentMethod[] = [
  {
    name: "IPS",
    image: "/images/payments/connect-ips.png",
    description: "IPS (Nepal only)",
  },
  {
    name: "e-Sewa",
    image: "/images/payments/esewa.png",
    description: "E-Sewa payment (Nepal only)",
  },
  {
    name: "Cash On Delivery",
    image: "/images/payments/cod.png",
    description: "Cash on delivery (Nepal and China only)",
  },
];

const internationalPayments: PaymentMethod[] = [
  {
    name: "Bank Transfer",
    image: "/images/payments/BankTransfer-1.jpg",
    description: "Bank Transfer (World wide)",
  },
  {
    name: "Western Union",
    image: "/images/payments/westernunion.png",
    description: "Western Union (World wide)",
  },
  {
    name: "Bank Wire Transfer (SWIFT)",
    image: "/images/payments/Swift-transfer.png",
    description: "Bank Transfer / SWIFT / Wire transfer",
  },
];

const futurePayments: PaymentMethod[] = [
  {
    name: "PayPal",
    image: "/images/payments/paypal.jpeg",
    description: "PayPal payments",
  },
  {
    name: "Visa",
    image: "/images/payments/visa.png",
    description: "Visa and Visa Debit",
  },
  {
    name: "MasterCard",
    image: "/images/payments/mastercard.avif",
    description: "MasterCard and Maestro",
  },
  {
    name: "American Express",
    image: "/images/payments/American-Express.webp",
    description: "American Express",
  },
];

export const PaymentContent: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Payments for Nepal Customers */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-serif mb-2 text-accent">
            Payments for customers residing in Nepal
          </h2>
          <div className="h-1 w-20 bg-accent/30 mb-6"></div>
        </div>
        <div className="bg-white border border-gray-100 rounded-lg p-8">
          <p className="text-muted mb-8 leading-relaxed">
            Currently, customers residing in Nepal shall be able to use cash on
            delivery, IPS and e-Sewa payment services in Nepal.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nepalPayments.map((payment, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-gray-50 rounded-lg p-6 text-center border border-gray-100"
              >
                <div className="relative w-full h-24 mb-4 flex items-center justify-center">
                  <Image
                    src={payment.image}
                    alt={payment.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-sm font-semibold mb-2 text-primary">
                  {payment.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Payments for International Customers */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-serif mb-2 text-accent">
            Payments for international customers
          </h2>
          <div className="h-1 w-20 bg-accent/30 mb-6"></div>
        </div>
        <div className="bg-white border border-gray-100 rounded-lg p-8">
          <p className="text-muted mb-8 leading-relaxed">
            For international customers, International payment shall be made via
            Credit cards, Bank transfer or Western union. Currently, we accept
            only offline payment via Bank transfer, western union.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {internationalPayments.map((payment, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-gray-50 rounded-lg p-6 text-center border border-gray-100"
              >
                <div className="relative w-full h-24 mb-4 flex items-center justify-center">
                  <Image
                    src={payment.image}
                    alt={payment.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-sm font-semibold mb-2 text-primary">
                  {payment.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Future Payment Methods */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-serif mb-2 text-accent">
            Future payment acceptance
          </h2>
          <div className="h-1 w-20 bg-accent/30 mb-6"></div>
        </div>
        <div className="bg-white border border-gray-100 rounded-lg p-8">
          <p className="text-muted mb-8 leading-relaxed">
            We shall accept MasterCard, Visa, American Express, Visa Debit and
            Maestro in the coming days. We shall be accepting Paypal payments
            and bank transfer.
          </p>
          <div className="bg-gray-800 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {futurePayments.map((payment, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full h-16 mb-3 flex items-center justify-center">
                    <Image
                      src={payment.image}
                      alt={payment.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <p className="text-xs text-muted font-medium">
                    {payment.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
