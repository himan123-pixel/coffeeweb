import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getProduct, priceFor, type Grind, type Product, type Size } from "../data/products";

export interface CartLine {
  key: string;
  productId: string;
  size: Size;
  grind: Grind;
  qty: number;
}

export interface ToastMsg {
  id: number;
  title: string;
  sub?: string;
}

interface CartApi {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addToCart: (product: Product, size: Size, grind: Grind, qty: number) => void;
  changeQty: (key: string, delta: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  toasts: ToastMsg[];
  pushToast: (title: string, sub?: string) => void;
  dismissToast: (id: number) => void;
}

const CartContext = createContext<CartApi | null>(null);
const STORAGE_KEY = "ember-oak-cart-v1";

function loadLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return parsed.filter((l) => l && getProduct(l.productId) && l.qty > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadLines);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable — cart lives in memory */
    }
  }, [lines]);

  const pushToast = useCallback((title: string, sub?: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { id, title, sub }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2800);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const addToCart = useCallback(
    (product: Product, size: Size, grind: Grind, qty: number) => {
      const key = `${product.id}|${size}|${grind}`;
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(12, l.qty + qty) } : l));
        }
        return [...prev, { key, productId: product.id, size, grind, qty }];
      });
      pushToast(`${product.name} added to cart`, `${size} · ${grind}`);
    },
    [pushToast],
  );

  const changeQty = useCallback((key: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.key === key ? { ...l, qty: Math.min(12, l.qty + delta) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const p = getProduct(l.productId);
        return p ? sum + priceFor(p.price, l.size) * l.qty : sum;
      }, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      addToCart,
      changeQty,
      removeLine,
      clearCart,
      toasts,
      pushToast,
      dismissToast,
    }),
    [lines, count, subtotal, addToCart, changeQty, removeLine, clearCart, toasts, pushToast, dismissToast],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
