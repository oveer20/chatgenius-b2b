import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["DM Serif Display", "Georgia", "serif"],
        mono: ["DM Mono", "Fira Code", "monospace"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      colors: {
        bg: {
          DEFAULT: "#070910",
          2: "#0d1017",
          3: "#111520",
        },
        accent: {
          DEFAULT: "#00e5a0",
          dim: "rgba(0,229,160,0.08)",
          glow: "rgba(0,229,160,0.15)",
        },
        surface: "rgba(255,255,255,0.03)",
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          hover: "rgba(255,255,255,0.15)",
        },
        text: {
          primary: "#f0f2f8",
          secondary: "#8892a4",
          muted: "#4a5568",
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "fade-up": "fade-up 0.9s ease forwards",
        "typing": "typing-bounce 1.2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 12px #00e5a0" },
          "50%": { opacity: "0.6", boxShadow: "0 0 20px #00e5a0, 0 0 40px rgba(0,229,160,0.15)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "typing-bounce": {
          "0%, 60%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "30%": { transform: "translateY(-5px)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
