/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{ts,tsx}'],
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
        neutral: {
          bg: {
            100: 'var(--neutral-bg-100)',
          },
          border: {
            100: 'var(--neutral-border-100)',
            200: 'var(--neutral-border-200)',
            300: 'var(--neutral-border-300)',
          },
          focus: 'var(--neutral-focus)',
          surface: {
            100: 'var(--neutral-surface-100)',
            200: 'var(--neutral-surface-200)',
            300: 'var(--neutral-surface-300)',
            400: 'var(--neutral-surface-400)',
            inverse: 'var(--neutral-surface-inverse)',
          },
          text: {
            100: 'var(--neutral-text-100)',
            200: 'var(--neutral-text-200)',
            300: 'var(--neutral-text-300)',
            400: 'var(--neutral-text-400)',
            inverse: 'var(--neutral-text-inverse)',
          },
        },
        action: {
          border: 'var(--action-border)',
          bg: {
            100: {
              DEFAULT: 'var(--action-bg-100)',
              hover: 'var(--action-bg-100-hover)',
              inverse: 'var(--action-bg-100-inverse)',
            },
            200: {
              DEFAULT: 'var(--action-bg-200)',
              hover: 'var(--action-bg-200-hover)',
            },
          },
          link: {
            DEFAULT: 'var(--action-link)',
            active: 'var(--action-link-active)',
            hover: 'var(--action-link-hover)',
          },
          text: {
            100: 'var(--action-text-100)',
            200: 'var(--action-text-200)',
            300: 'var(--action-text-300)',
            inverse: 'var(--action-text-inverse)',
          },
        },
        info: {
          border: 'var(--info-border)',
          surface: {
            100: 'var(--info-surface-100)',
          },
          text: {
            100: 'var(--info-text-100)',
            200: 'var(--info-text-200)',
          },
        },
        success: {
          border: 'var(--success-border)',
          bg: {
            100: 'var(--success-bg-100)',
          },
          surface: {
            100: 'var(--success-surface-100)',
          },
          text: {
            100: 'var(--success-text-100)',
            200: 'var(--success-text-200)',
            inverse: 'var(--success-text-inverse)',
          },
        },
        warning: {
          border: 'var(--warning-border)',
          surface: {
            100: 'var(--warning-surface-100)',
          },
          text: {
            100: 'var(--warning-text-100)',
            200: 'var(--warning-text-200)',
          },
        },
        danger: {
          border: 'var(--danger-border)',
          bg: {
            100: {
              DEFAULT: 'var(--danger-background-100)',
              hover: 'var(--danger-bg-100-hover)',
            },
          },
          surface: {
            100: 'var(--danger-surface-100)',
          },
          text: {
            100: 'var(--danger-text-100)',
            200: 'var(--danger-text-200)',
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
  plugins: [require('@tailwindcss/forms')],
}
