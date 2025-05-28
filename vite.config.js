import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss(), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./assets', import.meta.url)),
    },
  },
});
