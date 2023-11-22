/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
            borderColor: "white",
          },
          "100%": {
            width: "100%",
            borderColor: "transparent",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
            visibility: "visible",
          },
          "100%": {
            borderColor: "white",
            visibility: "hidden",
          },
        },
        zoomIn: {
          "80%": { transform: "scale(1)", transition: "transform 0.35s" },
          "100%": { transform: "scale(1.15)"}
        },
      },
      animation: {
        typing: "typing 2s steps(20) alternate, blink .7s",
        zoomIn: "zoomIn 0.35s ease-in-out",
      },
    },
  },
  plugins: [],
};
