<script setup>

import { onMounted, ref, provide } from 'vue';


import GamesService from '@/services/GamesService';
import PageLayout from '@/Components/PageLayout.vue';
import CardComponent from '@/Components/CardComponent.vue';


const listOfGames = ref([]);
const columnsLayout = ref("");
const refreshToken = ref(0);

const getPlayingGame = async () => {
    try {
        const response = await GamesService.getPlayingGames();

        if (!response) {
            alert("Não encontrado");
            return;
        }

        listOfGames.value = response;
    }
    catch (error) {
        alert(error);
    }
}

const callPageInformation = async (refresh = false) => {
    await getPlayingGame();

    if (refresh) {
        refreshToken.value += 1;
    }
};

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
            <CardComponent :game="game" :refresh-token="refreshToken"></CardComponent>
        </template>
    </div>


</template>