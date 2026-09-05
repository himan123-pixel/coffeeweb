import { useMemo, useState } from "react";
import {
  CATEGORY_LABEL,
  PRODUCTS,
  ROAST_LABEL,
  formatPrice,
  type Category,
  type Product,
} from "../data/products";
import { useCart } from "../store/CartContext";
import { BeanIcon, CheckIcon, PlusIcon, RoastMeter, SearchIcon, TruckIcon, XIcon } from "./icons";
import Reveal from "./Reveal";

type SortKey = "featured" | "price-asc" | "price-desc" | "roast";

const SORTS: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price · low to high" },
  { id: "price-desc", label: "Price · high to low" },
  { id: "roast", label: "Roast · light to dark" },
];

const FILTERS: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All coffee" },
  { id: "single-origin", label: "Single origin" },
  { id: "blend", label: "Blends" },
  { id: "decaf", label: "Decaf" },
];

function ProductCard({
  product,
  index,
  onSelect,
}: {
  product: Product;
  index: number;
  onSelect: (p: Product) => void;
}) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const quickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, "250g", "Whole bean", 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1100);
  };

  return (
    <Reveal delay={(index % 3) * 80}>
      <article
        onClick={() => onSelect(product)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(product);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${product.name}`}
        className="group cursor-pointer rounded-lg border border-espresso-700 bg-espresso-900/60 p-3 transition-all duration-300 hover:-translate-y-1.5 hover:border-caramel-600/50 hover:bg-espresso-850 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caramel-400"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-espresso-800">
          <img
            src={product.image}
            alt={`${product.name} coffee bag`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/60 via-transparent to-transparent opacity-70" />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full border border-caramel-500/40 bg-espresso-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-caramel-200 backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          <span className="absolute right-3 top-3 rounded-full bg-espresso-950/80 px-2.5 py-1.5 backdrop-blur-sm">
            <RoastMeter level={product.roast} />
          </span>
          <button
            onClick={quickAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full text-espresso-950 shadow-lg transition-all duration-300 active:scale-90 ${
              justAdded
                ? "scale-110 bg-leaf-400"
                : "bg-caramel-400 hover:bg-caramel-300 sm:translate-y-1 sm:opacity-90 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
            }`}
          >
            {justAdded ? <CheckIcon className="h-5 w-5 anim-pop" /> : <PlusIcon className="h-5 w-5" />}
          </button>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3 px-1">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-caramel-400">
              {product.origin}
            </p>
            <h3 className="mt-1 truncate font-display text-xl font-semibold text-crema-50">
              {product.name}
            </h3>
            <p className="mt-0.5 text-xs text-crema-400">
              {CATEGORY_LABEL[product.category]} · {ROAST_LABEL[product.roast]} roast
            </p>
          </div>
          <p className="shrink-0 font-display text-lg font-semibold text-crema-100">
            {formatPrice(product.price)}
            <span className="block text-right text-[10px] font-normal text-crema-500">per 250 g</span>
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5 px-1 pb-1">
          {product.notes.map((n) => (
            <span
              key={n}
              className="rounded-full border border-espresso-600 px-2.5 py-0.5 text-[11px] text-crema-300 transition-colors group-hover:border-espresso-500"
            >
              {n}
            </span>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

export default function Shop({ onSelect }: { onSelect: (p: Product) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const inCategory = category === "all" || p.category === category;
      if (!inCategory) return false;
      if (!q) return true;
      const haystack = [
        p.name,
        p.origin,
        p.region,
        p.process,
        p.tagline,
        CATEGORY_LABEL[p.category],
        ...p.notes,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "roast") list = [...list].sort((a, b) => a.roast - b.roast);
    return list;
  }, [query, category, sort]);

  const reset = () => {
    setQuery("");
    setCategory("all");
    setSort("featured");
  };

  return (
    <section id="shelf" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-caramel-300">
                The shelf — {PRODUCTS.length} lots
              </p>
              <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-crema-50 sm:text-5xl">
                This week&rsquo;s <em className="italic text-caramel-300">coffee.</em>
              </h2>
            </div>
            <label className="relative block w-full md:w-80">
              <span className="sr-only">Search coffee</span>
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-crema-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search origin, notes, process…"
                className="w-full rounded-full border border-espresso-600 bg-espresso-900/80 py-3 pl-11 pr-10 text-sm text-crema-100 placeholder:text-crema-500 transition-all focus:border-caramel-500/70 focus:outline-none focus:ring-2 focus:ring-caramel-500/25"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-crema-400 transition-colors hover:bg-espresso-700 hover:text-crema-100"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </label>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setCategory(f.id)}
                  className={`shrink-0 rounded-full border px-4.5 py-2 text-sm font-medium transition-all active:scale-95 ${
                    category === f.id
                      ? "border-transparent bg-caramel-400 text-espresso-950 shadow-[0_8px_24px_-8px_rgba(209,132,47,0.6)]"
                      : "border-espresso-600 text-crema-300 hover:border-caramel-600/60 hover:text-crema-100"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <p className="whitespace-nowrap text-xs text-crema-500">
                Showing <span className="font-semibold text-crema-200">{filtered.length}</span> of{" "}
                {PRODUCTS.length}
              </p>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  aria-label="Sort products"
                  className="appearance-none rounded-full border border-espresso-600 bg-espresso-900/80 py-2 pl-4 pr-9 text-sm text-crema-200 transition-colors focus:border-caramel-500/70 focus:outline-none"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id} className="bg-espresso-900">
                      {s.label}
                    </option>
                  ))}
                </select>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-crema-400"
                  aria-hidden
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>

        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onSelect={onSelect} />
            ))}
          </div>
        ) : (
          <div className="anim-fade-slide mt-10 rounded-lg border border-dashed border-espresso-600 px-6 py-20 text-center">
            <BeanIcon className="mx-auto h-12 w-12 text-espresso-500" />
            <h3 className="mt-5 font-display text-2xl text-crema-100">
              No beans match &ldquo;{query}&rdquo;
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-crema-400">
              Try a tasting note like <em>jasmine</em>, an origin like <em>Kenya</em>, or clear
              everything and browse the whole shelf.
            </p>
            <button
              onClick={reset}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-caramel-400 px-5 py-2.5 text-sm font-semibold text-espresso-950 transition-all hover:bg-caramel-300 active:scale-95"
            >
              Clear search &amp; filters
            </button>
          </div>
        )}

        <Reveal delay={120}>
          <p className="mt-10 flex items-center justify-center gap-2.5 text-xs text-crema-500">
            <TruckIcon className="h-4.5 w-4.5 text-caramel-500" />
            Free shipping on orders over $45 · every bag stamped with its roast date
          </p>
        </Reveal>
      </div>
    </section>
  );
}
