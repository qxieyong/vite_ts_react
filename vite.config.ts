import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import basicSsl from '@vitejs/plugin-basic-ssl';
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: "/",
    server: {
      //hmr: { overlay: false },
      https: false, // 是否开启 https
      open: false, // 是否自动在浏览器打开
      port: 9527, // 端口号
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "https://telebox.magictower.link/", // 后台接口
          changeOrigin: true,
          secure: false, // 如果是https接口，需要配置这个参数
          // ws: true, //websocket支持
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    },
    plugins: [react()],
    build: {
      minify: "terser",
      terserOptions: mode === 'production' ? {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      } : {},
      rollupOptions: {
        output: {
          entryFileNames: "js/[name]-[hash].js", //入口js文件存放
          chunkFileNames: "js/[name]-[hash].js", //其他js文件存放
          assetFileNames(assetInfo) {
            //其他文件的配置
            if (assetInfo.name.endsWith(".css")) {
              return "css/[name]-[hash].css";
            }
            const imgExts = [
              ".png",
              ".jpg",
              ".jpeg",
              ".webp",
              ".svg",
              ".gif",
              ".ico",
            ];
            if (imgExts.some((ext) => assetInfo.name.endsWith(ext))) {
              return "img/[name]-[hash].[ext]";
            }
            return "assets/[name]-[hash].[ext]";
          },
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/assets/scss';`,
        },
      },
    }
  }
});
