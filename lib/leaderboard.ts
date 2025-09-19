export type LeaderboardEntry = {
  track: '550m' | '1150m';
  driver: string;
  bestTime: number;
  date: string;
};

export const leaderboardData: LeaderboardEntry[] = [
  { track: '550m', driver: 'Léo M.', bestTime: 52.481, date: '2024-05-12' },
  { track: '550m', driver: 'Clara V.', bestTime: 53.122, date: '2024-05-08' },
  { track: '1150m', driver: 'Nathan R.', bestTime: 97.363, date: '2024-04-28' },
  { track: '1150m', driver: 'Alexis P.', bestTime: 98.248, date: '2024-04-20' },
  { track: '550m', driver: 'Lucie D.', bestTime: 54.031, date: '2024-03-15' },
];

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds - minutes * 60;
  return `${minutes > 0 ? `${minutes}m` : ''}${remainder.toFixed(3)}s`;
}
