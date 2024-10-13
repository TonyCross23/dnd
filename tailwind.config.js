/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBackGroundColor" : '#0D1117',
        "columnBackGroundColor" : '#161C22',
      },
    },
  },
  plugins: [],
}

