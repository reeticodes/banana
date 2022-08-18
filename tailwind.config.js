/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: { max: '480px' },
      md: { max: '1024px' },
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    fontFamily: false,
  },
}
