/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'

const ACTION_BG = '#5764f2'

export default {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',

  theme: {
    extend: {
      animation: {
        'bounce-in-from-bottom':
          'bounceInFromBottom 300ms cubic-bezier(0.5, 1, 0.89, 1) forwards',
        'grow-radius': 'growRadius 250ms ease-in-out forwards',
      },

      keyframes: {
        growRadius: {
          '0%': { borderRadius: '50%' },
          '100%': { borderRadius: '33%' },
        },
        bounceInFromBottom: {
          '0%': {
            opacity: 0,
            transform: 'translateY(100%)',
          },
          '75%': {
            transform: 'translateY(-20%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },

      colors: {
        background: {
          DEFAULT: '#414eed',
          light: '#414eed',
          dark: '#414eed',
        },
        border: {
          DEFAULT: '#b6b8be',
          light: '#b6b8be',
          dark: '#3c3d44',
        },
        surface: {
          100: {
            DEFAULT: colors.white,
            light: colors.white,
            dark: '#313338',
          },
          200: {
            DEFAULT: colors.gray[50],
            light: colors.gray[50],
            dark: '#2b2d31',
          },
          300: {
            DEFAULT: colors.gray[100],
            light: colors.gray[100],
            dark: '#232428',
          },
          400: {
            DEFAULT: colors.gray[200],
            light: colors.gray[200],
            dark: '#1e1f22',
          },
          inverse: {
            DEFAULT: colors.gray[950],
            light: colors.gray[950],
            dark: colors.white,
          },
        },
        text: {
          100: {
            DEFAULT: colors.gray[800],
            light: colors.gray[800],
            dark: colors.gray[200],
          },
          200: {
            DEFAULT: colors.gray[900],
            light: colors.gray[900],
            dark: colors.gray[100],
          },
          300: {
            DEFAULT: colors.gray[950],
            light: colors.gray[950],
            dark: colors.gray[50],
          },
          inverse: {
            DEFAULT: colors.white,
            light: colors.white,
            dark: colors.gray[950],
          },
        },
        action: {
          text: {
            50: {
              DEFAULT: colors.white,
              light: colors.white,
              dark: colors.blue[200],
            },
            100: {
              DEFAULT: colors.white,
              light: colors.white,
              dark: colors.blue[100],
            },
            inverse: {
              DEFAULT: ACTION_BG,
              light: ACTION_BG,
              dark: ACTION_BG,
            },
          },
          background: {
            50: {
              DEFAULT: ACTION_BG,
              light: ACTION_BG,
              dark: ACTION_BG,
            },
            inverse: {
              DEFAULT: colors.blue[50],
              light: colors.blue[50],
              dark: colors.blue[50],
            },
            hover: {
              DEFAULT: '#2a3aef',
              light: '#2a3aef',
              dark: '#2a3aef',
            },
          },
          secondary: {
            text: {
              DEFAULT: colors.white,
              light: colors.white,
              dark: colors.slate[200],
            },
            background: {
              50: {
                DEFAULT: colors.slate[500],
                light: colors.slate[500],
                dark: colors.slate[100],
              },
              hover: {
                DEFAULT: colors.slate[600],
                light: colors.slate[600],
                dark: colors.slate[200],
              },
            },
          },
          link: {
            text: {
              DEFAULT: colors.blue[600],
              light: colors.blue[600],
              dark: colors.blue[500],
            },
          },
        },
        info: {
          text: {
            100: {
              DEFAULT: colors.sky[200],
              light: colors.sky[200],
              dark: colors.sky[300],
            },
            200: {
              DEFAULT: colors.sky[50],
              light: colors.sky[50],
              dark: colors.sky[300],
            },
          },
          background: {
            DEFAULT: colors.sky[600],
            light: colors.sky[600],
            dark: colors.sky[500],
          },
          border: {
            DEFAULT: colors.sky[800],
            light: colors.sky[800],
            dark: colors.sky[700],
          },
        },
        success: {
          text: {
            100: {
              DEFAULT: colors.emerald[200],
              light: colors.emerald[200],
              dark: colors.emerald[300],
            },
            200: {
              DEFAULT: colors.sky[50],
              light: colors.sky[50],
              dark: colors.emerald[100],
            },
          },
          background: {
            DEFAULT: colors.emerald[600],
            light: colors.emerald[600],
            dark: colors.emerald[500],
          },
          border: {
            DEFAULT: colors.emerald[800],
            light: colors.emerald[800],
            dark: colors.emerald[700],
          },
        },
        warning: {
          text: {
            100: {
              DEFAULT: colors.yellow[200],
              light: colors.yellow[200],
              dark: colors.yellow[300],
            },
            200: {
              DEFAULT: colors.yellow[50],
              light: colors.yellow[50],
              dark: colors.yellow[100],
            },
          },
          background: {
            DEFAULT: colors.yellow[600],
            light: colors.yellow[600],
            dark: colors.yellow[500],
          },
          border: {
            DEFAULT: colors.yellow[800],
            light: colors.yellow[800],
            dark: colors.yellow[700],
          },
        },
        danger: {
          text: {
            100: {
              DEFAULT: colors.rose[200],
              light: colors.rose[200],
              dark: colors.rose[300],
            },
            200: {
              DEFAULT: colors.rose[50],
              light: colors.rose[50],
              dark: colors.rose[50],
            },
          },
          background: {
            50: {
              DEFAULT: colors.rose[800],
              light: colors.rose[800],
              dark: colors.rose[700],
            },
            hover: {
              DEFAULT: colors.rose[900],
              light: colors.rose[900],
              dark: colors.rose[800],
            },
          },
          border: {
            DEFAULT: colors.rose[900],
            light: colors.rose[900],
            dark: colors.rose[900],
          },
        },
      },
    },

    fontFamily: {
      sans: [
        'gg sans',
        'Gordita',
        'Roboto',
        'Oxygen',
        'Open Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
      serif: ['Inter', 'sans-serif'],
      mono: ['dm', 'monospace'],
      // custom
      display: [
        'ginto nord',
        'Gordita',
        'Roboto',
        'Oxygen',
        'Open Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
    },
  },
  plugins: [],
}
