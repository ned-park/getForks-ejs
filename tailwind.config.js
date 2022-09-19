/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./input.css}",
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
        white: '#eee8d5',
        blue: '#268bd2',
        black: '#073642',
        green: '#859900',
        brBlack: '#002b36',
        brCyan: '#93a1a1',
        red: '#dc322f'
      }
    },
  },
  plugins: [],
}
