/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#ef5454',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          accent: '#e11d48',
        },
        dark: {
          bg: '#0F1115',
          surface: '#181B20',
          card: '#20242C',
          border: '#2E3440',
          muted: '#8A94A6',
        },
        category: {
          lowcarb: {
            DEFAULT: '#EF4444',
            bg: 'rgba(239, 68, 68, 0.15)',
            border: '#F87171',
            text: '#FCA5A5',
          },
          active: {
            DEFAULT: '#EF5454',
            bg: 'rgba(239, 84, 84, 0.15)',
            border: '#FB7185',
            text: '#FDA4AF',
          },
          breakfast: {
            DEFAULT: '#F59E0B',
            bg: 'rgba(245, 158, 11, 0.15)',
            border: '#FBBF24',
            text: '#FDE68A',
          },
          snack: {
            DEFAULT: '#3B82F6',
            bg: 'rgba(59, 130, 246, 0.15)',
            border: '#60A5FA',
            text: '#93C5FD',
          },
        },
      },
      fontFamily: {
        display: ['Archivo Black', 'Barlow Condensed', 'Impact', 'sans-serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-red': '0 0 25px rgba(239, 84, 84, 0.35)',
        'glow-green': '0 0 25px rgba(239, 84, 84, 0.35)',
        'glow-subtle': '0 4px 20px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
