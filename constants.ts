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
        image: "/collections/modern-collection.jpeg",
      },
      {
        label: "Artwork Collection",
        href: "/collections/artwork",
        image: "/collections/artwork-collection.jpeg",
      },
      {
        label: "Ombre Collection",
        href: "/collections/ombre",
        image: "/collections/ombre-collection.jpeg",
      },
      {
        label: "Traditional Collection",
        href: "/collections/traditional",
        image: "/collections/traditional-collection.jpeg",
      },
      {
        label: "Ombre Classic Collection",
        href: "/collections/ombre-classic",
        image: "/collections/ombre-classic-collection.jpeg",
      },
      {
        label: "Transitional Collection",
        href: "/collections/transitional",
        image: "/collections/transitional-collection.jpeg",
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
        image: "/images/nav-images/overview.jpeg",
      },
      {
        label: "Design Your Own",
        href: "/bespoke/design",
        image: "/images/nav-images/design-your-own.jpeg",
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
        image: "/images/nav-images/culture.jpg",
      },
      {
        label: "Meet the Founder",
        href: "/about/founder",
        image: "/images/DAD-1.avif",
      },
      {
        label: "Art of Weaving",
        href: "/about/weaving",
        image: "/images/nav-images/art-of-weaving.jpg",
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
        image: "/images/nav-images/contact-us.jpeg",
      },
      {
        label: "Partnership",
        href: "/assistance/partnership",
        image: "/images/nav-images/partnership.jpeg",
      },
      {
        label: "Shipping",
        href: "/assistance/shipping",
        image: "/images/nav-images/shipping.jpeg",
      },
      {
        label: "Payment",
        href: "/assistance/payment",
        image: "/images/nav-images/payment.jpeg",
      },
    ],
  },
];
