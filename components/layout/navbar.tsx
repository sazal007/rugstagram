"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, User, ShoppingBag, Heart } from "lucide-react";
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
import { useColors } from "@/hooks/use-colors";
import { useCollections } from "@/hooks/use-collections";

interface NavDropdownContentProps {
  items: Array<{ label: string; href: string; image?: string }>;
  isActive: (href: string) => boolean;
}

function NavDropdownContent({ items, isActive }: NavDropdownContentProps) {
  const hasImages = items.some((item) => item.image);

  // Split items into rows: 6 items per row
  const itemsPerRow = 6;
  const topRowItems = items.slice(0, itemsPerRow);
  const bottomRowItems = items.slice(itemsPerRow, itemsPerRow * 2);

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
      <div className="w-full max-w-7xl mx-auto">
        {/* Top Row - 6 items */}
        <div className="flex justify-center gap-0.5 mb-2">
          {topRowItems.map((child) => (
            <NavigationMenuLink
              key={child.label}
              asChild
              className="bg-transparent! hover:bg-transparent! focus:bg-transparent! transition-all duration-300 shrink-0"
              style={{
                width: `calc((100% - ${
                  (itemsPerRow - 1) * 0.225
                }rem) / ${itemsPerRow})`,
                maxWidth: `calc((100% - ${
                  (itemsPerRow - 1) * 0.225
                }rem) / ${itemsPerRow})`,
              }}
            >
              <Link
                href={child.href}
                className="group block focus-visible:ring-0 w-full h-full"
              >
                <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-white border border-gray-200">
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
                  {/* Text overlay at bottom - lighter */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-3 py-2">
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

        {/* Bottom Row - 6 items (if more than 6 items exist) */}
        {bottomRowItems.length > 0 && (
          <div className="flex justify-center gap-0.5">
            {bottomRowItems.map((child) => (
              <NavigationMenuLink
                key={child.label}
                asChild
                className="bg-transparent! hover:bg-transparent! focus:bg-transparent! transition-all duration-300 shrink-0"
                style={{
                  width: `calc((100% - ${
                    (itemsPerRow - 1) * 0.125
                  }rem) / ${itemsPerRow})`,
                  maxWidth: `calc((100% - ${
                    (itemsPerRow - 1) * 0.125
                  }rem) / ${itemsPerRow})`,
                }}
              >
                <Link
                  href={child.href}
                  className="group block focus-visible:ring-0 w-full h-full"
                >
                  <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-white border border-gray-200">
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
                    {/* Text overlay at bottom - lighter */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-3 py-2">
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
  const { data: colors } = useColors();
  const { data: collections } = useCollections();

  const navItems = useMemo(() => {
    return NAV_ITEMS.map((item) => {
      // Handle Shop Colors
      if (item.label === "Shop" && colors) {
        const dynamicChildren = [
          // Keep the static "All Stock" item
          ...(item.children ? item.children.slice(0, 1) : []),
          // Add dynamic colors
          ...colors.map((color) => ({
            label: color.name,
            href: `/shop/?color=${color.slug}`,
            image: color.image,
          })),
        ];
        return { ...item, children: dynamicChildren };
      }

      // Handle Collections
      if (item.label === "Collections" && collections) {
        const dynamicChildren = collections.map((collection) => ({
          label: collection.name,
          href: `/collections/?collection=${collection.slug}`,
          image: collection.image,
        }));
        return { ...item, children: dynamicChildren };
      }

      return item;
    });
  }, [colors, collections]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "#" || href === "") return false;
    
    // Custom logic for Shop and colors
    if (href === "/shop" && pathname.startsWith("/colors")) return true;
    
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Announcement Bar */}

      {/* Header */}
      <header
        className={`sticky top-0 z-100 transition-all duration-300 ${
          isHome
            ? "bg-background/90 backdrop-blur-md"
            : "bg-background border-b border-gray-100"
        }`}
      >
        <div className="bg-accent text-white text-[8px] sm:text-[11px] py-2 text-center tracking-widest uppercase font-medium">
          Global Shipping Included • Bespoke Orders Open
        </div>
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
          <nav className="hidden lg:flex items-center gap-10">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-12">
                {navItems.map((item) => (
                  <NavigationMenuItem
                    key={item.label}
                    className="relative group h-20 flex items-center"
                  >
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger
                          className={`h-full cursor-pointer bg-transparent! hover:bg-transparent! hover:text-accent! data-[state=open]:bg-transparent! data-[state=open]:text-accent! data-[state=open]:hover:bg-transparent! data-[state=open]:hover:text-accent! focus:bg-transparent! focus:text-accent! focus:hover:bg-transparent! focus:hover:text-accent! px-0 py-0 text-sm uppercase tracking-wide transition-colors duration-200 focus-visible:ring-0 items-center justify-center ${
                            isActive(item.href)
                              ? "text-accent"
                              : "text-foreground"
                          }`}
                        >
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="fixed! cursor-pointer left-0! right-0! top-[110px]! mt-0! z-50 w-screen! p-0! bg-transparent! border-0! shadow-none! data-[motion^=from-]:animate-none! data-[motion^=to-]:animate-none! rounded-none!">
                          <NavDropdownContent
                            items={item.children || []}
                            isActive={isActive}
                          />
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        asChild
                        className="h-full cursor-pointer flex items-center bg-transparent! hover:bg-transparent! hover:text-accent! focus:bg-transparent! focus:text-accent!"
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
            <Link
              href={isAuthenticated ? "/profile" : "/login"}
              className="p-2 hover:text-accent transition-colors duration-200 relative"
              aria-label="Account"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
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
            <Link
              href="/wishlist"
              className="p-2 hover:text-accent transition-colors duration-200 relative"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
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
              {navItems.map((item) => (
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
