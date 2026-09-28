<script setup>

import { ref, onMounted } from "vue";
import ComentarioService from "@/services/ComentarioService";

const editing = ref({
    active: false,
    comentarioId: null
});

const comentario = ref({
    gameId: null,
    texto: '',
});

const comentarios = ref([]);

const props = defineProps(['gameId']);

const getComentarios = async () => {
    try {
        const response = await ComentarioService.getComentarios(props.gameId);
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
        // Adicionar o comentário à lista localmente
        comentarios.value.push(response.data);
    } catch (error) {
        console.error("Erro ao adicionar comentário: ", error);
    } finally {
        // Limpar o campo após adicionar
        comentario.value.texto = '';
    }
}

const editComment = async () => {
    try {
        
        const response = await ComentarioService.update(comentario._id, comentario);
        

    } catch (erro) {
        alert(erro);
    }
};

const toggleEditComment = (comentario) => {
    if (editing.value.active) {
        console.log("caiu aqui?")
        editing.value.comentarioId = null;
        editing.value.active = false;
        return;
    }

    editing.value.active = true;
    editing.value.comentarioId = comentario._id;
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

            <!-- TODO comentário como textarea-->
            <input type="text" v-model="comentario.texto" placeholder="Adicionar comentário..."
                class="bg-transparent border-none outline-none text-sm text-gray-400 w-full placeholder:text-gray-700">

            <button class="button button-color cursor-pointer" @click="addComment()">
                <i class="bi bi-plus"></i>
            </button>
        </div>

        <div>
            <!-- TODO botão de editar comentário. -->
            <div v-for="comentario in comentarios" :key="comentario._id" class="mb-4">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-200 flex-shrink-0">
                    </div>
                    <div>
                        <template v-if="editing.active && editing.comentarioId == comentario._id" >
                            <textarea cols="100">{{ comentario.texto }}</textarea>
                            <button class="button button-color cursor-pointer mx-2" @click="editComment">
                                <i class="bi bi-save"></i>
                            </button>
                        </template>
                        <template v-else> 

                            <p class="text-sm font-semibold text-gray-300">{{ comentario.texto }}</p>
                            <p class="text-xs text-gray-500">{{ new
                            Date(comentario.dataCriacao).toLocaleDateString() }}</p>
                            <button class="button button-color cursor-pointer" @click="toggleEditComment(comentario)"><i class="bi bi-pencil"></i></button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>