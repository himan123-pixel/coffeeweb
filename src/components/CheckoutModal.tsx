import { useEffect, useRef, useState } from "react";
import { formatPrice } from "../data/products";
import { useCart } from "../store/CartContext";
import { FREE_SHIPPING_AT, SHIPPING_FLAT } from "./CartDrawer";
import { CheckIcon, XIcon } from "./icons";

type Step = "details" | "processing" | "done";

interface FormState {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  card: string;
  exp: string;
  cvc: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  card: "",
  exp: "",
  cvc: "",
};

const PROCESS_STEPS = ["Confirming your order", "Waking the roaster", "Stamping the roast date"];

function validate(f: FormState): Partial<Record<keyof FormState, string>> {
  const e: Partial<Record<keyof FormState, string>> = {};
  if (f.name.trim().length < 2) e.name = "Tell us who to address the bag to.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "That email doesn't look right.";
  if (f.address.trim().length < 4) e.address = "We need a street address to ship to.";
  if (f.city.trim().length < 2) e.city = "City is required.";
  if (!/^[\dA-Za-z -]{3,10}$/.test(f.zip.trim())) e.zip = "Invalid code.";
  if (!/^\d{12,19}$/.test(f.card.replace(/\s/g, ""))) e.card = "Enter a full card number.";
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(f.exp)) e.exp = "Use MM/YY.";
  if (!/^\d{3,4}$/.test(f.cvc)) e.cvc = "3–4 digits.";
  return e;
}

const inputCls =
  "w-full rounded-lg border border-espresso-600 bg-espresso-850 px-4 py-2.5 text-sm text-crema-100 placeholder:text-crema-500 transition-all focus:border-caramel-500/70 focus:outline-none focus:ring-2 focus:ring-caramel-500/25";

