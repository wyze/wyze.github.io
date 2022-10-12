/// <reference types="vitest" />
/// <reference types="vite/client" />

import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      reporter: 'lcov',
    },
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
