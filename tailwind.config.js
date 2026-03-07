/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dooray: {
          blue: '#0066CC',
          navy: '#1A2B4A',
        }
      }
    },
  },
  plugins: [],
}
