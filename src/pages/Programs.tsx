import { useQuery } from "@tanstack/react-query";
import { PageSeo } from "@/components/PageSeo";
import { ProgramPromoCard } from "@/components/ProgramPromoCard";
import { getProgramsForListingDoc, getProgramsPageDoc } from "@/lib/sanityPageQueries";
import { programDetailPath } from "@/lib/programRoutes";
import { KxDisplay, KxPageScaffold } from "@/kinetic/KineticPrimitives";
import { KxFlowLine } from "@/kinetic/KineticDecor";

const Programs = () => {
  const { data: page } = useQuery({ queryKey: ["programsPage"], queryFn: getProgramsPageDoc });
  const { data: programs = [] } = useQuery({ queryKey: ["programs"], queryFn: getProgramsForListingDoc });

  const cards = programs
    .filter((p) => p.slug?.trim())
    .map((p) => ({
      key: p._id,
      title: p.title,
      description: p.shortDescription,
      href: programDetailPath(p.slug),
      linkLabel: "View program",
      comingSoon: !!p.comingSoon,
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
          {cards.map((card, i) => (
            <ProgramPromoCard
              key={card.key}
              variant="programs"
              title={card.title}
              description={card.description}
              href={card.href}
              linkLabel={card.linkLabel}
              comingSoon={card.comingSoon}
              showIndex
              index={i}
            />
          ))}
        </div>
      </KxPageScaffold>
    </main>
  );
};

export default Programs;
