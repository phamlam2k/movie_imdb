/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#423F71',
        header: '#292841',
        body: '#1C1829',
      },
      screens: {
        'mobile': {
          max: '908px'

        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
