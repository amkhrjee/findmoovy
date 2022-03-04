const autoprefixer = require('autoprefixer');

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: "transparent",
      cuurent: "currentColor",
      navbar: "#0a1128",
      searchbar: "#120e43",
      searchbtn: "#242B2E",
      title: "#da4163",
      moviecard: "#3c3c3b",
      movieTitle: "#ebebd3",
      detail: "#03203C",
      gradblue: "#110D41",
      white: "#fff",
      grey: "#808080",
      all: "#e07c24",
      movies: "#d82e2f",
      series: "#5a20cb",
      games: "#8D3DAF",
      black: "#000",
      share: "#5a20cb",
      copy: "#5da3fa",
      background: '#18181c'
    },
  },
  plugins: [],
};
