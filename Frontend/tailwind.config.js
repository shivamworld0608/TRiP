/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(255, 255, 255, 0.3)", // Example custom shadow
      },
    },
  },
  plugins: [require("daisyui")],
};
