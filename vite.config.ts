import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200, // increase limit to reduce warnings
    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ["react", "react-dom"], // separate React
          queryVendor: ["@tanstack/react-query"], // separate React Query
          // You can add more libraries here if needed
        },
      },
    },
  },
});
