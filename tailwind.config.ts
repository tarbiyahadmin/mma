import type { Config } from "tailwindcss";

/** Brand: primary #6a5076, secondary #c8b8b3, alt #5f446a / #ad9a94 */
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
          primary: "#6a5076",
          secondary: "#c8b8b3",
          altPrimary: "#5f446a",
          /** Completes partial brand token #ad9a → full taupe */
          altSecondary: "#ad9a94",
          navy: "#1f1526",
          void: "#16101c",
          ink: "#2a2034",
          gold: "#6a5076",
          "gold-bright": "#8d7399",
          "gold-muted": "#5f446a",
          cream: "#f4f0ee",
          muted: "#a89ca8",
          glow: "#8d7399",
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
        kx: "0 24px 80px -12px rgb(26 16 36 / 0.55)",
        "kx-soft": "0 0 60px -10px rgb(106 80 118 / 0.14)",
        "kx-lift": "6px 6px 0 #5f446a",
        "kx-glow-gold":
          "0 0 0 1px rgb(255 255 255 / 0.08), 0 0 48px -10px rgb(141 115 153 / 0.35)",
        "kx-glow-soft": "0 0 80px -20px rgb(106 80 118 / 0.22)",
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
