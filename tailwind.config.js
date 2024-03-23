/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "400px",
        md: "800px",
        lg: "800px",
        xl: "800px",
        "2xl": "800px",
      },
    },

    extend: {
      colors: {
        form: "#f9f9f9",
        head: "#f2f2f2",
        line: "#ddd",
      },
      fontFamily: {
        arial: ["Arial"],
      },
    },
  },
  plugins: [],
};
