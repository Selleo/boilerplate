import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  resolve: {
    alias: {
      zod: path.resolve(__dirname, "./node_modules/zod")
    }
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()]
});
