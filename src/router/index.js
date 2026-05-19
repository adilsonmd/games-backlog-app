import GamePage from '@/Games/GamePage.vue'
import PlayGame from '@/Games/PlayGame.vue'
import WishList from '@/Games/WishList.vue'
import HomePage from '@/Games/HomePage.vue'
import GameManager from '@/Games/GameManager.vue'
import NamoradaPage from '@/Games/NamoradaPage.vue'
import SettingsPage from '@/Games/SettingsPage.vue'
import CollectionPage from '@/Games/CollectionPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
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

// Guardião simples e rápido (sem travar a renderização)
router.beforeEach((to, from, next) => {
  // Pegamos a flag de autenticação que vamos salvar na janela global
  const isAuthenticated = window.__USER_LOGGED_IN__ === true;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Se a rota exige login e a flag está falsa, manda para o Authelia
    const currentUrl = window.location.href;
    window.location.href = `https://auth.athomushub.com.br/?rd=${encodeURIComponent(currentUrl)}`;
  } else {
    next();
  }
});

export default router
