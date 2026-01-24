<script setup>

import GamesService from '@/services/GamesService';
import { onMounted, ref, watch } from 'vue';

const listOfGames = ref([]);
const display = ref("00:00:00");
const isCounting = ref(false);
const intervalId = ref(null);
const startTime = ref();
const elapsedPausedTime = ref(0);

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

onMounted(async () => {
    await getPlayingGame();
});

</script>
<style sccope></style>
<template>

    <div class="grid grid-cols-2 gap-4 p-4">

        <template v-for="(game, index) in listOfGames">

            <div
                class="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all group">
                <div class="relative h-48">
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