/// <reference types="vite/client" />
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    fs: {
      allow: ['..'],
    },
    proxy: {
      '/api': 'http://localhost:3003',  
    }
  },
})