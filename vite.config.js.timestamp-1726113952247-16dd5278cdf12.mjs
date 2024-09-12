// vite.config.js
import { fileURLToPath, URL } from "node:url";
import vue from "file:///D:/codes/vuejs/vue-simple-bank/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/codes/vuejs/vue-simple-bank/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { AntDesignVueResolver } from "file:///D:/codes/vuejs/vue-simple-bank/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///D:/codes/vuejs/vue-simple-bank/node_modules/unplugin-vue-components/dist/vite.js";
import { defineConfig } from "file:///D:/codes/vuejs/vue-simple-bank/node_modules/vite/dist/node/index.js";
var __vite_injected_original_import_meta_url = "file:///D:/codes/vuejs/vue-simple-bank/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx({}),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
          // css in js
        })
      ]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2Rlc1xcXFx2dWVqc1xcXFx2dWUtc2ltcGxlLWJhbmtcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVzXFxcXHZ1ZWpzXFxcXHZ1ZS1zaW1wbGUtYmFua1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZXMvdnVlanMvdnVlLXNpbXBsZS1iYW5rL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiO1xuaW1wb3J0IHsgQW50RGVzaWduVnVlUmVzb2x2ZXIgfSBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzXCI7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZVwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2dWVKc3goe30pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEFudERlc2lnblZ1ZVJlc29sdmVyKHtcbiAgICAgICAgICBpbXBvcnRTdHlsZTogZmFsc2UsIC8vIGNzcyBpbiBqc1xuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1IsU0FBUyxlQUFlLFdBQVc7QUFFdlQsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLGdCQUFnQjtBQUN2QixTQUFTLG9CQUFvQjtBQU44SSxJQUFNLDJDQUEyQztBQVM1TixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPLENBQUMsQ0FBQztBQUFBLElBQ1QsV0FBVztBQUFBLE1BQ1QsV0FBVztBQUFBLFFBQ1QscUJBQXFCO0FBQUEsVUFDbkIsYUFBYTtBQUFBO0FBQUEsUUFDZixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
