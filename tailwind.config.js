module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue:'#3556AB', 
        primaryLemon:'#9EB031', // Default secondary color
        primaryRed:'#720D0D', // Default gray color
      },
      boxShadow: {
        'dark': '0 10px 15px rgba(0, 0, 0, 0.3)', // Very dark shadow
      },
    },
  },
  plugins: [],
}
