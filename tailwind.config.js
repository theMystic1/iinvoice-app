/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        lightMode: {
          primary: "#f8f8f8",
          seconday: "#141625",
          thirday: "#ffff",
        },
        darkMode: {
          primary: "#141625",
          seconday: "#f8f8f8",
          thirday: "#252945",
        },

        accentPink: {
          0: "#dfe3fa",
          100: "#9277ff",
          200: "#7c5dfa",
          300: "#7e88c3",
          400: "#888eb0",
          500: "#1e2139",
          600: "#0c0e16",
        },
        accentRed: {
          0: "#ff9797",
          100: "#ec5757",
        },

        accents: {
          pending: {
            50: "#fff7ed",
            100: "#ff8f00",
          },
          paid: {
            50: "#dcfce7",
            100: "#33d69f",
          },
          draft: {
            50: "#e5e5e5",
            100: "#373b53",
          },
        },
      },
    },
  },
  plugins: [],
};
