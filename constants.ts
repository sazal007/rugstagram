import { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    children: [
      {
        label: "All Stock",
        href: "/shop",
        image: "/colors/all.avif",
      },
      {
        label: "Originals",
        href: "/shop?color=originals",
        image: "/colors/originals.png",
      },
      {
        label: "Silver & Greiges",
        href: "/shop?color=silver-greiges",
        image: "/colors/silver&greiges.png",
      },
      {
        label: "Beiges",
        href: "/shop?color=beiges",
        image: "/colors/beiges.png",
      },
      {
        label: "Toupes",
        href: "/shop?color=toupes",
        image: "/colors/toupes.png",
      },
    ],
  },
  {
    label: "Collections",
    href: "#",
    children: [
      {
        label: "Modern Collection",
        href: "/collections/modern",
        image: "/collections/modern-collection.png",
      },
      {
        label: "Artwork Collection",
        href: "/collections/artwork",
        image: "/collections/artwork-collection.png",
      },
      {
        label: "Ombre Collection",
        href: "/collections/ombre",
        image: "/collections/ombre-collection.png",
      },
      {
        label: "Traditional Collection",
        href: "/collections/traditional",
        image: "/collections/traditional-collection.png",
      },
      {
        label: "Ombre Classic Collection",
        href: "/collections/ombre-classic",
        image: "/collections/ombre-classic-collection.png",
      },
      {
        label: "Transitional Collection",
        href: "/collections/transitional",
        image: "/collections/transitional-collection.png",
      },
    ],
  },
  {
    label: "Bespoke",
    href: "/bespoke",
    children: [
      {
        label: "Overview",
        href: "/bespoke",
        image: "/images/nav/bespoke-overview.jpg",
      },
      {
        label: "Customize Existing",
        href: "/bespoke/customize",
        image: "/images/nav/customize-existing.jpg",
      },
      {
        label: "Design Your Own",
        href: "/bespoke/design",
        image: "/images/nav/design-your-own.jpg",
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "Our Culture",
        href: "/about/culture",
        image: "/images/nav/our-culture.jpg",
      },
      {
        label: "Meet the Founder",
        href: "/about/founder",
        image: "/images/DAD-1.avif",
      },
      {
        label: "Art of Weaving",
        href: "/about/weaving",
        image: "/images/art-of-weaving.jpg",
      },
    ],
  },
  {
    label: "Assistance",
    href: "/assistance",
    children: [
      {
        label: "Contact Us",
        href: "/assistance",
        image: "/images/nav/contact.jpg",
      },
      {
        label: "Partnership",
        href: "/assistance/partnership",
        image: "/images/partnership.jpg",
      },
      {
        label: "Shipping",
        href: "/assistance/shipping",
        image: "/images/nav/shipping.jpg",
      },
      {
        label: "Payment",
        href: "/assistance/payment",
        image: "/images/nav/payment.jpg",
      },
    ],
  },
];
