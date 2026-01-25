<script setup>
import { ref } from 'vue'; // Importar ref
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const isOpen = ref(false); // Estado para o menu mobile

const sidebarItens = ref([
  { path: '/play', label: 'Jogar', icon: 'bi-play-circle-fill' },
  { path: '/biblioteca', label: 'Biblioteca', icon: 'bi-collection-play' },
  { path: '/wishlist', label: 'Wishlist', icon: 'bi-star' },
  { path: '/namorada', label: 'Area Namorada', icon: 'bi-heart' }
]);

const isActive = (path) => route.path === path;
const isLogedIn = () => !!localStorage.getItem('token');

const handleLogout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

// Fecha o menu ao clicar em um link (útil no mobile)
const closeSidebar = () => { isOpen.value = false; };
</script>

<template>
  <button @click="isOpen = !isOpen"
    class="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-lg">
    <i :class="isOpen ? 'bi bi-x-lg' : 'bi bi-list'"></i>
  </button>

  <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>

  <nav id="sidebar" :class="[isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']"
    class="fixed top-0 left-0 z-40 w-64 h-screen bg-[#1a1a1a] border-r border-gray-800 flex flex-col transition-transform duration-300 ease-in-out">
    <div class="p-6 mb-4 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-3 no-underline" @click="closeSidebar">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
          <i class="bi bi-controller"></i>
        </div>
        <span class="text-xl font-bold tracking-tight text-gray-100">GameLog</span>
      </router-link>
    </div>

    <div class="px-3 flex-grow">
      <p class="text-[10px] uppercase font-bold text-gray-500 px-3 mb-2 tracking-widest">Menu Principal</p>
      <ul class="flex flex-col gap-1 p-0 list-none">
        <li v-for="item in sidebarItens" :key="item.path">
          <router-link :to="item.path" @click="closeSidebar"
            :class="[isActive(item.path) ? 'bg-gray-800 text-blue-400' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200']"
            class="flex items-center gap-3 px-3 py-2 rounded-md no-underline transition-all group">
            <i
              :class="[item.icon, isActive(item.path) ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300']"></i>
            <span class="text-sm font-medium">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="p-3 border-t border-gray-800 flex flex-col gap-1">
      <router-link to="/setting"
        :class="[isActive('/setting') ? 'bg-gray-800 text-blue-400' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200']"
        class="flex items-center gap-3 px-3 py-2 rounded-md no-underline transition-all group">
        <i class="bi bi-gear-fill"
          :class="isActive('/setting') ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'"></i>
        <span class="text-sm font-medium">Configurações</span>
      </router-link>

      <template v-if="isLogedIn()">

        <button @click="handleLogout"
          class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all group border-none bg-transparent cursor-pointer text-left w-full">
          <i class="bi bi-box-arrow-right text-gray-500 group-hover:text-red-400"></i>
          <span class="text-sm font-medium">Sair da conta</span>
        </button>
      </template>
    </div>
  </nav>
</template>