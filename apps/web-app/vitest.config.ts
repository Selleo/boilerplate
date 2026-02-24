/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // @ts-ignore plugin types are broken
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
      zod: path.resolve(__dirname, "./node_modules/zod")
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["./app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    server: {
      deps: {
        inline: ["@hookform/resolvers"]
      }
    },
    coverage: {
      exclude: ["**/browser.ts", "**/handler.ts"]
    }
  }
});
