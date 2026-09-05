import { SparkIcon } from "./icons";
import Reveal from "./Reveal";

function nextRoastDate(): Date {
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 2 || d.getDay() === 5) return d; // roasting Tuesdays & Fridays
  }
  return today;
}

const MARQUEE_WORDS = [
  "Ethiopia Yirgacheffe",
  "Washed process",
  "Jasmine",
  "Bergamot",
  "Kenya Nyeri AA",
  "Blackcurrant",
  "Panela",
  "First crack 9:42",
  "Brown sugar",
  "Sugarcane decaf",
  "Roasted in Brooklyn",
  "Orange zest",
];

function CupArt() {
  return (
    <svg viewBox="0 0 260 250" className="w-full max-w-[380px]" aria-hidden>
      {/* steam */}
      <g stroke="var(--color-caramel-300)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8">
        <path className="anim-steam" d="M106 74c-7-10 7-17 0-27s7-17 0-27" />
        <path className="anim-steam" style={{ animationDelay: "1.1s" }} d="M130 66c-7-10 7-17 0-27s7-17 0-27" />
        <path className="anim-steam" style={{ animationDelay: "2.2s" }} d="M154 74c-7-10 7-17 0-27s7-17 0-27" />
      </g>
      {/* saucer */}
      <ellipse cx="130" cy="216" rx="84" ry="15" fill="none" stroke="var(--color-crema-300)" strokeWidth="2.5" opacity="0.55" />
      <ellipse cx="130" cy="212" rx="56" ry="9" fill="none" stroke="var(--color-crema-300)" strokeWidth="2" opacity="0.35" />
      {/* cup body */}
      <path
        d="M78 118h104l-9 80a16 16 0 0 1-16 14h-54a16 16 0 0 1-16-14z"
        fill="var(--color-espresso-800)"
        stroke="var(--color-crema-200)"
        strokeWidth="3"
      />
      {/* handle */}
      <path
        d="M182 132c19 1 28 12 24 27-4 13-17 18-26 15"
        fill="none"
        stroke="var(--color-crema-200)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* rim + coffee */}
      <ellipse cx="130" cy="118" rx="52" ry="11" fill="var(--color-espresso-700)" stroke="var(--color-crema-200)" strokeWidth="3" />
      <ellipse cx="130" cy="118" rx="43" ry="8" fill="var(--color-caramel-600)" />
      <ellipse cx="130" cy="117" rx="43" ry="8" fill="none" stroke="var(--color-caramel-300)" strokeWidth="1.4" opacity="0.7" />
      <path
        d="M118 117c4-3 9-3 12 0s8 3 12 0"
        fill="none"
        stroke="var(--color-caramel-200)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* ember glow under cup */}
      <ellipse cx="130" cy="232" rx="96" ry="10" fill="var(--color-caramel-500)" opacity="0.12" />
    </svg>
  );
}

const FLOATING_NOTES = [
  { label: "Jasmine", color: "#eeb571", pos: "left-0 top-[12%]", delay: "0s" },
  { label: "Bergamot", color: "#97ab72", pos: "right-[2%] top-[26%]", delay: "1.4s" },
  { label: "Panela", color: "#d1842f", pos: "left-[4%] bottom-[16%]", delay: "2.6s" },
  { label: "Blackcurrant", color: "#c4552d", pos: "right-[8%] bottom-[6%]", delay: "0.8s" },
];

export default function Hero() {
  const roast = nextRoastDate();
  const roastLabel = roast.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-[-10%] h-[540px] w-[540px] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(circle, #d1842f 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-24 h-[480px] w-[480px] rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "radial-gradient(circle, #97ab72 0%, transparent 65%)" }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 pt-32 sm:px-6 sm:pt-40 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:px-8">
        {/* left — the counter pitch */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.26em] text-caramel-300">
              <span className="anim-pulse-dot inline-block h-2 w-2 rounded-full bg-caramel-400" />
              Roasting in Brooklyn · Tue &amp; Fri
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="text-balance mt-6 font-display text-[2.75rem] font-medium leading-[1.02] tracking-tight text-crema-50 sm:text-6xl xl:text-[4.6rem]">
              Roasted at dawn,
              <br />
              <em className="font-light italic text-caramel-300">on your doorstep</em> by Friday.
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-crema-300 sm:text-lg">
              Six small lots, cupped weekly and roasted to order. We buy traceable harvests from
              growers we can name, roast them gently, and ship within 48 hours of first crack —
              while the aromatics are still loud.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#shelf"
                className="group inline-flex items-center gap-2.5 rounded-full bg-caramel-400 px-6 py-3.5 text-sm font-semibold text-espresso-950 shadow-[0_10px_30px_-10px_rgba(209,132,47,0.55)] transition-all hover:-translate-y-0.5 hover:bg-caramel-300 active:translate-y-0 active:scale-95"
              >
                Shop the shelf
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />
                </svg>
              </a>
              <a
                href="#roast-log"
                className="inline-flex items-center gap-2 rounded-full border border-espresso-500 px-6 py-3.5 text-sm font-medium text-crema-200 transition-all hover:border-caramel-500/70 hover:text-crema-50 active:scale-95"
              >
                Read the roast log
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-9 inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-espresso-700 bg-espresso-900/70 px-5 py-3.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-crema-400">
                Next roast
              </span>
              <span className="font-display text-lg italic text-caramel-300">{roastLabel}</span>
              <span className="hidden h-4 w-px bg-espresso-600 sm:block" />
              <span className="text-xs text-crema-400">Order by 18:00 the night before · ships in 48 h</span>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {[
                ["48 h", "roast to door"],
                ["6 lots", "in rotation"],
                ["100%", "traceable harvests"],
              ].map(([big, small]) => (
                <li key={big} className="flex items-baseline gap-2 border-l border-espresso-600 pl-4">
                  <span className="font-display text-xl font-semibold text-crema-50">{big}</span>
                  <span className="text-crema-400">{small}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* right — the cup */}
        <div className="relative lg:col-span-5">
          <Reveal delay={200} className="relative flex items-center justify-center py-6">
            <div
              aria-hidden
              className="anim-spin-slow absolute h-[300px] w-[300px] rounded-full border border-dashed border-espresso-500/70 sm:h-[400px] sm:w-[400px]"
            />
            <div
              aria-hidden
              className="absolute h-[220px] w-[220px] rounded-full border border-espresso-700 sm:h-[300px] sm:w-[300px]"
            />
            <CupArt />
            {FLOATING_NOTES.map((n) => (
              <span
                key={n.label}
                className={`anim-float absolute ${n.pos} inline-flex items-center gap-2 rounded-full border border-espresso-600 bg-espresso-850/85 px-3.5 py-1.5 text-xs font-medium tracking-wide text-crema-200 backdrop-blur-sm`}
                style={{ animationDelay: n.delay }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: n.color }} />
                {n.label}
              </span>
            ))}
          </Reveal>
        </div>
      </div>

      {/* tasting-note marquee */}
      <div className="relative border-y border-espresso-700/80 bg-espresso-900/60 py-3.5">
        <div className="overflow-hidden">
          <div className="anim-marquee flex w-max items-center gap-9 pr-9">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
              <span key={i} className="flex items-center gap-9 whitespace-nowrap">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-crema-400">
                  {word}
                </span>
                <SparkIcon className="h-3 w-3 text-caramel-500" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
