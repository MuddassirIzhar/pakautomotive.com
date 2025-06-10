import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");
import { type PluginAPI } from "tailwindcss/types/config";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        custom: ['Open Sans"', "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          10: "hsl(var(--primary)/0.01)", // Adjust the transparency as needed
          50: "hsl(var(--primary)/0.05)", // Adjust the transparency as needed
          100: "hsl(var(--primary)/0.1)", // Adjust the transparency as needed
          200: "hsl(var(--primary)/0.2)", // Adjust the transparency as needed
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200px 0" },
          "100%": { backgroundPosition: "200px 0" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
      },
      backgroundSize: {
        shimmer: "100% 100%", // Custom background size
      },
    },
  },
//   plugins: [require("tailwindcss-animate")],

  plugins: [
	require("tailwindcss-animate"),
    plugin(function ({ addUtilities, theme }: PluginAPI) {
      addUtilities({
        ".animate-shimmer": {
          backgroundImage: `linear-gradient(to right, ${theme("colors.slate.100")} 0%, ${theme("colors.gray.200")} 50%, ${theme("colors.slate.100")} 100%)`,
          backgroundSize: "400px 100%",
          animation: "shimmer 2s infinite linear",
        },
      });
    }),
  ],
} satisfies Config;
