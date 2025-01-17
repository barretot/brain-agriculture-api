import swc from 'unplugin-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    include: ['test/**/*.test.ts', 'test/**/*.spec.ts'],
    exclude: ['dist', '**/dist/**', '**/vitest.config.*', '**/src/infra/**',],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/src/infra/**',
        '**/dist/**',
        '**/node_modules/**',
        '**/test/**',
        '**/*.config.*',
        '**/*.spec.ts',
        '**/*.test.ts',
      ],
    },
  },
  plugins: [tsconfigPaths(), swc.vite({ module: { type: 'es6' } })],
})
