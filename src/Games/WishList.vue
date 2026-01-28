<script setup>
import { ref, onMounted, provide } from "vue";
import GamesService from "@/services/GamesService";
import GameDetail from "./GameManager/GameDetail.vue";
import PageLayout from "@/Components/PageLayout.vue";

const isOpen = ref(false);
const listOfGames = ref([]);
const selectedGame = ref(null);

const columnsLayout = ref("");

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
}

const handleImage = (image) => {
    const gameIndex = listOfGames.value.findIndex(g => g._id === image.gameId);

    if (gameIndex !== -1)
        listOfGames.value[gameIndex].fotos.push(image);

}

onMounted(async () => {
    await getWishlistGames();
})

provide('isOpen', isOpen);
provide('game', selectedGame);
provide("columnsLayout", columnsLayout);
</script>

<template>


    <PageLayout @refresh="getWishlistGames">
        <template #right>
            <button @click="openCreate()"
                class="button button-color">
                <i class="bi bi-plus"></i>Adicionar jogo
            </button>
        </template>
    </PageLayout>

    <div class="grid gap-4 p-4" :class="columnsLayout">

        <div v-for="game in listOfGames" :key="game._id"
            class="game-item bg-[#252525] border border-gray-700 rounded-xl overflow-hidden cursor-pointer hover:bg-[#2e2e2e] transition-all group shadow-lg"
            @click="OpenGameDetail(game)">

            <div class="p-2 flex items-center gap-1">
                <h3 class="font-semibold text-gray-200 truncate text-sm tracking-tight">
                    {{ game.titulo }}
                </h3>
            </div>
            <div class="relative w-full  overflow-hidden border-b border-gray-800"
                :class="columnsLayout == 'grid-cols-1' ? 'h-80' : 'h-48'">
                <div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    :style="{ backgroundImage: `url(${game.fotos[0]?.url || '/images/controle-placeholder.png'})` }">
                </div>

                <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>

        </div>

    </div>
    <GameDetail v-if="isOpen" @close="CloseGameDetail()" @image-added="handleImage" :key="selectedGame?._id" />
</template>

<style scoped>
.game-item {
    max-height: 300px !important;
}
</style>