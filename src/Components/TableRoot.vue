<script setup>
import { ref } from "vue";
import TableHeader from "./TableHeader.vue";

const emit = defineEmits(['edit-game', 'sort-changed']);
const props = defineProps({
    'data': {
        type: Array,
        default: () => ([])
    },
    'table': {
        type:  Array,
        default: () => ([])
    }
});

const handleEdit = (game) => {
    // Lógica para editar o jogo
    emit('edit-game', game);
};

const handleSortChanged = () => {
    emit('sort-changed');
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
</script>

<template>
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">

            <TableHeader :table="table" @sort-changed="handleSortChanged"></TableHeader>
            
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                <template v-if="props.data === null || props.data.length == 0">
                    <tr>
                        <td colspan="4" class="px-4 py-3 text-center text-gray-500">
                            Nenhum jogo encontrado.
                        </td>
                    </tr>
                </template>

                <tr v-for="(game, index) in props.data" :key="index"
                    class="hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-colors">
                    <td class="px-4 py-3 font-medium">
                        <router-link :to="'/biblioteca/' + game._id">{{ game.titulo }}</router-link>

                    </td>
           <!--          <td class="flex py-3 px-4 gap-1">
                        <span v-if="game.namorada_flag" class="text-pink-500"><i class="bi bi-heart-fill"></i></span>
                        <span v-if="game.favorito_flag" class="text-yellow-500"><i class="bi bi-star-fill"></i></span>
                        <span v-if="game.statusCompra === 'Wishlist'" class=""><i
                                class="bi bi-bag-heart-fill"></i></span>
                    </td> -->
                    <td class="px-4 py-3">
                        <span
                                class="pill blue-pill" :class="obterClassePill(game.status)">
                                <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                {{ game.status }}
                            </span>
                    </td>

                    <td class="px-4 py-3">
                        <span
                                class="pill" :class="obterClassePill(game.statusCompra)">
                                <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                {{ game.statusCompra }}
                            </span>
                    </td>

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

                    <td class="px-4 py-3 text-gray-500">
                        <button class="cursor-pointer" @click="handleEdit(game)"><i class="bi bi-pencil"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>