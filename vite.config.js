import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      API_ROOT: JSON.stringify('http://127.0.0.1:8000/api'),
    },
  },
  plugins: [react()],

})
