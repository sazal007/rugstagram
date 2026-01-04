import { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      {
        label: "All Stock",
        href: "/shop",
        image: "/colors/all.avif",
      },
      // Dynamic items will be added here
    ],
  },
  {
    label: "Collections",
    href: "#",
    children: [], // Dynamic items will be populated here
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
    label: "Blog",
    href: "/blog",
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
