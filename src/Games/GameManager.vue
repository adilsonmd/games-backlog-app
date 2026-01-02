<script setup>

import { ref, onMounted, watch } from "vue";
import GamesService from '@/services/GamesService';
import Pagination from "@/Components/Pagination.vue"
import LoadingOverlay from "@/Components/LoadingOverlay.vue";
import MyModal from "@/Components/MyModal.vue";

const listOfGames = ref([]);
const isLoading = ref(false);

const query = ref({
    limit: 25,
    page: 0,
    totalCount: 0,
    lastPage: false,
});

const Modal = ref({
    isOpen: false
});

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


const createGame = async () => {
    try {
        isLoading.value = true;

        if (newGame.value.psn_id) {
            delete newGame.value.steam_id;
        }
        if (newGame.value.steam_id) {

            delete newGame.value.psn_id;
        }

        await GamesService.create(newGame.value);

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

        Modal.value.isOpen = false;

        // Refresh list
        await callListOfGames();
    } catch (erro) {
        console.log("Erro ao criar jogo: ", erro);
    }
    finally {
        isLoading.value = false;
    }
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
        <MyModal :is-open="Modal.isOpen" title="Criar" @close="Modal.isOpen = false">
            <slot>
                <div class="flex flex-col gap-5 p-2 bg-[#1a1a1a]">

                    <div class="grid grid-cols-2 gap-4">
                        <div class="flex flex-col gap-1.5">
                            <label class="text-[11px] uppercase tracking-wider text-gray-500 font-bold ml-1">PSN ID
                                <span><a href="https://serialstation.com/titles/" target="_blank"><i class="bi bi-info-circle"></i></a></span>
                            </label>
                            <input v-model="newGame.psn_id" type="text" placeholder="Ex: 2841..."
                                class="bg-[#252525] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600">
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label class="text-[11px] uppercase tracking-wider text-gray-500 font-bold ml-1">Steam
                                ID</label>
                            <input v-model="newGame.steam_id" type="text" placeholder="Ex: 7656..."
                                class="bg-[#252525] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600">
                        </div>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label class="text-[11px] uppercase tracking-wider text-gray-500 font-bold ml-1">Título do
                            Jogo</label>
                        <input v-model="newGame.titulo" type="text" placeholder="Digite o nome completo..."
                            class="bg-[#252525] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600">
                    </div>
                    <div class="flex flex-col gap-1.5">

                        <label class="text-[11px] uppercase tracking-wider text-gray-500 font-bold ml-1">Estado</label>
                        <select v-model="newGame.statusCompra" class="bg-[#252525] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:border-blue-500 outline-none transition-all">
                            <option value="Wishlist" selected>Wishlist</option>
                            <option value="Pre-venda">Pré-venda</option>
                            <option value="Adquirido">Adquirido</option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-1.5">

                        <label class="text-[11px] uppercase tracking-wider text-gray-500 font-bold ml-1">Estado</label>
                        <select v-model="newGame.status" class="bg-[#252525] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:border-blue-500 outline-none transition-all">
                            <option value="Backlog" selected>Backlog</option>
                            <option value="Jogando">Jogando</option>
                            <option value="Pausado">Pausado</option>
                            <option value="Finalizado">Finalizado</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label class="text-[11px] uppercase tracking-wider text-gray-500 font-bold ml-1">Horas
                            Jogadas</label>
                        <input v-model.number="newGame.horasJogadas" type="number"
                            class="w-32 bg-[#252525] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:border-blue-500 outline-none transition-all">
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-[11px] uppercase tracking-wider text-gray-500 font-bold ml-1">Plataformas
                            Adquiridas</label>
                        <div class="flex flex-wrap gap-2">
                            <label v-for="plat in ['PS5', 'PC', 'SWITCH']" :key="plat" class="cursor-pointer">
                                <input type="checkbox" :value="plat" v-model="newGame.plataformaAdquirida"
                                    class="hidden peer">
                                <div
                                    class="px-3 py-1 rounded text-xs font-medium border border-gray-700 bg-[#252525] text-gray-400 peer-checked:bg-blue-900/30 peer-checked:text-blue-400 peer-checked:border-blue-500 hover:bg-gray-700 transition-all">
                                    {{ plat }}
                                </div>
                            </label>
                        </div>
                    </div>

                    <div class="flex gap-6 mt-2">
                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" v-model="newGame.midiaDigital" class="hidden peer">
                            <div
                                class="w-8 h-4 bg-gray-700 rounded-full peer-checked:bg-blue-600 relative transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-3 after:h-3 after:rounded-full after:transition-all peer-checked:after:translate-x-4">
                            </div>
                            <span class="text-xs text-gray-400 font-medium group-hover:text-gray-200">Mídia
                                Digital</span>
                        </label>

                        <label class="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" v-model="newGame.midiaFisica" class="hidden peer">
                            <div
                                class="w-8 h-4 bg-gray-700 rounded-full peer-checked:bg-blue-600 relative transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-3 after:h-3 after:rounded-full after:transition-all peer-checked:after:translate-x-4">
                            </div>
                            <span class="text-xs text-gray-400 font-medium group-hover:text-gray-200">Mídia
                                Física</span>
                        </label>
                    </div>

                </div>
            </slot>

            <template #footer>
                <div class="flex gap-2">
                    <button @click="Modal.isOpen = false"
                        class="px-4 py-2 rounded text-xs font-medium text-gray-400 hover:bg-gray-800 transition-all">
                        Cancelar
                    </button>
                    <button @click="createGame"
                        class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded text-xs font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2">
                        <i class="bi bi-plus-lg"></i> Criar Jogo
                    </button>
                </div>
            </template>
        </MyModal>

        <div class="flex items-center justify-between mb-4">

            <h2 class="text-2xl font-bold mb-4">Games</h2>
            <button @click="Modal.isOpen = !Modal.isOpen"
                class="flex items-center gap-2 bg-[#252525] hover:bg-[#323232] text-gray-300 px-3 py-1.5 rounded border border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-medium">
                <i class="bi bi-plus"></i>Adicionar jogo
            </button>
        </div>

        <Pagination :query="query" @pagination-changed="callListOfGames" @search="search"></Pagination>

        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-sm">
                        <th class="px-4 py-2 font-medium">Game</th>
                        <th class="px-4 py-2 font-medium">Tempo de jogo</th>
                        <th class="px-4 py-2 font-medium">Plataforma</th>
                        <th class="px-4 py-2 font-medium">Midia</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                    <template v-if="listOfGames === null || listOfGames.length == 0">
                        <tr>
                            <td colspan="4" class="px-4 py-3 text-center text-gray-500">
                                Nenhum jogo encontrado.
                            </td>
                        </tr>
                    </template>
                    <tr v-for="(game, index) in listOfGames" :key="index"
                        class="hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-colors">
                        <td class="px-4 py-3 font-medium">{{ game.titulo }}</td>
                        <td class="px-4 py-3 text-gray-500">{{ game.horasJogadas }}</td>
                        <td class="px-4 py-3">
                            <template v-for="plataforma in game.plataformaAdquirida">

                                <!--
                                <td class="">
                                    <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-2 py-1 rounded border border-blue-200 dark:border-blue-800">
                                    PS5
                                    </span>
                                </td>
                                <td class="px-4 py-3">
                                    <span class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded border border-green-200 dark:border-green-800">
                                    Digital
                                    </span>
                                </td>
                                -->
                                <span v-if="plataforma == 'PS4' || plataforma == 'PS5'">
                                    <i class="bi bi-playstation"></i>
                                </span>
                                <span v-if="plataforma == 'PC'">
                                    <i class="bi bi-steam"></i>
                                </span>
                            </template>
                        </td>
                        <td class="px-4 py-3">
                            <span v-show="game.midiaFisica">
                                <i class="bi bi-disc"></i>
                            </span>
                            <span v-show="game.midiaDigital">
                                <i class="bi bi-cloudy"></i>
                            </span>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <Pagination :query="query" @pagination-changed="callListOfGames"></Pagination>
    </div>
</template>