import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageSeo } from "@/components/PageSeo";
import { getProgramBySlugDoc } from "@/lib/sanityPageQueries";
import { urlFor } from "@/lib/sanity";
import { KxAct, KxDisplay, KxEyebrowIf, KxPageScaffold } from "@/kinetic/KineticPrimitives";
import { KxFlowLine } from "@/kinetic/KineticDecor";

const ProgramDetail = () => {
  const { programSlug } = useParams();
  const { data: program, isPending } = useQuery({
    queryKey: ["program", programSlug],
    queryFn: () => getProgramBySlugDoc(programSlug || ""),
    enabled: !!programSlug,
  });

  if (isPending) {
    return (
      <main className="kx-main">
        <KxPageScaffold>
          <div className="h-40 animate-pulse rounded-xl bg-kx-ink/50" />
        </KxPageScaffold>
      </main>
    );
  }

  if (!program) {
    return (
      <main className="kx-main">
        <KxPageScaffold>
          <p className="font-body text-kx-muted">Program not found.</p>
        </KxPageScaffold>
      </main>
    );
  }

  const heroImage =
    program.mainImage?.asset?.url != null
      ? urlFor(program.mainImage).width(1200).height(700).fit("crop").url()
      : null;
  const isOpen = program.cohortStatus?.state !== "closed";
  const hasEvents = !!program.eventsSection?.length;
  const showEventListings = isOpen && hasEvents;
  const emptyStateCta = program.cohortStatus?.waitlistCta;

  return (
    <main className="kx-main">
      <PageSeo
        title={program.seo?.seoTitle}
        description={program.seo?.metaDescription}
        fallbackTitle={`${program.title} | MMA`}
      />
      <KxPageScaffold>
        <Link
          to="/programs"
          className="font-display text-xs font-bold uppercase tracking-[0.22em] text-kx-gold hover:text-kx-cream"
        >
          ← Programs
        </Link>

        <section
          className={`mt-10 grid gap-10 lg:items-end ${heroImage ? "lg:grid-cols-12" : ""}`}
        >
          <div className={heroImage ? "lg:col-span-6" : "max-w-3xl"}>
            <KxEyebrowIf text={program.heroEyebrow} />
            <KxDisplay as="h1" className="mt-4 text-4xl md:text-5xl lg:text-6xl">
              {program.title}
            </KxDisplay>
            <KxFlowLine className="my-8 h-4 max-w-xs" />
            <p className="max-w-xl font-body text-lg text-kx-muted">{program.heroSubheading}</p>
            {program.heroCta?.to && (
              <div className="mt-8">
                <KxAct
                  label={program.heroCta.label || "Apply"}
                  to={program.heroCta.to}
                  isExternal={program.heroCta.isExternal}
                />
              </div>
            )}
          </div>
          {heroImage ? (
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="overflow-hidden rounded-2xl border border-kx-gold/20 shadow-kx lg:-mb-12">
                <img src={heroImage} alt="" className="aspect-[5/4] w-full object-cover lg:aspect-[4/3]" />
              </div>
            </div>
          ) : null}
        </section>

        <section className={`max-w-3xl ${heroImage ? "mt-24 md:mt-32" : "mt-16 md:mt-20"}`}>
          <h2 className="font-display text-2xl font-bold leading-snug text-kx-cream md:text-3xl md:leading-snug">Overview</h2>
          <p className="mt-4 font-body text-lg leading-relaxed text-kx-muted whitespace-pre-line">
            {program.overview}
          </p>
        </section>

        {!!program.keyBenefits?.length && (
          <section className="mt-20 md:mt-28">
            <h2 className="font-display text-2xl font-bold leading-snug text-kx-cream md:text-3xl md:leading-snug">Key benefits</h2>
            <div className="mt-10 max-w-2xl space-y-8">
              {program.keyBenefits.map((item: any, i: number) => (
                <div key={i} className="border-l-2 border-kx-gold/35 pl-6">
                  <h3 className="overflow-visible py-0.5 font-display text-lg font-bold leading-snug text-kx-cream">{item.title}</h3>
                  <p className="mt-2 font-body text-kx-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {!!program.structure?.length && (
          <section className="mt-20 md:mt-28">
            <h2 className="font-display text-2xl font-bold leading-snug text-kx-cream md:text-3xl md:leading-snug">Structure</h2>
            <ol className="mt-10 space-y-6">
              {program.structure.map((step, i) => {
                const n = step.stepNumber ?? i + 1;
                return (
                  <li key={i} className="flex gap-6">
                    <span className="font-display text-3xl font-extrabold text-kx-gold/35">{n}</span>
                    <div>
                      <h3 className="overflow-visible py-0.5 font-display font-bold leading-snug text-kx-cream">{step.title}</h3>
                      <p className="mt-2 font-body text-sm text-kx-muted">{step.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {!!program.tableSection?.rows?.length && (
          <section className="mt-20 md:mt-28">
            <h2 className="font-display text-2xl font-bold leading-snug text-kx-cream md:text-3xl md:leading-snug">Details</h2>
            <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[400px] text-left text-sm">
                <tbody>
                  {program.tableSection.rows.map((row, i) => (
                    <tr key={i} className={i > 0 ? "border-t border-white/10" : ""}>
                      <td className="w-[32%] p-4 align-top font-display font-bold text-kx-cream">{row.title}</td>
                      <td className="p-4 align-top font-body text-kx-muted whitespace-pre-line">{row.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {!!program.formatCardsSection?.length && (
          <section className="mt-20 md:mt-28">
            <h2 className="font-display text-2xl font-bold leading-snug text-kx-cream md:text-3xl md:leading-snug">Formats</h2>
            <div className="mt-10 max-w-2xl space-y-6">
              {program.formatCardsSection.map((card, i) => (
                <div key={i} className="kx-slab border border-white/10 p-6 md:p-8">
                  <h3 className="overflow-visible py-0.5 font-display text-xl font-bold leading-snug text-kx-cream">{card.title}</h3>
                  <p className="mt-3 font-body text-kx-muted whitespace-pre-line">{card.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-20 md:mt-28">
          <h2 className="font-display text-2xl font-bold leading-snug text-kx-cream md:text-3xl md:leading-snug">Upcoming sessions</h2>
          {showEventListings ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {program.eventsSection?.map((event, i) => (
                <article key={i} className="kx-slab border border-white/10 p-6 md:p-7">
                  <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.28em] text-kx-gold/85">
                    {event.dateLabel || "Session"}
                  </p>
                  <h3 className="mt-3 overflow-visible py-0.5 font-display text-xl font-bold leading-snug text-kx-cream">
                    {event.title}
                  </h3>
                  {event.description ? (
                    <p className="mt-3 font-body text-kx-muted whitespace-pre-line">{event.description}</p>
                  ) : null}
                  {event.cta?.to ? (
                    <div className="mt-6">
                      <KxAct
                        label={event.cta.label || "Reserve spot"}
                        to={event.cta.to}
                        isExternal={event.cta.isExternal}
                        variant={event.cta.variant === "accent" ? "outline" : "solid"}
                      />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="relative mt-8 overflow-hidden rounded-2xl border border-kx-gold/20 bg-kx-cream/[0.03] p-8 text-center shadow-kx md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(228,189,84,0.14)_0%,rgba(228,189,84,0.05)_35%,transparent_72%)]" />
              <div className="relative mx-auto max-w-2xl">
                <h3 className="overflow-visible py-0.5 font-display text-2xl font-bold leading-snug text-kx-cream md:text-3xl md:leading-snug">
                  No upcoming sessions
                </h3>
                <p className="mt-3 font-body text-kx-muted">
                  This program is currently between cohorts. Join the waitlist to be the first to hear when the next session opens.
                </p>
                {program.cohortStatus?.nextIntake ? (
                  <p className="mt-5 font-display text-xs font-bold uppercase tracking-[0.22em] text-kx-gold">
                    Next intake: {program.cohortStatus.nextIntake}
                  </p>
                ) : null}
                {emptyStateCta?.to ? (
                  <div className="mt-7">
                    <KxAct
                      label={emptyStateCta.label || "Join waitlist"}
                      to={emptyStateCta.to}
                      isExternal={emptyStateCta.isExternal}
                      variant={emptyStateCta.variant === "accent" ? "outline" : "solid"}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </section>

        {!!program.faqsSection?.length && (
          <section className="mt-20 md:mt-28">
            <h2 className="font-display text-2xl font-bold leading-snug text-kx-cream md:text-3xl md:leading-snug">FAQ</h2>
            <div className="mt-8 max-w-2xl space-y-6">
              {program.faqsSection.map((faq, i) => (
                <div key={i} className="border-b border-white/10 pb-6">
                  <h3 className="overflow-visible py-0.5 font-display font-bold leading-snug text-kx-cream">{faq.question}</h3>
                  <p className="mt-2 font-body text-kx-muted whitespace-pre-line">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {!!program.ctaSections?.length && (
          <section className="mt-16 space-y-10">
            {program.ctaSections.map((cta, i) => (
              <div key={i} className="kx-slab-warm p-8 md:p-10">
                <h3 className="overflow-visible py-0.5 font-display text-xl font-bold leading-snug text-kx-cream">{cta.title}</h3>
                <p className="mt-2 font-body text-kx-muted">{cta.subtitle}</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  {(cta.buttons || []).map((button, bi) => (
                    <KxAct
                      key={bi}
                      label={button.label}
                      to={button.to}
                      isExternal={button.isExternal}
                      variant={button.variant === "accent" ? "outline" : "solid"}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </KxPageScaffold>
    </main>
  );
};

export default ProgramDetail;
