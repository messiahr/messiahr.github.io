// https://vite.dev/guide/build#multi-page-app
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about_me: resolve(__dirname, 'about-me.html'),
        resume: resolve(__dirname, 'resume.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
      },
    },
  },
});
