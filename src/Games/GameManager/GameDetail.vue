<script setup>
import { inject, ref, watch } from 'vue';
import MyModal from "@/Components/MyModal.vue";
import ImageService from '@/services/ImageService';
import ComentarioService from '@/services/ComentarioService';

const emit = defineEmits(['close']);

const game = inject('game');
const isOpen = inject('isOpen');

const image = ref({
    gameId: game?.value?._id || '',
    url: '',
    isCover: false,
})

const comentarios = ref([]);
const comentario = ref({
    gameId: game?.value?._id || '',
    texto: '',
});

const handleClose = () => {
    comentarios.value = [];

    comentario.value.texto = '';
    
    image.value.url = '';
    image.value.isCover = false;

    emit('close');
};

const addComment = async () => {
    if (comentario.value.texto.trim() === '') {
        return;
    }

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

const getComentarios = async () => {
    try {
        const response = await ComentarioService.getComentarios(game.value._id);
        console.log("Comentários buscados com sucesso: ", response);
        comentarios.value = response || [];
    } catch (error) {
        console.error("Erro ao buscar comentários: ", error);
    }
}

const addImage = async () => {
    if (image.value.url.trim() === '') {
        return;
    }

    try {

        if (game.value.fotos?.length || 0 == 0) {
            image.value.isCover = true;
        } else {
            image.value.isCover = false;
        }

        const response = await ImageService.create(image.value);

        game.value.fotos.push(response.data);
    } catch (error) {
        console.error("Erro ao adicionar imagem: ", error);
    } finally {
        //Limpar o campo após adicionar
        image.value.url = '';
        image.value.isCover = false;
    }
}

const removeImage = async (foto) => {
    try {
        const response = await ImageService.delete(foto._id);

        // Remover a imagem da lista localmente
        const index = game.value.fotos.findIndex(f => f._id === foto._id);
        if (index !== -1) {
            game.value.fotos.splice(index, 1);
        }
    } catch (error) {
        console.error("Erro ao remover imagem: ", error);
    }
}

watch(() => game.value, async (newGame) => {
    if (newGame) {
        await getComentarios();
    }
}, { immediate: true });
</script>

<template>
    <MyModal :is-open="isOpen" @close="handleClose()" size="large">
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


            <div class="space-y-4">
                <h3 class="text-sm font-semibold text-gray-400">Galeria</h3>
                <div class="flex gap-3">
                    <!-- <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-200 flex-shrink-0">
                    </div> -->
                    <input type="text" v-model="image.url" placeholder="Add images to your gallery +"
                        class="bg-transparent border-none outline-none text-sm text-gray-400 w-full placeholder:text-gray-700">
                    <button class="p-2" @click="addImage()"><i class="bi bi-plus"></i></button>
                </div>

                <template v-for="foto in game.fotos">

                    <div class="group relative aspect-video rounded-lg overflow-hidden border border-gray-800 bg-[#1e1e1e] cursor-pointer">
                        <img :src="foto.url" class="w-full h-full object-cover transition-transform group-hover:scale-105" />

                        <button @click="removeImage(foto)" class="absolute top-2 right-2 p-1 bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            <i class="bi bi-trash text-red-400"></i>
                        </button>
                    </div>
                </template>
            </div>


            <hr class="border-gray-800 my-4">

            <div class="space-y-4">
                <h3 class="text-sm font-semibold text-gray-400">Comentários</h3>
                <div class="flex gap-3">
                    <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-200 flex-shrink-0">
                    </div>
                    <input type="text" v-model="comentario.texto" placeholder="Add a comment..."
                        class="bg-transparent border-none outline-none text-sm text-gray-400 w-full placeholder:text-gray-700">
                    <button class="p-2" @click="addComment()"><i class="bi bi-plus"></i></button>
                </div>

                <div>
                    <div v-for="comentario in comentarios" :key="comentario._id" class="mb-4">
                        <div class="flex items-center gap-3 mb-2">
                            <div
                                class="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-200 flex-shrink-0">
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
        </div>
    </MyModal>
</template>