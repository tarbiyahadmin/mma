import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter, Linkedin } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { useQuery } from "@tanstack/react-query";
import { getSiteSettingsDoc } from "@/lib/sanityPageQueries";

const defaultQuickLinks = [
  { label: "Programs", to: "/programs" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
];

const Footer = () => {
  const { data: siteSettings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: getSiteSettingsDoc,
  });

  const tagline =
    siteSettings?.footerTagline ??
    "Nurturing minds and hearts through Qur'anic education, fostering a community of lifelong learners.";
  const rawQuickLinks = (siteSettings?.footerQuickLinks?.length
    ? siteSettings.footerQuickLinks
    : defaultQuickLinks) as { label: string; to: string }[];
  const quickLinks = rawQuickLinks.filter((link) => link.to !== "/contact" && link.to !== "/donate");
  const address = siteSettings?.footerAddress ?? "123 Main Street, Milton, ON L9T 1X1";
  const phone = siteSettings?.footerPhone ?? "(905) 555-0123";
  const email = siteSettings?.footerEmail ?? "info@miltonquran.org";
  const socialLinks = siteSettings?.socialLinks ?? [];
  const copyright = siteSettings?.footerCopyright ?? `© ${new Date().getFullYear()} Milton Qur'an Institute. All rights reserved.`;
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
    <footer className="bg-secondary text-secondary-foreground">
      <div className="geometric-divider" />
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <BrandLogo variant="footer" />
            <p className="text-sm leading-relaxed text-secondary-foreground/70">{tagline}</p>
          </div>

          <div>
            <h4 className="mb-4 overflow-visible py-0.5 text-sm font-semibold uppercase leading-normal tracking-wider text-secondary-foreground/90">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="block overflow-visible py-0.5 text-sm leading-snug text-secondary-foreground/60 transition-colors hover:text-secondary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 overflow-visible py-0.5 text-sm font-semibold uppercase leading-normal tracking-wider text-secondary-foreground/90">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm leading-relaxed text-secondary-foreground/60">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{email}</span>
              </li>
            </ul>
            {socialLinks.length > 0 && (
              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map((s) => {
                  const Icon = socialIcons[s.platform] ?? Mail;
                  return (
                    <a
                      key={s.platform + s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-1.5 text-secondary-foreground/60 transition-colors hover:bg-secondary-foreground/10 hover:text-secondary-foreground"
                      aria-label={s.platform}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="geometric-divider mb-6 mt-10" />
        <p className="overflow-visible py-0.5 text-center text-xs leading-normal text-secondary-foreground/40">
          {copyrightText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
