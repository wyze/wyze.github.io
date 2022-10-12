/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: process.env.CI
      ? {
          reporter: 'lcov',
        }
      : {},
    environment: 'jsdom',
    include: ['./app/**/*.test.{ts,tsx}'],
    setupFiles: ['./test/setup-test-env.ts'],
    watchExclude: [
      ...configDefaults.watchExclude,
      '.*\\/build\\/.*',
      '.*\\/functions\\/.*',
      '.*\\/public\\/.*',
    ],
  },
})
