import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import * as path from 'path';

export default defineConfig({
 plugins: [vue(), dts()],
 build: {
  lib: {
   entry: path.resolve(__dirname, 'src/index.ts'),
   name: 'SplitInput',
   fileName: (format) => `index.${format}.js`,
  },
  rollupOptions: {
   external: ['vue'],
   output: {
    globals: {
     vue: 'Vue',
    },
   },
  },
 },
});
