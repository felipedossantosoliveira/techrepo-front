import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  hmr: {
      host: '192.168.1.110' //ip para uso externo em desenvolvimento
    },
  server: {
    host: true,
    port: 5173, // This is the port which we will use in docker
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
