import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@/': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        app: './index.html',
        serviceWorker: './src/service-worker.ts',
      },
      output: {
        entryFileNames: chunkInfo =>
          chunkInfo.name === 'serviceWorker'
            ? '[name].js' // оставляем оригинальное имя файла (для serviceWorker.ts)
            : 'assets/js/[name]-[hash].js', // остальные файлы по-умолчанию
      },
    },
  },
})
