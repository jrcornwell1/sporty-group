import { createApp } from 'vue';
import './app.css';
import App from './components/App.vue';
import { createPinia } from 'pinia';
import { initRouter } from './router/app.router.js';

const app = createApp(App);

const pinia = createPinia();
const router = initRouter(pinia);

app.use(router);
app.use(pinia);
app.mount('#app');
