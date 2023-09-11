/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "rgb(13,17,23)",
        darkHover: "rgb(24, 31, 42)",
        cream: "#e9e9e9",
      },
    },
  },
  plugins: [],
};
