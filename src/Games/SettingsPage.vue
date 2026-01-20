<script setup>
import { onMounted, ref } from "vue";

import PsnService from "@/services/PsnService";
import SteamService from "@/services/SteamService";
import GamesService from "@/services/GamesService";
import SettingService from "@/services/SettingService";
import MyModal from "@/Components/MyModal.vue";

const allSettings = ref([]);
const steamSynced = ref(false);
const psnSynced = ref(false);
const isLoading = ref(false);

const listOfGames = ref([]);
const gamesToSync = ref([]);

const query = ref({
    limit: 5,
    page: 0,
    totalCount: 0,
    lastPage: false,
});

const modal = ref({
    isOpen: false,
    title: 'Sincronizar jogos',
});

const modalConfirmacao = ref({
    isOpen: false,
});

const getAllSettings = async () => {
    const response = await SettingService.getAll();

    allSettings.value = response.data.map(item => ({
        ...item,
        visible: false
    }));
}

const syncSteam = async () => {

    try {

        const { games } = await SteamService.getOwnedGames(query.value);
        await mapSteamToGameSchema(games);
        steamSynced.value = true;

        modal.value.isOpen = true;
    } catch (error) {
        alert(error);
    }
}

const syncPsn = async () => {
    try {

        const { games } = await PsnService.getOwnedGames(query.value);
        await mapPsnToGameSchema(games);
        psnSynced.value = true;

        modal.value.isOpen = true;
    } 
    catch (error) {
        alert(error);
    }
}

const removeDuplicates = async() => {
    try {

        console.log("Removendo");
        
        const response = await GamesService.removeDuplicate();
    }
    catch (erro) {
        
    }

}

const toggleVisibility = (setting) => {
    setting.visible = !setting.visible;
}


/**
    steam_id: {type: Number, required: false, unique: true},
    psn_id: {type: Number, required: false, unique: true},
    titulo: {type: String, required: true},
    statusCompra: {type: String, enum: ['Wishlist', 'Pre-venda', 'Adquirido'], default: 'Wishlist'},
    status: {type: String, enum: ['Backlog', 'Jogando', 'Finalizado', 'Cancelado'], default: 'Backlog'},
    urlImagem: {type: String},
    horasJogadas: { type: Number, default: 0},
    ultimaSessao: {type: Date, default: Date.now},
    obtidoPc: {type: Boolean},
    obtidoPs5: {type: Boolean},
    midiaFisica: {type: Boolean},
    midiaDigital: {type: Boolean},
*/
async function mapSteamToGameSchema(steamGames) {
    console.log("All games", steamGames);

    for (let g of steamGames) {
        let gameSchema = {
            steam_id: g.appid,
            titulo: g.name,
            statusCompra: 'Adquirido',
            urlImagem: `http://media.steampowered.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg`,
            horasJogadas: (g.playtime_forever / 60) ?? 0,
            plataformaAdquirida: ['PC'],
            midiaDigital: true,
        }

        try {
            //const response = await GamesService.create(gameSchema);
            listOfGames.value.push(gameSchema);
            console.log('Resposta do insert para:', g);
        } catch (error) {
            console.error('Erro ao inserir jogo:', g);
        }
    }
}

/**
    steam_id: {type: Number, required: false, unique: true},
    psn_id: {type: Number, required: false, unique: true},
    titulo: {type: String, required: true},
    statusCompra: {type: String, enum: ['Wishlist', 'Pre-venda', 'Adquirido'], default: 'Wishlist'},
    status: {type: String, enum: ['Backlog', 'Jogando', 'Finalizado', 'Cancelado'], default: 'Backlog'},
    urlImagem: {type: String},
    horasJogadas: { type: Number, default: 0},
    ultimaSessao: {type: Date, default: Date.now},
    obtidoPc: {type: Boolean},
    obtidoPs5: {type: Boolean},
    midiaFisica: {type: Boolean},
    midiaDigital: {type: Boolean},
*/
async function mapPsnToGameSchema(psnGames) {
    console.log("All PSN games: ", psnGames);

    for (let g of psnGames) {

        let gameSchema = {
            psn_id: g.titleId,
            titulo: g.name,
            statusCompra: 'Adquirido',
            urlImagem: g.image.url,
            horasJogadas: 0,
            plataformaAdquirida: [g.platform],
            midiaDigital: true,
        }

        try {
            //const response = await GamesService.create(gameSchema);
            listOfGames.value.push(gameSchema);
            console.log('Resposta do insert para:');
        } catch (error) {
            console.error('Erro ao inserir jogo:');
        }
    }
}

