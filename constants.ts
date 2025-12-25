import { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "New Arrivals", href: "/shop?filter=new", image: "/images/nav/new-arrivals.jpg" },
      { label: "All Stock", href: "/shop", image: "/images/nav/all-stock.jpg" },
    ],
  },
  {
    label: "Collections",
    href: "#",
    children: [
      { label: "Contemporary", href: "/collections/Contemporary", image: "/images/nav/contemporary.jpg" },
      { label: "Shaded", href: "/collections/Shaded", image: "/images/nav/shaded.jpg" },
      { label: "Flower", href: "/collections/Flower", image: "/images/nav/flower.jpg" },
      { label: "Border", href: "/collections/Border", image: "/images/nav/border.jpg" },
      { label: "Stripes", href: "/collections/Stripes", image: "/images/nav/stripes.jpg" },
      { label: "Abstract", href: "/collections/Abstract", image: "/images/nav/abstract.jpg" },
    ],
  },
  {
    label: "Bespoke",
    href: "/bespoke",
    children: [
      { label: "Overview", href: "/bespoke", image: "/images/nav/bespoke-overview.jpg" },
      { label: "Customize Existing", href: "/bespoke/customize", image: "/images/nav/customize-existing.jpg" },
      { label: "Design Your Own", href: "/bespoke/design", image: "/images/nav/design-your-own.jpg" },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Culture", href: "/about/culture", image: "/images/nav/our-culture.jpg" },
      { label: "Meet the Founder", href: "/about/founder", image: "/images/nav/founder.jpg" },
      { label: "Art of Weaving", href: "/about/weaving", image: "/images/nav/weaving.jpg" },
    ],
  },
  {
    label: "Assistance",
    href: "/assistance",
    children: [
      { label: "Contact Us", href: "/assistance", image: "/images/nav/contact.jpg" },
      { label: "Partnership", href: "/assistance/partnership", image: "/images/nav/partnership.jpg" },
      { label: "Shipping", href: "/assistance/shipping", image: "/images/nav/shipping.jpg" },
      { label: "Payment", href: "/assistance/payment", image: "/images/nav/payment.jpg" },
    ],
  },
];
