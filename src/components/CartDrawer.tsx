import { useEffect } from "react";
import { formatPrice, getProduct, priceFor } from "../data/products";
import { useCart } from "../store/CartContext";
import { BagIcon, CheckIcon, MinusIcon, PlusIcon, TrashIcon, TruckIcon, XIcon } from "./icons";

export const FREE_SHIPPING_AT = 45;
export const SHIPPING_FLAT = 6;

export default function CartDrawer({
  open,
  onClose,
  onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}) {
  const { lines, count, subtotal, changeQty, removeLine } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const freeShipping = subtotal >= FREE_SHIPPING_AT;
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progress = Math.min(1, subtotal / FREE_SHIPPING_AT);
  const shipping = lines.length === 0 || freeShipping ? 0 : SHIPPING_FLAT;

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-espresso-950/80 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* panel */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-espresso-700 bg-espresso-900 shadow-[-30px_0_80px_-30px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-espresso-700 px-6 py-5">
          <h2 className="font-display text-2xl font-semibold text-crema-50">
            Your cart
            {count > 0 && <span className="ml-2 text-base font-normal text-caramel-300">({count})</span>}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full border border-espresso-600 text-crema-300 transition-all hover:border-caramel-500/60 hover:text-crema-50 active:scale-90"
          >
            <XIcon className="h-4.5 w-4.5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-espresso-500">
              <BagIcon className="h-9 w-9 text-espresso-500" />
            </span>
            <h3 className="mt-6 font-display text-2xl text-crema-100">Nothing brewing yet</h3>
            <p className="mt-2 text-sm text-crema-400">
              Your cart is empty. Pick a bag off the shelf and we&rsquo;ll roast it for the next
              cycle.
            </p>
            <a
              href="#shelf"
              onClick={onClose}
              className="mt-7 rounded-full bg-caramel-400 px-6 py-3 text-sm font-semibold text-espresso-950 transition-all hover:bg-caramel-300 active:scale-95"
            >
              Browse the shelf
            </a>
          </div>
        ) : (
          <>
            {/* free shipping meter */}
            <div className="border-b border-espresso-700 px-6 py-4">
              <p className="flex items-center gap-2 text-xs text-crema-300">
                {freeShipping ? (
                  <>
                    <CheckIcon className="h-4 w-4 text-leaf-400" />
                    <span className="font-semibold text-leaf-300">Free shipping unlocked</span>
                  </>
                ) : (
                  <>
                    <TruckIcon className="h-4 w-4 text-caramel-400" />
                    <span>
                      <span className="font-semibold text-caramel-300">{formatPrice(remaining)}</span> away
                      from free shipping
                    </span>
                  </>
                )}
              </p>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-espresso-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-caramel-600 to-caramel-300 transition-all duration-700 ease-out"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            {/* lines */}
            <div className="cart-scroll flex-1 overflow-y-auto px-6">
              {lines.map((line) => {
                const product = getProduct(line.productId);
                if (!product) return null;
                const unit = priceFor(product.price, line.size);
                return (
                  <div
                    key={line.key}
                    className="anim-fade-slide flex gap-4 border-b border-espresso-700/70 py-5"
                  >
                    <div className="h-20 w-16 shrink-0 overflow-hidden rounded-md border border-espresso-700">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-display text-base font-semibold text-crema-50">
                            {product.name}
                          </p>
                          <p className="mt-0.5 text-[11px] text-crema-500">
                            {line.size} · {line.grind} · {formatPrice(unit)} each
                          </p>
                        </div>
                        <button
                          onClick={() => removeLine(line.key)}
                          aria-label={`Remove ${product.name}`}
                          className="rounded-full p-1.5 text-crema-500 transition-colors hover:bg-espresso-800 hover:text-ember-400"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-espresso-600">
                          <button
                            onClick={() => changeQty(line.key, -1)}
                            aria-label="Decrease quantity"
                            className="grid h-8 w-8 place-items-center text-crema-300 transition-colors hover:text-crema-50"
                          >
                            <MinusIcon className="h-3.5 w-3.5" />
                          </button>
                          <span key={line.qty} className="anim-pop w-7 text-center text-sm font-semibold text-crema-50">
                            {line.qty}
                          </span>
                          <button
                            onClick={() => changeQty(line.key, 1)}
                            disabled={line.qty >= 12}
                            aria-label="Increase quantity"
                            className="grid h-8 w-8 place-items-center text-crema-300 transition-colors hover:text-crema-50 disabled:opacity-30"
                          >
                            <PlusIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p key={`t-${line.qty}`} className="anim-fade-slide font-display text-base font-semibold text-caramel-300" style={{ animationDuration: "0.25s" }}>
                          {formatPrice(unit * line.qty)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* summary */}
            <footer className="border-t border-espresso-700 bg-espresso-850 px-6 py-5">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-crema-300">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-crema-300">
                  <dt>Shipping</dt>
                  <dd className={freeShipping ? "font-semibold text-leaf-300" : ""}>
                    {freeShipping ? "Free" : formatPrice(shipping)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-espresso-700 pt-3">
                  <dt className="font-medium text-crema-200">Total</dt>
                  <dd className="font-display text-2xl font-semibold text-crema-50">
                    {formatPrice(subtotal + shipping)}
                  </dd>
                </div>
              </dl>
              <button
                onClick={onCheckout}
                className="mt-5 w-full rounded-full bg-caramel-400 py-3.5 text-sm font-semibold text-espresso-950 shadow-[0_12px_30px_-12px_rgba(209,132,47,0.6)] transition-all hover:-translate-y-0.5 hover:bg-caramel-300 active:translate-y-0 active:scale-[0.98]"
              >
                Check out · {formatPrice(subtotal + shipping)}
              </button>
              <p className="mt-3 text-center text-[11px] text-crema-500">
                Demo checkout — no card is ever charged.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
