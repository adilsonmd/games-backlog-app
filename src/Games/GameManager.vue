<script setup>

import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, } from "vue";
import GamesService from '@/services/GamesService';
import Pagination from "@/Components/Pagination.vue"
import LoadingOverlay from "@/Components/LoadingOverlay.vue";
import CreateGame from "./GameManager/CreateGame.vue";
import TableRoot from "@/Components/TableRoot.vue";
const route = useRoute();
const router = useRouter();

const listOfGames = ref([]);
const isLoading = ref(false);

const query = ref({
    limit: 25,
    page: 0,
    totalCount: 0,
    lastPage: false,
    orderby: 'titulo',
    direction: 'asc',
    midia: '',
    status: '',
    statusCompra: '',
});

const table = ref([
    { field: 'titulo', fieldName: 'Titulo', sort: true, direction: 'asc' },
    { field: 'status', fieldName: 'Status', sort: false, direction: 'asc' },
    { field: 'statusCompra', fieldName: 'Status Compra', sort: false, direction: 'asc' },
    { field: 'plataformaAdquirida', fieldName: 'Plataformas', sort: false, direction: 'asc' },
    { field: 'Ações', fieldName: 'Plataformas', sort: false, direction: 'asc', actions: true },

]);

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

/**
 * Altera a URL de query da página para os valores passados
 */
const changeRouteQuery = (page, orderby, direction) => {
    router.push({
        path: route.path,
        query: { page, orderby, direction }
    });
}

const callListOfGames = async () => {
    try {
        isLoading.value = true;
        
        changeRouteQuery(
            query.value.page, 
            query.value.orderby,
            query.value.direction
        );
        
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

const handleSort = () => {
    let obj = table.value.find(x => x.sort == true);

    if (!obj) {
        return;
    }

    query.value.orderby = obj.field;
    query.value.direction = obj.direction;
    
    callListOfGames();
}

onMounted(async () => {
    query.value.page = Number(route.query.page ?? 0) || 0;
    query.value.orderby = route.query.orderby ?? "titulo";
    query.value.direction = route.query.direction ?? "asc";

    await callListOfGames();

});

</script>
<template>
    <div class="p-4">
        <LoadingOverlay :is-loading="isLoading"></LoadingOverlay>

        <CreateGame :is-open="Modal.isOpen" :mode="Modal.mode" :gameId="gameId" @close="closeModal"
            @create-game="(game) => createGame(game)" @edit-game="(game) => editGame(game)"></CreateGame>

        <div class="flex items-center justify-between mb-4">

            <h2 class="text-2xl font-bold mb-4">Games</h2>
            <button @click="openCreate()"
                class="flex items-center gap-2 bg-[#252525] hover:bg-[#323232] text-gray-300 px-3 py-1.5 rounded border border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-medium">
                <i class="bi bi-plus"></i>Adicionar jogo
            </button>
        </div>

        <Pagination :query="query" @pagination-changed="callListOfGames" @search="search"></Pagination>


        <TableRoot :table-details="{
            columns: [
                { name: 'Título' },
                /* { name: 'Flags' }, */
                { name: 'Status' },
                { name: 'Status Compra' },
                { name: 'Plataformas' },
                { name: 'Ações' }
            ], data: listOfGames
        }" :table="table" @edit-game="(game) => openEdit(game)" @sort-changed="handleSort"></TableRoot>
    </div>
</template>