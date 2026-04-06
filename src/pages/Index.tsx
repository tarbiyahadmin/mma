import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageSeo } from "@/components/PageSeo";
import { getHomepagePage } from "@/lib/sanityPageQueries";
import { programHrefFromLink } from "@/lib/programRoutes";
import { KxFlowLine } from "@/kinetic/KineticDecor";
import { KxAct, KxDisplay, KxEyebrowIf, KxLead, KxPageScaffold } from "@/kinetic/KineticPrimitives";

const Index = () => {
  const { data: homepage } = useQuery({
    queryKey: ["homepage"],
    queryFn: getHomepagePage,
  });
  const seo = homepage?.seo;
  const sections = homepage?.sections ?? [];
  const firstIsHero = sections[0]?._type === "homeHeroSection";
  const heroSection = firstIsHero ? sections[0] : null;
  const contentSections = firstIsHero ? sections.slice(1) : sections;

  return (
    <>
      <PageSeo title={seo?.seoTitle} description={seo?.metaDescription} />
      <main className="kx-main">
        {heroSection && heroSection._type === "homeHeroSection" && (
          <section className="relative mb-12 w-full md:mb-16">
            <div className="mx-auto flex max-w-[1400px] flex-col items-center px-5 pb-6 pt-4 text-center sm:px-8 md:pb-10 md:pt-8 lg:px-12">
              <div className="w-full max-w-4xl">
                <KxEyebrowIf text={heroSection.eyebrow} />
                <KxDisplay
                  as="h1"
                  className="mx-auto mt-8 max-w-4xl text-4xl sm:text-5xl md:mt-10 md:text-6xl lg:text-[3.35rem] xl:text-6xl"
                >
                  {String(heroSection.heading ?? "")}
                </KxDisplay>
                <KxLead className="mx-auto mt-8 max-w-2xl text-balance md:mt-10 md:text-xl">
                  {String(heroSection.subheading ?? "")}
                </KxLead>
                <div className="mt-12 flex flex-wrap items-center justify-center gap-4 md:mt-14">
                  {heroSection.primaryCta?.to && (
                    <KxAct
                      label={heroSection.primaryCta.label || "Learn more"}
                      to={heroSection.primaryCta.to}
                      isExternal={heroSection.primaryCta.isExternal}
                    />
                  )}
                  {heroSection.secondaryCta?.to && (
                    <KxAct
                      label={heroSection.secondaryCta.label || "Contact"}
                      to={heroSection.secondaryCta.to}
                      isExternal={heroSection.secondaryCta.isExternal}
                      variant="outline"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <KxPageScaffold>
          {contentSections.map((section: any, idx: number) => {
            const firstBelowHero = idx === 0;

            if (section._type === "homeProblemSection") {
              return (
                <section
                  key={`problem-${idx}`}
                  className={`relative text-left ${firstBelowHero ? "mb-16 md:mb-20" : "mb-24 md:mb-32"}`}
                >
                  <div className={firstBelowHero ? "max-w-2xl" : "max-w-3xl"}>
                    <KxEyebrowIf text={section.eyebrow} />
                    <KxDisplay as="h2" className="mt-4 text-3xl md:text-4xl lg:text-5xl">
                      {String(section.headline ?? "")}
                    </KxDisplay>
                    <KxFlowLine className={`my-6 h-4 max-w-xs ${firstBelowHero ? "" : "md:my-8"}`} />
                    <p className="font-body text-lg leading-relaxed text-kx-muted md:text-xl whitespace-pre-line">
                      {String(section.bodyCopy ?? "")}
                    </p>
                  </div>
                </section>
              );
            }

            if (section._type === "homeProgramsSection") {
              const cards = Array.isArray(section.cards) ? section.cards : [];
              return (
                <section
                  key={`programs-${idx}`}
                  className={`relative ${firstBelowHero ? "mb-16 md:mb-20" : "mb-24 md:mb-32"}`}
                >
                  <div className={firstBelowHero ? "max-w-2xl text-left" : "max-w-3xl"}>
                    <KxEyebrowIf text={section.eyebrow} />
                    <KxDisplay as="h2" className="mt-4 text-3xl md:text-5xl">
                      {String(section.headline ?? "Our programs")}
                    </KxDisplay>
                  </div>
                  <div className={`mt-10 flex flex-col gap-6 md:mt-12 md:gap-8 ${firstBelowHero ? "max-w-2xl" : "max-w-2xl"}`}>
                    {cards.map((card: any, i: number) => {
                      const href = programHrefFromLink(card.link);
                      const spa =
                        href !== "#" &&
                        href.startsWith("/") &&
                        !href.startsWith("//") &&
                        !/^https?:/i.test(href);
                      const inner = (
                        <article className="kx-slab border border-white/10 p-6 transition-transform duration-300 group-hover:-translate-y-0.5 md:p-8">
                          <h3 className="overflow-visible py-0.5 font-display text-2xl font-bold leading-snug tracking-tight text-kx-cream md:text-3xl md:leading-snug">
                            {String(card.title ?? "")}
                          </h3>
                          <p className="mt-3 max-w-prose font-body text-kx-muted">
                            {String(card.description ?? "")}
                          </p>
                          <span className="mt-6 inline-block font-display text-xs font-bold uppercase tracking-[0.2em] text-kx-gold">
                            {String(card.linkLabel ?? "Enter program →")}
                          </span>
                        </article>
                      );
                      return spa ? (
                        <Link key={i} to={href} className="group block">
                          {inner}
                        </Link>
                      ) : (
                        <a key={i} href={href} className="group block">
                          {inner}
                        </a>
                      );
                    })}
                  </div>
                </section>
              );
            }

            if (section._type === "homeDifferenceSection") {
              const items = Array.isArray(section.items) ? section.items : [];
              return (
                <section key={`diff-${idx}`} className="relative mb-20 md:mb-28">
                  <div className="mb-10 border-b border-white/10 pb-8 md:mb-12">
                    <KxEyebrowIf text={section.eyebrow} />
                    <KxDisplay as="h2" className="mt-4 max-w-xl text-3xl md:text-4xl">
                      {String(section.headline ?? "What makes us different")}
                    </KxDisplay>
                  </div>
                  <div className="relative max-w-2xl border-l-2 border-kx-gold/50 pl-8 md:pl-10">
                    {items.map((item: any, i: number) => (
                      <div key={i} className="relative pb-12 last:pb-2">
                        <span className="font-display absolute -left-[2.125rem] top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-lg border border-kx-gold/50 bg-kx-void text-sm font-extrabold text-kx-gold md:-left-[2.625rem]">
                          {i + 1}
                        </span>
                        <h3 className="overflow-visible py-0.5 font-display text-xl font-bold leading-snug text-kx-cream md:text-2xl">
                          {String(item.title ?? "")}
                        </h3>
                        <p className="mt-2 font-body text-kx-muted">{String(item.description ?? "")}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            }

            return null;
          })}
        </KxPageScaffold>
      </main>
    </>
  );
};

export default Index;
