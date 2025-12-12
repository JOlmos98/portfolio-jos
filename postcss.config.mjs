/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // tailwindcss: {},
    '@tailwindcss/postcss': {}, // <-- ¡Cambio corregido!
  },
};

export default config;
