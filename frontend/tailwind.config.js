/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e8feff",
          100: "#c7fcff",
          200: "#94f8ff",
          300: "#5aeeff",
          400: "#24dcf7",
          500: "#0abfdc",
          600: "#0698b3",
          700: "#097991",
          800: "#0d6477",
          900: "#11414e",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(36,220,247,0.25), 0 12px 40px rgba(8,37,47,0.35)",
      },
    },
  },
  plugins: [],
};
