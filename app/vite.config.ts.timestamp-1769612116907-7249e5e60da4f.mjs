// vite.config.ts
import { defineConfig } from "file:///C:/Users/aadil/Documents/Complaints-Dashboard-KW&SC/app/node_modules/.pnpm/vite@5.4.21_@types+node@22.19.7/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/aadil/Documents/Complaints-Dashboard-KW&SC/app/node_modules/.pnpm/@vitejs+plugin-react-swc@3.11.0_vite@5.4.21/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { viteSourceLocator } from "file:///C:/Users/aadil/Documents/Complaints-Dashboard-KW&SC/app/node_modules/.pnpm/@metagptx+vite-plugin-source-locator@0.0.14_rollup@2.79.2_vite@5.4.21/node_modules/@metagptx/vite-plugin-source-locator/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\aadil\\Documents\\Complaints-Dashboard-KW&SC\\app";
var vite_config_default = defineConfig(({ mode }) => ({
  plugins: [
    viteSourceLocator({
      prefix: "mgx"
    }),
    react()
  ],
  server: {
    watch: {
      usePolling: true,
      interval: 800
      /* 300~1500 */
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./frontend/src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhYWRpbFxcXFxEb2N1bWVudHNcXFxcQ29tcGxhaW50cy1EYXNoYm9hcmQtS1cmU0NcXFxcYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhYWRpbFxcXFxEb2N1bWVudHNcXFxcQ29tcGxhaW50cy1EYXNoYm9hcmQtS1cmU0NcXFxcYXBwXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hYWRpbC9Eb2N1bWVudHMvQ29tcGxhaW50cy1EYXNoYm9hcmQtS1cmU0MvYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgdml0ZVNvdXJjZUxvY2F0b3IgfSBmcm9tICdAbWV0YWdwdHgvdml0ZS1wbHVnaW4tc291cmNlLWxvY2F0b3InO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2aXRlU291cmNlTG9jYXRvcih7XHJcbiAgICAgIHByZWZpeDogJ21neCcsXHJcbiAgICB9KSxcclxuICAgIHJlYWN0KCksXHJcbiAgXSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHdhdGNoOiB7IHVzZVBvbGxpbmc6IHRydWUsIGludGVydmFsOiA4MDAgLyogMzAwfjE1MDAgKi8gfSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vZnJvbnRlbmQvc3JjJyksXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVyxTQUFTLG9CQUFvQjtBQUNoWSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMseUJBQXlCO0FBSGxDLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsU0FBUztBQUFBLElBQ1Asa0JBQWtCO0FBQUEsTUFDaEIsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUFFLFlBQVk7QUFBQSxNQUFNLFVBQVU7QUFBQTtBQUFBLElBQW1CO0FBQUEsRUFDMUQ7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLElBQy9DO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
