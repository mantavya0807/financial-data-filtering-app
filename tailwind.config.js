// tailwind.config.js

module.exports = {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6', // Blue-500
          DEFAULT: '#1d4ed8', // Blue-700
          dark: '#1e40af', // Blue-800
        },
        background: {
          DEFAULT: '#f3f4f6', // Gray-100
          dark: '#1f2937', // Gray-800
        },
        card: {
          DEFAULT: '#ffffff', // White
          dark: '#374151', // Gray-700
        },
      },
      transitionProperty: {
        'height': 'height',
      },
    },
  },
  plugins: [],
}
