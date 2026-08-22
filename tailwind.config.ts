import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./frontend/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./frontend/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saathi: {
          navy: "#0A2540",
          navyLight: "#103B66",
          saffron: "#F59E0B",
          saffronLight: "#FEF3C7",
          emerald: "#10B981",
          emeraldLight: "#D1FAE5",
          crimson: "#EF4444",
          crimsonLight: "#FEE2E2",
          surface: "#F8FAFC",
          card: "#FFFFFF",
          border: "#E2E8F0",
          muted: "#64748B",
          dark: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
