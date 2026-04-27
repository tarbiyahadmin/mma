import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageSeo } from "@/components/PageSeo";
import { getProgramBySlugDoc } from "@/lib/sanityPageQueries";
import { KxAct, KxDisplay, KxPageScaffold } from "@/kinetic/KineticPrimitives";
import { KxFlowLine, KxGoldGlowField } from "@/kinetic/KineticDecor";

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
          className="font-display text-xs font-bold uppercase tracking-[0.22em] text-kx-primary hover:text-kx-cream"
        >
          ← Programs
        </Link>

        <section className="mt-10 grid gap-10 lg:items-end">
          <div className="max-w-3xl">
            <KxDisplay as="h1">{program.title}</KxDisplay>
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
        </section>

        <section className="mt-16 max-w-3xl md:mt-20">
          <KxDisplay as="h2">Overview</KxDisplay>
          <p className="mt-4 font-body text-lg leading-relaxed text-kx-muted whitespace-pre-line">
            {program.overview}
          </p>
        </section>

        {!!program.keyBenefits?.length && (
          <section className="mt-20 md:mt-28">
            <KxDisplay as="h2">Key benefits</KxDisplay>
            <div className="mt-10 max-w-2xl space-y-8">
              {program.keyBenefits.map((item: any, i: number) => (
                <div key={i} className="border-l-2 border-kx-primary/35 pl-6">
                  <KxDisplay as="h3" className="!text-lg md:!text-xl">
                    {item.title}
                  </KxDisplay>
                  <p className="mt-2 font-body text-kx-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {!!program.structure?.length && (
          <section className="mt-20 md:mt-28">
            <KxDisplay as="h2">Structure</KxDisplay>
            <ol className="mt-10 space-y-6">
              {program.structure.map((step, i) => {
                const n = step.stepNumber ?? i + 1;
                return (
                  <li key={i} className="flex gap-6">
                    <span className="font-display text-3xl font-extrabold text-kx-primary/35">{n}</span>
                    <div>
                      <KxDisplay as="h3" className="!text-lg md:!text-xl">
                        {step.title}
                      </KxDisplay>
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
            <KxDisplay as="h2">Details</KxDisplay>
            <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[400px] text-left text-sm">
                <tbody>
                  {program.tableSection.rows.map((row, i) => (
                    <tr key={i} className={i > 0 ? "border-t border-white/10" : ""}>
                      <td className="w-[32%] p-4 align-top">
                        <KxDisplay as="span" className="!text-sm !leading-snug md:!text-base">
                          {row.title || ""}
                        </KxDisplay>
                      </td>
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
            <KxDisplay as="h2">Formats</KxDisplay>
            <div className="mt-10 max-w-2xl space-y-6">
              {program.formatCardsSection.map((card, i) => (
                <div key={i} className="kx-slab border border-white/10 p-6 md:p-8">
                  <KxDisplay as="h3">{card.title}</KxDisplay>
                  <p className="mt-3 font-body text-kx-muted whitespace-pre-line">{card.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-20 md:mt-28">
          <KxDisplay as="h2">Upcoming sessions</KxDisplay>
          {showEventListings ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {program.eventsSection?.map((event, i) => (
                <article key={i} className="kx-slab border border-white/10 p-6 md:p-7">
                  <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.28em] text-kx-primary/85">
                    {event.dateLabel || "Session"}
                  </p>
                  <KxDisplay as="h3" className="mt-3">
                    {event.title}
                  </KxDisplay>
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
            <div className="relative mt-8 overflow-hidden rounded-2xl border border-kx-primary/20 bg-kx-cream/[0.03] p-8 text-center shadow-kx md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(228,189,84,0.14)_0%,rgba(228,189,84,0.05)_35%,transparent_72%)]" />
              <div className="relative mx-auto max-w-2xl">
                <KxDisplay as="h3">No upcoming sessions</KxDisplay>
                <p className="mt-3 font-body text-kx-muted">
                  This program is currently between cohorts. Join the waitlist to be the first to hear when the next session opens.
                </p>
                {program.cohortStatus?.nextIntake ? (
                  <p className="mt-5 font-display text-xs font-bold uppercase tracking-[0.22em] text-kx-primary">
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
            <KxDisplay as="h2">FAQ</KxDisplay>
            <div className="mt-8 max-w-2xl space-y-6">
              {program.faqsSection.map((faq, i) => (
                <div key={i} className="border-b border-white/10 pb-6">
                  <KxDisplay as="h3" className="!text-lg md:!text-xl">
                    {faq.question}
                  </KxDisplay>
                  <p className="mt-2 font-body text-kx-muted whitespace-pre-line">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {!!program.ctaSections?.length && (
          <section className="relative mt-16">
            <div className="pointer-events-none absolute -inset-x-6 -inset-y-6 z-0 overflow-hidden rounded-[1.75rem] md:-inset-x-10">
              <KxGoldGlowField variant="section" />
            </div>
            <div className="relative z-[1] space-y-10">
            {program.ctaSections.map((cta, i) => (
              <div key={i} className="kx-slab-warm p-8 md:p-10">
                <KxDisplay as="h3">{cta.title}</KxDisplay>
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
            </div>
          </section>
        )}
      </KxPageScaffold>
    </main>
  );
};

export default ProgramDetail;
