import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrandLogo } from "@/components/BrandLogo";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettingsDoc } from "@/lib/sanityPageQueries";
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
    ? "kx-btn-solid mx-auto mt-2 block w-full max-w-md rounded-full px-5 py-3.5 text-center font-display text-xs font-bold uppercase tracking-[0.18em] text-kx-void shadow-kx-glow-gold"
    : "kx-btn-solid inline-flex items-center justify-center rounded-full px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.18em] text-kx-void shadow-kx-glow-gold transition-all hover:-translate-y-0.5";

  const textCls = mobile
    ? `block w-full rounded-xl px-4 py-4 text-left font-display text-base font-semibold tracking-tight transition-colors active:scale-[0.99] ${
        active ? "bg-white/[0.07] text-kx-gold" : "text-kx-cream hover:bg-white/[0.05]"
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
            : "font-display text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-kx-cream/70 hover:text-kx-cream"
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

  return (
    <KxTextNav to={link.to} active={active}>
      {link.label}
    </KxTextNav>
  );
}

export function KineticHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
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

  const updateNavTop = () => {
    const el = headerRef.current;
    if (!el) return;
    const bottom = el.getBoundingClientRect().bottom;
    document.documentElement.style.setProperty("--kx-nav-panel-top", `${bottom}px`);
  };

  useLayoutEffect(() => {
    updateNavTop();
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateNavTop);
    ro.observe(el);
    window.addEventListener("resize", updateNavTop);
    window.addEventListener("scroll", updateNavTop, true);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateNavTop);
      window.removeEventListener("scroll", updateNavTop, true);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    updateNavTop();
    const onDocDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || buttonRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 rounded-t-[1.75rem] border-b transition-colors ${
        isHome
          ? "border-white/[0.06] bg-kx-void/35 backdrop-blur-xl"
          : "border-white/[0.06] bg-kx-void/55 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <BrandLogo variant="header" className="opacity-[0.98]" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex lg:gap-9 xl:gap-10">
          {navLinks.map((link, i) => (
            <NavItemView
              key={`nav-${i}-${link.to}`}
              link={link}
              active={isNavActive(location.pathname, link.to)}
            />
          ))}
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] font-display text-lg font-bold leading-none text-kx-cream backdrop-blur-sm transition-transform active:scale-95 lg:hidden"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls="kx-mobile-nav"
          id="kx-mobile-menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "×" : "≡"}
        </button>
      </div>
      <div className="px-5 sm:px-8 lg:px-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      {open ? (
        <div
          ref={panelRef}
          id="kx-mobile-nav"
          role="menu"
          aria-labelledby="kx-mobile-menu-button"
          className="fixed inset-x-0 z-[60] w-full max-w-none animate-in fade-in slide-in-from-top-2 overflow-y-auto border-b border-white/[0.1] bg-kx-void/[0.97] px-5 py-6 pb-10 shadow-[0_28px_90px_-24px_rgb(0_0_0/0.65)] backdrop-blur-2xl duration-200 ease-out lg:hidden"
          style={{
            top: "var(--kx-nav-panel-top, 5.25rem)",
            maxHeight: "calc(100dvh - var(--kx-nav-panel-top, 5.25rem))",
          }}
        >
          <div className="mx-auto w-full max-w-[1400px] sm:px-3">
            <nav className="flex flex-col gap-1 pt-2">
              {navLinks.map((link, i) => (
                <div key={`mnav-${i}-${link.to}`} role="none">
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
        </div>
      ) : null}
    </header>
  );
}
