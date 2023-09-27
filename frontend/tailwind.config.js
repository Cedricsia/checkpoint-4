/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      text: ["Roboto", "sans-serif"],
      heading: ["Monserrat", "sans-serif"],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2E86DE",
          secondary: "#F7F7F7",
          accent: "#F2F2F2",
          neutral: "#FF7F50",
          "base-content": "#242422",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