export default function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, count, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [procStep, setProcStep] = useState(0);
  const orderId = useRef("");
  const timers = useRef<number[]>([]);

  const freeShipping = subtotal >= FREE_SHIPPING_AT;
  const shipping = lines.length === 0 || freeShipping ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  useEffect(() => {
    if (open) {
      setStep("details");
      setErrors({});
      setProcStep(0);
    }
    return () => timers.current.forEach((t) => window.clearTimeout(t));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step === "details") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step, onClose]);

  if (!open) return null;

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (k === "card") {
      v = v.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
    }
    if (k === "exp") {
      v = v.replace(/\D/g, "").slice(0, 4);
      if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    if (k === "cvc") v = v.replace(/\D/g, "").slice(0, 4);
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const pay = () => {
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    orderId.current = `EMB-${Math.floor(2400 + Math.random() * 7000)}`;
    setStep("processing");
    setProcStep(0);
    PROCESS_STEPS.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setProcStep(i + 1), 850 * (i + 1)));
    });
    timers.current.push(
      window.setTimeout(() => setStep("done"), 850 * PROCESS_STEPS.length + 700),
    );
  };

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const deliveryLabel = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const finish = () => {
    clearCart();
    setForm(EMPTY_FORM);
    onClose();
  };

  const field = (
    k: keyof FormState,
    label: string,
    placeholder: string,
    type = "text",
    inputMode?: "numeric" | "email",
  ) => (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-crema-400">
        {label}
      </label>
      <input
        value={form[k]}
        onChange={set(k)}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        className={`${inputCls} ${errors[k] ? "border-ember-500/70" : ""}`}
      />
      {errors[k] && <p className="mt-1 text-[11px] text-ember-400">{errors[k]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto" role="dialog" aria-modal="true" aria-label="Checkout">
      <div className="anim-fade-slide fixed inset-0 bg-espresso-950/85 backdrop-blur-sm" style={{ animationDuration: "0.25s" }} onClick={step === "details" ? onClose : undefined} />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="anim-scale-in cart-scroll relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-xl border border-espresso-600 bg-espresso-900 p-6 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] sm:p-8">
          {step === "details" && (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-caramel-300">
                    Checkout
                  </p>
                  <h2 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-crema-50">
                    Almost brewing.
                  </h2>
                  <p className="mt-1 text-sm text-crema-400">
                    {count} {count === 1 ? "bag" : "bags"} · total{" "}
                    <span className="font-semibold text-caramel-300">{formatPrice(total)}</span>
                    {shipping === 0 && <span className="ml-1.5 text-leaf-300">(free shipping)</span>}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close checkout"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-espresso-600 text-crema-300 transition-all hover:border-caramel-500/60 hover:text-crema-50 active:scale-90"
                >
                  <XIcon className="h-4.5 w-4.5" />
                </button>
              </div>

              <form
                className="mt-6 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  pay();
                }}
                noValidate
              >
                <fieldset className="space-y-3.5">
                  <legend className="mb-2 font-display text-lg italic text-crema-200">Contact</legend>
                  {field("name", "Full name", "Jo March")}
                  {field("email", "Email", "jo@example.com", "email", "email")}
                </fieldset>

                <fieldset className="space-y-3.5">
                  <legend className="mb-2 font-display text-lg italic text-crema-200">Ship to</legend>
                  {field("address", "Street address", "88 Berry Street, Apt 4")}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">{field("city", "City", "Brooklyn")}</div>
                    {field("zip", "ZIP", "11249")}
                  </div>
                </fieldset>

                <fieldset className="space-y-3.5">
                  <legend className="mb-2 font-display text-lg italic text-crema-200">Payment</legend>
                  {field("card", "Card number", "4242 4242 4242 4242", "text", "numeric")}
                  <div className="grid grid-cols-2 gap-3">
                    {field("exp", "Expiry", "08/27", "text", "numeric")}
                    {field("cvc", "CVC", "123", "text", "numeric")}
                  </div>
                </fieldset>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-caramel-400 py-3.5 text-sm font-semibold text-espresso-950 shadow-[0_12px_30px_-12px_rgba(209,132,47,0.6)] transition-all hover:-translate-y-0.5 hover:bg-caramel-300 active:translate-y-0 active:scale-[0.98]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4" aria-hidden>
                    <rect x="5" y="10.5" width="14" height="10" rx="2" />
                    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
                  </svg>
                  Pay {formatPrice(total)}
                </button>
                <p className="text-center text-[11px] text-crema-500">
                  Simulated payment — nothing is charged, nothing ships. It&rsquo;s just very good
                  theatre.
                </p>
              </form>
            </>
          )}

          {step === "processing" && (
            <div className="flex flex-col items-center px-2 py-10">
              <div className="relative grid h-16 w-16 place-items-center">
                <span className="absolute inset-0 animate-spin rounded-full border-2 border-espresso-600 border-t-caramel-400" />
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-caramel-400" aria-hidden>
                  <path d="M12 3c4 3 6.2 6 6.2 9.4A6.2 6.2 0 0 1 5.8 12.4C5.8 9 8 6 12 3z" />
                </svg>
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold text-crema-50">
                Talking to the roastery…
              </h2>
              <ul className="mt-7 w-full max-w-xs space-y-3.5">
                {PROCESS_STEPS.map((label, i) => {
                  const done = procStep > i;
                  const active = procStep === i;
                  return (
                    <li key={label} className="flex items-center gap-3 text-sm">
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          done
                            ? "border-leaf-400 bg-leaf-400/15 text-leaf-300"
                            : active
                              ? "border-caramel-500 text-caramel-300"
                              : "border-espresso-600 text-espresso-500"
                        }`}
                      >
                        {done ? (
                          <CheckIcon className="anim-pop h-3.5 w-3.5" />
                        ) : active ? (
                          <span className="h-2 w-2 animate-pulse rounded-full bg-caramel-400" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-espresso-600" />
                        )}
                      </span>
                      <span className={done ? "text-crema-200" : active ? "text-crema-100" : "text-crema-500"}>
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center px-2 py-8 text-center">
              <span className="anim-scale-in grid h-20 w-20 place-items-center rounded-full border border-leaf-400/60 bg-leaf-400/10">
                <CheckIcon className="anim-pop h-9 w-9 text-leaf-300" strokeWidth={2.4} />
              </span>
              <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-crema-50">
                Order confirmed
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-crema-300">
                Your beans join the next roast cycle. A confirmation is on its way to{" "}
                <span className="font-semibold text-crema-100">{form.email || "your inbox"}</span>.
              </p>
              <div className="mt-6 w-full max-w-xs space-y-2.5 rounded-lg border border-espresso-700 bg-espresso-850 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-crema-400">Order</span>
                  <span className="font-mono font-semibold tracking-wide text-caramel-300">
                    {orderId.current}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-crema-400">Arrives by</span>
                  <span className="font-semibold text-crema-100">{deliveryLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-crema-400">Paid</span>
                  <span className="font-semibold text-crema-100">{formatPrice(total)}</span>
                </div>
              </div>
              <button
                onClick={finish}
                className="mt-7 rounded-full bg-caramel-400 px-7 py-3 text-sm font-semibold text-espresso-950 transition-all hover:-translate-y-0.5 hover:bg-caramel-300 active:translate-y-0 active:scale-95"
              >
                Back to the shelf
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
