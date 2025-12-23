import { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "New Arrivals", href: "/shop?filter=new" },
      { label: "All Stock", href: "/shop" },
    ],
  },
  {
    label: "Collections",
    href: "#",
    children: [
      { label: "Contemporary", href: "/collections/Contemporary" },
      { label: "Shaded", href: "/collections/Shaded" },
      { label: "Flower", href: "/collections/Flower" },
      { label: "Border", href: "/collections/Border" },
      { label: "Stripes", href: "/collections/Stripes" },
      { label: "Abstract", href: "/collections/Abstract" },
    ],
  },
  {
    label: "Bespoke",
    href: "/bespoke",
    children: [
      { label: "Overview", href: "/bespoke" },
      { label: "Customize Existing", href: "/bespoke/customize" },
      { label: "Design Your Own", href: "/bespoke/design" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Culture", href: "/about/culture" },
      { label: "Meet the Founder", href: "/about/founder" },
      { label: "Art of Weaving", href: "/about/weaving" },
    ],
  },
  {
    label: "Assistance",
    href: "/assistance",
    children: [
      { label: "Contact Us", href: "/assistance" },
      { label: "Partnership", href: "/assistance/partnership" },
      { label: "Shipping", href: "/assistance/shipping" },
      { label: "Payment", href: "/assistance/payment" },
    ],
  },
];
