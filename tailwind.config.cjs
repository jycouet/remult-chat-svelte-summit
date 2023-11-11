/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        svelte: {
          ...require("daisyui/src/theming/themes")["[data-theme=dracula]"],
          primary: "#FF3E00",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};

module.exports = config;
