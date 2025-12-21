"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NAV_ITEMS } from "@/constants";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { totalItems: cartItemCount } = useCart();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-accent text-white text-[8px] sm:text-[11px] py-2 text-center tracking-widest uppercase font-medium">
        Global Shipping Included • Bespoke Orders Open
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isHome
            ? "bg-background/90 backdrop-blur-md"
            : "bg-background border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 h-16 sm:h-20 flex items-center justify-between relative">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="relative h-10 sm:h-12 md:h-14 w-auto flex items-center"
          >
            <Image
              src="/logo/Rugstagram-logo.avif"
              alt="Rugstagram Logo"
              width={190}
              height={50}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-8">
                {NAV_ITEMS.map((item) => (
                  <NavigationMenuItem
                    key={item.label}
                    className="relative group h-20 flex items-center"
                  >
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger
                          className={`h-full bg-transparent! hover:bg-transparent! hover:text-accent! data-[state=open]:bg-transparent! data-[state=open]:text-accent! data-[state=open]:hover:bg-transparent! data-[state=open]:hover:text-accent! focus:bg-transparent! focus:text-accent! focus:hover:bg-transparent! focus:hover:text-accent! px-0 py-0 text-sm uppercase tracking-wide transition-colors duration-200 focus-visible:ring-0 items-center justify-center ${
                            isActive(item.href)
                              ? "text-accent"
                              : "text-foreground"
                          }`}
                        >
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="absolute! top-full! left-0! mt-0! z-50 w-56! p-0! bg-transparent! border-0! shadow-none! data-[motion^=from-]:animate-none! data-[motion^=to-]:animate-none!">
                          <div className="w-full bg-white shadow-xl border border-gray-50 rounded-b-xl overflow-hidden">
                            <div className="py-2">
                              {item.children.map((child) => (
                                <NavigationMenuLink
                                  key={child.label}
                                  asChild
                                  className="bg-transparent! hover:bg-transparent! hover:text-accent! focus:bg-transparent! focus:text-accent!"
                                >
                                  <Link
                                    href={child.href}
                                    className={`block px-6 py-3 text-sm transition-colors duration-200 focus-visible:ring-0 hover:text-accent hover:bg-gray-50 ${
                                      isActive(child.href)
                                        ? "text-accent"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        asChild
                        className="h-full flex items-center bg-transparent! hover:bg-transparent! hover:text-accent! focus:bg-transparent! focus:text-accent!"
                      >
                        <Link
                          href={item.href}
                          className={`h-full flex items-center justify-center text-sm uppercase tracking-wide hover:text-accent transition-colors duration-200 py-0 px-0 focus-visible:ring-0 ${
                            isActive(item.href)
                              ? "text-accent"
                              : "text-foreground"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <button
              className="p-2 hover:text-accent transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </button>
            <button
              className="p-2 hover:text-accent transition-colors duration-200"
              aria-label="Account"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </button>
            <Link
              href="/cart"
              className="p-2 hover:text-accent transition-colors duration-200 relative"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-accent text-white rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute inset-y-0 left-0 w-[80%] max-w-sm bg-white shadow-2xl p-4 sm:p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <span className="text-lg sm:text-xl font-serif">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <nav className="space-y-4 sm:space-y-6">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className={`block text-base sm:text-lg font-medium mb-2 hover:text-accent transition-colors duration-200 ${
                      isActive(item.href) ? "text-accent" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-3 sm:pl-4 space-y-2 sm:space-y-3 border-l-2 border-gray-100">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={`block text-sm transition-colors duration-200 hover:text-accent ${
                            isActive(child.href)
                              ? "text-accent"
                              : "text-gray-500"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
