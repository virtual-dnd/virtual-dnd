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

export default defineConfig<Theme>({
  theme: {
    colors: lightTheme,
  },

  transformers: [transformerDirectives(), transformerVariantGroup()],

  presets: [
    presetUno(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Open Sans',
        display: 'ginto nord',
        dank: ['dm', 'dm italic'],
      },
    }),
    // unnoficial presets
    presetAutoprefixer(),
    presetForms(),
    presetExtra(),
    presetTheme<Theme>({
      theme: {
        light: {
          colors: lightTheme,
        },
        dark: {
          colors: darkTheme,
        },
      },
    }),
  ],
})
