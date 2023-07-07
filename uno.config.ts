import {
  defineConfig,
  presetUno,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import type { Theme } from 'unocss/preset-uno'
import presetTheme from 'unocss-preset-theme'
import { presetForms } from '@julr/unocss-preset-forms'
import { presetExtra } from 'unocss-preset-extra'
import presetAutoprefixer from 'unocss-preset-autoprefixer'
import { darkTheme, lightTheme } from './themes/index.ts'

export default defineConfig({
  theme: {
    colors: lightTheme,
  },

  rules: [
    [
      'animate-grow-radius',
      { animation: 'growRadius 300ms ease-in-out forwards' },
    ],
    [
      'btn',
      {
        cursor: 'pointer',
        display: 'inline-flex',
        gap: '1rem',
        height: '3rem',
        transition: 'all 300ms ease-in-out',
        'align-items': 'center',
        'justify-content': 'center',
        'border-radius': '0.5rem',
        'padding-inline-start': '1.5rem',
        'padding-inline-end': '1.5rem',
        'padding-bottom': '0.5rem',
        'padding-top': '0.5rem',
      },
    ],
  ],

  transformers: [transformerDirectives(), transformerVariantGroup()],

  presets: [
    presetUno(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Open Sans',
        display: 'ginto nord',
        mono: ['dm', 'dm italic'],
      },
    }),
    // unnoficial presets
    presetAutoprefixer(),
    presetForms(),
    presetExtra(),
    presetTheme<Theme>({
      theme: {
        dark: {
          colors: darkTheme,
        },
      },
    }),
  ],
})
