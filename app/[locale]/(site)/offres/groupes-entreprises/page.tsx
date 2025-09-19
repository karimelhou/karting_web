import { GroupQuote } from '@/components/ui/GroupQuote';
import { loadCollection } from '@/lib/mdx';

export default async function GroupOffersPage() {
  const groups = await loadCollection('groups');

  return (
    <div className="container-grid space-y-12 pb-20">
      <header className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
          Groupes & entreprises
        </p>
        <h1 className="section-heading">Evènements clé en main</h1>
        <p className="text-muted-foreground">
          Séminaires, incentives, arbres de Noël, EVG/EVJF : composez votre programme avec
          piste, restauration et animations.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((entry) => (
          <article
            key={entry.slug}
            className="rounded-3xl border border-white/10 bg-black/40 p-6"
          >
            <h2 className="text-xl font-heading text-foreground">
              {entry.frontmatter.title}
            </h2>
            <div className="mt-3 space-y-3 text-sm text-muted-foreground">
              {entry.content}
            </div>
          </article>
        ))}
      </div>
      <GroupQuote />
    </div>
  );
}
