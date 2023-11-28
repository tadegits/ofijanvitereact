import { defineConfig } from 'vite';
import ReactRefresh from '@vitejs/plugin-react';

export default defineConfig({
  base: 'https://www.ofijan.com/',
  plugins: [
    ReactRefresh(),
   
  ],
});