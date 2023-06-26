/** @type {import('tailwindcss').Config} */

const SURFACE_100 = '#292841'
const WHITE = '#ffffff'

export default {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',

  theme: {
    extend: {},

    colors: {
      // default
      background: '#414eed',
      border: '#3d3c62',
      'surface-100': SURFACE_100,
      'surface-200': '#302f50',
      'surface-300': '#4b4d6a',
      'surface-400': '#1c1b29',
      'surface-inverse': '#dcddde',
      'text-100': WHITE,
      'text-200': '#dcddde',
      'text-inverse': SURFACE_100,
      // action
      'action-text': WHITE,
      'action-text-100': SURFACE_100,
      'action-link-text': '#414eed',
      'action-background': '#5865F2',
      'action-background-hover': '#4F5AD1',
      'action-secondary-background': SURFACE_100,
      'action-secondary-background-hover': '#3d3c62',
      'action-secondary-text': WHITE,
      // info
      'info-background': '#EB459E',
      // success
      'success-background': '#57F287',
      // warning
      'warning-background': '#FEE75C',
      // danger
      'danger-background': '#ED4245',
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
