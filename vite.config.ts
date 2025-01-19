import { defineConfig } from 'vite'
import { resolve } from 'path'
import { builtinModules } from 'module'
import pkg from './package.json'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TheFAQSDK',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: [...builtinModules, ...Object.keys(pkg.dependencies || {})],
      output: {
        exports: 'named',
        globals: {
          axios: 'axios',
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2018',
  },
})
