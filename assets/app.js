// app.js
import { createApp } from 'vue';
import './app.css';
import App from './components/App.vue';
import { createPinia } from 'pinia';
import { initRouter } from './router/app.router.js';
import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

const pinia = createPinia();
const router = initRouter(pinia);

app.use(VueQueryPlugin); // Move this before mount
app.use(router);
app.use(pinia);
app.mount('#app');
