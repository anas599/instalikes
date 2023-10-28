import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v2': {
        target: 'https://secsers.com', // Replace with your API's base URL
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
