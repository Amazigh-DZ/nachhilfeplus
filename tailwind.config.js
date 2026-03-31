/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#06b6d4",
        secondary: "#3b82f6",
        accent: "#10b981",
        background: "#020617",
        surface: "#0f172a",
      },
    },
  },
  plugins: [],
};