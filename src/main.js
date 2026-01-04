import axios from 'axios';
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.use(router)

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Se a API retornar "Não Autorizado", limpamos tudo e mandamos para o Login
      localStorage.removeItem('token');
      router.push({ name: 'LoginPage' });
    }
    return Promise.reject(error);
  }
);

app.mount('#app')
