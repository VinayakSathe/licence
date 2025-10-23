module.exports = {
    purge: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          customBrown: "#9D5C0D",
          customOrange: "#E5890A",
          customLightOrange: "#F7D08A",
          customWhite: "#FAFAFA",
          golden: "#DAA520", // Golden-like color
          black: "#000000",
        },
  
        keyframes: {
          float: {
            '0%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-8px)' },
            '100%': { transform: 'translateY(0)' },
          },
          'fade-in-up': {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          zoom: {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' },
          },
        },
        animation: {
          float: 'float 3s ease-in-out infinite',
          'fade-in-up': 'fade-in-up 0.5s ease-out',
          zoom: 'zoom 2s ease-in-out infinite',
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };
  