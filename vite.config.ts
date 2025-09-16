import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    host: true,
    open: true,
    strictPort: true
  },
  preview: {
    port: 4173,
    host: true
  }
});
