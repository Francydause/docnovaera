/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rawline', 'sans-serif'],
      },
      colors: {
        'gov-blue': '#1351B4',
        'gov-yellow': '#FFCD07',
      }
    },
  },
  plugins: [],
};