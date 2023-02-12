import * as path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue({ reactivityTransform: true }), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'SplitInput',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', 'vite'],
      output: {
        sourcemap: true,
        inlineDynamicImports: true,
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
