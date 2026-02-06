<script setup>
import { ref, onMounted, provide } from "vue";
import GamesService from "@/services/GamesService";
import GameDetail from "./GameManager/GameDetail.vue";
import PageLayout from "@/Components/PageLayout.vue";
import CardComponent from "@/Components/CardComponent.vue";

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
        <template v-for="(game, index) in listOfGames">
            <CardComponent :playing="false" :game="game" :refresh-token="0"></CardComponent>
        </template>
    </div>
    <GameDetail v-if="isOpen" @close="CloseGameDetail()" @image-added="handleImage" :key="selectedGame?._id" />
</template>

<style scoped>
.game-item {
    max-height: 300px !important;
}
</style>