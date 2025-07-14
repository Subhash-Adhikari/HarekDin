/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B9BD5',
          dark: '#4A8BC5',
          light: '#D4E5F7',
        },
      },
    },
  },
  plugins: [],
}