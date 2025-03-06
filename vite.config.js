import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/lancerapp/',  // Set the base path to match your GitHub repository name
  plugins: [react()],
  build: {
    outDir: 'dist',
    esbuild: {
      jsxInject: `import React from 'react'`  // Ensures JSX works properly
    }
  }
});