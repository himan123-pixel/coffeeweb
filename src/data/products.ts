export type Category = "single-origin" | "blend" | "decaf";
export type Size = "250g" | "1kg";
export type Grind = "Whole bean" | "Filter" | "Espresso" | "French press";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  origin: string;
  region: string;
  category: Category;
  price: number; // per 250 g
  roast: 1 | 2 | 3 | 4 | 5;
  notes: string[];
  process: string;
  variety: string;
  altitude: string;
  producer: string;
  description: string;
  badge?: string;
  accent: string;
  image: string;
}

export const CATEGORY_LABEL: Record<Category, string> = {
  "single-origin": "Single origin",
  blend: "Blend",
  decaf: "Decaf",
};

export const SIZES: { id: Size; label: string; factor: number }[] = [
  { id: "250g", label: "250 g bag", factor: 1 },
  { id: "1kg", label: "1 kg bag", factor: 3.6 },
];

export const GRINDS: Grind[] = ["Whole bean", "Filter", "Espresso", "French press"];

export const ROAST_LABEL: Record<number, string> = {
  1: "Light",
  2: "Light–medium",
  3: "Medium",
  4: "Medium–dark",
  5: "Dark",
};

export function priceFor(basePrice: number, size: Size): number {
  const factor = size === "250g" ? 1 : 3.6;
  return Math.round(basePrice * factor * 100) / 100;
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}

export const PRODUCTS: Product[] = [
  {
    id: "ethiopia-yirgacheffe",
    name: "Ethiopia Yirgacheffe",
    tagline: "Idido washing station, Gedeo Zone",
    origin: "Ethiopia",
    region: "Yirgacheffe, Gedeo",
    category: "single-origin",
    price: 21,
    roast: 1,
    notes: ["Jasmine", "Bergamot", "Apricot"],
    process: "Washed",
    variety: "Heirloom cultivars",
    altitude: "1,950–2,100 masl",
    producer: "Idido smallholders",
    description:
      "A translucent, tea-like cup from the birthplace of arabica. We roast this gently to keep the florals lifting off the top — expect jasmine on the nose, bergamot through the middle, and a soft apricot finish that lingers like marmalade.",
    badge: "New harvest",
    accent: "#e8a06b",
    image:
      "https://image.qwenlm.ai/generated-images/50f261b4-6fe1-4bcb-bf5d-bae8edaa2e24/_result.png",
  },
  {
    id: "colombia-huila",
    name: "Colombia Huila",
    tagline: "Finca La Cabaña, San Agustín",
    origin: "Colombia",
    region: "Huila, San Agustín",
    category: "single-origin",
    price: 18.5,
    roast: 3,
    notes: ["Caramel", "Red apple", "Panela"],
    process: "Washed, 18 h fermentation",
    variety: "Caturra & Pink Bourbon",
    altitude: "1,700–1,850 masl",
    producer: "The Rojas family",
    description:
      "Our comfort coffee. Third-generation grower Don Édgar Rojas dries this lot on raised beds under slow Huila sun, and it shows: round caramel sweetness, a crisp red-apple acidity, and a panela finish that makes it dangerously easy to drink.",
    badge: "Staff pick",
    accent: "#d1842f",
    image:
      "https://image.qwenlm.ai/generated-images/7892af10-b89c-4684-a23e-3e2c7842ed6d/_result.png",
  },
  {
    id: "kenya-nyeri",
    name: "Kenya Nyeri AA",
    tagline: "Gichathaini factory, Nyeri County",
    origin: "Kenya",
    region: "Nyeri, Mount Kenya foothills",
    category: "single-origin",
    price: 22,
    roast: 2,
    notes: ["Blackcurrant", "Grapefruit", "Brown sugar"],
    process: "Double washed, double fermented",
    variety: "SL28 & SL34",
    altitude: "1,750 masl",
    producer: "Gichathaini FCS members",
    description:
      "Loud, juicy, unapologetic. Classic Kenyan SL28 with a blackcurrant hit up front, grapefruit sparkle mid-palate, and brown sugar underneath it all. Brew it as a filter pour-over and give it room to shine — this one rewards patience.",
    badge: "Lot 4 of 2026",
    accent: "#a5523f",
    image:
      "https://image.qwenlm.ai/generated-images/cccb6976-c769-43f1-998f-194bbe1e0695/_result.png",
  },
  {
    id: "night-shift",
    name: "Night Shift Espresso",
    tagline: "Dark blend, built for milk",
    origin: "Brazil + Sumatra",
    region: "Cerrado & Lintong",
    category: "blend",
    price: 17,
    roast: 5,
    notes: ["Dark chocolate", "Toasted hazelnut", "Molasses"],
    process: "Natural & semi-washed",
    variety: "Mundo Novo, Catimor",
    altitude: "1,100–1,400 masl",
    producer: "Multi-farm blend",
    description:
      "The espresso that closes the bar. Brazil gives it a heavy dark-chocolate body, Sumatra brings the earth and spice, and a long development in the roaster rounds it into toasted hazelnut and molasses. Cuts through milk like it has a grudge.",
    accent: "#c47a4a",
    image:
      "https://image.qwenlm.ai/generated-images/c9fc5c8f-82cc-45be-b59a-7877aecbc5e0/_result.png",
  },
  {
    id: "morning-ritual",
    name: "Morning Ritual",
    tagline: "Medium filter blend, easy every day",
    origin: "Guatemala + Ethiopia",
    region: "Antigua & Guji",
    category: "blend",
    price: 16.5,
    roast: 3,
    notes: ["Honey", "Almond", "Orange zest"],
    process: "Washed components",
    variety: "Bourbon, Kurume",
    altitude: "1,600–2,000 masl",
    producer: "Two-farm blend",
    description:
      "The bag that lives on your counter. Antigua brings honey and almond weight, Guji lifts it with a twist of orange zest. Dialled to be forgiving — batch brewer, pour-over, or a rushed 7 a.m. V60, it lands soft and sweet every time.",
    badge: "Best seller",
    accent: "#e2b04f",
    image:
      "https://image.qwenlm.ai/generated-images/a4acf880-7670-40a2-96fb-530736dedf29/_result.png",
  },
  {
    id: "quiet-hours",
    name: "Quiet Hours Decaf",
    tagline: "Sugarcane E.A. decaf, never sad",
    origin: "Colombia",
    region: "Cauca, Popayán plateau",
    category: "decaf",
    price: 19.5,
    roast: 3,
    notes: ["Cocoa nib", "Toffee", "Dried cherry"],
    process: "Sugarcane E.A. decaffeination",
    variety: "Castillo & Colombia",
    altitude: "1,500–1,750 masl",
    producer: "Smallholder collective, Cauca",
    description:
      "Decaf that doesn't apologize. Sugarcane-processed at origin, so the sweetness survives the journey: cocoa nib and toffee up front, a gentle dried-cherry tail. Espressos pull syrupy, and nobody at the table has ever guessed.",
    badge: "Sleep-friendly",
    accent: "#97ab72",
    image:
      "https://image.qwenlm.ai/generated-images/66607e77-cd5d-4b92-b156-ee073a12c79d/_result.png",
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
