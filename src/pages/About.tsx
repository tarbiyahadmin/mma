import { useQuery } from "@tanstack/react-query";
import { PageSeo } from "@/components/PageSeo";
import { getAboutPageDoc } from "@/lib/sanityPageQueries";
import { KxDisplay, KxPageScaffold } from "@/kinetic/KineticPrimitives";
import { KxArabicSectionArt, KxFlowLine } from "@/kinetic/KineticDecor";

const About = () => {
  const { data } = useQuery({ queryKey: ["aboutPage"], queryFn: getAboutPageDoc });
  const sections = data?.sections ?? [];

  return (
    <main className="kx-main">
      <PageSeo
        title={data?.seo?.seoTitle}
        description={data?.seo?.metaDescription}
        fallbackTitle="About Us | MMA"
      />
      <KxPageScaffold>
        {sections.map((section: any, idx: number) => {
          if (section._type === "aboutStorySection") {
            return (
              <section key={idx} className="relative mb-24 md:mb-32">
                <KxArabicSectionArt variant="section-tall" />
                <KxDisplay as="h1" className="relative z-[1] max-w-4xl">
                  {section.headline || "Our story"}
                </KxDisplay>
                <KxFlowLine className="relative z-[1] my-10 h-4 max-w-sm" />
                <p className="relative z-[1] max-w-3xl font-body text-lg leading-relaxed text-kx-muted md:text-xl md:leading-relaxed whitespace-pre-line">
                  {section.bodyCopy}
                </p>
              </section>
            );
          }

          if (section._type === "aboutMissionVisionSection") {
            return (
              <section key={idx} className="relative mb-24 md:mb-32">
                <KxArabicSectionArt variant="section-br" />
                {section.headline?.trim() ? (
                  <KxDisplay as="h2" className="relative z-[1] mb-8 max-w-3xl">
                    {section.headline}
                  </KxDisplay>
                ) : null}
                <div className="relative z-[1] grid gap-6 lg:grid-cols-2 lg:gap-0">
                  <div className="rounded-2xl border border-kx-secondary/28 bg-gradient-to-br from-kx-secondary/[0.14] via-kx-primary/[0.06] to-transparent p-8 md:p-12 lg:rounded-r-none lg:border-r-0">
                    <KxDisplay as="h3">Mission</KxDisplay>
                    <p className="mt-2 font-display text-base font-medium text-kx-secondary/95">On purpose</p>
                    <p className="mt-6 font-body leading-relaxed text-kx-muted whitespace-pre-line">{section.mission}</p>
                  </div>
                  <div className="rounded-2xl border border-kx-altSecondary/25 bg-gradient-to-br from-kx-ink/55 via-kx-altSecondary/[0.08] to-kx-navy/90 p-8 md:p-12 lg:rounded-l-none lg:-translate-y-4 lg:shadow-kx">
                    <KxDisplay as="h3">Vision</KxDisplay>
                    <p className="mt-2 font-display text-base font-medium text-kx-altSecondary">Where we&apos;re headed</p>
                    <p className="mt-6 font-body leading-relaxed text-kx-muted whitespace-pre-line">{section.vision}</p>
                  </div>
                </div>
              </section>
            );
          }

          if (section._type === "aboutValuesSection") {
            return (
              <section key={idx} className="mb-24 md:mb-32">
                <div className="mb-12 mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                  <KxDisplay as="h2" className="max-w-md">
                    {section.headline || "Our values"}
                  </KxDisplay>
                  <p className="max-w-xs font-display text-xs uppercase tracking-[0.3em] text-kx-secondary/90">
                    Non‑negotiables
                  </p>
                </div>
                <ul className="space-y-0 divide-y divide-kx-secondary/12 border-y border-kx-secondary/20">
                  {(section.items || []).map((item: any, i: number) => (
                    <li
                      key={i}
                      className="flex flex-col gap-4 py-10 first:pt-8 md:flex-row md:items-start md:gap-12"
                    >
                      <span className="font-display text-4xl font-semibold text-kx-altSecondary/35 md:w-16">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <KxDisplay as="h3">{item.title}</KxDisplay>
                        <p className="mt-2 max-w-2xl font-body leading-relaxed text-kx-muted">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          }

          if (section._type === "aboutTeamSection") {
            return (
              <section key={idx} className="mb-24 md:mb-32">
                <KxDisplay as="h2">{section.headline || "Meet the team"}</KxDisplay>
                <p className="mt-4 max-w-xl font-body leading-relaxed text-kx-muted">{section.subtext}</p>
                <div className="mt-14 space-y-10">
                  {(section.members || []).map((member: any, i: number) => (
                    <div
                      key={i}
                      className="max-w-xl border-b border-white/10 pb-10 last:border-0"
                      style={{ marginLeft: i % 2 === 1 ? "clamp(0px, 5vw, 3rem)" : 0 }}
                    >
                      <KxDisplay as="h3" className="!text-lg md:!text-xl">
                        {member.name}
                      </KxDisplay>
                      <p className="mt-1 font-display text-xs uppercase tracking-[0.15em] text-kx-altSecondary">
                        {member.role}
                      </p>
                      <p className="mt-3 font-body text-sm leading-relaxed text-kx-muted">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (section._type === "aboutFaqSection") {
            return (
              <section key={idx} className="mb-16">
                <div className="grid gap-12 lg:grid-cols-12">
                  <div className="lg:col-span-4 lg:sticky lg:top-36 lg:self-start">
                    <KxDisplay as="h2">{section.headline || "FAQ"}</KxDisplay>
                    <KxFlowLine className="mt-6 h-3 max-w-[6rem]" />
                  </div>
                  <div className="space-y-6 lg:col-span-7 lg:col-start-6">
                    {(section.faqs || []).map((faq: any, i: number) => (
                      <div
                        key={i}
                        className="border-l-2 border-kx-secondary/40 pl-6 md:pl-8"
                        style={{ marginLeft: i % 2 === 1 ? "1rem" : "0" }}
                      >
                        <KxDisplay as="h3" className="!text-lg md:!text-xl">
                          {faq.question}
                        </KxDisplay>
                        <p className="mt-2 font-body leading-relaxed text-kx-muted">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          return null;
        })}
      </KxPageScaffold>
    </main>
  );
};

export default About;
