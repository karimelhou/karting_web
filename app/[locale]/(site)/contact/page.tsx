import { ContactForm } from '@/components/forms/ContactForm';
import { CONTACT } from '@/lib/constants';

export default function ContactPage() {
  return (
    <div className="container-grid space-y-10 pb-20">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Contact</p>
        <h1 className="section-heading">Restons en contact</h1>
        <p className="text-muted-foreground">
          Réservations groupes, informations école de pilotage, presse : notre équipe vous
          répond sous 24h ouvrées.
        </p>
      </header>
      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 text-sm text-muted-foreground">
          <h2 className="text-xl font-heading text-foreground">Coordonnées</h2>
          <p>
            {CONTACT.address} • {CONTACT.city}
          </p>
          <p>Téléphone : {CONTACT.formattedPhone}</p>
          <p>Email : {CONTACT.email}</p>
          <div className="h-64 w-full rounded-3xl border border-white/10 bg-[radial-gradient(circle,_rgba(14,165,233,0.35),_transparent)] p-6 text-xs uppercase tracking-[0.3em] text-primary/80">
            Carte interactive à intégrer (Leaflet / Mapbox)
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
