import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // allows network access
    port: 5173,
    strictPort: true,
    cors: true, 
    allowedHosts: [
      "972f56f8bae4.ngrok-free.app",
      "localhost",
    ],
  },
});
