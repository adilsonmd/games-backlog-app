import axios from 'axios';
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.use(router)
// 1. Configuração do Interceptor de Requisição
axios.interceptors.request.use(config => {
    // IMPORTANTE: Permite que o Axios envie os cookies do Authelia nas requisições cross-origin (CORS)
    config.withCredentials = true; 
    
    // O bloco de injetar o "Bearer token" do localStorage FOI REMOVIDO daqui.
    return config;
});

// 2. Configuração do Interceptor de Resposta
axios.interceptors.response.use(
  response => response,
  error => {
    // Se a sua API (ou o próprio NPM) retornar 401 ou 403, significa que a sessão no Authelia caiu
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      
      // Captura a URL exata de onde o usuário estava tentando navegar
      const currentUrl = window.location.href;
      
      // Redireciona o navegador inteiro para o Authelia externo para fazer login novamente
      window.location.href = `https://auth.athomushub.com.br/?rd=${encodeURIComponent(currentUrl)}`;
    }
    
    return Promise.reject(error);
  }
);

app.mount('#app')
