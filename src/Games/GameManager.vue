<script setup>

import { ref, onMounted, watch } from "vue";
import GamesService from '@/services/GamesService';
import Pagination from "@/Components/Pagination.vue"
import LoadingOverlay from "@/Components/LoadingOverlay.vue";
import CreateGame from "./GameManager/CreateGame.vue";
import ContentTable from "@/Components/ContentTable.vue";

const listOfGames = ref([]);
const isLoading = ref(false);

const query = ref({
    limit: 25,
    page: 0,
    totalCount: 0,
    lastPage: false,
    midia: '',
    status: '',
    statusCompra: '',
});

const Modal = ref({
    isOpen: false,
    mode: 'create',
    title: 'Criar Jogo',
});

const gameId = ref(null);
const newGame = ref({
    psn_id: null,
    steam_id: null,
    titulo: '',
    status: 'Backlog',
    statusCompra: 'Wishlist',
    plataformaAdquirida: [],
    midiaDigital: false,
    midiaFisica: false,
    horasJogadas: 0,
});

const search = async (search) => {
    try {
        isLoading.value = true;
        query.value.search = search

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

const callListOfGames = async (page = 0) => {
    try {
        isLoading.value = true;

        query.value.page = page

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

const closeModal = () => {
    Modal.value.isOpen = false;
}

const createGame = async (gameData) => {
    try {
        console.log("Criando jogo: ", gameData);

        isLoading.value = true;

        if (gameData.psn_id) {
            delete gameData.steam_id;
        }
        if (gameData.steam_id) {

            delete gameData.psn_id;
        }

        await GamesService.create(gameData);

        // Reset form
        newGame.value = {
            psn_id: null,
            steam_id: null,
            titulo: '',
            plataformaAdquirida: [],
            midiaDigital: false,
            midiaFisica: false,
            horasJogadas: 0,
        };

        closeModal();

        // Refresh list
        await callListOfGames();
    } catch (erro) {
        console.log("Erro ao criar jogo: ", erro);
    }
    finally {
        isLoading.value = false;
    }
}

const editGame = async (gameData) => {
    try {
        console.log("Editando jogo: ", gameData);
        isLoading.value = true;
        await GamesService.update(gameData._id, gameData);

        closeModal();
        // Refresh list
        await callListOfGames();
    } catch (erro) {
        console.log("Erro ao editar jogo: ", erro);
    }
    finally {
        isLoading.value = false;
    }
}

const openCreate = () => {
    Modal.value.mode = 'create';
    gameId.value = null;
    Modal.value.isOpen = true;
}
const openEdit = (game) => {
    Modal.value.mode = 'edit';

    gameId.value = game._id;
    Modal.value.isOpen = true;
}
onMounted(async () => {
    await callListOfGames();
});

watch(() => query.value.page, async (newPage) => {
    console.log("Mudou: ", query.value.page);
});
</script>
<template>
    <div class="p-4">
        <LoadingOverlay :is-loading="isLoading"></LoadingOverlay>
        
        <CreateGame :is-open="Modal.isOpen" 
            :mode="Modal.mode" 
            :gameId="gameId"
            @close="closeModal" 
            @create-game="(game) => createGame(game)"
            @edit-game="(game) => editGame(game)"></CreateGame>

        <div class="flex items-center justify-between mb-4">

            <h2 class="text-2xl font-bold mb-4">Games</h2>
            <button @click="openCreate()"
                class="flex items-center gap-2 bg-[#252525] hover:bg-[#323232] text-gray-300 px-3 py-1.5 rounded border border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-medium">
                <i class="bi bi-plus"></i>Adicionar jogo
            </button>
        </div>

        <Pagination :query="query" @pagination-changed="callListOfGames" @search="search"></Pagination>

        <ContentTable :table-details="{ columns: [
                { name: 'Título' },
                { name: 'Flags'},
                { name: 'Horas Jogadas' },
                { name: 'Plataformas' },
                { name: 'Mídia' },
                { name: 'Ações' }
            ], data: listOfGames }"
            @edit-game="(game) => openEdit(game)"></ContentTable>
    </div>
</template>