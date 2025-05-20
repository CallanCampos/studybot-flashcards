/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",                // enable dark-mode toggle if you want
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",           // indigo-500
          600: "#4f46e5",
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
