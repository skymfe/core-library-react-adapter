import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.lib.json",
      include: ["lib"],
    }),
  ],
  build: {
    lib: {
      name: "core-library-react-adapter",
      fileName: "core-library-react-adapter",
      entry: resolve(__dirname, "lib/main.ts"),
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
      output: {
        globals: {},
      },
    },
  },
  // Development server configuration
  server: {
    port: 3000,
    open: true,
  },
});
