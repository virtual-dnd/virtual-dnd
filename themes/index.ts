import { lightTheme } from './light.ts'
import { darkTheme } from './dark.ts'

export { lightTheme, darkTheme }
export interface Theme {
  light: LightTheme
  dark: DarkTheme
}

// types

export type LightTheme = typeof lightTheme
export type DarkTheme = typeof darkTheme
export type Themes = LightTheme | DarkTheme
