module.exports = {
  purge: ['src/**/*.ts', 'src/**/*.tsx', 'public/**/*.html'],
  future: {
    purgeLayersByDefault: true,
  },
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      DEFAULT: ['Montserrat', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '15px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      truewhite: '#ffffff',
      black: '#000000',
      dark: '#181818',
      white: '#D9D9D9',
      gray: '#383838',
      verydark: '#282828',
      lightdark: '#686868',
      bordergray: '#575757',
      gold: '#FEC004',
      teal: '#4ECDC4',
      red: '#ff0000',
    },
    fontSize: {
      small: '14px',
      normal: '16px',
      button: '18px',
      lead: '20px',
      heading: '28px',
      title: '53px',
    },
    extend: {
      opacity: {
        '5': '0.05',
      },
      screens: {
        '2xl': '1536px',
      },
    },
  },
  variants: {
    opacity: ['responsive', 'hover'],
  },
  plugins: [],
};
