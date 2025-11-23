import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          midnight: '#0b1021',
          storm: '#111a2e',
          horizon: '#8ad6ff',
          aqua: '#4bf3c3',
          sand: '#f3efe6',
        },
        abp: {
          midnight: '#0b1021',
          navy: '#0f2344',
          blue: '#1f4b82',
          sky: '#5db5ff',
          gold: '#f4b860',
          goldDark: '#d9a03e',
          cream: '#f5f1e8',
          light: '#eef3fb',
          sand: '#e8edf5',
          slate: '#243348',
          ink: '#0a1324',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 50px -15px rgba(17, 75, 140, 0.35)',
        glass: '0 22px 55px -20px rgba(6, 26, 51, 0.55)',
        card: '0 18px 40px -20px rgba(11, 37, 69, 0.45)',
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(circle at 20% 20%, rgba(75, 243, 195, 0.18), transparent 55%), radial-gradient(circle at 80% 0%, rgba(138, 214, 255, 0.25), transparent 45%)',
        'hero-gradient': 'linear-gradient(130deg, #0b1021 0%, #112040 50%, #0c1a30 100%)',
      },
      borderRadius: {
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
