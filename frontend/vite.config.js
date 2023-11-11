import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '^/api/users': {
        target: 'http://localhost:8080' 
      },
      '^/api/projects': {
        target: 'http://localhost:8080' 
      },
      '^/api/tasks': {
        target: 'http://localhost:8080' 
      },
      '^/api/login': {
        target: 'http://localhost:8080' 
      }
    }
  },
  build: {
    outDir: 'target/dist',
    assetsDir: 'static'
  }
})
