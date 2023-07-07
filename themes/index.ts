import { lightTheme } from './light.ts'
import { darkTheme } from './dark.ts'

export { lightTheme, darkTheme }

export interface Theme {
  light: typeof lightTheme
  dark: typeof darkTheme
}
