import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "./src/common"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@common/*": path.resolve(__dirname, "./src/common"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@components/*": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils/api": path.resolve(__dirname, "./src/utils/api"),
      "@utils/routes": path.resolve(__dirname, "./src/utils/routes"),
      "@utils/constants": path.resolve(__dirname, "./src/utils/constants"),
      "@utils/validation": path.resolve(__dirname, "./src/utils/validation"),
      "@utils/hooks": path.resolve(__dirname, "./src/utils/hooks"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
