import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
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
