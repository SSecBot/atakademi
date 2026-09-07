import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F9FB",
        surface: {
          DEFAULT: "#F7F9FB",
          dim: "#D8DADC",
          bright: "#F7F9FB",
          lowest: "#FFFFFF",
          low: "#F2F4F6",
          container: "#ECEEF0",
          high: "#E6E8EA",
          highest: "#E0E3E5",
        },
        primary: {
          DEFAULT: "#5D5F5F",
          accent: "#712AE2",
          purple: "#7C3AED",
          hover: "#631FD0",
          light: "#F3E8FF",
        },
        secondary: {
          DEFAULT: "#712AE2",
          accent: "#B4136D",
          pink: "#EC4899",
          hover: "#9D0F5E",
          light: "#FCE7F3",
        },
        on: {
          surface: "#191C1E",
          "surface-variant": "#444748",
          background: "#191C1E",
          primary: "#FFFFFF",
          secondary: "#FFFFFF",
        },
        outline: {
          DEFAULT: "#747878",
          variant: "#E2E8F0",
          subtle: "#C4C7C8",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      boxShadow: {
        ambient: "0px 10px 30px rgba(124, 58, 237, 0.08)",
        "ambient-hover": "0px 20px 40px rgba(124, 58, 237, 0.14)",
        modal: "0px 25px 50px -12px rgba(0, 0, 0, 0.15)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      maxWidth: {
        "container-max": "1280px",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #712AE2 0%, #B4136D 100%)",
        "brand-gradient-hover": "linear-gradient(135deg, #631FD0 0%, #9D0F5E 100%)",
        "purple-soft": "linear-gradient(180deg, rgba(243, 232, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)",
        "hero-glow": "radial-gradient(circle at 50% 50%, rgba(113, 42, 226, 0.12) 0%, rgba(180, 19, 109, 0.05) 50%, transparent 80%)",
      },
    },
  },
  plugins: [],
};

export default config;
