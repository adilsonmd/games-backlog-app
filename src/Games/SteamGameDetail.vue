<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const gameData = ref(null);

const getGameData = async () => {
    try {

        const response = await axios.get("http://localhost:3000/api/steam/jogo/" + $route.params.id);
        response.data
    }
    catch (error) {
        alert(error);
    }

}
</script>

<template></template>