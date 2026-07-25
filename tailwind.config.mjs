/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          accent: '#16a34a',
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
            DEFAULT: '#22C55E',
            bg: 'rgba(34, 197, 94, 0.15)',
            border: '#4ADE80',
            text: '#86EFAC',
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
        'glow-green': '0 0 25px rgba(34, 197, 94, 0.25)',
        'glow-subtle': '0 4px 20px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
