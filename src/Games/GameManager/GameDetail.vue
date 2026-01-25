<script setup>
import { inject } from 'vue';
import MyModal from "@/Components/MyModal.vue";

import ComentaryComponent from '@/Components/ComentaryComponent.vue';
import GaleryComponent from '@/Components/GaleryComponent.vue';

const emit = defineEmits(['close', 'image-added']);

const game = inject('game');
const isOpen = inject('isOpen');

const handleImageAdded = (image) => {
    emit('image-added', image);
};

const handleClose = () => {
    emit('close');
};

const handleConfirm = () => {
    emit('close');
}
</script>

<template>
    <MyModal :is-open="isOpen" @close="handleClose" @confirm="handleConfirm" size="large">
        <template #header>
            <div class="flex flex-col gap-1 mt-4">
                <h1 class="text-5xl font-bold text-gray-100 tracking-tight">
                    {{ game?.titulo }}
                </h1>
            </div>
        </template>

        <div v-if="game" class="flex flex-col gap-6 mt-4">
            <div class="flex flex-col gap-4">

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
                        <span v-if="!game.plataformaAdquirida?.length" class="text-gray-600 italic text-sm">Empty</span>
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
                            class="bg-blue-900/30 text-blue-400 px-3 py-0.5 rounded-full text-xs flex items-center gap-1.5 border border-blue-800/50">
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
                            class="bg-[#373737] text-gray-300 px-3 py-0.5 rounded-full text-xs flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                            {{ game.status || 'Não iniciei' }}
                        </span>
                    </div>
                </div>

            </div>

            <hr class="border-gray-800 my-4">


            <GaleryComponent :game-id="game._id" @image-added="handleImageAdded"></GaleryComponent>


            <hr class="border-gray-800 my-4">

            <ComentaryComponent :game-id="game._id"></ComentaryComponent>
        </div>
    </MyModal>
</template>