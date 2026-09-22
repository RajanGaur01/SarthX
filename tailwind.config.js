/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070A0D',
          900: '#0B0F14',
          850: '#0F151C',
          800: '#141D26',
          700: '#1C2733',
          600: '#283647',
        },
        primary: {
          DEFAULT: '#10B981', // GovTech Emerald
          hover: '#059669',
          light: '#34D399',
          dark: '#047857',
          glow: 'rgba(16, 185, 129, 0.25)',
        },
        saffron: {
          DEFAULT: '#F97316',
          hover: '#EA580C',
          light: '#FB923C',
          glow: 'rgba(249, 115, 22, 0.25)',
        },
        ashoka: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#60A5FA',
          glow: 'rgba(37, 99, 235, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px rgba(16, 185, 129, 0.25)',
        'glow-saffron': '0 0 25px rgba(249, 115, 22, 0.25)',
        'glow-ashoka': '0 0 25px rgba(37, 99, 235, 0.25)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}
