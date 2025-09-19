import clsx from 'clsx';

const TRACK_PATHS: Record<'550m' | '1150m', string> = {
  '550m':
    'M20,180 C60,40 200,40 240,120 C260,160 200,210 140,200 C80,190 60,150 90,130 C120,110 150,120 170,100 C190,80 180,50 140,40 C80,30 40,60 20,180 Z',
  '1150m':
    'M30,200 C50,60 200,20 320,70 C360,90 340,140 290,130 C220,120 210,180 260,190 C320,205 350,240 300,260 C200,300 90,280 60,220 C45,190 80,160 120,150 C200,130 220,70 140,70 C80,70 50,110 30,200 Z',
};

export function TrackDiagram({ track }: { track: '550m' | '1150m' }) {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-black/40 p-4 shadow-inner">
      <svg
        viewBox="0 0 360 300"
        className="h-48 w-full text-primary"
        role="img"
        aria-label={`Schéma du tracé ${track}`}
      >
        <defs>
          <linearGradient id={`track-${track}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(56,189,248,0.9)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0.9)" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="360"
          height="300"
          fill="none"
          stroke="rgba(148,163,184,0.2)"
          strokeDasharray="12 8"
        />
        <path
          d={TRACK_PATHS[track]}
          fill="none"
          stroke={`url(#track-${track})`}
          strokeWidth={12}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_12px_rgba(14,165,233,0.35)]"
        />
      </svg>
      <div
        className={clsx(
          'absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]',
          track === '550m'
            ? 'bg-primary/10 text-primary'
            : 'bg-accent/10 text-accent-foreground',
        )}
      >
        {track === '550m' ? 'Technique' : 'Vitesse'}
      </div>
    </div>
  );
}
