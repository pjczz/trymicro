import UnoCSS from 'unocss/vite'
import path from 'path'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
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
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      UnoCSS(),
      viteCompression({
        // 配置项
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用压缩
        deleteOriginFile: true,
        threshold: 10240, // 文件大小超过此值时进行压缩，单位为字节
        algorithm: 'gzip', // 压缩算法，可选 'gzip' 或 'brotli'
        ext: '.gz', // 压缩后的文件扩展名
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            '@/hooks/web/useI18n': ['useI18n'],
            '@/utils/micro': ['useMicro'],
          },
        ],
        dts: 'types/auto-imports.d.ts', // 使用typescript，需要指定生成对应的d.ts文件或者设置为true,生成默认导入d.ts文件
        dirs: ['src/stores', 'src/composables', 'src/hooks'],
      }),
    ],
    server: {
      port: 7529, // 设置端口号为 7529（根据需要修改）
      // proxy: {
      //   ['/admin-api']: {
      //     target: env.VITE_BASE_URL,
      //     ws: false,
      //     changeOrigin: true,
      //   //   rewrite: (path) => path.replace(new RegExp(`^/admin-api`), ''),
      //   },
      //   ['/infra/file/upload']:{
      //     target: 'http://tgsystem.uqbike.cn/admin-api',
      //     ws: false,
      //     changeOrigin: true,
      //   }
      // },
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
      target: 'es6',
      minify: 'terser',
      terserOptions: {
        compress: {
          // 开启压缩
          drop_console: true, // 移除console
          drop_debugger: true, // 移除debugger
        },
        mangle: {
          // 是否改变变量名
          toplevel: true,
        },
      },
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 500,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
    },
  }
}
