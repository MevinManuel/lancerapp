import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/lancerapp/', // Set base path for GitHub Pages deployment
  plugins: [react()],
  build: {
    outDir: 'dist',
    esbuild: {
      jsxInject: `import React from 'react'`, // Ensures JSX works properly
    }
  },
  server: {
    proxy: {
      '/api/huggingface': {
        target: 'https://api-inference.huggingface.co',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/huggingface/, '')
      },
      '/api/news': {
        target: 'https://newsapi.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/news/, '')
      }
    }
  }
});
