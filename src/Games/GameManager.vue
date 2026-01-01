<script setup>

import { ref, onMounted } from "vue";
import GamesService from '@/services/GamesService';
import Pagination from "@/Components/Pagination.vue"
const listOfGames = ref([]);
const isLoading = ref(false);

const query = ref({
    limit: 24,
    page: 0,
    totalCount: 0,
    lastPage: false,
});

const callListOfGames = async () => {
    try {
        isLoading.value = true;
        console.log("chamando lista de jogos");

        const { games, queryReturn } = await GamesService.getAll(query.value);

        listOfGames.value = games;
        query.value = queryReturn;
    } catch (erro) {
        console.log("Erro no manager: ", erro);
    }
    finally {
        isLoading.value = false;
    }
}

onMounted(async () => {
    await callListOfGames();
});


</script>
<template>
    <div class="container">
        <h2>Games</h2>
        <Pagination :query="query" @pagination-changed="callListOfGames"></Pagination>
        <div>
            <table class="table">
                <thead>
                    <tr>

                        <th>Game</th>
                        <th>Tempo de jogo</th>
                        <th>Plataformas</th>
                        <th>Midia</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(game, index) in listOfGames" :key="index">
                        <td>{{ game.titulo }}</td>
                        <td>{{ game.horasJogadas }}</td>
                        <td>
                            <template v-for="plataforma in game.plataformaAdquirida">
                                <span v-if="plataforma == 'PS4' || plataforma == 'PS5'"><i
                                        class="bi bi-playstation"></i></span>
                                <span v-if="plataforma == 'PC'"><i class="bi bi-steam"></i></span>
                            </template>
                        </td>
                        <td>
                            <span v-show="game.midiaFisica"><i class="bi bi-disc"></i></span>
                            <span v-show="game.midiaDigital"><i class="bi bi-cloudy"></i></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Pagination :query="query" @pagination-changed="callListOfGames"></Pagination>
    </div>
</template>