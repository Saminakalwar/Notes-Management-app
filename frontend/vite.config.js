import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    include: ["src/**/*.test.{js,jsx}"],  // only look inside src tests
    exclude: ["node_modules", "dist"],    // skip heavy dirs
    pool: 'threads',                      // single-thread mode to save memory
    maxThreads: 1,
    minThreads: 1,
    poolOptions: {
      forks: { singleFork: true },
    },
  },
})
