import axios from 'axios';
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.use(router)

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  error => {
    // Se a API retornar 401 (bloqueada pelo Authelia no Nginx)
    if (error.response && error.response.status === 401) {
      console.warn('Sessão expirada no Authelia. Redirecionando para login...');
      
      // Captura a URL exata onde o usuário está agora para que o Authelia retorne para ela depois
      const currentUrl = window.location.href;
      
      // Redireciona a janela inteira do navegador de forma limpa para a tela do Authelia
      window.location.href = `https://auth.athomushub.com.br/?rd=${encodeURIComponent(currentUrl)}`;
    }
    
    return Promise.reject(error);
  }
);

app.mount('#app')
