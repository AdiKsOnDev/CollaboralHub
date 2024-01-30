/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#171717',
        'secondary': '#2A2A2A',
        'placeholder': '#7E7E7E',
        'text-color': '#FFFFFF',
        'accent-red': '#AE3C48',
        'accent-blue': '#00A9E5',
        'dark-red': '#940513',
        'indigo': '#4b0082',
        'gray': '#b8b8b8',
        'green': '#39ff14',
        'blue': '#45b6fe',
        'red': '#ff4d4d',
        'purple': '#a44cd3',
      }
    },
  },
  plugins: [],
}

