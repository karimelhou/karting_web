import { getWeatherSnapshot } from '@/lib/weather';

const STATUS: { message: string; isOpen: boolean; nextSlot: string } = {
  message: 'Ouvert - conditions idéales',
  isOpen: true,
  nextSlot: 'Prochain départ à 14h30',
};

export async function TrackStatus() {
  const weather = await getWeatherSnapshot();

  return (
    <section
      aria-labelledby="track-status-title"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 to-black/70 p-8 shadow-2xl"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.25),_transparent_60%)]" />
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="track-status-title" className="text-2xl font-heading text-foreground">
            État des pistes
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {STATUS.message} — {STATUS.nextSlot}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary/80">
              Météo
            </span>
            <p className="text-base text-foreground">
              {weather.temperature}°C • {weather.condition}
            </p>
            <p>Vent {weather.windspeed} km/h</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary/80">
              Statut
            </span>
            <p className="text-base font-semibold text-foreground">
              {STATUS.isOpen ? 'Ouvert' : 'Fermé'}
            </p>
            <p className="text-xs text-muted-foreground/80">(modifiable dans le CMS)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
