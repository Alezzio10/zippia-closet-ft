export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  // AÑADE ESTO: Es lo que evita que los botones de primevue pierdan el fondo
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors:{
        primary: "#7F82A6",
        primaryDark: "#6B6E8E",
        primaryLight: "#A3A6C5"
      }
    },
  },
  plugins: [],
}