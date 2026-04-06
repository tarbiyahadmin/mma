import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageSeo } from "@/components/PageSeo";
import { getProgramsForListingDoc, getProgramsPageDoc } from "@/lib/sanityPageQueries";
import type { ProgramDoc } from "@/lib/sanityPageQueries";
import { urlFor } from "@/lib/sanity";
import { programDetailPath, programHrefFromLink } from "@/lib/programRoutes";
import { KxDisplay, KxEyebrowIf, KxPageScaffold } from "@/kinetic/KineticPrimitives";
import { KxFlowLine } from "@/kinetic/KineticDecor";

type ListingCard = {
  title: string;
  description?: string;
  image?: { asset?: { url?: string | null } | null } | null;
  href: string;
  linkLabel?: string;
  external: boolean;
};

function normalizeRawCard(raw: Record<string, unknown> | undefined): ListingCard | null {
  if (!raw) return null;
  const type = raw._type as string | undefined;

  if (type === "programListCard") {
    const prog = raw.program as ProgramDoc | null | undefined;
    const slug = prog?.slug?.trim();
    if (!slug) return null;
    const overrideImg = raw.image as ListingCard["image"];
    const hasOverride =
      overrideImg &&
      typeof overrideImg === "object" &&
      overrideImg.asset != null &&
      (overrideImg.asset as { url?: string }).url != null;
    const image = hasOverride ? overrideImg : prog?.mainImage;
    return {
      title: (raw.title as string) || prog?.title || "Program",
      description: (raw.description as string) || prog?.shortDescription,
      image,
      href: programDetailPath(slug),
      linkLabel: raw.linkLabel as string | undefined,
      external: false,
    };
  }

  const hrefRaw = programHrefFromLink(raw.link as string | undefined);
  if (hrefRaw === "#") return null;
  const external = /^https?:\/\//i.test(hrefRaw);
  return {
    title: String(raw.title ?? ""),
    description: raw.description as string | undefined,
    image: raw.image as ListingCard["image"],
    href: hrefRaw,
    linkLabel: raw.linkLabel as string | undefined,
    external,
  };
}

const Programs = () => {
  const { data: page } = useQuery({ queryKey: ["programsPage"], queryFn: getProgramsPageDoc });
  const { data: programs = [] } = useQuery({ queryKey: ["programs"], queryFn: getProgramsForListingDoc });

  const cards: ListingCard[] = page?.programCards?.length
    ? (page.programCards.map((c) => normalizeRawCard(c)).filter(Boolean) as ListingCard[])
    : programs
        .filter((p) => p.slug?.trim())
        .slice(0, 6)
        .map((p) => ({
          title: p.title,
          description: p.shortDescription,
          image: p.mainImage,
          href: programDetailPath(p.slug),
          linkLabel: "View program",
          external: false,
        }));

  return (
    <main className="kx-main">
      <PageSeo
        title={page?.seo?.seoTitle}
        description={page?.seo?.metaDescription}
        fallbackTitle="Programs | MMA"
      />
      <KxPageScaffold>
        <header className="mb-16 max-w-4xl md:mb-24">
          <KxEyebrowIf text={page?.eyebrow} />
          <KxDisplay as="h1" className="mt-4 text-4xl sm:text-5xl md:text-6xl">
            {page?.heading || "Programs"}
          </KxDisplay>
          <KxFlowLine className="my-8 h-4 w-full max-w-md" />
          <p className="max-w-2xl font-body text-lg text-kx-muted md:text-xl">{page?.subheading}</p>
        </header>

        <div className="flex flex-col gap-20 pb-8 md:gap-28">
          {cards.map((card, i) => {
            const imageUrl =
              card.image?.asset?.url != null
                ? urlFor(card.image as never).width(1000).height(620).fit("crop").url()
                : null;
            const layout =
              i % 3 === 0
                ? "lg:flex-row lg:items-stretch"
                : i % 3 === 1
                  ? "lg:flex-row-reverse lg:items-center"
                  : "lg:flex-col lg:items-start";

            const inner = (
              <>
                <div
                  className={`relative w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-kx transition duration-500 group-hover:border-kx-gold/30 ${
                    i % 3 === 1 ? "lg:w-[46%]" : "lg:w-[52%]"
                  }`}
                >
                  <div className="aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[280px]">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt=""
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div
                        className="h-full min-h-[200px] w-full bg-gradient-to-br from-kx-ink via-kx-navy to-kx-gold/15 lg:min-h-[280px]"
                        aria-hidden
                      />
                    )}
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-kx-void/40 to-transparent" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center lg:pl-4 lg:pr-8">
                  <span className="font-display text-[0.65rem] font-bold uppercase tracking-[0.35em] text-kx-gold/85">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 overflow-visible py-0.5 font-display text-3xl font-bold leading-snug tracking-tight text-kx-cream md:text-4xl md:leading-snug">
                    {card.title}
                  </h2>
                  <p className="mt-4 max-w-xl font-body text-kx-muted">{card.description}</p>
                  <span className="mt-8 font-display text-xs font-bold uppercase tracking-[0.22em] text-kx-gold">
                    {card.linkLabel || "Open →"}
                  </span>
                </div>
              </>
            );

            const wrapClass = `group flex flex-col gap-8 ${layout} ${i % 2 === 0 ? "" : "lg:translate-x-4"}`;

            if (card.external) {
              return (
                <a key={`${card.href}-${i}`} href={card.href} className={wrapClass}>
                  {inner}
                </a>
              );
            }
            return (
              <Link key={`${card.href}-${i}`} to={card.href} className={wrapClass}>
                {inner}
              </Link>
            );
          })}
        </div>
      </KxPageScaffold>
    </main>
  );
};

export default Programs;
