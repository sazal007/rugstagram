"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState, FormEvent, useEffect } from "react";
import { useNewsletter } from "@/hooks/use-newsletter";
import SocialIcons from "./social-ions";

const Footer: React.FC = () => {
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
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        resetSuccess();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, resetSuccess]);

  return (
    <footer className="w-full bg-background dark:bg-[#020205] text-foreground dark:text-white pt-16 pb-8 px-6 md:px-12 lg:px-24 overflow-hidden font-sans border-t border-border dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Big Title Section - Made more compact (reduced margins) */}
        <div className="w-full flex justify-center mb-12 relative">
          {/* Subtle glow effect behind the text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-sand/5 dark:bg-sand/10 blur-[80px] rounded-full pointer-events-none transition-colors duration-300"></div>

          <h1 className="text-[13.5vw] leading-[0.8] font-serif font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-muted to-background dark:from-white dark:via-muted-foreground dark:to-[#020205] select-none text-center transition-all duration-300">
            RUGSTAGRAM
          </h1>
        </div>

        {/* Main Content Grid - Reduced gap and bottom margin */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Column 1: Info & Address */}
          <div className="lg:col-span-4 flex flex-col space-y-6 pr-0 lg:pr-12">
            {/* <Link
              href="/"
              className="relative h-16 sm:h-20 md:h-24 w-auto flex items-center"
            >
              <Image
                src="/logo/Rugstagram-logo.avif"
                alt="Rugstagram Logo"
                width={250}
                height={70}
                className="h-full w-auto object-contain dark:brightness-0 dark:invert transition-all duration-300"
                priority
              />
            </Link> */}
            <p className="text-muted dark:text-muted-foreground text-sm leading-relaxed max-w-sm transition-colors duration-300">
              Preserving the ancient art of Tibetan weaving through modern,
              ethical craftsmanship. Hand-knotted in Nepal, shipped globally.
            </p>

            <hr className="border-border dark:border-muted w-full transition-colors duration-300" />

            <div className="flex flex-col space-y-2">
              <h3 className="text-foreground dark:text-white font-semibold text-base transition-colors duration-300">
                Visit Us
              </h3>
              <address className="text-muted dark:text-muted-foreground text-sm not-italic leading-relaxed transition-colors duration-300">
                Hand-knotted in Nepal
                <br />
                Shipped globally
                <br />
                Worldwide delivery
              </address>
            </div>
          </div>

          {/* Column 2: Main Pages Links */}
          <div className="lg:col-span-4">
            <h3 className="text-foreground dark:text-white font-semibold text-xl mb-6 transition-colors duration-300">
              Main Pages
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex flex-col space-y-3">
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/shop">Shop</FooterLink>
                <FooterLink href="/bespoke">Bespoke</FooterLink>
                <FooterLink href="/collections/Contemporary">
                  Collections
                </FooterLink>
                <FooterLink href="/about">About Us</FooterLink>
              </div>
              <div className="flex flex-col space-y-3">
                <FooterLink href="/about/founder">Our Founder</FooterLink>
                <FooterLink href="/about/weaving">
                  The Art of Weaving
                </FooterLink>
                <FooterLink href="/assistance">Contact</FooterLink>
                <FooterLink href="/shop?filter=new">New Arrivals</FooterLink>
                <FooterLink href="/assistance">Assistance</FooterLink>
              </div>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div className="lg:col-span-4 pl-0 lg:pl-8">
            <h3 className="text-foreground dark:text-white font-semibold text-xl mb-4 transition-colors duration-300">
              Newsletter
            </h3>
            <p className="text-muted dark:text-muted-foreground text-sm mb-6 max-w-xs transition-colors duration-300">
              Join our list for exclusive releases and design stories.
            </p>

            <form
              className="flex flex-col space-y-3"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-surface dark:bg-white text-foreground dark:text-gray-900 rounded-full py-3 px-6 text-sm outline-none border border-border dark:border-transparent focus:ring-2 focus:ring-sand transition-all placeholder:text-muted"
                disabled={isSubmitting}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-fit bg-sand hover:bg-accent text-white rounded-full py-2 pr-2 pl-6 flex items-center space-x-3 transition-all duration-300 shadow-md shadow-sand/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-medium text-sm">
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </span>
                <div className="bg-white rounded-full p-2 group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight size={16} className="text-sand" />
                </div>
              </button>
              {isSuccess && (
                <p className="text-green-500 dark:text-green-400 text-xs mt-2 transition-colors duration-300">
                  ✓ Successfully subscribed!
                </p>
              )}
              {error && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-2 transition-colors duration-300">
                  ✗ {error}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border dark:border-muted pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 transition-colors duration-300">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} Rugstagram. All rights reserved.
          </p>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <Link
    href={href}
    className="text-muted dark:text-muted-foreground hover:text-foreground dark:hover:text-white transition-colors text-sm w-fit"
  >
    {children}
  </Link>
);

export default Footer;
