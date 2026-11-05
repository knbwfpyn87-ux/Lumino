import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // One AI switch for web + iPhone code (see src/lib/features.ts)
  define: { 'process.env.EXPO_PUBLIC_ENABLE_AI': JSON.stringify(process.env.VITE_ENABLE_AI ?? '') },
  base: './',
  // Inline the cut GUI art as data URIs so the site (and the single-file preview) needs no extra requests.
  build: { assetsInlineLimit: 200000 },
  plugins: [react()],
})
