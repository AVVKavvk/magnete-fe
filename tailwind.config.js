// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  safelist: [
    "btn",
    "btn-primary",
    "btn-success",
    "btn-error",
    "btn-warning",
    "btn-info",
  ],
  plugins: [require("daisyui")],
};
