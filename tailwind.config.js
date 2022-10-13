/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        bottom: '0 2px 2px -2px rgb(17 17 17 /25%)',
      },
      gridTemplateColumns: {
        language: 'repeat(3, auto)',
      },
    },
    fontFamily: {
      sans: ['Lato', 'sans-serif'],
    },
  },
  plugins: [],
}
