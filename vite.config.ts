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
    }),
  ],
  build: {
    lib: {
      name: "core-library",
      entry: {
        auth: resolve(__dirname, "lib/auth.ts"),
        "http-client": resolve(__dirname, "lib/http-client.ts"),
      },
    },
    rollupOptions: {
      external: [],
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
