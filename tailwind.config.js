/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#171717',
        'secondary':'#2A2A2A',
        'tertiary':'#7E7E7E',
        'accent-red':'#EC2C40',
        'accent-blue':'#00A9E5',
      }
    },
  },
  plugins: [],
}

