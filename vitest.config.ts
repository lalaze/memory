import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

const envFile = `.env.local`
const envPath = resolve(process.cwd(), envFile)
dotenv.config({ path: envPath })
 
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    env: process.env,
    setupFiles: ['__tests__/setup.ts'],
  },
})
