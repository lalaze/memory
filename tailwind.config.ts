import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const selectColors = {
  selectPrimary: '#1E90FF',
  selectSecondary: '#FF5733',
  selectTertiary: '#FF69B4',
  selectQuaternary: '#45D483'
}

export const selectColorsList = Object.values(selectColors) 

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "delte-icon": "url('/shanchu.png')",
        "edit-icon": "url('/tianxie.png')"
      },
      colors: {
        ...selectColors
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
