import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageSeo } from "@/components/PageSeo";
import { getHomepagePage } from "@/lib/sanityPageQueries";
import { programHrefFromLink } from "@/lib/programRoutes";
import { KxFlowLine, KxGoldGlowField, KxHeroGrid, KxHeroLighting } from "@/kinetic/KineticDecor";
import { KxAct, KxDisplay, KxLead, KxPageScaffold } from "@/kinetic/KineticPrimitives";

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
          <section className="relative mb-12 w-full md:mb-20">
            <div className="relative min-h-[min(78vh,52rem)] overflow-hidden">
              <KxGoldGlowField variant="hero" />
              <KxHeroGrid />
              <KxHeroLighting />
              <div className="relative mx-auto flex max-w-[1400px] flex-col items-center px-5 pb-12 pt-10 text-center sm:px-8 md:pb-16 md:pt-14 lg:px-10">
                <div className="mb-8 flex w-full items-center justify-center gap-2.5 md:mb-10">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/35" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400/90 shadow-[0_0_12px_rgb(52_211_153/0.5)]" />
                  </span>
                  <span className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-kx-cream/70">
                    Available now
                  </span>
                </div>

                <KxDisplay as="h1" size="hero" className="mt-4 max-w-4xl md:mt-6">
                  {String(heroSection.heading ?? "")}
                </KxDisplay>

                <KxLead className="mx-auto mt-8 max-w-lg text-balance text-kx-muted/95 md:mt-10 md:max-w-xl md:text-lg">
                  {String(heroSection.subheading ?? "")}
                </KxLead>

                <div className="mt-12 flex flex-wrap items-center justify-center gap-4 md:mt-14">
                  {heroSection.primaryCta?.to && (
                    <KxAct
                      label={`${heroSection.primaryCta.label || "Learn more"} →`}
                      to={heroSection.primaryCta.to}
                      isExternal={heroSection.primaryCta.isExternal}
                      tone="hero"
                    />
                  )}
                  {heroSection.secondaryCta?.to && (
                    <KxAct
                      label={heroSection.secondaryCta.label || "Contact"}
                      to={heroSection.secondaryCta.to}
                      isExternal={heroSection.secondaryCta.isExternal}
                      variant="outline"
                      tone="hero"
                    />
                  )}
                </div>

                <div className="mt-16 h-px w-24 bg-gradient-to-r from-transparent via-kx-gold/40 to-transparent md:mt-20" />
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
                    <KxDisplay as="h2">{String(section.headline ?? "")}</KxDisplay>
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
                    <KxDisplay as="h2">{String(section.headline ?? "Our programs")}</KxDisplay>
                  </div>
                  <div className="mt-10 flex w-full flex-col gap-6 md:mt-12 md:gap-8">
                    {cards.map((card: any, i: number) => {
                      const href = programHrefFromLink(card.link);
                      const spa =
                        href !== "#" &&
                        href.startsWith("/") &&
                        !href.startsWith("//") &&
                        !/^https?:/i.test(href);
                      const inner = (
                        <article className="kx-slab border border-white/10 p-6 transition-transform duration-300 group-hover:-translate-y-0.5 md:p-8">
                          <KxDisplay as="h3" size="h2">
                            {String(card.title ?? "")}
                          </KxDisplay>
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
                    <KxDisplay as="h2" className="max-w-xl">
                      {String(section.headline ?? "What makes us different")}
                    </KxDisplay>
                  </div>
                  <div className="relative max-w-2xl border-l-2 border-kx-gold/50 pl-8 md:pl-10">
                    {items.map((item: any, i: number) => (
                      <div key={i} className="relative pb-12 last:pb-2">
                        <span className="font-display absolute -left-[2.125rem] top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-lg border border-kx-gold/50 bg-kx-void text-sm font-extrabold text-kx-gold md:-left-[2.625rem]">
                          {i + 1}
                        </span>
                        <KxDisplay as="h3">{String(item.title ?? "")}</KxDisplay>
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
