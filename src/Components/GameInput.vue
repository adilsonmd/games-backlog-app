<script setup>
import { ref } from "vue";

// Função que será essencial para não realizar diversas chamadas a API.
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}
function chamarAPIBuscaGames(event) {
    if (!event?.target?.value?.trim()) {
        console.log("nada aqui");
        return;
    }

    console.log('Salvando os dados', event);
}
const processChange = debounce((event) => chamarAPIBuscaGames(event));

const onType = (event) => {
    console.log("Digitando");
}
</script>

<template>

    <div>
        <input @keyup="processChange" type="text" placeholder="Game" class="p-2 border-gray-500">
    </div>

</template>