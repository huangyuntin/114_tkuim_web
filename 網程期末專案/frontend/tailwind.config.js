/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rimuru: {
          light: '#E0F7FA',
          DEFAULT: '#4DD0E1',
          dark: '#0097A7',
        },
        'soft-white': '#FAFDFF',
        'text-main': '#374151',
        'text-light': '#6B7280',
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}