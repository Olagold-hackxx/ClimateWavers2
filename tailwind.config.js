/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'graylight': "#D9D9D9",
        'graydark': "#D2D2D2",
        'green': "#008080",
      },
    },
  },
  plugins: [],
}

