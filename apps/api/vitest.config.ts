import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
    setupFiles: ["./test/test-setup.ts"],
    fileParallelism: false,
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite(),
  ],
  resolve: {
    alias: {
      // Ensure Vitest correctly resolves TypeScript path aliases
      src: resolve(__dirname, "./src"),
    },
  },
});
