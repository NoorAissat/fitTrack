// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}', // Adjust paths according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        beige: '#f5f5dc',
        darkGray: '#212121',
      },
    },
  },
  plugins: [],
};
