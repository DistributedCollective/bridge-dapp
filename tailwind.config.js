module.exports = {
  purge: [
    './src/app/components/**/*.{ts,tsx}',
    './src/app/containers/**/*.{ts,tsx}',
    './src/ignore-purge.ts',
  ],
  future: {
    purgeLayersByDefault: true,
  },
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    fontFamily: {
      body: ['Montserrat', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#EDB305',
      secondary: '#2274A5',
      white: '#e9eae9',
      black: '#000000',
      dark: {
        1: '#575757',
        DEFAULT: '#191919',
        2: '#101010',
      },
      green: '#17C3B2',
      red: '#D74E09',
    },
    extend: {},
  },
  variants: {
    opacity: ['responsive', 'hover'],
    extend: {},
  },
  plugins: [],
};
