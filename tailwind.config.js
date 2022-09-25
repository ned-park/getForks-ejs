/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./input.css",
    "./views/*.ejs",
    "./views/partials/*.ejs",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        white: '#eeeeee',
        blue: '#268bd2',
        black: '#222',
        brBlack: '#3c4856',
        brCyan: '#a0acbd',
      }
    },
  },
  plugins: [],
}
