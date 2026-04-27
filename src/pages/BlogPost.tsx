import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PortableText } from "@portabletext/react";
import { PageSeo } from "@/components/PageSeo";
import { getBlogPostBySlugDoc } from "@/lib/sanityPageQueries";
import { KxDisplay, KxPageScaffold } from "@/kinetic/KineticPrimitives";
import { KxFlowLine } from "@/kinetic/KineticDecor";

const BlogPost = () => {
  const { slug } = useParams();
  const { data: post, isPending } = useQuery({
    queryKey: ["blogPost", slug],
    queryFn: () => getBlogPostBySlugDoc(slug || ""),
    enabled: !!slug,
  });

  if (isPending) {
    return (
      <main className="kx-main">
        <KxPageScaffold>
          <div className="h-32 animate-pulse rounded-xl bg-kx-ink/60" />
        </KxPageScaffold>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="kx-main">
        <KxPageScaffold>
          <p className="font-body text-kx-muted">Post not found.</p>
        </KxPageScaffold>
      </main>
    );
  }

  return (
    <main className="kx-main">
      <PageSeo
        title={post.seo?.seoTitle}
        description={post.seo?.metaDescription}
        fallbackTitle={`${post.title} | MMA`}
      />
      <article>
        <KxPageScaffold>
          <Link
            to="/blog"
            className="font-display text-xs font-bold uppercase tracking-[0.25em] text-kx-primary hover:text-kx-cream"
          >
            ← Journal
          </Link>
          <KxDisplay as="h1" className="mt-8 max-w-4xl">
            {post.title}
          </KxDisplay>
          <KxFlowLine className="my-10 h-4 max-w-xs" />
          <div className="kx-prose mx-auto max-w-2xl pb-16">
            <PortableText value={post.body || []} />
          </div>
        </KxPageScaffold>
      </article>
    </main>
  );
};

export default BlogPost;
