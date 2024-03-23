import { ecsstatic } from '@acab/ecsstatic/vite'
import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    remix({
      ssr: false
    }),
    // tsconfigPaths(),
    tsconfigPaths({ root: './' }),
    ecsstatic({ classNamePrefix: '🚀' })
  ]
})
