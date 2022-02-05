import { createApp } from 'vue';
import App from './App.vue';
import SplitInput from 'vue-split-input';
import './assets/css/app.scss';

createApp(App).use(SplitInput).mount('#app');
