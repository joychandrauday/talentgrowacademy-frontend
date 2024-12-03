/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        primary:'#15293E',
        secondary:'#F57231',
        accent:'#FFF000',
        neutral:'#F5F5F5',
        neutralop:'#212121',
        basic:"#00008b",
      },
      fontFamily:{
        sans:'"Open Sans", serif',
        poppins:' "Poppins", sans-serif',
      },
      backgroundImage: {
        'basic': "url('https://res.cloudinary.com/dklikxmpm/image/upload/v1733160830/image_cxnhyo.webp')",
      }
    },
  },
  plugins: [require("daisyui")],
}