module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        'word': '10em',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
