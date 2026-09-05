import { useState } from "react";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductModal from "./components/ProductModal";
import { Footer, RoastLog, Toasts } from "./components/Sections";
import Shop from "./components/Shop";
import type { Product } from "./data/products";
import { CartProvider } from "./store/CartContext";

function Page() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-espresso-950 font-body text-crema-100">
      {/* ambient background layers */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px 520px at 85% -10%, rgba(209,132,47,0.09), transparent 60%), radial-gradient(900px 600px at -10% 45%, rgba(151,171,114,0.05), transparent 60%), radial-gradient(1000px 700px at 50% 115%, rgba(196,85,45,0.07), transparent 60%)",
          }}
        />
        {/* giant coffee-ring stains */}
        <div className="absolute -left-40 top-[30%] h-[480px] w-[480px] rounded-full border-[22px] border-espresso-800/60" />
        <div className="absolute -right-32 top-[68%] h-[380px] w-[380px] rounded-full border-[16px] border-espresso-800/50" />
      </div>

      <div className="grain" aria-hidden />

      <div className="relative">
        <Header onOpenCart={() => setCartOpen(true)} />

        <main>
          <Hero />
          <Shop onSelect={setSelected} />
          <RoastLog />
        </main>

        <Footer />
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Page />
    </CartProvider>
  );
}
