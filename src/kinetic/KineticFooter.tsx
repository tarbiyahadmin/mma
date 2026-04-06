import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter, Linkedin } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettingsDoc } from "@/lib/sanityPageQueries";
import { KxLatticeBg } from "./KineticDecor";

const defaultQuickLinks = [
  { label: "Programs", to: "/programs" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
];

export function KineticFooter() {
  const { data: siteSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettingsDoc,
  });

  const tagline =
    siteSettings?.footerTagline ??
    "Youth mentorship rooted in Qur'anic adab — building confident, caring leaders.";
  const rawQuick = (siteSettings?.footerQuickLinks?.length
    ? siteSettings.footerQuickLinks
    : defaultQuickLinks) as { label: string; to: string }[];
  const quickLinks = rawQuick.filter((l) => l.to !== "/contact" && l.to !== "/donate");
  const address = siteSettings?.footerAddress ?? "123 Main Street, Milton, ON L9T 1X1";
  const phone = siteSettings?.footerPhone ?? "(905) 555-0123";
  const email = siteSettings?.footerEmail ?? "info@miltonquran.org";
  const socialLinks = siteSettings?.socialLinks ?? [];
  const copyright = siteSettings?.footerCopyright ?? `© {year} Muslim Mentorship Academy`;
  const copyrightText = copyright.includes("{year}")
    ? copyright.replace("{year}", String(new Date().getFullYear()))
    : copyright;

  const socialIcons: Record<string, typeof Instagram> = {
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
    twitter: Twitter,
    linkedin: Linkedin,
    tiktok: Instagram,
  };

  return (
    <footer className="relative z-[2] mt-auto overflow-hidden border-t border-kx-gold/25 bg-kx-navy">
      <KxLatticeBg />
      <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-start">
          <div>
            <BrandLogo variant="footer" className="opacity-95" />
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-kx-muted">
              {tagline}
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 sm:gap-10">
            <div>
              <p className="mb-1 overflow-visible py-1 font-display text-[0.65rem] font-bold uppercase leading-normal tracking-[0.35em] text-kx-gold">
                Explore
              </p>
              <ul className="mt-3 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="block overflow-visible py-0.5 font-display text-xl font-bold leading-snug tracking-tight text-kx-cream hover:text-kx-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:border-l sm:border-white/10 sm:pl-10">
              <p className="mb-1 overflow-visible py-1 font-display text-[0.65rem] font-bold uppercase leading-normal tracking-[0.35em] text-kx-gold">
                Contact
              </p>
              <ul className="mt-3 space-y-4 text-sm leading-relaxed text-kx-muted">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-kx-gold/80" />
                  <span>{address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-kx-gold/80" />
                  <span>{phone}</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-kx-gold/80" />
                  <span>{email}</span>
                </li>
              </ul>
              {socialLinks.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {socialLinks.map((s) => {
                    const Icon = socialIcons[s.platform] ?? Mail;
                    return (
                      <a
                        key={s.platform + s.url}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-kx-ink/50 text-kx-muted transition-colors hover:border-kx-gold/50 hover:text-kx-gold"
                        aria-label={s.platform}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="overflow-visible py-0.5 font-display text-xs uppercase leading-normal tracking-[0.2em] text-kx-muted/80">
            {copyrightText}
          </p>
          <Link
            to="/programs"
            className="overflow-visible py-0.5 font-display text-xs font-bold uppercase leading-normal tracking-[0.25em] text-kx-gold hover:text-kx-cream"
          >
            Explore programs →
          </Link>
        </div>
      </div>
    </footer>
  );
}
