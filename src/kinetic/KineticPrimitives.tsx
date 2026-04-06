import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export function KxEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1 block overflow-visible py-1 font-display text-[0.7rem] font-bold uppercase leading-normal tracking-[0.35em] text-kx-gold">
      {children}
    </p>
  );
}

/** Renders KxEyebrow only when `text` has non-whitespace content. */
export function KxEyebrowIf({ text }: { text?: string | null }) {
  const t = text?.trim();
  if (!t) return null;
  return <KxEyebrow>{t}</KxEyebrow>;
}

export function KxDisplay({
  as: Tag = "h1",
  children,
  className = "",
}: {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag
      className={`font-display font-extrabold tracking-tight text-balance text-kx-cream overflow-visible py-1 leading-[1.18] sm:leading-[1.22] ${className}`}
    >
      {children}
    </Tag>
  );
}

export function KxLead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`font-body text-lg md:text-xl font-medium leading-[1.65] text-kx-muted md:leading-[1.7] ${className}`}
    >
      {children}
    </p>
  );
}

export function KxBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-body text-base leading-relaxed text-kx-muted/95 ${className}`}>
      {children}
    </p>
  );
}

type ActProps = {
  label: string;
  to: string;
  isExternal?: boolean;
  variant?: "solid" | "outline";
  className?: string;
};

export function KxAct({ label, to, isExternal, variant = "solid", className = "" }: ActProps) {
  const external = isExternal || /^https?:\/\//i.test(to);
  const base =
    "inline-flex items-center justify-center px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.12em] rounded-xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-kx-gold";
  const solid =
    "kx-btn-solid shadow-[4px_4px_0_#021140] hover:shadow-[6px_6px_0_#021140] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0_#021140]";
  const outline =
    "border-2 border-kx-gold text-kx-gold bg-transparent hover:bg-kx-gold/10 shadow-[3px_3px_0_rgb(2_17_64/0.5)]";

  const cls = `${base} ${variant === "solid" ? solid : outline} ${className}`;

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
      className={`font-display text-[0.8rem] font-bold uppercase tracking-[0.14em] transition-colors ${
        active ? "text-kx-gold" : "text-kx-cream/75 hover:text-kx-cream"
      }`}
    >
      {children}
    </Link>
  );
}

export function KxPageScaffold({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">{children}</div>
  );
}
