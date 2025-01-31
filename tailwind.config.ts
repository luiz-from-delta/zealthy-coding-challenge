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
        "light-lime": "#F2F4E9",
        "primary-green": "#59AA74",
        paragraph: "#273E56",
        "input-background": "#EFEFEF",
      },
      fontSize: {
        input: "0.8125rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
