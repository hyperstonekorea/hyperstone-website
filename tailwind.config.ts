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
        // HYPERSTONE Brand Colors
        brand: {
          primary: "#0082FB",    // Main brand blue
          secondary: "#0064E0",  // Darker blue
          light: "#F1F5F8",      // Light gray/blue
          dark: "#1C2B33",       // Dark gray/navy
        },
        // Alias for easier usage
        primary: "#0082FB",
        secondary: "#0064E0",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;