import { colors } from 'unocss/preset-mini'

const blurple = '#5764f2'

export const lightTheme = {
  nuetral: {
    bg: {
      DEFAULT: colors.neutral[300],
      hover: 'transparent',
    },
    border: {
      100: colors.neutral[100],
      200: colors.neutral[200],
      300: colors.neutral[300],
    },

    focus: '#38bdf8', // lightBlue[400]
    surface: {
      100: colors.white,
      200: '#fafaf9', // warmGray[50]
      300: '#f5f5f4', // warmGray[100]
      400: '#e7e5e4', // warmGray[200]
      inverse: colors.black,
    },
    text: {
      100: '#44403c', // warmGray[700]
      200: '#292524', // warmGray[800]
      300: '#1c1917', // warmGray[900]
      400: '#0c0a09', // coolGray[950]
      inverse: colors.white,
    },
  },
  action: {
    border: blurple,
    bg: {
      100: {
        DEFAULT: blurple,
        hover: '#2a3aef',
        inverse: colors.white,
      },
      200: {
        DEFAULT: colors.slate[800],
        hover: colors.slate[900],
      },
    },
    link: {
      DEFAULT: colors.blue[600],
      active: colors.blue[600],
      hover: colors.black,
    },
    text: {
      100: colors.indigo[50],
      200: colors.slate[100],
      300: colors.white,
      inverse: colors.indigo[950],
    },
  },
  info: {
    border: colors.sky[800],
    surface: {
      100: colors.sky[600],
    },
    text: {
      100: colors.sky[200],
      200: colors.sky[50],
    },
  },
  success: {
    border: colors.green[600],
    bg: {
      100: colors.green[600],
    },
    surface: {
      100: colors.green[700],
    },
    text: {
      100: colors.green[200],
      200: colors.green[50],
      inverse: colors.green[600],
    },
  },
  warning: {
    border: colors.yellow[800],
    surface: {
      100: colors.yellow[600],
    },
    text: {
      100: colors.yellow[200],
      200: colors.yellow[50],
    },
  },
  danger: {
    border: colors.rose[800],
    bg: {
      100: {
        DEFAULT: colors.rose[600],
        hover: colors.rose[700],
      },
    },
    surface: {
      100: colors.rose[400],
      200: colors.rose[600],
    },
    text: {
      100: colors.rose[200],
      200: colors.rose[50],
    },
  },
}
