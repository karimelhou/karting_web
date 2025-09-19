import { getTranslations } from 'next-intl/server';

import { TRACK_STATUS } from '@/lib/constants';
import { getWeatherSnapshot } from '@/lib/weather';

export async function TrackStatus() {
  const t = await getTranslations('trackStatus');
  const weather = await getWeatherSnapshot();
  const stateLabel =
    TRACK_STATUS.state === 'open'
      ? t('open')
      : TRACK_STATUS.state === 'closed'
        ? t('closed')
        : t('statusWeather');

  return (
    <section
      aria-labelledby="track-status-title"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-black/70 p-8 shadow-2xl"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.25),_transparent_60%)]" />
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="track-status-title" className="text-2xl font-heading text-foreground">
            {t('title')}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground" aria-live="polite">
            {TRACK_STATUS.message} — {t('nextSlot')} : {TRACK_STATUS.nextSlot}
          </p>
          <p className="text-xs text-muted-foreground/70">{TRACK_STATUS.updatedAt}</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary/80">
              {t('weather')}
            </span>
            <p className="text-base text-foreground">
              {weather.temperature}°C • {weather.condition}
            </p>
            <p>Vent {weather.windspeed} km/h</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary/80">
              {t('title')}
            </span>
            <p className="text-base font-semibold text-foreground">{stateLabel}</p>
            <p className="text-xs text-muted-foreground/80">({t('updated')})</p>
          </div>
        </div>
      </div>
    </section>
  );
}
