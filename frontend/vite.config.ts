import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base path configured for custom domain routing
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
