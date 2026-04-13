import type { Config } from "tailwindcss";

/** Brand: navy #021140, gold #a57b02 */
export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: false,
      padding: "0",
    },
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        arabic: ['"Noto Naskh Arabic"', 'serif'],
      },
      colors: {
        kx: {
          navy: "#021140",
          void: "#010a24",
          ink: "#031a5c",
          gold: "#a57b02",
          "gold-bright": "#c49410",
          "gold-muted": "#7a5f1a",
          cream: "#f2efe6",
          muted: "#9aacbf",
          glow: "#d4a20a",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        kx: "0 24px 80px -12px rgb(2 17 64 / 0.55)",
        "kx-soft": "0 0 60px -10px rgb(165 123 2 / 0.12)",
        "kx-lift": "6px 6px 0 #021140",
        "kx-glow-gold": "0 0 0 1px rgb(255 255 255 / 0.08), 0 0 48px -10px rgb(212 162 10 / 0.35)",
        "kx-glow-soft": "0 0 80px -20px rgb(120 60 180 / 0.2)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "kx-drift": {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(1.5%, -1%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "kx-drift": "kx-drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
