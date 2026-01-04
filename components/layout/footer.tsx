"use client";

import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";
import { useState, FormEvent } from "react";
import { useNewsletter } from "@/hooks/use-newsletter";

export function Footer() {
  const [email, setEmail] = useState("");
  const { subscribe, isSubmitting, isSuccess, error, resetSuccess } =
    useNewsletter();

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await subscribe(email);
      setEmail(""); // Clear input on success
    } catch (err) {
      // Error is handled by the hook
      console.error("Newsletter subscription failed:", err);
    }
  };

  // Auto-reset success message after 3 seconds
  if (isSuccess) {
    setTimeout(() => {
      resetSuccess();
    }, 3000);
  }

  return (
    <footer className="bg-[#1a1a1a] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Big Title Section */}
        <div className="w-full flex justify-center mb-12 relative">
          {/* Subtle glow effect behind the text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-blue-500/5 dark:bg-blue-900/10 blur-[80px] rounded-full pointer-events-none transition-colors duration-300"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            {/* <Link
              href="/"
              className="relative h-16 sm:h-20 md:h-24 w-auto flex items-center"
            >
              <Image
                src="/logo/Rugstagram-logo.avif"
                alt="Rugstagram Logo"
                width={250}
                height={70}
                className="h-full w-auto object-contain brightness-0 invert"
                priority
              />
            </Link> */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Preserving the ancient art of Tibetan weaving through modern,
              ethical craftsmanship. Hand-knotted in Nepal, shipped globally.
            </p>
            <div className="flex gap-4 text-gray-400">
              <Instagram className="w-5 h-5 hover:text-white cursor-pointer" />
              <Facebook className="w-5 h-5 hover:text-white cursor-pointer" />
              <Mail className="w-5 h-5 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-sand">
              Shop
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/shop?filter=new" className="hover:text-white">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  All Stock
                </Link>
              </li>
              <li>
                <Link href="/bespoke" className="hover:text-white">
                  Bespoke Services
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="hover:text-white"
                >
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-sand">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about/founder" className="hover:text-white">
                  Our Founder
                </Link>
              </li>
              <li>
                <Link href="/about/weaving" className="hover:text-white">
                  The Art of Weaving
                </Link>
              </li>
              <li>
                <Link href="/assistance" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-sand">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Join our list for exclusive releases and design stories.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="flex border-b border-gray-700 pb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-transparent w-full outline-none text-white text-sm placeholder-gray-600"
                  disabled={isSubmitting}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-xs uppercase font-bold text-sand hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "..." : "Subscribe"}
                </button>
              </div>
              {isSuccess && (
                <p className="text-green-400 text-xs mt-2">
                  ✓ Successfully subscribed!
                </p>
              )}
              {error && <p className="text-red-400 text-xs mt-2">✗ {error}</p>}
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between text-xs text-gray-600 gap-4">
        <p>©️ {new Date().getFullYear()} Rugstagram. All rights reserved.</p>
        <div className="flex gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Shipping Policy</span>
        </div>
      </div>
    </footer>
  );
}