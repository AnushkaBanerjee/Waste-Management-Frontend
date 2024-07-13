/** @type {import('tailwindcss').Config} */
import vctor from ''

const {nextui} = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },

      colors: {
       blue :{
          dark: '#059212',
          default: '#06D001',
          teal: '#4CCD99',

        },

        yellow: {
          dark: '#FFC700',
          default: '#EDDC44',
        },

        grey:{
          default: '#EDE9E9',
          medium: '#A3AED0',
        },
        white:{
          default: '#FFFFFF',}
        },
        rotate: {
          '30': '30deg',
        
        },
      

        
      }
    },
 
  darkMode: "class",
  plugins: [nextui()],
}

