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
let isUserAuthenticated = false;
router.beforeEach(async (to, from, next) => {
  // Se a rota exige autenticação
  if (to.meta.requiresAuth) {
    
    // Se já validamos a sessão nesta carga de página, deixa passar direto
    if (isUserAuthenticated) {
      return next();
    }

    try {
      // Pergunta para a sua API Node.js (que está protegida pelo Authelia) quem é o usuário.
      // Lembre-se de configurar a rota '/me' no seu backend para retornar os headers do Authelia!
      await axios.get('https://api.athomushub.com.br/auth');
      
      // Se a API respondeu 200 OK, o usuário está logado no Authelia
      isUserAuthenticated = true;
      next();
    } catch (error) {
      // Se der 401/403, o interceptor do main.js já vai disparar o redirecionamento para o Authelia.
      // O 'next(false)' abaixo apenas cancela a navegação local no Vue enquanto a página recarrega.
      next(false);
    }
  } else {
    // Se a rota for pública, deixa passar
    next();
  }
});
export default router
