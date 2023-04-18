/// <reference types="vite/client" />
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    fs: {
      allow: ['..'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        secure: false,
        ws: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.error('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.info('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.info('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
    }
  },
})