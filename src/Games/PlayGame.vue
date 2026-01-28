<script setup>
import { onMounted, ref, provide } from 'vue';

import PsnService from '@/services/PsnService';
import GamesService from '@/services/GamesService';
import SteamService from '@/services/SteamService';
import PageLayout from '@/Components/PageLayout.vue';

const listOfGames = ref([]);
const columnsLayout = ref("");


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

const getSteamPlayerSummary = async () => {
    try {
        const playerData = await SteamService.getPlayerSummary();
        let gameName = playerData.response.players.player[0]?.gameextrainfo || null;
        let gameId = playerData.response.players.player[0]?.steamid || null;

        if (gameName && gameId) {
            let valor = listOfGames.value.findIndex(x => x.titulo === gameName || x.steam_id == gameId);

            if (valor === -1)
                return;

            listOfGames.value[valor].isPlaying = true;
        }
    } catch (error) {
        console.error("Erro ao buscar dados do Steam: ", error);
        return null;
    }
};

const getPsnPlayerSummary = async () => {
    try {
        const playerData = await PsnService.getPlayerSummary();

        if (!playerData) {
            return;
        }

        // Checando se há dados no retorno;
        if (playerData.basicPresence.availability === "unavailable")
            return;

        let gameName = playerData.basicPresence?.gameTitleInfoList[0]?.titleName || null;
        let gameId = playerData.basicPresence?.gameTitleInfoList[0]?.npTitleId || null

        gameId = gameId.replace("_", "");
        let valor = listOfGames.value.findIndex(x => x.titulo === gameName || x.psn_id == gameId);

        if (valor === -1)
            return;

        listOfGames.value[valor].isPlaying = true;
    } catch (error) {
        console.error("Erro ao buscar dados do PSN: ", error);
        return null;
    }
};

const changePageLayout = (cols) => {
    if ([1, 2, 3, 4, 6].includes(cols)) {
        columnsLayout.value = `grid-cols-${cols}`;
    }
}

const callPageInformation = async () => {
    await getPlayingGame();

    await getSteamPlayerSummary();
    await getPsnPlayerSummary();
};
onMounted(async () => {
    await callPageInformation();
});

provide("columnsLayout", columnsLayout);

</script>
<style sccope></style>
<template>

    <PageLayout @refresh="callPageInformation"></PageLayout>

    <div class="grid gap-4 p-4" :class="columnsLayout">

        <template v-for="(game, index) in listOfGames">

            <div
                class="bg-[#1a1a1a] rounded-xl overflow-hidden border  transition-all group" 
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
                            <div v-if="game.isPlaying" class="flex items-center gap-1.5">
                                <i class="bi bi-play text-green-600"></i>
                                <span class="text-[12px] text-green-600">Jogando Agora</span>
                            </div>
                            <div v-else class="flex items-center gap-1.5">
                                <i class="bi bi-pause text-gray-500"></i>
                                <span class="text-[12px]">Em espera</span>
                            </div>
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