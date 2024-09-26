/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#03045E",
        secondary: "#38b6ff",
        accent:"#CAF0F8"
      }
    },
  },
  plugins: [],
}

