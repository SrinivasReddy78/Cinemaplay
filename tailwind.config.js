/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'firstColor': '#181212', // --bg-color
        'secondColor': '#fff', // --secondary-color
        'elemColor': '#F5C901', // --elem-color
        'elemColor2':'#E50914',
      },
      fontFamily: {
        'firstFont': ['Poppins', 'sans-serif'], // --primary-font
        'secondFont': ['Pathway Extreme', 'sans-serif'], // --secondary-font
      },
      boxShadow : {
        'shadowBox' : '0 .5rem 1.5rem rgba(0, 0, 0, .1)'
      },
      gridTemplateColumns : {
        'auto-7-fr': 'repeat(auto-fill, minmax(7rem, 1fr))',
        'auto-9-fr': 'repeat(auto-fill, minmax(9rem, 1fr))',
        'auto-12-fr': 'repeat(auto-fill, minmax(12rem, 1fr))',
        'auto-13-fr': 'repeat(auto-fill, minmax(13rem, 1fr))',
      }
    },
  },
  plugins: [],
}
