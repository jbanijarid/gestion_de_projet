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
        target: 'https://backend-api-mongod.onrender.com' 
      },
      '^/api/projects': {
        target: 'https://backend-api-mongod.onrender.com' 
      },
      '^/api/tasks': {
        target: 'https://backend-api-mongod.onrender.com' 
      },
      '^/api/login': {
        target: 'https://backend-api-mongod.onrender.com' 
      },
      '^/api/sprints': {
        target: 'https://backend-api-mongod.onrender.com' 
      }
      ,
      '^/api/notes': {
        target: 'https://backend-api-mongod.onrender.com' 
      }
    }
  },
  build: {
    outDir: 'target/dist',
    assetsDir: 'static'
  }
})
