/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: '#C85A32',
          dark: '#A64621',
          light: '#E07A53',
        },
        gold: '#D4AF37',
        cream: '#FAF9F6',
      },
    },
  },
  plugins: [],
};