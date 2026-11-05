import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  // Inline the cut GUI art as data URIs so the site (and the single-file preview) needs no extra requests.
  build: { assetsInlineLimit: 200000 },
  plugins: [react()],
})
