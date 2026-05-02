/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkSidebar: '#1e1e2d',
        brandOrange: '#f97316',
        brandGreen: '#47c18e',
      }
    },
  },
  plugins: [],
}