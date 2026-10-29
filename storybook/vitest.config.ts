import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['.storybook/**/*.test.ts'],
    environment: 'node',
  },
});
