import { defineConfig } from 'vite'
import solid from 'solid-start/vite'
import UnoCSS from 'unocss/vite'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [eslint(), UnoCSS(), solid()],
})
