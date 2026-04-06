import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrandLogo } from "@/components/BrandLogo";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettingsDoc } from "@/lib/sanityPageQueries";
import { KxFlowLine } from "./KineticDecor";
import { KxTextNav } from "./KineticPrimitives";

const defaultNavLinks = [
  { label: "Home", to: "/" },
  { label: "Why MMA", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Stories", to: "/blog" },
];

type NavItem = { label: string; to: string; isButton?: boolean };

function isNavActive(pathname: string, to: string) {
  if (/^https?:\/\//i.test(to)) return false;
  if (pathname === to) return true;
  if (to === "/programs" && pathname.startsWith("/programs/")) return true;
  return false;
}

function NavItemView({
  link,
  active,
  onNavigate,
  mobile,
}: {
  link: NavItem;
  active: boolean;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const external = /^https?:\/\//i.test(link.to);
  const isBtn = link.isButton === true;

  const btnCls = mobile
    ? "kx-btn-solid block w-full rounded-xl px-5 py-3.5 text-center font-display text-xs font-bold uppercase tracking-[0.18em] text-kx-void shadow-kx-lift"
    : "kx-btn-solid inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.18em] text-kx-void shadow-kx-lift transition-all hover:-translate-y-0.5";

  const textCls = mobile
    ? `border-b border-white/10 py-5 font-display text-2xl font-bold tracking-tight ${
        active ? "text-kx-gold" : "text-kx-cream"
      }`
    : undefined;

  if (isBtn) {
    if (external) {
      return (
        <a
          href={link.to}
          target="_blank"
          rel="noopener noreferrer"
          className={btnCls}
          onClick={onNavigate}
        >
          {link.label}
        </a>
      );
    }
    return (
      <Link to={link.to} className={btnCls} onClick={onNavigate}>
        {link.label}
      </Link>
    );
  }

  if (external) {
    return (
      <a
        href={link.to}
        target="_blank"
        rel="noopener noreferrer"
        className={
          mobile
            ? textCls
            : "font-display text-[0.8rem] font-bold uppercase tracking-[0.14em] text-kx-cream/75 hover:text-kx-cream"
        }
        onClick={onNavigate}
      >
        {link.label}
      </a>
    );
  }

  if (mobile) {
    return (
      <Link to={link.to} onClick={onNavigate} className={textCls}>
        {link.label}
      </Link>
    );
  }

  return <KxTextNav to={link.to} active={active}>{link.label}</KxTextNav>;
}

export function KineticHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { data: siteSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettingsDoc,
  });

  const rawLinks = (
    siteSettings?.navLinks?.length ? siteSettings.navLinks : defaultNavLinks
  ) as NavItem[];
  const navLinks = rawLinks.filter((l) => l.to !== "/contact" && l.to !== "/donate");

  const isHome = location.pathname === "/";

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-colors ${
          isHome
            ? "border-white/10 bg-kx-void/20 backdrop-blur-md"
            : "border-white/10 bg-kx-void/85 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
          <Link to="/" className="flex shrink-0 items-center">
            <BrandLogo variant="header" className="opacity-[0.98]" />
          </Link>

          <nav className="hidden items-center gap-6 lg:gap-8 xl:gap-10 lg:flex">
            {navLinks.map((link, i) => (
              <NavItemView
                key={`nav-${i}-${link.to}`}
                link={link}
                active={isNavActive(location.pathname, link.to)}
              />
            ))}
          </nav>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-kx-ink/60 font-display text-xs font-bold text-kx-cream lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "×" : "≡"}
          </button>
        </div>
        <div className="px-5 sm:px-8 lg:px-12">
          <KxFlowLine className="h-3 w-full opacity-60" />
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-kx-void/92 backdrop-blur-lg lg:hidden"
          style={{ paddingTop: "5.5rem" }}
        >
          <nav className="mx-auto flex max-w-md flex-col gap-0 px-8 py-8">
            {navLinks.map((link, i) => (
              <div
                key={`mnav-${i}-${link.to}`}
                style={{ marginLeft: i % 2 === 1 && !link.isButton ? "1.5rem" : 0 }}
              >
                <NavItemView
                  link={link}
                  active={isNavActive(location.pathname, link.to)}
                  onNavigate={() => setOpen(false)}
                  mobile
                />
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
