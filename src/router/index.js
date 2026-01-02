import GameManager from '@/Games/GameManager.vue'
import HomePage from '@/Games/HomePage.vue'
import PlayGame from '@/Games/PlayGame.vue'

import SteamGameDetail from '@/Games/SteamGameDetail.vue'
import SettingsPage from '@/Games/SettingsPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    name: "HomePage",
    path: "/",
    component: HomePage
  }, 
  {
    name: "Biblioteca",
    path: "/biblioteca",
    component: GameManager
  },
  {
    name: "PlayGame",
    path: "/play",
    component: PlayGame
  },
  {
    name: "SteamGame",
    path: "/steam/:appId",
    component: SteamGameDetail
  },
  {
    name: "SettingsPage",
    path: "/setting",
    component: SettingsPage
  },
],
})

export default router
