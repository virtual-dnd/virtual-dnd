/** @type {import('tailwindcss').Config} */

const SURFACE_100 = '#313339'
const WHITE = '#ffffff'

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
        // default
        background: '#414eed',
        border: '#b6b8be',
        'surface-100': WHITE,
        'surface-200': '#f2f3f5',
        'surface-300': '#ebedef',
        'surface-400': '#e3e5e8',
        'surface-inverse': '#060607',
        'text-100': '#4e5058',
        'text-200': '#060607',
        'text-inverse': WHITE,
        // action
        'action-text': WHITE,
        'action-text-100': SURFACE_100,
        'action-link-text': '#006ce7',
        'action-background': '#5764f2',
        'action-background-hover': '#2a3aef',
        'action-secondary-background': '#6d6f78',
        'action-secondary-background-hover': '#55565e',
        'action-secondary-text': WHITE,
        // info
        'info-background': '#EB459E',
        // success
        'success-background': '#23a559',
        'success-text': WHITE,
        // warning
        'warning-background': '#FEE75C',
        // danger
        'danger-background': '#da373c',
        'danger-background-hover': '#9b1c21',
        'danger-text': WHITE,

        darkMode: {
          // default
          background: '#414eed',
          border: '#3c3d44',
          'surface-100': SURFACE_100,
          'surface-200': '#2b2d30',
          'surface-300': '#232428',
          'surface-400': '#1e1f22',
          'surface-inverse': '#dcddde',
          'text-100': WHITE,
          'text-200': '#b5bac1',
          'text-inverse': SURFACE_100,
          // action
          'action-text': WHITE,
          'action-text-100': SURFACE_100,
          'action-link-text': '#09a7fc',
          'action-background': '#5764f2',
          'action-background-hover': '#2a3aef',
          'action-secondary-background': SURFACE_100,
          'action-secondary-background-hover': '#3d3c62',
          'action-secondary-text': WHITE,
          // info
          'info-background': '#EB459E',
          // success
          'success-background': '#257f46',
          'success-text': WHITE,
          // warning
          'warning-background': '#FEE75C',
          // danger
          'danger-background': '#da373c',
          'danger-background-hover': '#b8191d',
          'danger-text': WHITE,
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
