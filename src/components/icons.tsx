interface IconProps {
  className?: string;
  strokeWidth?: number;
}

function base(className?: string) {
  return className ?? "h-5 w-5";
}

export function BeanIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className={base(className)} aria-hidden>
      <ellipse cx="12" cy="12" rx="7.2" ry="9" transform="rotate(24 12 12)" />
      <path d="M9.2 4.9c2.6 2.4 2.4 4.6.4 6.7s-2.2 4.5.2 7.2" />
    </svg>
  );
}

export function FlameLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={base(className)} aria-hidden>
      <path
        d="M16 3c5.2 4 8.2 7.9 8.2 12.6A8.2 8.2 0 0 1 7.8 15.6C7.8 10.9 10.8 7 16 3z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M16 11.5c2.6 2.1 4 4.1 4 6.4a4 4 0 0 1-8 0c0-2.3 1.4-4.3 4-6.4z"
        fill="var(--color-espresso-950)"
      />
    </svg>
  );
}

export function CartIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <path d="M3 4h2.2l1 3m0 0 1.7 8.2A1.6 1.6 0 0 0 9.5 16.5h8a1.6 1.6 0 0 0 1.55-1.2L20.8 8H6.2z" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="17.4" cy="20" r="1.3" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={base(className)} aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </svg>
  );
}

export function XIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)} aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={base(className)} aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={base(className)} aria-hidden>
      <path d="M5 12h14" />
    </svg>
  );
}

export function CheckIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />
    </svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <path d="M4 7h16M9.5 4h5M6.5 7l.9 12a1.6 1.6 0 0 0 1.6 1.5h6a1.6 1.6 0 0 0 1.6-1.5l.9-12M10 11v6m4-6v6" />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <path d="M2.5 5.5h11.5v11H2.5zM14 9.5h4l3 3.5v3.5h-7" />
      <circle cx="6.5" cy="17.8" r="1.8" />
      <circle cx="17.2" cy="17.8" r="1.8" />
    </svg>
  );
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <path d="M5 19C5 9 12 4 20 4c0 9-5 15-15 15z" />
      <path d="M5 19c3-5 6.5-8.5 11-11" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <path d="M12 21s-6.5-5.4-6.5-10.3A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.7C18.5 15.6 12 21 12 21z" />
      <circle cx="12" cy="10.6" r="2.3" />
    </svg>
  );
}

export function SparkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)} aria-hidden>
      <path d="M12 2.5c.7 5.4 4.1 8.8 9.5 9.5-5.4.7-8.8 4.1-9.5 9.5-.7-5.4-4.1-8.8-9.5-9.5 5.4-.7 8.8-4.1 9.5-9.5z" />
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={base(className)} aria-hidden>
      <path d="M5.5 8h13l-1 12.5h-11zM9 10V6.5a3 3 0 0 1 6 0V10" />
    </svg>
  );
}

/** Five roasted-bean dots showing roast level */
export function RoastMeter({ level, className }: { level: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className ?? ""}`} title={`Roast level ${level}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`inline-block h-[7px] w-[10px] rounded-[50%] rotate-[24deg] ${
            i <= level ? "bg-caramel-400" : "bg-espresso-600"
          }`}
        />
      ))}
    </span>
  );
}
