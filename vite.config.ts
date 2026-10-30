import { defineConfig } from 'vite';

const port = Number(process.env.PORT || 5000);

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist/public',
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
