import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      src: resolve("./src/"),
    },
  },
  plugins: [react()],
});
