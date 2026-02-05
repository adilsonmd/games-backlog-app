<script setup>

import { ref, onMounted } from "vue";
import ComentarioService from "@/services/ComentarioService";

const comentario = ref({
    gameId: null,
    texto: '',
});
const comentarios = ref([]);

const props = defineProps(['gameId']);

const getComentarios = async () => {
    try {
        const response = await ComentarioService.getComentarios(props.gameId);
        console.log("Comentários buscados com sucesso: ", response);
        comentarios.value = response || [];
    } catch (error) {
        console.error("Erro ao buscar comentários: ", error);
    }
}

const addComment = async () => {
    if (comentario.value.texto.trim() === '') {
        return;
    }

    comentario.value.gameId = props.gameId;

    try {
        const response = await ComentarioService.create(comentario.value);
        console.log("Comentário adicionado com sucesso: ", response.data);

        // Adicionar o comentário à lista localmente
        comentarios.value.push(response.data);
    } catch (error) {
        console.error("Erro ao adicionar comentário: ", error);
    } finally {
        // Limpar o campo após adicionar
        comentario.value.texto = '';
    }
}

onMounted(async () => {
    await getComentarios();
});
</script>
<template>

    <div class="space-y-4">
        <h3 class="text-xl font-semibold text-gray-400">Comentários</h3>
        <div class="flex gap-3">
            <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-200 flex-shrink-0">
            </div>
            <input type="text" v-model="comentario.texto" placeholder="Adicionar comentário..."
                class="bg-transparent border-none outline-none text-sm text-gray-400 w-full placeholder:text-gray-700">
            <button class="button cursor-pointer" @click="addComment()"><i class="bi bi-plus"></i></button>
        </div>

        <div>
            <div v-for="comentario in comentarios" :key="comentario._id" class="mb-4">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-200 flex-shrink-0">
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-300">{{ comentario.texto }}</p>
                        <p class="text-xs text-gray-500">{{ new
                            Date(comentario.dataCriacao).toLocaleDateString() }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>