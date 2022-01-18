module.exports = {
  content: ["./src/**/*.{html,js}"],
  media: false, // or 'media' or 'class'
  theme: {
    maxHeight: {
      '35v': '35vh',
      '50v': '50vh',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'dark'
    ],
  },
}
