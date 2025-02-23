import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],

      exclude: [
        'src/models/person.ts',
        'vite.config.ts',
        'vitest.config.ts',
        'eslint.config.js',
        'src/vite-env.d.ts',
      ],
    },
  },
});
