import { PricingTable } from '@/components/ui/PricingTable';
import { loadMDXFile } from '@/lib/mdx';

export default async function GrandPrixPage() {
  const { content, frontmatter } = await loadMDXFile('pricing/grand-prix');

  return (
    <div className="container-grid space-y-10 pb-20">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Offres</p>
        <h1 className="section-heading">{frontmatter.title}</h1>
        <p className="text-muted-foreground">{frontmatter.excerpt}</p>
      </header>
      <PricingTable />
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        {content}
      </div>
    </div>
  );
}
