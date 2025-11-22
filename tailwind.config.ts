import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        abp: {
          blue: '#0b3c65',
          gold: '#d4af37',
          cream: '#f5f5f0',
          ink: '#1c2a38',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        glow: '0 20px 40px -15px rgba(11, 60, 101, 0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
