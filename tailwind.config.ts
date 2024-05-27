import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        primary: {
          DEFAULT: "hsl(var(--primary))",
        },

        s2: {
          indigo: {
            50: "#F7F6FE",
            100: "#ECE8FD",
            200: "#DCD5FB",
            300: "#CCC3F9",
            400: "#B0A0F8",
            500: "#7760E1",
            600: "#553ACF",
            700: "#472EB7",
            800: "#3A249E",
            900: "#2F206E",
          },

          gray: {
            50: "#FCFCFC",
            100: "#FAFAFA",
            200: "#F3F3F5",
            300: "#E6E5EA",
            400: "#D7D7DA",
            500: "#C2C1C7",
            600: "#908E94",
            700: "#777582",
            800: "#4C4A57",
            900: "#1B1A21",
          },
        },
      },
    },
  },
};

export default config;
