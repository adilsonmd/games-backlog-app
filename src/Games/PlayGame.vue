<script setup>

import { onMounted, ref, provide } from 'vue';

import GamesService from '@/services/GamesService';
import PageLayout from '@/Components/PageLayout.vue';
import CardComponent from '@/Components/CardComponent.vue';

const refreshToken = ref(0);
const listOfGames = ref([]);
const listOfPaused = ref([]);
const columnsLayout = ref("");

const getPlayingGame = async () => {
    try {
        const response = await GamesService.getByStatus({statusCompra: 'Adquirido', status: 'Jogando'});

        if (!response) {
            alert("Não encontrado");
            return;
        }

        listOfGames.value = response;

        getPausedGames();
    }
    catch (error) {
        alert(error);
    }
}

const getPausedGames = async () => {
    const responsePaused = await GamesService.getByStatus({statusCompra: 'Adquirido', status: 'Pausado'});
    if (responsePaused) {
        listOfPaused.value = responsePaused;
    }
}
const callPageInformation = async (refresh = false) => {
    await getPlayingGame();

    if (refresh) {
        refreshToken.value += 1;
    }
};

const addToPlay = async (game) => {
    game.status = 'Jogando';
    updateGame(game);
}
const addToCancel = async (game) => {
    game.status = 'Cancelado';
    updateGame(game);
}
const addToPause = async (game) => {
    game.status = 'Pausado';
    updateGame(game);
}

const updateGame = async (game) => {
    const response = await GamesService.update(game._id, game);
    await callPageInformation(); 
}

onMounted(async () => {
    await callPageInformation();
});

provide("columnsLayout", columnsLayout);

</script>
<style sccope></style>
<template>

    <PageLayout @refresh="callPageInformation(true)"></PageLayout>

    <div class="grid gap-4 p-4" :class="columnsLayout">

        <template v-for="game in listOfGames">
            <CardComponent :game="game" :refresh-token="refreshToken" :pause-button="true"></CardComponent>
        </template>
    </div>

    <div id="foldable" v-if="listOfGames && listOfPaused">
        <div class="mt-4 p-4">
            <h3 class="text-xl font-medium mb-4">Jogando</h3>
            <template v-for="game in listOfGames">
                
                <div class="border-gray-700 border rounded-md hover:bg-gray-800 p-2 flex justify-between">
                    <span>{{ game.titulo }}</span>
                    <div>
                        
                        <button class="button button-color" @click="addToPause(game)">Pausar</button>
                        <button class="button button-color" @click="addToCancel(game)">Cancelar</button>
                    </div>
                </div>
            </template>
        </div>
        <div class="mt-4 p-4">
            
            <h3 class="text-xl font-medium mb-4">Pausados</h3>
            <template v-for="game in listOfPaused">
                
                <div class="border-gray-700 border rounded-md hover:bg-gray-800 p-2 flex justify-between">
                    <span>{{  game.titulo }}</span>
                    <div>
                        
                        <button class="button button-color" @click="addToPlay(game)">Play</button>
                        <button class="button button-color" @click="addToCancel(game)">Cancelar</button>
                    </div>
                </div>
            </template>
        </div>
    </div>

</template>