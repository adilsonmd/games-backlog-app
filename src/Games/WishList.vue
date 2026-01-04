<script setup>
import { ref, onMounted, provide } from "vue";
import GamesService from "@/services/GamesService";
import GameDetail from "./GameManager/GameDetail.vue";

const isOpen = ref(false);
const listOfGames = ref([]);
const selectedGame = ref(null);

const getWishlistGames = async () => {
    try {
        const games = await GamesService.getWishlist();
        // Lógica para lidar com os jogos da wishlist

        listOfGames.value = games;
    } catch (error) {
        console.log("Erro ao buscar jogos da wishlist: ", error);
    }
}

const OpenGameDetail = (game) => {
    selectedGame.value = game;
    isOpen.value = true;
}

const CloseGameDetail = () => {
    isOpen.value = false;
    selectedGame.value = null;
}

onMounted(async () => {
    await getWishlistGames();
})

provide('isOpen', isOpen);
provide('game', selectedGame);

</script>

<template>
    <div class="p-4">
        <div class="flex items-center justify-between mb-4">

            <h2 class="text-2xl font-bold mb-4">WishList</h2>
            <button @click="openCreate()"
                class="flex items-center gap-2 bg-[#252525] hover:bg-[#323232] text-gray-300 px-3 py-1.5 rounded border border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-medium">
                <i class="bi bi-plus"></i>Adicionar jogo
            </button>
        </div>
    </div>

    <div class="grid grid-cols-3 gap-4 p-4">

      <div v-for="game in listOfGames" :key="game._id"
    class="game-item bg-[#252525] border border-gray-700 rounded-xl overflow-hidden cursor-pointer hover:bg-[#2e2e2e] transition-all group shadow-lg"
    @click="OpenGameDetail(game)">
    
    <div class="p-2 flex items-center gap-1">
        <h3 class="font-semibold text-gray-200 truncate text-sm tracking-tight">
            {{ game.titulo }}
        </h3>
    </div>
    <div class="relative w-full h-44 overflow-hidden border-b border-gray-800">
        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            :style="{ backgroundImage: `url(${game.fotos[0]?.url || 'caminho/para/placeholder.png'})` }">
        </div>
        
        <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
    </div>

</div>

    </div>
    <GameDetail v-if="isOpen" @close="CloseGameDetail()" :key="selectedGame?._id" />
</template>

<style scoped>
    .game-item {
        max-height: 300px !important;
    }
</style>