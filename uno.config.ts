import {
  defineConfig,
  presetUno,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetTheme from 'unocss-preset-theme'
import { presetForms } from '@julr/unocss-preset-forms'
import { presetExtra } from 'unocss-preset-extra'
import presetAutoprefixer from 'unocss-preset-autoprefixer'
import { darkTheme, lightTheme } from './themes/index.ts'

const config = {
  theme: {
    colors: lightTheme,
  },

  rules: [
    [
      'animate-grow-radius',
      {
        animation: 'growRadius 300ms ease-in-out forwards',
      },
    ],
  ],

  shortcuts: {
    btn: 'cursor-pointer inline-flex gap-1 h-12 transition-all rounded-md items-center justify-center ps-6 pe-6 py-2',

    'online-indicator':
      'border-2 border-solid border-neutral-surface-300 rounded-full h-3 w-3 absolute bottom-0 right-0',

    online: 'online-indicator bg-success-bg-200',
    offline: 'online-indicator opacity-50',
  },

  transformers: [transformerDirectives(), transformerVariantGroup()],

  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        fill: 'currentColor',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Open Sans',
        display: 'ginto nord',
        mono: ['dm', 'dm italic'],
      },
    }),
    // unnoficial presets
    presetForms(),
    presetExtra(),
    presetTheme({
      theme: {
        dark: {
          colors: darkTheme,
        },
      },
    }),
    presetAutoprefixer(),
  ],
}

export default defineConfig<typeof config>(config)