function addGameToList(game) {
    if (!gamesToSync.value.includes(game)) {
        gamesToSync.value.push(game);
    } else {
        gamesToSync.value = gamesToSync.value.filter(g => g !== game);
    }
}

async function createGames() {
    try {
        if (!gamesToSync.value)
            alert("Sem jogos para sincronizar");

        for (let game of gamesToSync.value)
        {
            const response = await GamesService.create(game);
            console.log('Jogo inserido com sucesso:', response.data);
        }
    } catch (error) {
        console.error('Erro ao inserir jogo:', error);
    }
}

function closeModal() {
    try {
        listOfGames.value = [];
        
        modal.value.isOpen = false;

    } catch (error) {
        alert("[closeModal] ", error);
    }
}

function openModalConfirmacao() {
    modalConfirmacao.value.isOpen = true;
}
onMounted(async () => {
    isLoading.value = true;

    await getAllSettings();

    isLoading.value = false;
})
</script>

<template>
    <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Sync account data</h2>

        <div class="flex flex-row space-x-4 mb-4">
            <div class="form-group">
                <button @click="syncSteam" class="flex items-center gap-2 bg-gray-100 dark:bg-[#252525] hover:bg-gray-200 dark:hover:bg-[#2d2d2d] border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md transition-all" :disabled="isLoading">Sync Steam Account
                    <span v-if="steamSynced" class="ml-2">✅</span>
                    <span v-else class="ml-2"><i class="bi bi-arrow-repeat"></i></span>
                </button>
            </div>

            <div class="form-group">
                <button @click="syncPsn" class="flex items-center gap-2 bg-gray-100 dark:bg-[#252525] hover:bg-gray-200 dark:hover:bg-[#2d2d2d] border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md transition-all" :disabled="isLoading">Sync Playstation Account
                    <span v-if="psnSynced" class="ml-2">✅</span>
                    <span v-else class="ml-2"><i class="bi bi-arrow-repeat"></i></span>
                </button>
            </div>

            <div class="form-group">
                <button @click="openModalConfirmacao" class="flex items-center gap-2 bg-gray-100 dark:bg-[#252525] hover:bg-gray-200 dark:hover:bg-[#2d2d2d] border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md transition-all">
                    Remover Duplicados
                </button>
            </div>
        </div>

        <MyModal :is-open="modal.isOpen" :title="modal.title" @close="closeModal">
            <slot>
                 <template v-if="listOfGames">
                    <div v-for="(game, index) in listOfGames" :key="index">
                        <input type="checkbox" :id="'game-' + index" :value="game.steam_id || game.psn_id" @change="addGameToList(game)"/>
                        <span class="font-medium">{{ game.titulo }}</span>
                    </div>
                 </template>
                <input type="checkbox" name="" id="" value="Valor"/>
            </slot>
            <template #footer>
                <button @click="modal.isOpen = false" class="bg-white text-blue px-4 py-2 rounded hover:bg-neutral-200">Fechar Modal</button>
                <button @click="createGames()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Gravar</button>
            </template>
        </MyModal>

        <hr class="my-4" />
        <h2 class="text-2xl font-bold mb-4">Settings</h2>

        <!-- SETTINGS -->
        <template v-for="(setting, index) in allSettings" :key="index">
            <div class="flex flex-col mb-4">
                <label :for="'setting-' + index" class="text-gray-500 dark:text-gray-400">{{ setting.key }}</label>
                <div class="relative flex items-center">
                    <input class="border rounded px-4 py-2 w-full" :id="'setting-' + index" :type="setting.visible ? 'text' : 'password'"
                        readonly="true" disabled :value="setting.value">

                    <button type="button" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer z-10 text-xl hover:opacity-70"
                        @click="toggleVisibility(setting)" title="Alternar Visibilidade">
                        <span v-if="setting.visible"><i class="bi bi-eye-slash"></i></span>
                        <span v-else><i class="bi bi-eye"></i></span>
                    </button>
                </div>
            </div>
        </template>
        <!-- SETTINGS -->   

        <MyModal title="Confirmar" 
                :is-open="modalConfirmacao.isOpen" 
                @confirm="removeDuplicates" 
                @close="modalConfirmacao.isOpen = false" key="modal-confirmacao-01">
            Deseja Excluir os duplicados?<br/> Não é possível desfazer essa ação
        </MyModal>
    </div>
</template>

<style scoped>
/* Removed old styles and replaced with Tailwind classes */
</style>