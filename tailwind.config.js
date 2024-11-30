/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4D8D',
          light: '#FF9EBF',
          dark: '#D93D75'
        },
        secondary: {
          DEFAULT: '#6C63FF',
          light: '#8B84FF',
          dark: '#5750CC'
        },
        background: '#F8F9FF'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0, 0, 0, 0.1)',
        'glow': '0 5px 15px rgba(255, 77, 141, 0.4)'
      }
    },
  },
  plugins: [],
}