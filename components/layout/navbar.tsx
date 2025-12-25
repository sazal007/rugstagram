"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  User,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import { useAuth } from "@/context/AuthContext";
import { CustomButton } from "@/components/ui/custom-button";

interface NavDropdownContentProps {
  items: Array<{ label: string; href: string; image?: string }>;
  isActive: (href: string) => boolean;
}

function NavDropdownContent({ items, isActive }: NavDropdownContentProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasImages = items.some((item) => item.image);

  // Calculate how many items to show and their width
  const itemCount = items.length;
  const maxVisibleItems = 5;
  const showCarousel = itemCount > maxVisibleItems;

  // Calculate the number of visible items
  const visibleItemCount = showCarousel ? maxVisibleItems : itemCount;

  // Get items to display (for carousel, show 5 at a time)
  const getDisplayItems = () => {
    if (!showCarousel) {
      return items;
    }
    // Show 5 items starting from currentIndex, wrapping around if needed
    const displayItems = [];
    for (let i = 0; i < maxVisibleItems; i++) {
      const index = (currentIndex + i) % itemCount;
      displayItems.push(items[index]);
    }
    return displayItems;
  };

  const displayItems = getDisplayItems();

  const scroll = (direction: "left" | "right") => {
    if (!showCarousel) return;

    if (direction === "left") {
      setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
    } else {
      setCurrentIndex((prev) => (prev + 1) % itemCount);
    }
  };

  if (!hasImages) {
    // Fallback to text-only layout if no images
    return (
      <div className="w-full bg-white shadow-xl border border-gray-50 rounded-b-sm overflow-hidden">
        <div className="image.png">
          {items.map((child) => (
            <NavigationMenuLink
              key={child.label}
              asChild
              className="bg-transparent! hover:bg-transparent! hover:text-accent! focus:bg-transparent! focus:text-accent!"
            >
              <Link
                href={child.href}
                className={`block px-6 py-3 text-sm transition-colors duration-200 focus-visible:ring-0 hover:text-accent hover:bg-gray-50 ${
                  isActive(child.href) ? "text-accent" : "text-gray-600"
                }`}
              >
                {child.label}
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen bg-gray-100 shadow-xl border-t border-gray-200 overflow-hidden">
      <div className="relative w-full py-6 px-6">
        {/* Container with calculated widths - items fill full width with no gaps */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-hidden transition-all duration-300"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayItems.map((child, index) => (
            <NavigationMenuLink
              key={`${child.label}-${currentIndex}-${index}`}
              asChild
              className="bg-transparent! hover:bg-transparent! focus:bg-transparent! shrink-0 transition-all duration-300"
              style={{
                flex: `0 0 ${100 / visibleItemCount}%`,
                maxWidth: `${100 / visibleItemCount}%`,
              }}
            >
              <Link
                href={child.href}
                className="group block focus-visible:ring-0 w-full h-full"
              >
                <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-sm bg-white">
                  {child.image ? (
                    <Image
                      src={child.image}
                      alt={child.label}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 192px, 224px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  )}
                  {/* Text overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2">
                    <span
                      className={`text-white text-sm font-medium transition-colors duration-200 ${
                        isActive(child.href) ? "text-accent" : ""
                      }`}
                    >
                      {child.label}
                    </span>
                  </div>
                </div>
              </Link>
            </NavigationMenuLink>
          ))}
        </div>

        {/* Navigation arrows - only show for carousel */}
        {showCarousel && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent hover:bg-accent/90 text-white flex items-center justify-center shadow-lg transition-all duration-200 z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent hover:bg-accent/90 text-white flex items-center justify-center shadow-lg transition-all duration-200 z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { totalItems: cartItemCount } = useCart();
  const { isAuthenticated } = useAuth();

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
          <CustomButton
            variant="ghost"
            size="icon"
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </CustomButton>

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
                        <NavigationMenuContent className="fixed! left-0! right-0! top-[80px]! mt-0! z-50 w-screen! p-0! bg-transparent! border-0! shadow-none! data-[motion^=from-]:animate-none! data-[motion^=to-]:animate-none! rounded-none!">
                          <NavDropdownContent
                            items={item.children || []}
                            isActive={isActive}
                          />
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
            <CustomButton
              variant="ghost"
              size="icon"
              className="p-2 hover:text-accent transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </CustomButton>
            <Link href={isAuthenticated ? "/profile" : "/login"}>
              <CustomButton
                variant="ghost"
                size="icon"
                className="p-2 hover:text-accent transition-colors duration-200"
                aria-label="Account"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              </CustomButton>
            </Link>
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
              <CustomButton
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </CustomButton>
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
