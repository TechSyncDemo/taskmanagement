import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // This ensures assets are loaded with relative paths
  build: {
    assetsDir: 'assets',
    sourcemap: true,
  }
});
