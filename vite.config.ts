import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: { port: 8080, host: '10.0.1.18' },
})
