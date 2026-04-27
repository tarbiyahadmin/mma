import { Link } from "react-router-dom";
import { KxDisplay } from "@/kinetic/KineticPrimitives";
import { cn } from "@/lib/utils";

export type ProgramPromoCardLinkMode = "internal" | "external" | "none";

export type ProgramPromoCardProps = {
  title: string;
  description?: string;
  linkLabel?: string;
  href: string;
  comingSoon?: boolean;
  /** When true, shows the gold index label (Programs page). */
  showIndex?: boolean;
  index?: number;
  linkMode?: ProgramPromoCardLinkMode;
  /** Matches existing Programs vs homepage slab spacing and hover motion. */
  variant?: "programs" | "home";
  /** Extra classes on the outer interactive wrapper (Link / anchor / div). */
  className?: string;
  /** Classes for the article slab (padding, hover motion). */
  articleClassName?: string;
};

function ComingSoonBadge() {
  return (
    <span className="inline-flex shrink-0 items-center rounded-md border border-white/15 bg-white/[0.04] px-2.5 py-1 font-display text-[0.6rem] font-bold uppercase tracking-[0.28em] text-kx-cream/80">
      Coming soon
    </span>
  );
}

export function ProgramPromoCard({
  title,
  description,
  linkLabel = "View program",
  href,
  comingSoon = false,
  showIndex = false,
  index = 0,
  linkMode: linkModeProp,
  variant = "home",
  className,
  articleClassName,
}: ProgramPromoCardProps) {
  const linkMode: ProgramPromoCardLinkMode = comingSoon ? "none" : linkModeProp ?? "internal";

  const article = (
    <article
      className={cn(
        "kx-slab w-full border",
        variant === "programs" ? "p-7 md:p-10" : "p-6 md:p-8",
        comingSoon
          ? "border-white/[0.07] opacity-[0.78] shadow-none saturate-[0.88]"
          : cn(
              "border-kx-secondary/14 transition duration-300 group-hover:border-kx-secondary/35 group-hover:shadow-[0_0_0_1px_rgb(173_154_148/0.12)]",
              variant === "programs" && "shadow-kx",
              variant === "home" && "transition-transform duration-300 group-hover:-translate-y-0.5",
            ),
        articleClassName,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        {showIndex || comingSoon ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {showIndex ? (
              <span className="font-display text-[0.65rem] font-bold uppercase tracking-[0.35em] text-kx-primary/85">
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
            {comingSoon ? <ComingSoonBadge /> : null}
          </div>
        ) : null}
        <KxDisplay as="h3" size="h2" className={cn(showIndex || comingSoon ? "mt-3" : "")}>
          {title}
        </KxDisplay>
        {description ? (
          <p
            className={cn(
              "font-body text-kx-muted",
              variant === "programs"
                ? "mt-4 max-w-xl text-lg leading-relaxed"
                : "mt-3 max-w-prose leading-relaxed",
            )}
          >
            {description}
          </p>
        ) : null}
        {!comingSoon ? (
          <span
            className={cn(
              "inline-block font-display text-xs font-bold uppercase text-kx-primary",
              variant === "programs" ? "mt-8 tracking-[0.22em]" : "mt-6 tracking-[0.2em]",
            )}
          >
            {linkLabel}
          </span>
        ) : (
          <span
            className={cn(
              "font-display text-xs font-bold uppercase tracking-[0.2em] text-kx-muted/70",
              variant === "programs" ? "mt-8" : "mt-6",
            )}
          >
            Details available when enrollment opens
          </span>
        )}
      </div>
    </article>
  );

  const wrapClass = cn("block w-full", !comingSoon && "group cursor-pointer", comingSoon && "cursor-not-allowed", className);

  if (linkMode === "none") {
    return (
      <div className={wrapClass} aria-disabled="true" title="Coming soon">
        {article}
      </div>
    );
  }

  if (linkMode === "external") {
    return (
      <a href={href} className={wrapClass}>
        {article}
      </a>
    );
  }

  return (
    <Link to={href} className={wrapClass}>
      {article}
    </Link>
  );
}
