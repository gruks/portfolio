/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        backdropBlur: {
        'md': '10px',
      },
      colors: {
        primary: {
          DEFAULT: "#0A0A0A",      // Jet Black
          foreground: "#FFFFF0",   // Ivory text on primary
        },

        background: "#FFFFF0",     // Ivory
        border: "#0A0A0A",         // Jet Black border

        text: "#0A0A0A",           // Jet Black text
      },
    },
  },
  plugins: [],
}