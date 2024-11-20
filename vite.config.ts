import UnoCSS from 'unocss/vite'
import path from 'path'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
const root = process.cwd()
// https://vite.dev/config/
export default ({ command, mode }) => {
  let env: Record<string, string>
  const isBuild = command === 'build'
  if (!isBuild) {
    env = loadEnv(process.argv[3] === '--mode' ? process.argv[4] : process.argv[3], root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
    base: env.VITE_BASE,
    plugins: [vue(), vueJsx(), vueDevTools(), UnoCSS()],
    server: {
      port: 7529, // 设置端口号为 7529（根据需要修改）
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@/imgs': path.resolve(__dirname, 'src/assets/imgs'),
      },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // 引入 varibles.scss 这样就可以在全局中使用 varibles.scss中预定义的变量了
          // 给导入的路径最后加上 ;
          additionalData: '@import "@/assets/style/varibles.scss";',
        },
      },
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
    },
  }
}
