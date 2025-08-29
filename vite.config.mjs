// vite.config.mjs
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: ['bace75a0db17.ngrok-free.app'],
  }
});