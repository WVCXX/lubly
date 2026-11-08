/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        rose: {
          100: "#ffd6e8",
          300: "#ff9ec4",
          500: "#ff4d88",
        },
      },
    },
  },
  plugins: [],
};
