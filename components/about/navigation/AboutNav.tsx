"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const AboutNav: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { href: "/about/culture", label: "Company Culture" },
    { href: "/about/founder", label: "Meet the Founder" },
    { href: "/about/weaving", label: "Art of Weaving" },
  ];

  return (
    <div className="border-b border-gray-100 sticky top-14 md:top-28 bg-background/95 backdrop-blur z-40">
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
        <div className="flex justify-center min-w-max">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-8 py-6 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
