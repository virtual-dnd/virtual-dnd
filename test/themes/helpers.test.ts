import { generateTheme } from '../../themes/utils/helpers.ts'

describe('themes/helpers.ts', () => {
  const testTheme = {
    neutral: {
      bg: '#fff',
      text: {
        DEFAULT: '#000',
        100: '#111',
        200: '#222',
        inverse: '#fff',
      },
    },
    action: {
      bg: {
        DEFAULT: '#fff',
        hover: '#000',
      },
      text: '#fff',
    },
  }

  it('should generate a theme', () => {
    const theme = generateTheme(testTheme)
    expect(theme).toMatchObject({
      'neutral-bg': '#fff',
      'neutral-text': '#000',
      'neutral-text-100': '#111',
      'neutral-text-200': '#222',
      'neutral-text-inverse': '#fff',
      'action-bg': '#fff',
      'action-bg-hover': '#000',
      'action-text': '#fff',
    })
  })
})
