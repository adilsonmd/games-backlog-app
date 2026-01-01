<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

import PsnService from "@/services/PsnService";
import SteamService from "@/services/SteamService";
import GamesService from "@/services/GamesService";
import MyModal from "@/Components/MyModal.vue";

const allSettings = ref([]);
const steamSynced = ref(false);
const psnSynced = ref(false);
const isLoading = ref(false);
const baseURL = 'http://localhost:3000/api';

const query = ref({
    limit: 50,
    page: 0,
    totalCount: 0,
    lastPage: false,
});

const modal = ref({
    isOpen: false,
    title: 'List of games',

})

const getAllSettings = async () => {
    const response = await axios.get(baseURL + "/setting/")

    allSettings.value = response.data.map(item => ({
        ...item,
        visible: false
    }));
}

const syncSteam = async () => {
    const { games } = await SteamService.getOwnedGames(query.value);
    await mapSteamToGameSchema(games);
    steamSynced.value = true;
}

const syncPsn = async () => {
    const { games } = await PsnService.getOwnedGames(query.value);
    await mapPsnToGameSchema(games);
    psnSynced.value = true;
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
            horasJogadas: g.playtime_forever,
            plataformaAdquirida: ['PC'],
            midiaDigital: true,
        }

        try {
            const response = await GamesService.create(gameSchema);
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
            const response = await GamesService.create(gameSchema);
            console.log('Resposta do insert para:');
        } catch (error) {
            console.error('Erro ao inserir jogo:');
        }
    }
}


onMounted(async () => {
    isLoading.value = true;

    await getAllSettings();

    isLoading.value = false;
})
</script>

<template>
    <div class="container">
        <h2>Sync account data</h2>
        <div class="d-flex flex-row">

            <div class="form-group">
                <button @click="syncSteam" class="btn btn-light" :disabled="isLoading">Sync Steam Account
                    <span v-if="steamSynced" class="ms-1">✅</span>
                    <span v-else class="ms-1">🔃</span>
                </button>
            </div>

            <div class="form-group">
                <button @click="syncPsn" class="btn btn-light" :disabled="isLoading">Sync Playstation Account
                    <span v-if="psnSynced" class="ms-1">✅</span>
                    <span v-else class="ms-1">🔃</span>
                </button>
            </div>
        </div>

        <button @click="modal.isOpen = !modal.isOpen">Toggle modal</button>

        <MyModal :is-open="modal.isOpen" :title="modal.title" @close="modal.isOpen = false"></MyModal>

        <hr />
        <h2>Settings</h2>

        <template v-for="(setting, index) in allSettings" :key="index">
            <div class="form-floating mb-1 input-container">
                <input class="form-control" :id="'setting-' + index" :type="setting.visible ? 'text' : 'password'"
                    readonly="true" disabled :value="setting.value">
                <label :for="'setting-' + index">{{ setting.key }}</label>

                <button type="button" class="btn-toggle" @click="toggleVisibility(setting)"
                    title="Alternar Visibilidade">
                    <span v-if="setting.visible">🔓</span>
                    <span v-else>🔒</span>
                </button>
            </div>
        </template>
    </div>
</template>
<style scoped>
.input-container {
    position: relative;
    display: flex;
    align-items: center;
}

.btn-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 10;
    /* Garante que o botão fique acima do input */
    padding: 5px;
    font-size: 1.2rem;
    transition: opacity 0.2s;
}

.btn-toggle:hover {
    opacity: 0.7;
}

/* Ajuste para o padding do Bootstrap não deixar o texto bater no cadeado */
.pe-5 {
    padding-right: 3.5rem !important;
}
</style>