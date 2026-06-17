import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite runs as ESM regardless of package.json "type" field
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // In dev, proxy /api to a local express server on 5000
      // In production (Vercel), /api routes go to serverless functions automatically
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})
