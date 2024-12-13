/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
    extend: {
      colors: {
        'donkerblauw': '#0D2999',
        'lichtblauw': '#143CDB',
        'donkerderblauw': '#000D40',
        'roodlive': '#FF0000',
        'goud': '#FFD700',
        'zilver': '#C0C0C0',
        'brons': '#CD7F32',
      },
      screens: {
        'respon1': {'max': '1670px'},
        'respon2': {'max': '1200px'},
        'respon3': {'max': '750px'},
        'respon4': {'max': '1400px'},
        'respon5': {'max': '1100px'},
        'respon6': {'max': '950px'},
        'respon7': {'max': '650px'},
        'respon8': {'max': '500px'},
        'respon9': {'max': '800px'},
        'respon10': {'max': '550px'},
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}