module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.html',
  ],
  prefix: 'tw-',
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
    },
    container: {
      center: false,
    },
  },
};
