<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

import statusGameplay from "@/Helpers/StatusGameplayEnum";
import statusCompra from "@/Helpers/StatusCompraEnum";

import GamesService from '@/services/GamesService';

import ComentaryComponent from "@/Components/ComentaryComponent.vue";
import GaleryComponent from '@/Components/GaleryComponent.vue';
import PlayingComponent from '@/Components/PlayingComponent.vue';

const route = useRoute();

const game = ref(null);

const selectStatusOpen = ref(false);
const statusGameplaySelected = ref(null);


const handleStatusChange = async (status) => {
    try {
        game.value.status = status;

        const response = await GamesService.update(game.value._id, game.value);
    }
    finally {
        statusGameplaySelected.value = null;
        selectStatusOpen.value = false;
    }
}
const getGameById = async (id) => {
    try {
        const response = await GamesService.getById(id);

        game.value = response;
    }
    catch (error) {
        alert(error);
    }
}

const toggleSelectGameStatus = () => {
    selectStatusOpen.value = !selectStatusOpen.value;
}

const handleImageAdded = (image) => {
    console.log("Adicionada a imagem", image);
}

const obterLista = () => {
    const obj = Object.keys(statusGameplay);

    return obj;
}

const obterClassePill = (status) => {
    if (!status)
        return 'gray-pill';

    // Status gameplay
    let returnStatus = statusGameplay[status];
    if (returnStatus)
        return returnStatus;

    // Status compra
    let returnStatusCompra = statusCompra[status];
    if (returnStatusCompra)
        return returnStatusCompra;

    return 'gray-pill';
}

onMounted(async () => {
    await getGameById(route.params.id);
})
</script>

<template>

    <div v-if="game" class="p-4">
        <h2 class="text-3xl font-semibold">{{ game.titulo }}</h2>

        <section>

            <div class="flex flex-row">
                <div class="my-4 flex flex-col gap-4">

                    <div class="grid grid-cols-[150px_1fr] items-center group">
                        <div class="flex items-center gap-2 text-gray-500 text-sm">
                            <i class="bi bi-list-ul w-4"></i>
                            <span>Plataforma</span>
                        </div>
                        <div class="flex gap-2">
                            <span v-for="plat in game.plataformaAdquirida" :key="plat"
                                class="bg-[#2a2a2a] text-gray-300 px-2 py-0.5 rounded text-xs font-medium border border-gray-700">
                                {{ plat }}
                            </span>
                            <span v-if="!game.plataformaAdquirida?.length"
                                class="text-gray-600 italic text-sm">Empty</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-[150px_1fr] items-center">
                        <div class="flex items-center gap-2 text-gray-500 text-sm">
                            <i class="bi bi-disc w-4"></i>
                            <span>Mídias</span>
                        </div>
                        <template v-if="game.isMidiaFisica || game.isMidiaDigital">
                            <span class="text-gray-300 text-sm">{{ game.isMidiaFisica ? 'Fisica' : '' }}</span>
                            <span class="text-gray-300 text-sm">{{ game.isMidiaDigital ? 'Digital' : '' }}</span>
                        </template>
                        <span v-else class="text-gray-600 italic text-sm">Empty</span>

                    </div>

                    <div class="grid grid-cols-[150px_1fr] items-center">
                        <div class="flex items-center gap-2 text-gray-500 text-sm">
                            <i class="bi bi-hash w-4"></i>
                            <span>Horas Jogadas</span>
                        </div>
                        <span class="text-gray-300 text-sm">{{ game.horasJogadas || '0' }}</span>
                    </div>



                    <div class="grid grid-cols-[150px_1fr] items-center">
                        <div class="flex items-center gap-2 text-gray-500 text-sm">
                            <i class="bi bi-cart3 w-4"></i>
                            <span>Aquisição</span>
                        </div>
                        <div class="flex">
                            <span class="pill" :class="obterClassePill(game.statusCompra)">
                                <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                {{ game.statusCompra }}
                            </span>
                        </div>
                    </div>

                    <div class="grid grid-cols-[150px_1fr] items-center">
                        <div class="flex items-center gap-2 text-gray-500 text-sm">
                            <i class="bi bi-brightness-high w-4"></i>
                            <span>Conclusão</span>
                        </div>
                        <div class="flex">
                            <button @click="toggleSelectGameStatus()" class="pill cursor-pointer"
                                :class="obterClassePill(game.status)">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                                {{ game.status || 'Não iniciei' }}
                            </button>
                        </div>

                        <!--ALTERACAO AQUI: -->
                        <template v-if="selectStatusOpen">
                            <div class="flex items-center gap-2 p-4">

                                <select
                                    v-model="statusGameplaySelected"
                                    class="bg-zinc-900 text-zinc-200 border border-zinc-700/60 rounded-md px-3 py-1.5 text-sm outline-none focus:border-zinc-500 cursor-pointer">
                                    <option v-for="st in obterLista()" :value="st"
                                        class="bg-zinc-900 text-zinc-200 py-1">
                                        {{ st }}
                                    </option>
                                </select>

                                <button @click="handleStatusChange(statusGameplaySelected)" class="pill green-pill px-3 py-1.5 text-sm rounded-md cursor-pointer">
                                    Gravar
                                </button>

                            </div>
                        </template>
                        <!-- FIM DA ALTERACAO -->
                    </div>

                </div>
                <div class="my-4 flex flex-col gap-4">

                    <div class="grid grid-cols-[150px_1fr] items-center group">
                        <div class="flex items-center gap-2 text-gray-500 text-sm">
                            <i class="bi bi-flag w-4"></i>
                            <span>Flags</span>
                        </div>
                        <div class="flex gap-2">
                            <span class="text-pink-500" v-if="game.namorada_flag"><i
                                    class="bi bi-heart-fill"></i></span>
                            <span class="text-yellow-500" v-if="game.favorito_flag"><i
                                    class="bi bi-star-fill"></i></span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex">
                <PlayingComponent :game="game"></PlayingComponent>
            </div>
        </section>

        <section id="gallery-section">
            <div class="my-3">
                <GaleryComponent :game-id="game._id" @image-added="handleImageAdded"></GaleryComponent>
            </div>
        </section>
        <section id="comment-section ">
            <div class="my-3">
                <ComentaryComponent :game-id="game._id"></ComentaryComponent>
            </div>

        </section>
    </div>
</template>