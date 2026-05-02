import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        amber:        "#C8651A",
        rust:         "#A83E10",
        teal:         "#3A7D6E",
        "teal-dark":  "#2D6459",
        cream:        "#FDFAF5",
        "cream-dark": "#F0E9D8",
        gold:         "#D4A843",
        dark:         "#1A1410",
        "dark-2":     "#241C16",
        "dark-muted": "#6B6560",
      },
      fontFamily: {
        display: ["var(--font-sofia)", "Helvetica", "Arial", "sans-serif"],
        body:    ["var(--font-sofia)", "Helvetica", "Arial", "sans-serif"],
        accent:  ["var(--font-sofia)", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(4rem, 9vw, 8rem)",   { lineHeight: "0.95" }],
        "display-lg": ["clamp(3rem, 6vw, 6rem)",   { lineHeight: "1.0"  }],
        "display-md": ["clamp(2rem, 4vw, 3.8rem)", { lineHeight: "1.05" }],
        "display-sm": ["clamp(1.6rem, 3vw, 2.8rem)", { lineHeight: "1.1" }],
      },
      animation: {
        "fade-up":     "fadeUp 0.8s ease forwards",
        "fade-in":     "fadeIn 0.6s ease forwards",
        "spin-slow":   "spin 30s linear infinite",
        "spin-slower": "spin 50s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;