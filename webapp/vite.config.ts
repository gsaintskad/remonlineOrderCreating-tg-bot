import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // Set the base public path for your application.
  // This should match the subpath where your application is deployed on your server (e.g., Nginx).
  // In your case, it's '/webapp/'.
  base: '/webapp/', // Make sure to include the trailing slash!

  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // You can keep other build or server configurations here if you had them previously.
  // build: {
  //   outDir: 'dist',
  // },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});
