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
        'accent-red': '#DC2034',
        'accent-blue': '#00A9E5',
        'dark-red': '#940513',
        'accent-indigo': '#4b0082',
        'accent-gray': '#b8b8b8',
        'accent-green': '#39ff14',
        'accent-purple': '#a44cd3',
        'lighter-primary': '#272727'
      }
    },
  },
  plugins: [],
}

