/** Minimal geometric accents — brand-aligned */

import { useId } from "react";
import arabicArt from "@/assets/arabic.svg";
import grainTexture from "@/assets/grain.jpg";
import { cn } from "@/lib/utils";

/** Soft radial light pools behind content (fixed, sits above body gradient). */
export function KxAmbientGlow() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
      style={{
        background: `
          radial-gradient(ellipse 90% 60% at 15% 10%, rgb(106 80 118 / 0.14), transparent 55%),
          radial-gradient(ellipse 80% 52% at 88% 6%, rgb(200 184 179 / 0.16), transparent 46%),
          radial-gradient(ellipse 72% 48% at 8% 28%, rgb(173 154 148 / 0.14), transparent 50%),
          radial-gradient(ellipse 85% 58% at 50% 100%, rgb(200 184 179 / 0.1), transparent 56%),
          radial-gradient(ellipse 55% 42% at 70% 42%, rgb(255 255 255 / 0.035), transparent 52%),
          radial-gradient(ellipse 48% 38% at 32% 58%, rgb(173 154 148 / 0.08), transparent 50%),
          radial-gradient(ellipse 42% 36% at 92% 72%, rgb(200 184 179 / 0.09), transparent 48%)
        `,
      }}
    />
  );
}

/**
 * Arabic calligraphy — full-viewport background (cover, centered). Kept very low-contrast.
 */
export function KxArabicBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
      style={{
        backgroundImage: `url(${arabicArt})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        opacity: 0.038,
        mixBlendMode: "soft-light",
        filter: "saturate(0.5) brightness(1.18) contrast(0.92)",
      }}
    />
  );
}

const arabicSectionOverlays: Record<
  "hero-tr" | "hero-bl" | "section-br" | "section-tall" | "page-edge",
  string
> = {
  "hero-tr":
    "bg-gradient-to-b from-kx-void/[0.12] via-transparent to-kx-void/[0.18]",
  "hero-bl":
    "bg-gradient-to-t from-transparent via-kx-void/[0.08] to-kx-void/[0.14]",
  "section-br":
    "bg-gradient-to-bl from-transparent via-kx-void/[0.06] to-kx-altSecondary/[0.04]",
  "section-tall":
    "bg-gradient-to-r from-kx-secondary/[0.03] via-transparent to-kx-void/[0.1]",
  "page-edge":
    "bg-gradient-to-l from-kx-secondary/[0.06] via-kx-void/[0.04] to-transparent",
};

/**
 * Arabic calligraphy — fills the entire `relative` parent (`inset-0`) like a wallpaper layer:
 * `background-size: cover`, centered, responsive. Subtle blend; variant only tweaks the wash gradient.
 */
export function KxArabicSectionArt({
  variant = "hero-tr",
  className = "",
}: {
  variant?: keyof typeof arabicSectionOverlays;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 min-h-full w-full overflow-hidden rounded-[inherit]",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0 min-h-full w-full"
        style={{
          backgroundImage: `url(${arabicArt})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          opacity: 0.055,
          mixBlendMode: "soft-light",
          filter: "saturate(0.48) brightness(1.2) contrast(0.88)",
        }}
      />
      <div className={cn("absolute inset-0 min-h-full w-full", arabicSectionOverlays[variant])} />
    </div>
  );
}

/**
 * Subtle accent radial glows for dark surfaces — place inside a `relative` parent.
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
            "radial-gradient(ellipse at center, rgb(200 184 179 / 0.2) 0%, rgb(173 154 148 / 0.08) 40%, transparent 68%)",
        }}
      />
      <div
        className={`absolute -right-[12%] bottom-[12%] h-[min(45%,360px)] w-[min(42%,320px)] rounded-full blur-[52px] ${a}`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(141 115 153 / 0.16) 0%, rgb(106 80 118 / 0.07) 48%, transparent 70%)",
        }}
      />
      <div
        className={`absolute left-[35%] top-[55%] h-[min(35%,280px)] w-[min(40%,300px)] -translate-x-1/2 rounded-full blur-[64px] ${a}`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(173 154 148 / 0.14) 0%, rgb(200 184 179 / 0.06) 52%, transparent 64%)",
        }}
      />
      <div
        className={`absolute right-[28%] top-[12%] h-[min(28%,220px)] w-[min(32%,260px)] rounded-full blur-[48px] ${a}`}
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(200 184 179 / 0.12) 0%, transparent 62%)",
        }}
      />
    </div>
  );
}

export function KxGrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] mix-blend-soft-light"
      aria-hidden
      style={{
        opacity: 0.22,
        backgroundImage: `url(${grainTexture})`,
        backgroundRepeat: "repeat",
        backgroundSize: "min(520px, 140vw) min(520px, 140vh)",
        backgroundPosition: "center",
      }}
    />
  );
}

/** Very subtle column grid for hero backgrounds (structure, not decoration). */
export function KxHeroGrid({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(200 184 179) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(200 184 179) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 opacity-[0.055]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 6px,
            rgb(173 154 148) 6px,
            rgb(173 154 148) 7px
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
        className="absolute -left-[20%] top-[8%] h-[85%] w-[75%] rounded-full opacity-[0.38]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(173 154 148 / 0.14) 0%, rgb(106 80 118 / 0.1) 42%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      <div
        className="absolute -right-[10%] top-1/2 h-[120%] w-[40%] -translate-y-1/2 rotate-[12deg] opacity-[0.16]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgb(200 184 179 / 0.22) 42%, rgb(173 154 148 / 0.12) 58%, transparent 100%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="absolute left-[15%] top-[20%] h-[2px] w-[28%] rotate-[-8deg] rounded-full opacity-35"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgb(200 184 179 / 0.85), transparent)",
        }}
      />
    </div>
  );
}

export function KxLatticeBg({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const patternId = `kx-lattice-${uid}`;
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <svg
        className="h-full w-full opacity-[0.055]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0L48 12V36L24 48L0 36V12L24 0Z"
              fill="none"
              stroke="#c8b8b3"
              strokeWidth="0.5"
            />
            <path
              d="M24 12L36 18V30L24 36L12 30V18L24 12Z"
              fill="none"
              stroke="#ad9a94"
              strokeWidth="0.35"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}

export function KxFlowLine({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `kx-flow-${uid}`;
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
        stroke={`url(#${gradId})`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="400" y2="0">
          <stop stopColor="#1f1526" stopOpacity="0" />
          <stop offset="0.22" stopColor="#ad9a94" stopOpacity="0.9" />
          <stop offset="0.48" stopColor="#c8b8b3" />
          <stop offset="0.72" stopColor="#6a5076" />
          <stop offset="1" stopColor="#1f1526" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
