/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0e2f62",
          "navy-dark": "#0a2348",
          "navy-light": "#1a4a8a",
          gold: "#c9a227",
          "gold-light": "#e8c547",
          slate: "#f4f7fb",
          mist: "#fbf8f1",
        },
      },
      fontFamily: {
        sans: ["Nunito Sans", "Noto Sans TC", "system-ui", "sans-serif"],
        display: ["Noto Sans TC", "Nunito Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "SF Mono", "ui-monospace", "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 18px 45px rgba(14, 47, 98, 0.12)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
