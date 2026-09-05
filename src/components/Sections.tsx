import { useState, type FormEvent } from "react";
import { useCart } from "../store/CartContext";
import { CheckIcon, FlameLogo, LeafIcon, PinIcon } from "./icons";
import Reveal from "./Reveal";

/* ---------------- Roast log ---------------- */

const BATCHES = [
  { batch: "EMB-2481", coffee: "Ethiopia Yirgacheffe", date: "Jun 10", crack: "9:42", dev: "1:48", score: 88.5, tag: "Light" },
  { batch: "EMB-2478", coffee: "Morning Ritual blend", date: "Jun 10", crack: "10:15", dev: "2:10", score: 86.0, tag: "Medium" },
  { batch: "EMB-2474", coffee: "Colombia Huila", date: "Jun 6", crack: "9:58", dev: "2:04", score: 87.5, tag: "Medium" },
  { batch: "EMB-2469", coffee: "Kenya Nyeri AA", date: "Jun 6", crack: "9:31", dev: "1:36", score: 89.0, tag: "Light" },
  { batch: "EMB-2465", coffee: "Night Shift espresso", date: "Jun 3", crack: "10:41", dev: "2:52", score: 84.5, tag: "Dark" },
];

export function RoastLog() {
  return (
    <section id="roast-log" className="relative scroll-mt-24 border-t border-espresso-800 bg-espresso-900/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.26em] text-caramel-300">
              The roast log
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-crema-50 sm:text-5xl">
              From the drum,
              <br />
              <em className="italic text-caramel-300">with numbers.</em>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-crema-300 sm:text-base">
              Every batch gets a curve, a cupping score, and a first-crack timestamp. If a lot
              scores under 84, it never makes the shelf. These are the most recent cycles off our
              12-kilo Loring.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-8 max-w-md rounded-lg border border-espresso-700 bg-espresso-900/70 p-5">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-crema-400">
                <span>Batch EMB-2469 · Kenya Nyeri</span>
                <span className="text-caramel-300">89.0 pts</span>
              </div>
              <svg viewBox="0 0 320 90" className="mt-4 w-full" aria-hidden>
                <line x1="0" y1="80" x2="320" y2="80" stroke="var(--color-espresso-600)" strokeWidth="1" />
                <path
                  d="M6 78 C 40 74, 60 62, 90 50 S 150 26, 190 20 S 260 14, 314 10"
                  fill="none"
                  stroke="var(--color-caramel-400)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="anim-draw"
                />
                <circle cx="190" cy="20" r="3.5" fill="var(--color-ember-400)" />
              </svg>
              <div className="mt-3 flex items-center justify-between text-[11px] text-crema-500">
                <span>
                  Charge 200°C · first crack <span className="text-ember-400">9:31</span>
                </span>
                <span>Drop 204°C · 11:07</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-lg border border-espresso-700 bg-espresso-900/50">
              {BATCHES.map((b, i) => (
                <Reveal key={b.batch} delay={i * 70}>
                  <div
                    className={`group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-espresso-800/70 ${
                      i > 0 ? "border-t border-espresso-700/70" : ""
                    }`}
                  >
                    <span className="font-mono text-xs font-semibold tracking-wide text-caramel-400">
                      {b.batch}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-display text-base font-semibold text-crema-50 transition-colors group-hover:text-caramel-200 sm:text-lg">
                        {b.coffee}
                      </p>
                      <p className="mt-0.5 text-[11px] text-crema-500">
                        {b.date} · first crack {b.crack} · dev {b.dev}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden text-[11px] font-medium uppercase tracking-[0.14em] text-crema-400 sm:block">
                        {b.tag}
                      </span>
                      <span className="rounded-full border border-caramel-600/50 bg-caramel-400/10 px-2.5 py-1 text-xs font-bold text-caramel-300">
                        {b.score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 flex items-center gap-2 text-xs text-crema-500">
              <LeafIcon className="h-4 w-4 text-leaf-400" />
              Curves logged automatically · cupped blind by the whole team every Friday
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

export function Footer() {
  const { pushToast } = useCart();
  const [email, setEmail] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      pushToast("Hmm, that email looks off", "Double-check it and try again.");
      return;
    }
    pushToast("You're on the list", "First-crack notes land monthly.");
    setEmail("");
  };

  return (
    <footer id="visit" className="scroll-mt-24 border-t border-espresso-800 bg-espresso-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <FlameLogo className="h-8 w-8 text-caramel-400" />
            <span className="font-display text-xl font-semibold text-crema-50">Ember &amp; Oak</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-crema-400">
            A tiny roastery above a bicycle shop in Greenpoint. Six lots at a time, roasted twice a
            week, cupped on Fridays, argued about constantly.
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-caramel-300">
            Find us
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-crema-300">
            <li className="flex items-start gap-2.5">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-caramel-500" />
              112 Freeman Street, Brooklyn, NY 11222
            </li>
            <li>Espresso bar — Wed to Sun, 8:00–15:00</li>
            <li>Roastery tours — Saturdays at 10:00</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-caramel-300">
            First crack, in your inbox
          </h3>
          <p className="mt-4 text-sm text-crema-400">
            One email a month: new lots, roast-log highlights, zero latte art memes.
          </p>
          <form onSubmit={subscribe} className="mt-4 flex gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              aria-label="Email address"
              className="w-full min-w-0 rounded-full border border-espresso-600 bg-espresso-900 px-4 py-2.5 text-sm text-crema-100 placeholder:text-crema-500 transition-all focus:border-caramel-500/70 focus:outline-none focus:ring-2 focus:ring-caramel-500/25"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-caramel-400 px-5 py-2.5 text-sm font-semibold text-espresso-950 transition-all hover:bg-caramel-300 active:scale-95"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-espresso-800/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-[11px] text-crema-500 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 Ember &amp; Oak Roasters · demo storefront — no real orders, sadly</p>
          <p className="flex items-center gap-1.5">
            Roasted with patience
            <CheckIcon className="h-3.5 w-3.5 text-caramel-500" />
            in Brooklyn, NY
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Toasts ---------------- */

export function Toasts() {
  const { toasts, dismissToast } = useCart();
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[90] flex w-max max-w-[92vw] -translate-x-1/2 flex-col items-center gap-2">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismissToast(t.id)}
          className="anim-toast pointer-events-auto flex items-center gap-3 rounded-full border border-caramel-600/40 bg-espresso-800/95 py-2.5 pl-3 pr-5 text-left shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md transition-transform hover:scale-[1.02]"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-caramel-400 text-espresso-950">
            <CheckIcon className="h-4 w-4" strokeWidth={2.4} />
          </span>
          <span>
            <span className="block text-sm font-semibold leading-tight text-crema-50">{t.title}</span>
            {t.sub && <span className="block text-[11px] text-crema-400">{t.sub}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}
