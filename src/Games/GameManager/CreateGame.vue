<script setup>
import { ref, watch } from "vue";
import MyModal from "@/Components/MyModal.vue";
import GamesService from '@/services/GamesService';
import IGDBService from "@/services/IGDBService";

const props = defineProps({
    'isOpen': Boolean,
    'title': { type: String, default: 'Criar Jogo' },
    'mode': {
        type: String,
        default: 'create'
    },
    'gameId': {
        type: [String, null],
        default: null
    }
});

const emit = defineEmits(['create-game', 'edit-game', 'close']);
const isIGDBModalOpen = ref(false);

const igdbGames = ref([]);
const selectedIGDBGame = ref({});

const newGame = ref({
    igdb_id: null,
    psn_id: null,
    steam_id: null,
    titulo: '',
    statusCompra: 'Wishlist',
    status: 'Backlog',
    horasJogadas: 0,
    plataformaAdquirida: [],
    midiaDigital: false,
    midiaFisica: false,
    namorada_flag: false,
    favorito_flag: false,
});

const handleCreateGame = () => {
    emit('create-game', { ...newGame.value });
};

const handleEditGame = () => {
    emit('edit-game', { ...newGame.value, id: props.gameId });
};

const handleClose = () => {
    emit('close');
};

const getGameDetails = async () => {
    try {
        const gameDetails = await GamesService.getById(props.gameId);
        newGame.value = { ...gameDetails };
    } catch (error) {
        console.log("Erro ao buscar detalhes do jogo: ", error);
    }
};

const searchIGDBByTitle = async () => {
    try {

        isIGDBModalOpen.value = true;

        if (!newGame.value.titulo || newGame.value.titulo.trim() === '') {
            alert("Título do jogo está vazio. Não é possível buscar no IGDB.");
            return;
        }

        const igdbData = await IGDBService.searchGame(newGame.value.titulo);
        console.log("Dados IGDB encontrados: ", igdbData);

        if (igdbData && igdbData.length > 0) {
            //newGame.value.igdb_id = igdbData[0].id;
            igdbGames.value = igdbData
        } else {
            alert("Nenhum jogo encontrado no IGDB com esse título.");
        }

    } catch (error) {
        console.error("Erro ao buscar dados do IGDB: ", error);
    }
};

const handleIGDBSelection = async () => {
    if (!selectedIGDBGame.value) {
        alert("Jogo não selecionado");
        return;
    }

    console.log("Jogo IGDB selecionado: ", selectedIGDBGame.value);
    newGame.value.igdb_id = selectedIGDBGame.value.id;
    isIGDBModalOpen.value = false;
}


const flagGameForGirlfriend = async (game) => {
  game.namorada_flag = !game.namorada_flag;
}

const flagGameForFavorite = (game) => {
    game.favorito_flag = !game.favorito_flag;
}

