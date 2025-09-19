import { notFound } from 'next/navigation';

import { loadCollection, loadMDXFile } from '@/lib/mdx';
import { buildPageMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  const posts = await loadCollection('blog');
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const { frontmatter } = await loadMDXFile(`blog/${params.slug}`);
    return buildPageMetadata({
      title: frontmatter.title,
      description: frontmatter.excerpt ?? '',
      path: `/actu/${params.slug}`,
    });
  } catch (error) {
    return buildPageMetadata({
      title: 'Actualité',
      description: 'Actualités karting',
      path: '/actu',
    });
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    const { content, frontmatter } = await loadMDXFile(`blog/${params.slug}`);
    return (
      <div className="container-grid space-y-6 pb-20">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Actualités</p>
          <h1 className="section-heading">{frontmatter.title}</h1>
          <p className="text-muted-foreground">{frontmatter.excerpt}</p>
        </header>
        <article className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          {content}
        </article>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
