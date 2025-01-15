import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    setupFiles: ['test/config/setup-e2e.ts'],
    include: ['test/e2e/*.e2e-spec.ts', 'test/e2e/**/*.e2e-test.ts'],
    exclude: ['dist', '**/dist/**', '**/vitest.config.*'],
  },
  plugins: [tsconfigPaths(), swc.vite({ module: { type: 'es6' } })],
})
