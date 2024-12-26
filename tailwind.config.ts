const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: {
          100: "#4A90E2",
          500: "#4A90E2",
        },
        complimentaryBlue: {
          100: "#F09C13",
          200: "#3A77B0",
          300: "#1385F0",
          400: "#9B7840",
          500: "#415970",
          600: "#463F34",
        },
      },
    },
  },
  plugins: [],
};
export default config;
