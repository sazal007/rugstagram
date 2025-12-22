import { Category, Product, NavItem } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Himalayan Dawn",
    category: Category.ABSTRACT,
    price: 2400,
    materials: ["Wool", "Silk"],
    colors: ["Beige", "Gold"],
    sizes: ["170x240", "200x300"],
    image:
      "https://images.unsplash.com/photo-1588421874990-1fe162747f9b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVnfGVufDB8fDB8fHww",
    isNew: true,
    knotDensity: 100,
  },
  {
    id: "2",
    name: "Tibetan Shadow",
    category: Category.SHADED,
    price: 1800,
    materials: ["Wool"],
    colors: ["Grey", "Black"],
    sizes: ["140x200", "170x240"],
    image:
      "https://images.unsplash.com/photo-1599503815079-dfb7085fc667?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJ1Z3xlbnwwfHwwfHx8MA%3D%3D",
    isNew: false,
    knotDensity: 80,
  },
  {
    id: "3",
    name: "Lotus Valley",
    category: Category.FLOWER,
    price: 3200,
    materials: ["Wool", "Silk", "Allo"],
    colors: ["Red", "Cream"],
    sizes: ["200x300", "250x350"],
    image:
      "https://images.unsplash.com/photo-1660394585016-508f949df960?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cnVnfGVufDB8fDB8fHww",
    isNew: true,
    knotDensity: 100,
  },
  {
    id: "4",
    name: "Minimal Border",
    category: Category.BORDER,
    price: 1500,
    materials: ["Wool", "Hemp"],
    colors: ["White", "Brown"],
    sizes: ["120x180", "140x200"],
    image:
      "https://images.unsplash.com/photo-1594847915592-2a7ef568e2b6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJ1Z3xlbnwwfHwwfHx8MA%3D%3D",
    isNew: false,
    knotDensity: 60,
  },
  {
    id: "5",
    name: "Urban Stripes",
    category: Category.STRIPES,
    price: 2100,
    materials: ["Wool", "Linen"],
    colors: ["Blue", "Grey"],
    sizes: ["170x240"],
    image:
      "https://images.unsplash.com/photo-1606885118474-c8baf907e998?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJ1Z3N8ZW58MHx8MHx8fDA%3D",
    isNew: true,
    knotDensity: 80,
  },
  {
    id: "6",
    name: "Modern Earth",
    category: Category.CONTEMPORARY,
    price: 2800,
    materials: ["Wool", "Silk"],
    colors: ["Brown", "Green"],
    sizes: ["200x300", "250x350"],
    image:
      "https://images.unsplash.com/photo-1572123979839-3749e9973aba?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJ1Z3xlbnwwfHwwfHx8MA%3D%3D",
    isNew: false,
    knotDensity: 100,
  },
];

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
