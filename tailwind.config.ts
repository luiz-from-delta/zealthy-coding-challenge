import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "input-background": "#EFEFEF",
        "light-lime": "#F2F4E9",
        "primary-green": "#59AA74",
        "dark-primary-green": "#3F945B",
        error: "#EE262A",
        paragraph: "#273E56",
        "table-border": "#D8D8D8",
        "table-header": "#E9E9E9",
        "table-row-odd": "#FAFAFA",
        "table-row-even": "#FFFFFF",
        warning: "#FFA800",
      },
      fontSize: {
        description: "0.8125rem",
        input: "0.8125rem",
      },
      fontFamily: {
        mulish: "Mulish, sans-serif",
      },
      dropShadow: {
        default: "0 1px 48px rgba(39, 62, 86, 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
