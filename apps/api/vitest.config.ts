import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: 'apps/api/src/main.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vitest'],
    },
  },
  test: {
    include: ['**/*.spec.ts'],
    globals: true,
    root: "./",
    setupFiles: ["./test/test-setup.ts"],
    testTimeout: 10000,
    fileParallelism: false,
  },
  plugins: [
    // This is required to build the test files with SWC
    // @ts-ignore unplugin-swc types are broken
    swc.vite(),
  ],
  resolve: {
    alias: {
      // Ensure Vitest correctly resolves TypeScript path aliases
      src: resolve(__dirname, "./src"),
    },
  },
});
