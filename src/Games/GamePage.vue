<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

import GamesService from '@/services/GamesService';
import SteamService from '@/services/SteamService';

import ComentaryComponent from "@/Components/ComentaryComponent.vue";
import GaleryComponent from '@/Components/GaleryComponent.vue';

const route = useRoute();

const game = ref(null);
const steamDetail = ref(null);

const getGameById = async (id) => {
    try {

        const response = await GamesService.getById(id);

        game.value = response;

        getSteamDetails(game.value?.steam_id ?? null);
    }
    catch (error) {
        alert(error);
    }

}

const getSteamDetails = async (id = null) => {
    try {
        if (!id) {
            return;
        }

        const response = await SteamService.getOwnedGameById(id);
        console.log(response);
        steamDetail.value = response;
    }
    catch (error) {
        alert(error);
    }
}

const handleImageAdded = (image) => {
    console.log("Adicionada a imagem", image);
}

onMounted(async () => {

    await getGameById(route.params.id);
})
</script>

<template>

    <div v-if="game" class="p-4">
        <h2 class="text-xl">Game - {{ game.titulo }}</h2>

        <section>

            <div class="border rounded px-2 py-1">
                <span v-if="game.namorada_flag"><i class="text-pink-500 bi bi-heart-fill"></i></span>
                <span v-if="game.favorito_flag"><i class="text-yellow-500 bi bi-star-fill"></i></span>
            </div>

            <div class="my-4 flex gap-2">
                <div>
                    <p>Horas jogadas: </p>
                    <p>Plataformas:</p>
                    <p>Midias:</p>

                    <p>Compra:</p>
                    <p>Status:</p>
                </div>
                <div>
                    <div class="block">
                        <p>{{ game.horasJogadas }}</p>
                    </div>
                    <div class="block">
                        <p>{{ game.plataformaAdquirida.join(',') || "Nenhuma" }}</p>
                    </div>
                    <div>
                        <span v-if="game.midiaFisica"><i class="bi bi-disk"></i></span>
                        <span v-else-if="game.midiaDigital"><i class="bi bi-cloudy"></i></span>
                        <span v-else><i class="bi bi-dash-circle text-red-100"></i></span>
                    </div>
                    <div>

                        <p>{{ game.statusCompra }}</p>
                    </div>

                    <div>
                        <p>{{ game.status }}</p>
                    </div>

                </div>

            </div>

        </section>

        <section id="gallery-section">
            <div>
                <GaleryComponent :game-id="game._id" @image-added="handleImageAdded"></GaleryComponent>
            </div>
        </section>
        <section id="comment-section ">
            <div class="p-4">
                <ComentaryComponent :game-id="game._id"></ComentaryComponent>
            </div>

        </section>
    </div>
</template>