import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettingsDoc } from "@/lib/sanityPageQueries";

const defaultNavLinks = [
  { label: "Home", to: "/" },
  { label: "Why MMA", to: "/about" },
  { label: "Program", to: "/programs" },
  { label: "Success Stories", to: "/blog" },
];

type NavItem = { label: string; to: string; isButton?: boolean };

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { data: siteSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettingsDoc,
  });

  const rawLinks = (
    siteSettings?.navLinks?.length ? siteSettings.navLinks : defaultNavLinks
  ) as NavItem[];
  const navLinks = rawLinks.filter((link) => link.to !== "/contact" && link.to !== "/donate");

  const isHome = location.pathname === "/";

  const navLinkClass = (path: string) =>
    [
      "text-sm font-semibold",
      "px-3 py-2",
      "border border-transparent",
      "rounded-md",
      "hover:border-border hover:bg-secondary/70",
      location.pathname === path ? "text-accent" : "text-foreground/80",
    ].join(" ");

  const renderLink = (link: NavItem) => {
    const external = /^https?:\/\//i.test(link.to);
    const active = !external && location.pathname === link.to;
    if (link.isButton) {
      const btn = "nb-cta px-4 py-2 text-sm font-extrabold tracking-tight inline-block rounded-[0.85rem]";
      if (external) {
        return (
          <a key={link.to} href={link.to} target="_blank" rel="noopener noreferrer" className={btn}>
            {link.label}
          </a>
        );
      }
      return (
        <Link key={link.to} to={link.to} className={btn}>
          {link.label}
        </Link>
      );
    }
    if (external) {
      return (
        <a
          key={link.to}
          href={link.to}
          target="_blank"
          rel="noopener noreferrer"
          className={navLinkClass(link.to)}
        >
          {link.label}
        </a>
      );
    }
    return (
      <Link key={link.to} to={link.to} className={navLinkClass(link.to)}>
        {link.label}
      </Link>
    );
  };

  return (
    <header
      className={[
        "top-0 z-50",
        isHome ? "absolute left-0 right-0" : "sticky",
        "border-b border-border/60",
        isHome ? "bg-transparent" : "bg-background/70 backdrop-blur-xl",
      ].join(" ")}
    >
      <div className="flex h-16 w-full items-center justify-between px-5 md:h-20 md:px-10">
        <Link to="/" className="flex items-center">
          <BrandLogo variant="header" className="opacity-95" />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex lg:gap-7">
          {navLinks.map((link, i) => (
            <span key={`${i}-${link.to}`}>{renderLink(link)}</span>
          ))}
        </nav>

        <button
          className="rounded-md border border-border/80 bg-secondary/60 p-2 hover:bg-secondary lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/70 bg-background/85 pb-4 backdrop-blur-xl lg:hidden">
          <nav className="flex w-full flex-col gap-1 px-5 pt-3 md:px-10">
            {navLinks.map((link, i) => (
              <span key={`m-${i}-${link.to}`}>
                {link.isButton ? (
                  /^https?:\/\//i.test(link.to) ? (
                    <a
                      href={link.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="mt-2 block w-full rounded-[0.85rem] px-4 py-3 text-center text-sm font-extrabold tracking-tight nb-cta"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.to} onClick={() => setMobileOpen(false)}>
                      <span className="mt-2 block w-full rounded-[0.85rem] px-4 py-3 text-center text-sm font-extrabold tracking-tight nb-cta">
                        {link.label}
                      </span>
                    </Link>
                  )
                ) : (
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "px-4 py-3 text-sm font-extrabold tracking-tight",
                      "rounded-lg border border-border",
                      "hover:bg-secondary/80",
                      location.pathname === link.to ? "text-accent" : "text-foreground",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
