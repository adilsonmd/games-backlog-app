import axios from 'axios';
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.use(router)

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // O Authelia limpou a sessão. Redireciona o topo do navegador para a tela de login
      window.location.href = `https://auth.athomushub.com.br/?rd=${encodeURIComponent(window.location.href)}`;
    }
    return Promise.reject(error);
  }
);

app.mount('#app')
