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
        'placeholder':'#7E7E7E',
        'text-color':'#FFFFFF',
        'accent-red':'#AE3C48',
        'accent-blue':'#00A9E5',
        'dark-red': '#940513'
      }
    },
  },
  plugins: [],
}

