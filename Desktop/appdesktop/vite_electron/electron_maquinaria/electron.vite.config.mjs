import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/main/index.js') // Tu archivo de entrada principal
        },
        external: ['sqlite3'], // <-- ¡CRÍTICO! Declara sqlite3 como una dependencia externa
        plugins: [
          // Puedes necesitar el plugin commonjs si sqlite3 usa require internamente,
          // aunque externalizarlo a menudo es suficiente.
          // Si el error persiste, descomenta esto y ajusta dynamicRequireTargets
          // commonjs({
          //   dynamicRequireTargets: [
          //     'node_modules/sqlite3/lib/sqlite3-binding.js', // Ruta al archivo de bindings
          //     'node_modules/sqlite3/lib/sqlite3.js' // Ruta al main file de sqlite3
          //   ],
          // }),
        ]
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
