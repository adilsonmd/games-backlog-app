import GamePage from '@/Games/GamePage.vue'
import PlayGame from '@/Games/PlayGame.vue'
import WishList from '@/Games/WishList.vue'
import HomePage from '@/Games/HomePage.vue'
import LoginPage from '@/Games/LoginPage.vue'
import GameManager from '@/Games/GameManager.vue'
import NamoradaPage from '@/Games/NamoradaPage.vue'
import SettingsPage from '@/Games/SettingsPage.vue'
import CollectionPage from '@/Games/CollectionPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
  // {
  //   name: "LoginPage",
  //   path: "/login",
  //   component: LoginPage,
  //   meta: { requiresAuth: false } // Público
  // }, 
  {
    name: "HomePage",
    path: "/",
    component: HomePage,
    meta: { requiresAuth: true } // PRIVADO
  },
  {
    name: "PlayGame",
    path: "/play",
    component: PlayGame,
    meta: { requiresAuth: true } // PRIVADO
  },
  {
    name: "Biblioteca",
    path: "/biblioteca",
    component: GameManager,
    meta: { requiresAuth: true } // PRIVADO
  },
  {
    name: "GamePage",
    path: "/biblioteca/:id",
    component: GamePage,
    meta: { requiresAuth: true } // PRIVADO
  },
  {
    name: "Wishlist",
    path: "/wishlist",
    component: WishList,
    meta: { requiresAuth: true } // PRIVADO
  },
  {
    name: "Colecao",
    path: "/colecao",
    component: CollectionPage,
    meta: { requiresAuth: true } // PRIVADO
  },
  {
    name: "Namorada",
    path: "/namorada",
    component: NamoradaPage,
    meta: { requiresAuth: true } // PRIVADO
  },
  {
    name: "SettingsPage",
    path: "/setting",
    component: SettingsPage,
    meta: { requiresAuth: true } // PRIVADO
  },
],
});

// router/index.js
router.beforeEach((to, from, next) => {
   if (to.meta.requiresAuth) {
    // 1. Em vez de localStorage, você pode checar um estado global (Pinia/Vuex) 
    // que guarda se o perfil do usuário foi carregado com sucesso pela API.
    const isUserLoaded = checkUserSessionInStore(); 

    if (!isUserLoaded) {
      // 2. Se a aplicação não achou os dados do usuário, redireciona o NAVEGADOR
      // para o Authelia externo, passando a URL atual como retorno (rd)
      const currentUrl = window.location.href;
      window.location.href = `https://auth.athomushub.com.br/?rd=${encodeURIComponent(currentUrl)}`;
      return; // Interrompe o fluxo do Vue Router
    }
  }
  
  next();
});

export default router
