import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

//bootstrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import { router } from './router';

createApp(App).use(router).mount('#app')