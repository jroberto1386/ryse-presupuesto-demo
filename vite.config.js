import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '', // Set '/<repo>/' if publishing under a project repo on GitHub Pages
})
