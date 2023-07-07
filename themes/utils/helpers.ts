import type { Theme } from 'unocss/preset-uno'
import { type Themes } from '../index.ts'

export function generateTheme(theme: Themes | Theme = {}): Theme['colors'] {
  const result = {} as NonNullable<Theme['colors']>

  for (const i in theme) {
    const eq = i as keyof Theme['colors']
    if (typeof theme[eq] === 'object' && !Array.isArray(theme[eq])) {
      const temp = generateTheme(theme[eq])

      for (const j in temp) {
        if (j === 'DEFAULT') {
          result[eq] = temp[j]
          continue
        }

        result[eq + '-' + j] = temp[j]
      }
    } else {
      result[eq] = theme[eq]
    }
  }

  return result
}
