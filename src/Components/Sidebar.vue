<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

// Função para verificar se a rota está ativa e mudar o estilo
const isActive = (path) => route.path === path;
</script>

<template>
  <nav id="sidebar" class="w-64 h-screen bg-[#1a1a1a] border-r border-gray-800 flex flex-col transition-all">
    
    <div class="p-6 mb-4">
      <router-link to="/" class="flex items-center gap-3 no-underline">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
          <i class="bi bi-controller"></i>
        </div>
        <span class="text-xl font-bold tracking-tight text-gray-100">GameLog</span>
      </router-link>
    </div>

    <div class="px-3 flex-grow">
      <p class="text-[10px] uppercase font-bold text-gray-500 px-3 mb-2 tracking-widest">Menu Principal</p>
      
      <ul class="flex flex-col gap-1 p-0">
        <li>
          <router-link 
            to="/play" 
            :class="[isActive('/play') ? 'bg-gray-800 text-blue-400' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200']"
            class="flex items-center gap-3 px-3 py-2 rounded-md no-underline transition-all group"
          >
            <i class="bi bi-play-circle-fill" :class="isActive('/play') ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'"></i>
            <span class="text-sm font-medium">Jogar</span>
          </router-link>
        </li>

        <li>
          <router-link 
            to="/biblioteca" 
            :class="[isActive('/biblioteca') ? 'bg-gray-800 text-blue-400' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200']"
            class="flex items-center gap-3 px-3 py-2 rounded-md no-underline transition-all group"
          >
            <i class="bi bi-collection-play" :class="isActive('/biblioteca') ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'"></i>
            <span class="text-sm font-medium">Biblioteca</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/wishlist" 
            :class="[isActive('/wishlist') ? 'bg-gray-800 text-blue-400' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200']"
            class="flex items-center gap-3 px-3 py-2 rounded-md no-underline transition-all group"
          >
            <i class="bi bi-star" :class="isActive('/wishlist') ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'"></i>
            <span class="text-sm font-medium">Wishlist</span>
          </router-link>
        </li>

        
      </ul>
    </div>

    <div class="p-3 border-t border-gray-800">
      <router-link 
        to="/setting" 
        :class="[isActive('/setting') ? 'bg-gray-800 text-blue-400' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200']"
        class="flex items-center gap-3 px-3 py-2 rounded-md no-underline transition-all group"
      >
        <i class="bi bi-gear-fill" :class="isActive('/setting') ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'"></i>
        <span class="text-sm font-medium">Configurações</span>
      </router-link>
    </div>
  </nav>
</template>