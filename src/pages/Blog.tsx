import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { PageSeo } from "@/components/PageSeo";
import { getBlogPageDoc, getBlogPostsDoc } from "@/lib/sanityPageQueries";
import { KxDisplay, KxPageScaffold } from "@/kinetic/KineticPrimitives";

const Blog = () => {
  const { data: page } = useQuery({ queryKey: ["blogPage"], queryFn: getBlogPageDoc });
  const { data: posts = [] } = useQuery({ queryKey: ["blogPosts"], queryFn: getBlogPostsDoc });

  return (
    <main className="kx-main">
      <PageSeo
        title={page?.seo?.seoTitle}
        description={page?.seo?.metaDescription}
        fallbackTitle="Blog | MMA"
      />
      <KxPageScaffold>
        <header className="mb-20 md:mb-28">
          <KxDisplay as="h1" className="max-w-3xl">
            {page?.heading || "Stories"}
          </KxDisplay>
          <p className="mt-6 max-w-xl font-body text-lg text-kx-muted">{page?.subheading}</p>
        </header>

        <ol className="relative list-none space-y-0 border-l border-kx-secondary/25 pl-8 md:pl-12">
          {posts.map((post, i) => (
            <li key={post._id} className="relative pb-16 last:pb-4 md:pb-24">
              <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-kx-secondary bg-kx-void md:-left-[13px]" />
              <Link
                to={`/blog/${post.slug}`}
                className="group block max-w-3xl"
                style={{ marginLeft: i % 2 === 1 ? "clamp(0px, 4vw, 2rem)" : 0 }}
              >
                <time className="font-display text-[0.65rem] font-bold uppercase tracking-[0.35em] text-kx-primary/85">
                  {post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : ""}
                </time>
                <KxDisplay as="h2" className="mt-3 transition group-hover:opacity-90">
                  {post.title}
                </KxDisplay>
                <p className="mt-4 line-clamp-3 font-body text-kx-muted">{post.excerpt}</p>
                <span className="mt-6 font-display text-xs font-bold uppercase tracking-[0.2em] text-kx-primary">
                  Read piece →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </KxPageScaffold>
    </main>
  );
};

export default Blog;