watch(() => props.isOpen, (newVal) => {
    if (newVal && props.mode === 'edit' && props.gameId) {
        getGameDetails();
    } else if (newVal && props.mode === 'create') {
        newGame.value = {
            igdb_id: null,
            psn_id: null,
            steam_id: null,
            titulo: '',
            statusCompra: 'Wishlist',
            status: 'Backlog',
            horasJogadas: 0,
            plataformaAdquirida: [],
            midiaDigital: false,
            midiaFisica: false,
            favorito_flag: false,
            namorada_flag: false,
        };
    }
});
</script>
<template>

    <MyModal :is-open="props.isOpen" :title="props.title" @close="handleClose()">
        <slot>
            <div class="flex flex-col gap-5 p-2 bg-[#1a1a1a]">

                <div class="grid grid-cols-2 gap-4">

                    <!-- IGDB -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-[11px] uppercase tracking-wider text-gray-500 font-bold ml-1">
                            IGDB ID
                            <a href="https://serialstation.com/titles/" target="_blank"
                                class="hover:text-blue-400 transition-colors">
                                <i class="bi bi-info-circle ml-1"></i>
                            </a>
                        </label>

                        <div class="flex items-stretch h-9">
                            <input v-model="newGame.igdb_id" type="text" placeholder="0" disabled
                                class="flex-1 bg-[#252525] border border-gray-700 border-r-0 rounded-l-md px-3 text-sm text-gray-400 outline-none cursor-not-allowed min-w-0">

                            <button @click="searchIGDBByTitle" type="button"
                                class="text-white px-4 rounded-r-md transition-all flex items-center justify-center border border-gray-700 active:scale-95"
                                title="Sincronizar com IGDB">
                                <i class="bi bi-arrow-clockwise"></i>
                            </button>
                        </div>
                    </div>
                    <!-- IGDB -->
                    <div class="flex flex-col gap-1.5">
                        <label class="text-[11px] uppercase tracking-wider text-gray-500 font-bold ml-1">PSN ID
                            <span><a href="https://serialstation.com/titles/" target="_blank"><i
                                        class="bi bi-info-circle"></i></a></span>
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
                    <select v-model="newGame.statusCompra"
                        class="bg-[#252525] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:border-blue-500 outline-none transition-all">
                        <option value="Wishlist" selected>Wishlist</option>
                        <option value="Pre-venda">Pré-venda</option>
                        <option value="Adquirido">Adquirido</option>
                    </select>
                </div>
                <div class="flex flex-col gap-1.5">

                    <label class="text-[11px] uppercase tracking-wider text-gray-500 font-bold ml-1">Estado</label>
                    <select v-model="newGame.status"
                        class="bg-[#252525] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:border-blue-500 outline-none transition-all">
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
                        <label v-for="plat in ['PS4', 'PS5', 'PC', 'SWITCH']" :key="plat" class="cursor-pointer">
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

                <div class="flex gap-6 mt-2">
                    <button class="group font-medium cursor-pointer flex gap-1.5" @click="flagGameForGirlfriend(newGame)">
                        <i class="bi text-pink-500" :class="newGame.namorada_flag ? 'bi-heart-fill' : 'bi-heart'"></i> 
                        <span class="text-gray-400 group-hover:text-gray-200">Namorada</span>
                    </button>

                    <button class="group font-medium cursor-pointer flex gap-1.5" @click="flagGameForFavorite(newGame)">
                        <i class="bi text-yellow-500" :class="newGame.favorito_flag ? 'bi-star-fill' : 'bi-star '"></i> 
                        <span class="text-gray-400 group-hover:text-gray-200">Favorito</span>
                    </button>
                </div>

            </div>
        </slot>

        <template #footer>
            <div class="flex gap-2">
                <button @click="handleClose()"
                    class="px-4 py-2 rounded text-xs font-medium text-gray-400 hover:bg-gray-800 transition-all">
                    Cancelar
                </button>
                <button @click="props.mode === 'edit' ? handleEditGame() : handleCreateGame()"
                    class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded text-xs font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2">
                    <i class="bi bi-plus-lg"></i> {{ props.mode === 'edit' ? 'Editar Jogo' : 'Criar Jogo' }}
                </button>
            </div>
        </template>
    </MyModal>


    <MyModal :is-open="isIGDBModalOpen" @close="isIGDBModalOpen = false" :title="'Selecionar Jogo do IGDB'"
        key="MODAL_IGDB">
        <slot>
            <div class="p-4">
                <!-- Conteúdo do modal IGDB aqui -->

                <!-- <div class="panel">
                    <code rows="200" disabled>{{ JSON.stringify(igdbGames) }}</code>
                </div> -->

                <template v-if="igdbGames && igdbGames.length > 0">
                    <ul>
                        <li v-for="(game, index) in igdbGames" :key="'igdb-' + index">
                            <input :id="'igdbcheck-' + game.id" type="radio" name="igdb-group" :value="game"
                                v-model="selectedGame" class="w-4 h-4 cursor-pointer">
                            <label :for="'igdbcheck-' + game.id" class="cursor-pointer select-none">
                                {{ game.name }} -
                                <span class="text-gray-400 text-xs">
                                    ({{game.platforms.map(x => x.abbreviation).join(', ')}})
                                </span>
                            </label>
                        </li>
                    </ul>
                </template>
            </div>

            <div class="flex flex-rol">
                <button @click="handleIGDBSelection()"
                    class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded text-xs font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2">
                    Selecionar Jogo
                </button>
            </div>
        </slot>
    </MyModal>
</template>
