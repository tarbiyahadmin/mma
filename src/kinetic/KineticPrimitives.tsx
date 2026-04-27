import { Link } from "react-router-dom";
import type { ElementType, ReactNode } from "react";
import { KxArabicSectionArt, KxGoldGlowField } from "@/kinetic/KineticDecor";
import { cn } from "@/lib/utils";

/** Shared scale: hero (home only) → h1 page titles → h2 sections → h3 cards / subsections */
const KX_HEADING_SIZES = {
  hero: "text-[2.85rem] leading-[1.14] sm:text-5xl sm:leading-[1.15] md:text-6xl md:leading-[1.17] lg:text-[4.35rem] lg:leading-[1.19] xl:text-[4.85rem] xl:leading-[1.2]",
  h1: "text-[2.65rem] leading-[1.15] sm:text-5xl sm:leading-[1.17] md:text-6xl md:leading-[1.19] lg:text-7xl lg:leading-[1.2] xl:text-[4.15rem] xl:leading-[1.21]",
  h2: "text-[2.1rem] leading-[1.17] sm:text-4xl sm:leading-[1.19] md:text-5xl md:leading-[1.21] lg:text-6xl lg:leading-[1.23]",
  h3: "text-[1.45rem] leading-[1.2] sm:text-2xl sm:leading-[1.22] md:text-3xl md:leading-[1.24] lg:text-4xl lg:leading-[1.26]",
} as const;

export type KxHeadingSize = keyof typeof KX_HEADING_SIZES;

function renderGradientTitle(text: string) {
  const t = text.trim();
  if (!t) return null;
  const sp = t.indexOf(" ");
  const first = sp === -1 ? t : t.slice(0, sp);
  const rest = sp === -1 ? "" : t.slice(sp + 1);
  return (
    <>
      <span className="kx-hero-gradient-text">{first}</span>
      {rest ? <span className="text-kx-cream"> {rest}</span> : null}
    </>
  );
}

/**
 * Primary heading / title component: Inter, semibold, hero-style split gradient on plain string children.
 * Non-string children render as solid cream (no gradient) for rich content.
 */
export function KxDisplay({
  as,
  children,
  className = "",
  size,
  gradient = true,
}: {
  as?: "h1" | "h2" | "h3" | "span";
  children: ReactNode;
  className?: string;
  size?: KxHeadingSize;
  /** When true and `children` is a string, first word uses `.kx-hero-gradient-text`. */
  gradient?: boolean;
}) {
  const Tag = (as ?? "h1") as ElementType;
  const inferredSize: KxHeadingSize =
    size ??
    (as === "h2" ? "h2" : as === "h3" || as === "span" ? "h3" : "h1");
  const resolvedSize: KxHeadingSize = as === "span" && !size ? "h3" : inferredSize;
  const sizeCls = KX_HEADING_SIZES[resolvedSize];
  const base = "font-display font-semibold tracking-tight text-balance overflow-visible py-1";

  if (gradient && typeof children === "string") {
    const t = children.trim();
    if (!t) {
      return <Tag className={cn(base, sizeCls, className)} />;
    }
    return <Tag className={cn(base, sizeCls, className)}>{renderGradientTitle(t)}</Tag>;
  }

  return (
    <Tag className={cn(base, sizeCls, "text-kx-cream", className)}>
      {children}
    </Tag>
  );
}

export function KxLead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`font-body text-lg md:text-[1.125rem] font-medium leading-[1.72] text-kx-muted md:leading-[1.78] ${className}`}
    >
      {children}
    </p>
  );
}

export function KxBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-body text-base leading-[1.65] text-kx-muted/95 ${className}`}>
      {children}
    </p>
  );
}

type ActProps = {
  label: string;
  to: string;
  isExternal?: boolean;
  variant?: "solid" | "outline";
  /** `hero`: dark pill + soft gold glow (homepage-style). `brand`: gold gradient pill. */
  tone?: "brand" | "hero";
  className?: string;
};

export function KxAct({
  label,
  to,
  isExternal,
  variant = "solid",
  tone = "brand",
  className = "",
}: ActProps) {
  const external = isExternal || /^https?:\/\//i.test(to);
  const base =
    "inline-flex items-center justify-center px-8 py-3.5 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.16em] rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kx-primary/60";
  const solidBrand =
    "kx-btn-solid shadow-kx-glow-gold hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0";
  const outlineBrand =
    "border border-kx-primary/45 bg-kx-primary/[0.06] text-kx-secondary shadow-[0_0_0_1px_rgb(106_80_118/0.2)] backdrop-blur-sm hover:bg-kx-primary/12";
  const solidHero =
    "border border-white/[0.1] bg-[#1a1422] text-kx-cream shadow-[0_0_0_1px_rgb(255_255_255/0.06),0_0_48px_-12px_rgb(106_80_118/0.26)] hover:border-kx-primary/35 hover:bg-[#221a2c] hover:shadow-[0_0_56px_-8px_rgb(106_80_118/0.32)]";
  const outlineHero =
    "border border-white/15 bg-white/[0.04] text-kx-cream/95 backdrop-blur-sm hover:border-kx-primary/35 hover:bg-white/[0.07]";

  const cls =
    `${base} ${
      variant === "outline"
        ? tone === "hero"
          ? outlineHero
          : outlineBrand
        : tone === "hero"
          ? solidHero
          : solidBrand
    } ${className}`;

  if (external && /^https?:\/\//i.test(to)) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>
        {label}
      </a>
    );
  }
  return (
    <Link to={to} className={cls}>
      {label}
    </Link>
  );
}

export function KxTextNav({
  to,
  children,
  active,
}: {
  to: string;
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`font-display text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
        active ? "text-kx-primary" : "text-kx-cream/70 hover:text-kx-cream"
      }`}
    >
      {children}
    </Link>
  );
}

export function KxPageScaffold({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
        <KxGoldGlowField variant="page" />
        <KxArabicSectionArt variant="page-edge" className="hidden md:block" />
      </div>
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
