<script setup>
import Sidebar from "./Components/Sidebar.vue";
import QuickSearch from "./Components/QuickSearch.vue";
const loading = ref(true);
const router = useRouter();

onMounted(async () => {
  try {
    // Dispara a chamada para a sua API protegida
    const response = await axios.get('https://api.athomushub.com.br/auth');
    
    // Se deu sucesso, seta a flag global que o router vai ler
    window.__USER_LOGGED_IN__ = true;
    
    // Opcional: Salve os dados do usuário (response.data) em algum estado se precisar
  } catch (error) {
    // Se a API der 401/403, o interceptor do main.js vai agir.
    // Mas caso ele falhe por CORS, garantimos o redirecionamento aqui de segurança:
    window.__USER_LOGGED_IN__ = false;
    const currentUrl = window.location.href;
    window.location.href = `https://auth.athomushub.com.br/?rd=${encodeURIComponent(currentUrl)}`;
    return;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading" class="d-flex justify-content-center align-items-center vh-100">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Carregando...</span>
    </div>
  </div>
  <div v-else>
    <QuickSearch></QuickSearch>
    
    <div class="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div class="flex">
        <Sidebar></Sidebar>

        <div class="flex-1 overflow-y-auto transition-all duration-300
             pt-20 lg:pt-4 
             pl-4 lg:pl-0 lg:ml-64"> 
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: row;
}

.section-sidebar {
  height: 100vh;
  min-width: 200px;
  max-width: 250px;
}

.section-main {
  height: 100vh;
  flex: 1;
  overflow-y: auto;
}
</style>
