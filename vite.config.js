// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/GenealogyTree/' //  Nombre del repositorio con la barra inicial y final
})