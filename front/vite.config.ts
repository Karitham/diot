import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [tsConfigPaths(), react(), renderer()]
    }
  } else if (command === 'build') {
    return {
      plugins: [
        tsConfigPaths(),
        react(),
        electron([
          {
            // Main-Process entry file of the Electron App.
            entry: 'electron/main.ts'
          },
          {
            entry: 'electron/preload.ts',
            onstart(options) {
              // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
              // instead of restarting the entire Electron App.
              options.reload()
            }
          }
        ]),
        renderer()
      ]
    }
  }
})
