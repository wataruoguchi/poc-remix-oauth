import type { Config } from "tailwindcss";

// https://tailwindcss.com/docs/guides/remix
export default {
  darkMode: "selector",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
