/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './components/**/*.{html,js}',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slateBlue: '#8896AB',
        darkSlateBlue: '#0E1C36',
        sunset1: '#2b3951',
        sunset2: '#345d7d',
        sunset3: '#735a7b',
        sunset4: '#c56d86',
        sunset5: '#fe7583',
        errorRed: '#ff3333'
      },
      gridTemplateColumns: {
        // added new 4 column grid as new4
        'newAuto': 'repeat(auto-fit, minmax(250px, max-content))',
        'newAuto2': 'repeat(auto-fit, minmax(350px, max-content))',
        'newAuto3': 'repeat(auto-fit, minmax(180px, max-content))',
        'newAuto4': 'repeat(auto-fit, minmax(288px, max-content))',
        'newAuto5': 'repeat(auto-fit, minmax(120px, max-content))',
      },
      spacing: {
        '38rem':'38rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        'taskInputW':'240px',
        'resourceH':'300px'
      }
    }
    ,

  },
  plugins: [],
}
