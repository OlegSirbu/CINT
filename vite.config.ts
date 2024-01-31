import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

const root = resolve(__dirname, "./src");

export default defineConfig({
  resolve: {
    alias: {
      components: resolve(root, "components"),
      state: resolve(root, "state"),
      pages: resolve(root, "pages"),
      utils: resolve(root, "utils"),
    },
  },
  plugins: [react()],
});
