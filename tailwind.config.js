/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rozha: ['"Rozha One"', 'serif'],
        yatra: ['"Yatra One"', 'cursive', 'serif'],
        cinzel: ['"Cinzel Decorative"', 'serif'],
        kalam: ['"Kalam"', 'cursive'],
        rajdhani: ['"Rajdhani"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        "button-large": ['"Poppins"', 'sans-serif'],
        sans: [
          '"Poppins"',
          '"Rajdhani"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
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
        // Desi Maximalism Curated Color Palette
        desi: {
          rani: "#E11D74",
          "rani-light": "#FF4D97",
          "rani-dark": "#9E0E4E",
          marigold: "#FF7A00",
          "marigold-light": "#FFA047",
          "marigold-dark": "#C75800",
          haldi: "#FFB800",
          gold: "#F5D061",
          "gold-light": "#FDE68A",
          "gold-dark": "#B8860B",
          peacock: "#00A896",
          "peacock-light": "#05D5BE",
          "peacock-dark": "#01685D",
          emerald: "#10B981",
          "emerald-dark": "#047857",
          crimson: "#BE123C",
          "crimson-dark": "#881337",
          midnight: "#120726",
          velvet: "#1C0A33",
          "velvet-card": "#260E45",
          "velvet-border": "#3F186E",
          amber: "#D97706",
        },
      },
      boxShadow: {
        zari: "0 0 15px rgba(245, 208, 97, 0.45), 0 0 3px rgba(245, 208, 97, 0.8)",
        kundan: "0 0 25px rgba(225, 29, 116, 0.4), 0 0 8px rgba(255, 122, 0, 0.5)",
        peacock: "0 0 20px rgba(0, 168, 150, 0.45)",
        "gold-glow": "0 0 35px rgba(255, 184, 0, 0.35)",
        "festive-card": "0 8px 32px 0 rgba(18, 7, 38, 0.6), inset 0 0 0 1px rgba(245, 208, 97, 0.3)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "shimmer-gold": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "festive-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "brightness(100%)" },
          "50%": { opacity: "0.85", filter: "brightness(130%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shimmer-gold": "shimmer-gold 3.5s linear infinite",
        "festive-float": "festive-float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
