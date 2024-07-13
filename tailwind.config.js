/** @type {import('tailwindcss').Config} */
import vctor from ''
import { light } from '@mui/material/styles/createPalette';

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
          light: "#9BEC00",
          darkTeal: "#007F73"

        },

        yellow: {
          dark: '#FFC700',
          default: '#EDDC44',
          medium: "#FFC700",
          light: "#FFF455",
          extraLight: "#F3FF90"
        
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

