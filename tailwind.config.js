/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
    extend: {
      colors: {
        primary: "#000000", // Replace with your primary color
        accent: "#FF0000",  // Replace with your accent color
      },
    },
  },
    plugins: [],
  };