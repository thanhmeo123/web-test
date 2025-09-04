import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  test: {
    globals: true, // ✅ Cho phép dùng describe, it, expect toàn cục
    environment: "jsdom", // ✅ Cần cho test React
    setupFiles: "./src/setupTests.js", // file setup nếu có
  },
  base : '/web-test/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
