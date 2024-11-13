import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import path from 'path';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 varibles.scss 这样就可以在全局中使用 varibles.scss中预定义的变量了
        // 给导入的路径最后加上 ;
        additionalData: '@import "@/assets/style/varibles.scss";'
      }
    }
  },
})
