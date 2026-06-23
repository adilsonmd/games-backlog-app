import LoginPage from '@/LoginPage.vue'
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
    name: "LoginPage",
    path: "/login",
    component: LoginPage,
    meta: { requiresAuth: false } // Público
  }, 
  {
    name: "HomePage",
    path: "/",
    component: HomePage,
  },
  {
    name: "PlayGame",
    path: "/play",
    component: PlayGame,
  },
  {
    name: "Biblioteca",
    path: "/biblioteca",
    component: GameManager,
  },
  {
    name: "GamePage",
    path: "/biblioteca/:id",
    component: GamePage,
  },
  {
    name: "Wishlist",
    path: "/wishlist",
    component: WishList,
  },
  {
    name: "Colecao",
    path: "/colecao",
    component: CollectionPage,
  },
  {
    name: "Namorada",
    path: "/namorada",
    component: NamoradaPage,
  },
  {
    name: "SettingsPage",
    path: "/setting",
    component: SettingsPage,
  },
],
});

export default router
