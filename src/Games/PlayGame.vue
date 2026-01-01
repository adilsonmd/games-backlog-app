<script setup>

import { onMounted, ref, watch } from 'vue';

const listOfGames = ref([]);
const display = ref("00:00:00");
const isCounting = ref(false);
const intervalId = ref(null);
const startTime = ref();
const elapsedPausedTime = ref(0);

const toggleCount = () => {
    isCounting.value = !isCounting.value;
    console.log("Toggle", isCounting.value);


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


onMounted(() => {
    listOfGames.value = JSON.parse(localStorage.getItem("GAMELIST")) ?? [];
});

</script>
<style sccope></style>
<template>

    <div class="container">
        <div id="stopwatch-display">{{ display }}</div>

        <div class="d-flex flex-row">

            <button class="btn btn-primary" id="start-btn" @click="startStopwatch">Iniciar</button>
            <button class="btn btn-secondary" id="stop-btn" @click="stopStopwatch">Parar</button>
            <button class="btn btn-secondary" id="reset-btn" @click="resetStopwatch">Resetar</button>
        </div>
    </div>

</template>