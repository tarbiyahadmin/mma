/** Minimal geometric accents — brand-aligned */

/** Soft radial light pools behind content (fixed, sits above body gradient). */
export function KxAmbientGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
      style={{
        background: `
          radial-gradient(ellipse 90% 60% at 15% 10%, rgb(60 40 120 / 0.18), transparent 55%),
          radial-gradient(ellipse 75% 50% at 85% 5%, rgb(165 123 2 / 0.1), transparent 48%),
          radial-gradient(ellipse 80% 55% at 50% 100%, rgb(20 50 120 / 0.16), transparent 58%),
          radial-gradient(ellipse 55% 40% at 70% 45%, rgb(255 255 255 / 0.05), transparent 52%),
          radial-gradient(ellipse 45% 35% at 30% 60%, rgb(140 60 120 / 0.08), transparent 50%),
          radial-gradient(ellipse 50% 40% at 50% 40%, rgb(212 162 10 / 0.06), transparent 55%),
          radial-gradient(ellipse 35% 30% at 92% 75%, rgb(165 123 2 / 0.08), transparent 50%)
        `,
      }}
    />
  );
}

/**
 * Subtle gold radial glows for dark surfaces — place inside a `relative` parent.
 * `frame`: soft orbs clipped to the framed shell; `hero` / `page` / `section`: content areas.
 */
export function KxGoldGlowField({
  variant = "section",
  className = "",
}: {
  variant?: "frame" | "hero" | "page" | "section";
  className?: string;
}) {
  const a =
    variant === "frame"
      ? "opacity-[0.55]"
      : variant === "hero"
        ? "opacity-[0.85]"
        : variant === "page"
          ? "opacity-[0.7]"
          : "opacity-[0.65]";
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        className={`absolute -left-[18%] top-[8%] h-[min(52%,420px)] w-[min(48%,380px)] rounded-full blur-[56px] ${a}`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(212 162 10 / 0.22) 0%, rgb(165 123 2 / 0.06) 42%, transparent 68%)",
        }}
      />
      <div
        className={`absolute -right-[12%] bottom-[12%] h-[min(45%,360px)] w-[min(42%,320px)] rounded-full blur-[52px] ${a}`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(165 123 2 / 0.18) 0%, rgb(212 162 10 / 0.05) 48%, transparent 70%)",
        }}
      />
      <div
        className={`absolute left-[35%] top-[55%] h-[min(35%,280px)] w-[min(40%,300px)] -translate-x-1/2 rounded-full blur-[64px] ${a}`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(212 162 10 / 0.1) 0%, transparent 62%)",
        }}
      />
    </div>
  );
}

export function KxGrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.1] mix-blend-overlay"
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/** Very subtle column grid for hero backgrounds (structure, not decoration). */
export function KxHeroGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(255 255 255) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(255 255 255) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 6px,
            rgb(255 255 255) 6px,
            rgb(255 255 255) 7px
          )`,
          maskImage: "linear-gradient(to top, black, transparent)",
        }}
      />
    </div>
  );
}

/** Soft radial pool + angled light streak behind hero copy. */
export function KxHeroLighting({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        className="absolute -left-[20%] top-[8%] h-[85%] w-[75%] rounded-full opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(80 120 200 / 0.22) 0%, rgb(40 60 140 / 0.08) 45%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute -right-[10%] top-1/2 h-[120%] w-[40%] -translate-y-1/2 rotate-[12deg] opacity-[0.12]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgb(212 162 10 / 0.25) 45%, transparent 100%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="absolute left-[15%] top-[20%] h-[2px] w-[28%] rotate-[-8deg] rounded-full opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, rgb(255 255 255), transparent)",
        }}
      />
    </div>
  );
}

export function KxLatticeBg({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <svg
        className="h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="kx-lattice"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0L48 12V36L24 48L0 36V12L24 0Z"
              fill="none"
              stroke="#a57b02"
              strokeWidth="0.5"
            />
            <path
              d="M24 12L36 18V30L24 36L12 30V18L24 12Z"
              fill="none"
              stroke="#3d5a8a"
              strokeWidth="0.35"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kx-lattice)" />
      </svg>
    </div>
  );
}

export function KxFlowLine({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 12C80 2 120 22 200 12C280 2 320 22 400 12"
        stroke="url(#kx-g)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="kx-g" x1="0" y1="0" x2="400" y2="0">
          <stop stopColor="#021140" stopOpacity="0" />
          <stop offset="0.35" stopColor="#a57b02" />
          <stop offset="0.65" stopColor="#031a5c" />
          <stop offset="1" stopColor="#021140" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
