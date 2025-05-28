import { createApp } from 'vue';
import './app.css';
import App from './components/App.vue';
import { createPinia } from 'pinia';
import { initRouter } from './router/app.router.js';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes by default
      cacheTime: 1000 * 60 * 30, // Keep in cache for 30 minutes by default
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

const app = createApp(App);

app.use(VueQueryPlugin, {
  queryClient,
  enableDevtoolsV6Plugin: true,
});

const pinia = createPinia();
const router = initRouter(pinia);

app.use(router);
app.use(pinia);
app.mount('#app');
