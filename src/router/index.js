import GamePage from '@/Games/GamePage.vue'
import PlayGame from '@/Games/PlayGame.vue'
import WishList from '@/Games/WishList.vue'
import HomePage from '@/Games/HomePage.vue'
import LoginPage from '@/Games/LoginPage.vue'
import GameManager from '@/Games/GameManager.vue'
import NamoradaPage from '@/Games/NamoradaPage.vue'
import SettingsPage from '@/Games/SettingsPage.vue'

import { createRouter, createWebHistory } from 'vue-router'
import SeriesPage from '@/Games/SeriesPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
  {
    name: "LoginPage",
    path: "/login",
    component: LoginPage,
    meta: { requiresAuth: false } // Público
  }, 
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
    component: SeriesPage,
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
    const isAuthenticated = !!localStorage.getItem('token');
    
    // Se a rota exige login e o usuário não está logado
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router
