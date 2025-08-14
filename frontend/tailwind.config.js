module.exports = {
  darkMode: 'class',
    content: ['./src/**/*.{js,ts,jsx,tsx}'], 
    safelist: ["grid-cols-2", "grid-cols-3", "grid-cols-4"],
    theme: {
      extend: {
        fontFamily: {
          Montserrat: ['Montserrat', 'sans-serif'],
        },
        animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      },
    },
    plugins: [],
  }
  