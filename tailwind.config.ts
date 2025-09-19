import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './app/**/*.{ts,tsx,mdx}',
    './content/**/*.{mdx,md}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#0ea5ff',
          foreground: '#0b1120',
        },
        accent: {
          DEFAULT: '#ffb347',
          foreground: '#1a1b1f',
        },
        muted: {
          DEFAULT: '#1e1f24',
          foreground: '#9ca3af',
        },
        surface: {
          DEFAULT: '#23242b',
          foreground: '#f8fafc',
        },
        border: '#2f3039',
        input: '#2f3039',
        ring: '#38bdf8',
      },
      fontFamily: {
        heading: ['var(--font-sora)', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(135deg, rgba(56,189,248,0.12) 0%, rgba(15,23,42,0.6) 45%, rgba(14,165,233,0.15) 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(14,165,233,0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out',
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [animatePlugin],
};

export default config;
