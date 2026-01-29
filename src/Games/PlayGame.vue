<script setup>

import { onMounted, ref, provide } from 'vue';
import { useRouter } from 'vue-router';

import GamesService from '@/services/GamesService';
import PageLayout from '@/Components/PageLayout.vue';
import PlayingComponent from '@/Components/PlayingComponent.vue';


const router = useRouter(); // Inicializando o router.

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

const openGameDetailPage = (game) => {
    router.push('/biblioteca/' + game._id);
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

        <template v-for="(game, index) in listOfGames">

            <div @click="openGameDetailPage(game)"
                class="bg-[#1a1a1a] rounded-xl overflow-hidden border  transition-all group cursor-pointer"
                :class="game?.isPlaying === true ? 'border-green-800 hover:border-green-500' : 'border-gray-800 hover:border-gray-500'">
                <div class="relative h-64">
                    <img :src="game?.fotos?.find(x => x.isCover === true)?.url ?? ''"
                        class="w-full h-full object-cover">
                    <div
                        class="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
                        {{ game.plataformaAdquirida.join(',') }}
                    </div>
                </div>

                <div class="p-4">
                    <h3 class="font-bold text-gray-100 truncate">{{ game.titulo }}</h3>

                    <div class="flex items-center justify-between mt-3 text-gray-500">

                        <PlayingComponent :game="game" :key="refreshToken"></PlayingComponent>

                        <div class="text-[11px] tracking-tighter font-semibold text-gray-400">
                            Tempo de jogo: {{ game.horasJogadas }}h
                        </div>
                        <div class="text-[11px] uppercase tracking-tighter font-semibold text-gray-400">
                            JRPG
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>


</template>