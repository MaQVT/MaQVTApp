/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        securite1: "#EF8D4D",
        securite2: "#FBE3D5",
        satisfaction1: "#FE06FF",
        satisfaction2: "#EBC4FE",
        inclusion1: "#2BBDC8",
        inclusion2: "#80E5EB",
        pouvoiragir1: "#001F60",
        pouvoiragir2: "#B3C5E6",
        sens1: "#6E2F9F",
        sens2: "#C3B5F9",
        rose_pr:"#f9eee8",
        customGray: "#615240"
      },
    },
    fontFamily: {
      PlayfairDisplay: ['Playfair Display', 'Segoe UI', 'serif'],
      Trocchi: ['Trocchi', 'Segoe UI', 'serif'],
      Benedict: ['var(--benedict)', 'Segoe UI', 'serif'],
      // MoonTime: ['var(--moon-time)', 'Segoe UI', 'serif'],
      MoonTime: ['Dancing Script', 'Segoe UI', 'serif'],
      AnticDidone: ['Antic Didone', 'Segoe UI', 'serif'],
    },
    screens: {
      sm: { max: "800px" },
      md: { max: "1100px" },
      lg: "1100.1px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
