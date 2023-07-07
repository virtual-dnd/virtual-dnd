import { colors } from 'unocss/preset-mini'

export const darkTheme = {
  nuetral: {
    border: {
      100: colors.dark[50],
      200: colors.dark[100],
      300: colors.dark[200],
    },
    bg: {
      100: {
        DEFAULT: colors.dark[300],
        hover: colors.dark[400],
      },
    },
    surface: {
      100: colors.dark[600],
      200: colors.dark[700],
      300: colors.dark[800],
      400: colors.dark[900],
      inverse: colors.white,
    },
    text: {
      100: colors.neutral[400],
      200: colors.neutral[300],
      300: colors.neutral[200],
      400: colors.neutral[100],
      inverse: colors.black,
    },
  },
  action: {
    text: {
      inverse: colors.indigo[50],
    },
  },
}
