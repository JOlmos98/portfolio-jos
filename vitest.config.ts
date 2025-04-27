import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // esto le dice a Vitest qué es "@"
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}']
  }
})

/*

globals: true permite usar describe, it, expect sin importar nada.

environment: 'jsdom' es clave para simular el navegador.

setupFiles ejecuta un archivo antes de los tests.

*/