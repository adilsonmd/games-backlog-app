<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

import GamesService from '@/services/GamesService';

import ComentaryComponent from "@/Components/ComentaryComponent.vue";
import GaleryComponent from '@/Components/GaleryComponent.vue';
import PlayingComponent from '@/Components/PlayingComponent.vue';

const route = useRoute();

const game = ref(null);

const getGameById = async (id) => {
    try {
        const response = await GamesService.getById(id);

        game.value = response;
    }
    catch (error) {
        alert(error);
    }

}

const handleImageAdded = (image) => {
    console.log("Adicionada a imagem", image);
}
const obterClassePill = (status) => {
    if (!status)
        return 'gray-pill';

    if (status === "Backlog")
        return 'gray-pill'
    else if (status === "Jogando")
        return 'blue-pill';
    else if (status === "Finalizado")
        return 'green-pill';
    else if (status === "Pausado")
        return 'gray-pill';
    else if (status == 'Cancelado')
        return 'red-pill'
    else if (status == 'Wishlist')
        return 'gray-pill'
    else if (status == 'Pré-venda')
        return 'blue-pill'
    else if (status == 'Adquirido')
        return 'green-pill'
    return 'gray-pill';
}
onMounted(async () => {

    await getGameById(route.params.id);
})
</script>

<template>

    <div v-if="game" class="p-4">
        <h2 class="text-xl font-semibold text-gray-400">Game - {{ game.titulo }}</h2>

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
                            <span
                                class="pill" :class="obterClassePill(game.statusCompra)">
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
                            <span
                                class="pill" :class="obterClassePill(game.status)">
                                <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                                {{ game.status || 'Não iniciei' }}
                            </span>
                        </div>
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