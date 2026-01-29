/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        smoke: "smoke 30s linear infinite",
      },
      keyframes: {
        smoke: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-200px, -200px)" },
        },
      },
    },
  },
  plugins: [],
};
