import { useEffect, useRef, useState } from "react";
import {
  CATEGORY_LABEL,
  GRINDS,
  ROAST_LABEL,
  SIZES,
  formatPrice,
  priceFor,
  type Grind,
  type Product,
  type Size,
} from "../data/products";
import { useCart } from "../store/CartContext";
import { CheckIcon, MinusIcon, PlusIcon, RoastMeter, XIcon } from "./icons";

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart } = useCart();
  const [size, setSize] = useState<Size>("250g");
  const [grind, setGrind] = useState<Grind>("Whole bean");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setSize("250g");
    setGrind("Whole bean");
    setQty(1);
    setAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [product, onClose]);

  if (!product) return null;

  const unit = priceFor(product.price, size);
  const total = unit * qty;

  const handleAdd = () => {
    addToCart(product, size, grind, qty);
    setAdded(true);
    timer.current = window.setTimeout(() => onClose(), 750);
  };

  const specs: [string, string][] = [
    ["Process", product.process],
    ["Variety", product.variety],
    ["Altitude", product.altitude],
    ["Producer", product.producer],
  ];

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" role="dialog" aria-modal="true" aria-label={product.name}>
      <div
        className="anim-fade-slide fixed inset-0 bg-espresso-950/85 backdrop-blur-sm"
        style={{ animationDuration: "0.25s" }}
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          onClick={(e) => e.stopPropagation()}
          className="anim-scale-in relative grid w-full max-w-4xl overflow-hidden rounded-xl border border-espresso-600 bg-espresso-900 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] md:grid-cols-2"
        >
          <button
            onClick={onClose}
            aria-label="Close product details"
            className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-espresso-600 bg-espresso-950/70 text-crema-200 backdrop-blur-sm transition-all hover:border-caramel-500/60 hover:text-crema-50 active:scale-90"
          >
            <XIcon className="h-4.5 w-4.5" />
          </button>

          {/* image side */}
          <div
            className="relative h-64 overflow-hidden sm:h-80 md:h-full md:min-h-[560px]"
            style={{
              background: `radial-gradient(circle at 30% 15%, ${product.accent}33, transparent 60%), var(--color-espresso-850)`,
            }}
          >
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-950/50 via-transparent to-transparent" />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full border border-caramel-500/40 bg-espresso-950/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-caramel-200 backdrop-blur-sm">
                {product.badge}
              </span>
            )}
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-espresso-950/80 px-4 py-2 backdrop-blur-sm">
              <RoastMeter level={product.roast} />
              <span className="text-xs font-medium text-crema-300">{ROAST_LABEL[product.roast]} roast</span>
            </div>
          </div>

          {/* details side */}
          <div className="cart-scroll max-h-[70vh] overflow-y-auto p-6 sm:p-8 md:max-h-[80vh]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-caramel-400">
              {CATEGORY_LABEL[product.category]} · {product.origin}
            </p>
            <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-crema-50 sm:text-4xl">
              {product.name}
            </h3>
            <p className="mt-1.5 text-sm italic text-crema-400">{product.tagline}</p>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-3xl font-semibold text-caramel-300">{formatPrice(unit)}</span>
              <span className="text-xs text-crema-500">per {size} bag</span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-crema-300">{product.description}</p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {product.notes.map((n) => (
                <span
                  key={n}
                  className="rounded-full border px-3 py-1 text-xs font-medium text-crema-200"
                  style={{ borderColor: `${product.accent}66`, background: `${product.accent}14` }}
                >
                  {n}
                </span>
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-espresso-700 bg-espresso-700">
              {specs.map(([k, v]) => (
                <div key={k} className="bg-espresso-900 px-4 py-3">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-crema-500">{k}</dt>
                  <dd className="mt-1 text-[13px] text-crema-200">{v}</dd>
                </div>
              ))}
            </dl>

            {/* size */}
            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-crema-400">Bag size</p>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s.id)}
                    className={`rounded-lg border px-4 py-3 text-left transition-all active:scale-[0.97] ${
                      size === s.id
                        ? "border-caramel-400 bg-caramel-400/10 text-crema-50"
                        : "border-espresso-600 text-crema-300 hover:border-espresso-500"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{s.label}</span>
                    <span className={`block text-xs ${size === s.id ? "text-caramel-300" : "text-crema-500"}`}>
                      {formatPrice(priceFor(product.price, s.id))}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* grind */}
            <div className="mt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-crema-400">Grind</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {GRINDS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrind(g)}
                    className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all active:scale-95 ${
                      grind === g
                        ? "border-caramel-400 bg-caramel-400 text-espresso-950"
                        : "border-espresso-600 text-crema-300 hover:border-espresso-500 hover:text-crema-100"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* qty + add */}
            <div className="mt-7 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-espresso-600">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="grid h-11 w-11 place-items-center text-crema-300 transition-colors hover:text-crema-50 disabled:opacity-30"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-display text-lg font-semibold text-crema-50">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(12, q + 1))}
                  disabled={qty >= 12}
                  aria-label="Increase quantity"
                  className="grid h-11 w-11 place-items-center text-crema-300 transition-colors hover:text-crema-50 disabled:opacity-30"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                disabled={added}
                className={`flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full text-sm font-semibold transition-all active:scale-[0.97] ${
                  added
                    ? "bg-leaf-400 text-espresso-950"
                    : "bg-caramel-400 text-espresso-950 hover:bg-caramel-300 shadow-[0_12px_30px_-12px_rgba(209,132,47,0.6)]"
                }`}
              >
                {added ? (
                  <>
                    <CheckIcon className="h-5 w-5 anim-pop" /> Added to cart
                  </>
                ) : (
                  <>Add {qty > 1 ? `${qty} bags` : "to cart"} · {formatPrice(total)}</>
                )}
              </button>
            </div>

            <p className="mt-4 text-center text-[11px] text-crema-500">
              Roasted to order · stamped with roast date · ships in a compostable bag
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
