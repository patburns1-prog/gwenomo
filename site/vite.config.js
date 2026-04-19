import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  publicDir: resolve(__dirname, '../assets'),
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        catalogo: resolve(__dirname, 'catalogo.html'),
        personaliza: resolve(__dirname, 'personaliza.html'),
      },
    },
  },
});
