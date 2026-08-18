import { useEffect, useState } from "react";
import { useCart } from "../store/CartContext";
import { CartIcon, FlameLogo } from "./icons";

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-espresso-700/70 bg-espresso-950/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <FlameLogo className="h-8 w-8 text-caramel-400 transition-transform duration-500 group-hover:-rotate-12" />
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-tight text-crema-50">
              Ember &amp; Oak
            </span>
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.28em] text-crema-400">
              Coffee Roasters
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-crema-300 md:flex">
          {[
            ["The shelf", "#shelf"],
            ["Roast log", "#roast-log"],
            ["Visit us", "#visit"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="relative py-1 transition-colors hover:text-crema-50 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-caramel-400 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-2 rounded-full border border-espresso-600 bg-espresso-800/70 px-4 py-2 text-sm font-medium text-crema-100 transition-all hover:border-caramel-500/60 hover:bg-espresso-700 active:scale-95"
          aria-label={`Open cart, ${count} items`}
        >
          <CartIcon className="h-[18px] w-[18px] text-caramel-300" />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span
              key={count}
              className="anim-pop absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-caramel-400 px-1 text-[11px] font-bold text-espresso-950"
            >
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
