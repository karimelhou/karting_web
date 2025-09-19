'use client';

import { useMemo } from 'react';

import type { LeaderboardEntry } from '@/lib/leaderboard';

const COLORS: Record<LeaderboardEntry['track'], string> = {
  '550m': '#38bdf8',
  '1150m': '#fbbf24',
};

const LABELS: Record<LeaderboardEntry['track'], string> = {
  '550m': 'Piste 550 m',
  '1150m': 'Piste 1150 m',
};

function buildPolyline(values: LeaderboardEntry[], width: number, height: number) {
  if (!values.length) return '';
  const paddingX = 24;
  const paddingY = 16;
  const minTime = Math.min(...values.map((item) => item.bestTime));
  const maxTime = Math.max(...values.map((item) => item.bestTime));
  const timeRange = maxTime - minTime || 1;

  return values
    .map((entry, index) => {
      const x =
        paddingX + (index / Math.max(values.length - 1, 1)) * (width - paddingX * 2);
      const normalized = (entry.bestTime - minTime) / timeRange;
      const y = height - paddingY - normalized * (height - paddingY * 2);
      return `${x},${y}`;
    })
    .join(' ');
}

export function LeaderboardChart({ data }: { data: LeaderboardEntry[] }) {
  const grouped = useMemo(() => {
    return data.reduce<Record<LeaderboardEntry['track'], LeaderboardEntry[]>>(
      (acc, entry) => {
        acc[entry.track] = [...acc[entry.track], entry];
        return acc;
      },
      { '550m': [], '1150m': [] },
    );
  }, [data]);

  const width = 520;
  const height = 220;

  return (
    <figure
      aria-labelledby="leaderboard-chart-title"
      className="rounded-3xl border border-white/10 bg-black/40 p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <figcaption
          id="leaderboard-chart-title"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80"
        >
          Tendances par piste
        </figcaption>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {Object.entries(COLORS).map(([track, color]) => (
            <span key={track} className="flex items-center gap-2">
              <span
                className="h-2 w-6 rounded-full"
                style={{ backgroundColor: color }}
                aria-hidden
              />
              {LABELS[track as keyof typeof LABELS]}
            </span>
          ))}
        </div>
      </div>
      <svg
        role="img"
        aria-label="Classement des meilleurs temps par piste"
        className="mt-4 h-[220px] w-full"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id="chart-550" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(56,189,248,0.45)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0.05)" />
          </linearGradient>
          <linearGradient id="chart-1150" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(251,191,36,0.45)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0.05)" />
          </linearGradient>
        </defs>
        <g stroke="rgba(148,163,184,0.25)" strokeWidth="1">
          {[0, 1, 2, 3, 4].map((line) => {
            const y = 16 + line * ((height - 32) / 4);
            return <line key={line} x1="24" x2={width - 24} y1={y} y2={y} />;
          })}
        </g>
        {(['550m', '1150m'] as const).map((track) => {
          const values = grouped[track];
          if (!values.length) return null;
          const points = buildPolyline(values, width, height);
          return (
            <g key={track}>
              <polyline
                points={points}
                fill={track === '550m' ? 'url(#chart-550)' : 'url(#chart-1150)'}
                stroke={COLORS[track]}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {values.map((entry, index) => {
                const coords = points.split(' ')[index]?.split(',');
                if (!coords) return null;
                const [x, y] = coords.map(Number);
                const label = `${LABELS[track]} – ${entry.driver} : ${entry.bestTime.toFixed(3)}s le ${entry.date}`;
                return (
                  <circle
                    key={`${entry.driver}-${entry.date}`}
                    cx={x}
                    cy={y}
                    r={4}
                    fill={COLORS[track]}
                  >
                    <title>{label}</title>
                  </circle>
                );
              })}
            </g>
          );
        })}
      </svg>
      <p className="mt-3 text-xs text-muted-foreground">
        Données démonstratives mises à jour manuellement. Importer vos chronos depuis
        votre système de timing pour rendre cette visualisation dynamique.
      </p>
    </figure>
  );
}
