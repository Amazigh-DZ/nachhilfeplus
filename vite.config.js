import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  publicDir: 'public',
  server: {
    proxy: {
      '/contact.php': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    copyPublicDir: true,
    outDir: 'dist'
  }
})
