import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    include: ['test/**/*.test.ts', 'test/**/*.spec.ts'],
    exclude: ['dist', '**/dist/**', '**/vitest.config.*'],
  },
  plugins: [tsconfigPaths(), swc.vite({ module: { type: 'es6' } })],
})
