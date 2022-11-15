import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['vitest-localstorage-mock'],
    mockReset: false,
    watch: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
