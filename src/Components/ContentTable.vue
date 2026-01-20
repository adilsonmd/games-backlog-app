<script setup>
import { ref } from "vue";

const emit = defineEmits(['edit-game']);
const props = defineProps({
    'tableDetails': {
        type: Object,
        default: () => ({})
    }
});

const handleEdit = (game) => {
    // Lógica para editar o jogo
    emit('edit-game', game);
};
</script>

<template>
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-sm">
                    <th v-for="(column, index) in props.tableDetails.columns" class="px-4 py-2 font-medium">{{
                        column.name }}</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                <template v-if="props.tableDetails.data === null || props.tableDetails.data.length == 0">
                    <tr>
                        <td colspan="4" class="px-4 py-3 text-center text-gray-500">
                            Nenhum jogo encontrado.
                        </td>
                    </tr>
                </template>

                <tr v-for="(game, index) in props.tableDetails.data" :key="index"
                    class="hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-colors">
                    <td class="px-4 py-3 font-medium">{{ game.titulo }}</td>
                    <td class="flex py-3 px-4 gap-1">
                        <span v-if="game.namorada_flag" class="text-pink-500"><i class="bi bi-heart-fill"></i></span>
                        <span v-if="game.favorito_flag" class="text-yellow-500"><i class="bi bi-star-fill"></i></span>
                        <span v-if="game.statusCompra === 'Wishlist'" class=""><i
                                class="bi bi-bag-heart-fill"></i></span>
                    </td>
                    <td class="px-4 py-3 text-gray-500">{{ game.horasJogadas }}</td>
                    <td class="px-4 py-3">
                        <div class="flex flex-row gap-2">
                            <template v-for="plataforma in game.plataformaAdquirida">

                                <span v-if="plataforma == 'PS4'">
                                    <i class="text-blue-400 bi bi-playstation"></i>
                                </span>
                                <span v-if="plataforma == 'PS5'">
                                    <i class="bi bi-playstation"></i>
                                </span>
                                <span v-if="plataforma == 'PC'">
                                    <i class="bi bi-steam"></i>
                                </span>
                                <span v-if="plataforma == 'SWITCH'">
                                    <i class="bi bi-nintendo-switch"></i>
                                </span>
                            </template>
                        </div>
                    </td>
                    <td class="flex gap-1 px-4 py-3">
                        <span v-show="game.midiaFisica">
                            <i class="bi bi-disc"></i>
                        </span>
                        <span v-show="game.midiaDigital">
                            <i class="bi bi-cloudy"></i>
                        </span>
                    </td>
                    <td class="px-4 py-3 text-gray-500">
                        <button class="cursor-pointer" @click="handleEdit(game)"><i class="bi bi-pencil"></i></button>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>

</template>