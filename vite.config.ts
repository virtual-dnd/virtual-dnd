import solid from 'solid-start/vite'
import eslint from 'vite-plugin-eslint'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [eslint(), solid()],
})
