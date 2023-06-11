import { createSignal } from 'solid-js'

export type Themes = 'light' | 'dark' | 'system'

export const [theme, setTheme] = createSignal('light')
