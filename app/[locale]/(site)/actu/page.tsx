import { Link } from '@/lib/i18n/navigation';
import { loadCollection } from '@/lib/mdx';

export default async function BlogIndexPage() {
  const posts = await loadCollection('blog');

  return (
    <div className="container-grid space-y-8 pb-20">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Actualités</p>
        <h1 className="section-heading">Dernières actus du circuit</h1>
        <p className="text-muted-foreground">
          Partagez les nouveautés, événements et conseils pilotage.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-3xl border border-white/10 bg-black/40 p-6"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary/80">Blog</p>
            <h2 className="mt-2 text-xl font-heading text-foreground">
              {post.frontmatter.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {post.frontmatter.excerpt}
            </p>
            <Link
              href={`/actu/${post.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-primary"
            >
              Lire l’article →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
