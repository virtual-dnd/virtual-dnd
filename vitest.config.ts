/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  resolve: {
    alias: {
      '~/*': './src/*',
    },
  },

  plugins: [solidPlugin()],

  server: {
    port: 3000,
  },

  build: {
    target: 'esnext',
  },

  test: {
    environment: 'jsdom',
    globals: true,
    passWithNoTests: true,
    setupFiles: ['./test/setup.ts'],
    transformMode: { web: [/\.[t]sx?$/] },
  },
})
