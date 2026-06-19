import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 프로젝트 페이지: https://heebin2.github.io/site-test/
export default defineConfig({
  base: '/site-test/',
  plugins: [react()],
})
