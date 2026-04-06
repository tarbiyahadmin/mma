/** Minimal geometric accents — brand-aligned */

/** Soft radial light pools behind content (fixed, sits above body gradient). */
export function KxAmbientGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
      style={{
        background: `
          radial-gradient(ellipse 85% 55% at 12% 18%, rgb(45 90 180 / 0.14), transparent 52%),
          radial-gradient(ellipse 70% 50% at 88% 12%, rgb(165 123 2 / 0.07), transparent 48%),
          radial-gradient(ellipse 75% 45% at 50% 92%, rgb(20 55 130 / 0.12), transparent 55%),
          radial-gradient(ellipse 50% 35% at 72% 48%, rgb(255 255 255 / 0.04), transparent 50%)
        `,
      }}
    />
  );
}

export function KxGrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.085] mix-blend-overlay"
      aria-hidden
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

export function KxLatticeBg({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <svg
        className="h-full w-full opacity-[0.06]"
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
