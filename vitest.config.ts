/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  // @ts-ignore Not sure why, but currently throwing an error.
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: process.env.CI
      ? {
          reporter: 'lcov',
        }
      : {},
    environment: 'happy-dom',
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
