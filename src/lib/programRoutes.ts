/** Canonical path for a program detail page (single slug segment). */
export function programDetailPath(slug: string): string {
  const s = String(slug || "")
    .trim()
    .replace(/^\/+|\/+$/g, "");
  if (!s) return "/programs";
  return `/programs/${encodeURIComponent(s)}`;
}

/**
 * Normalize CMS-entered paths to `/programs/{slug}`.
 * Accepts `/programs/foo`, `/programs/category/foo`, `programs/foo`, or bare slug `foo`.
 */
export function programHrefFromLink(link: string | undefined | null): string {
  const raw = String(link ?? "").trim();
  if (!raw) return "#";
  if (/^https?:\/\//i.test(raw)) return raw;

  const path = raw.startsWith("/") ? raw : `/${raw}`;
  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "programs") {
    if (segments.length >= 2) {
      const slug = segments[segments.length - 1];
      if (slug) return programDetailPath(slug);
    }
    return "/programs";
  }

  return path;
}
