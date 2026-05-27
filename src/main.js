import axios from 'axios';
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.css'

axios.defaults.withCredentials = true;

const app = createApp(App)

app.use(router)

app.mount('#app')
