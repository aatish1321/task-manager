/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8",
        secondary: "#f97316",
        accent: "#10b981",
        neutral: "#1f2937",
        "base-100": "#ffffff",
        info: "#0ea5e9",
        success: "#22c55e",
        warning: "#f59e0b",
        error: "#ef4444",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
