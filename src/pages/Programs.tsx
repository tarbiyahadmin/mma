import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageSeo } from "@/components/PageSeo";
import { getProgramsForListingDoc, getProgramsPageDoc } from "@/lib/sanityPageQueries";
import { programDetailPath } from "@/lib/programRoutes";
import { KxDisplay, KxPageScaffold } from "@/kinetic/KineticPrimitives";
import { KxFlowLine } from "@/kinetic/KineticDecor";

const Programs = () => {
  const { data: page } = useQuery({ queryKey: ["programsPage"], queryFn: getProgramsPageDoc });
  const { data: programs = [] } = useQuery({ queryKey: ["programs"], queryFn: getProgramsForListingDoc });

  const cards = programs
    .filter((p) => p.slug?.trim())
    .slice(0, 6)
    .map((p) => ({
      title: p.title,
      description: p.shortDescription,
      href: programDetailPath(p.slug),
      linkLabel: "View program",
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
          <KxDisplay as="h1">{page?.heading || "Programs"}</KxDisplay>
          <KxFlowLine className="my-8 h-4 w-full max-w-md" />
          <p className="max-w-2xl font-body text-lg leading-relaxed text-kx-muted md:text-xl md:leading-relaxed">
            {page?.subheading}
          </p>
        </header>

        <div className="flex flex-col gap-20 pb-8 md:gap-28">
          {cards.map((card, i) => {
            const inner = (
              <article className="kx-slab w-full border border-white/10 p-7 shadow-kx transition duration-300 group-hover:border-kx-gold/30 md:p-10">
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <span className="font-display text-[0.65rem] font-bold uppercase tracking-[0.35em] text-kx-gold/85">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <KxDisplay as="h3" size="h2" className="mt-3">
                    {card.title}
                  </KxDisplay>
                  <p className="mt-4 max-w-xl font-body text-lg leading-relaxed text-kx-muted">{card.description}</p>
                  <span className="mt-8 font-display text-xs font-bold uppercase tracking-[0.22em] text-kx-gold">
                    {card.linkLabel || "Open →"}
                  </span>
                </div>
              </article>
            );

            const wrapClass = "group block w-full";

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
