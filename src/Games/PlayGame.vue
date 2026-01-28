<script setup>

import GamesService from '@/services/GamesService';
import PsnService from '@/services/PsnService';
import SteamService from '@/services/SteamService';
import { onMounted, ref, watch } from 'vue';

const listOfGames = ref([]);
const display = ref("00:00:00");
const isCounting = ref(false);
const intervalId = ref(null);
const startTime = ref();
const elapsedPausedTime = ref(0);

const columnsLayout = ref("grid-cols-3");

const recentGames = ref([]);

const toggleCount = () => {
    isCounting.value = !isCounting.value;
};

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Função auxiliar para garantir 2 dígitos (ex: 5 -> 05)
    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/** Função principal chamada a cada intervalo */
function updateStopwatch() {
    // Calcula o tempo total decorrido: (agora - tempo inicial) + tempo pausado
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime.value + elapsedPausedTime.value;

    display.value = formatTime(elapsedTime);
}

// --- Funções de Controle ---

function startStopwatch() {
    if (intervalId.value !== null) return; // Já está rodando, ignora

    // Define o tempo de início subtraindo o tempo pausado do tempo atual.
    // Isso garante que ele recomece de onde parou.
    startTime.value = Date.now();

    // Roda a cada 1000ms (1 segundo)
    intervalId.value = setInterval(updateStopwatch, 1000);

}

function stopStopwatch() {
    if (intervalId.value === null) return; // Já está parado, ignora

    clearInterval(intervalId.value);

    // Salva o tempo decorrido total para recomeçar
    elapsedPausedTime.value += Date.now() - startTime.value;
    intervalId.value = null;

}

function resetStopwatch() {
    stopStopwatch(); // Para, se estiver rodando

    elapsedPausedTime.value = 0;
    display.value = "00:00:00";
}

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
        if (gameName) {
            if (!recentGames.value.includes(gameName))
                recentGames.value.push(gameName);
        }
    } catch (error) {
        console.error("Erro ao buscar dados do Steam: ", error);
        return null;
    }
};

const getPsnPlayerSummary = async () => {
    try {
        const playerData = await PsnService.getPlayerSummary();
        let gameName = playerData.basicPresence?.gameTitleInfoList[0]?.titleName || null;
        
        if (!gameName) {
            console.error("Não encontrado");
            return;
        }
        let valor = listOfGames.value.find(x => x.titulo === gameName);
        
        if (!valor) 
            return;

        
    } catch (error) {
        console.error("Erro ao buscar dados do PSN: ", error);
        return null;
    }
};

const changePageLayout = (cols) => {
    if ([1,2,3,4,6].includes(cols)) {
        columnsLayout.value = `grid-cols-${cols}`; 
    }
}
onMounted(async () => {
    await getPlayingGame();

    await getSteamPlayerSummary();
    await getPsnPlayerSummary();
});

</script>
<style sccope></style>
<template>

    <div class="flex p-4">
        <button @click="changePageLayout(1)" class="border p-1 cursor-pointer"><i class="bi bi-view-stacked"></i></button>
        <button @click="changePageLayout(2)" class="border p-1 cursor-pointer"><i class="bi bi-grid-fill"></i></button>
        <button @click="changePageLayout(3)" class="border p-1 cursor-pointer"><i class="bi bi-grid-3x3-gap-fill"></i></button>
    </div>
    <div class="grid gap-4 p-4" :class="columnsLayout">

        <template v-for="(game, index) in listOfGames">

            <div
                class="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all group">
                <div class="relative h-64">
                    <img :src="game?.fotos?.find(x => x.isCover === true)?.url ?? ''"
                        class="w-full h-full object-cover">
                    <div
                        class="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
                        {{ game.plataformaAdquirida }}
                    </div>
                </div>

                <div class="p-4">
                    <h3 class="font-bold text-gray-100 truncate">{{ game.titulo }}</h3>

                    <div class="flex items-center justify-between mt-3 text-gray-500">
                        <div class="flex items-center gap-1.5">
                            <i class="bi bi-calendar-event text-blue-500"></i>
                            <span class="text-[11px]">Iniciado em 12/10/25</span>
                        </div>
                        <div class="text-[11px] tracking-tighter font-semibold text-gray-400">
                            Tempo de jogo: {{game.horasJogadas}}h
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