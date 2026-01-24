<script setup>
import { onMounted, onUnmounted, ref } from "vue";

import ImageService from '@/services/ImageService';

const props = defineProps(['gameId']);
const emit = defineEmits('image-added');

const image = ref({
    gameId: '',
    url: '',
    isCover: false,
})

const images = ref([]);

const getImages = async () => {
    try {
        const response = await ImageService.getGameImages(props.gameId);

        if (!response)
        {
            console.log("Imagens não encontradas");
            return;
        }

        images.value = response;
        console.log("Imagens: ", images.value);
    } catch (error) {
        alert(error);
    }
}

const addImage = async () => {
    if (image.value.url.trim() === '') {
        return;
    }

    try {
        image.value.gameId = props.gameId;

        if (images.value.length || 0 == 0) {
            image.value.isCover = true;
        } else {
            image.value.isCover = false;
        }

        const response = await ImageService.create(image.value);

        images.value.push(response.data);

        emit('image-added', {...image.value});
    } catch (error) {
        console.error("Erro ao adicionar imagem: ", error);
    } finally {
        //Limpar o campo após adicionar
        clearImageObject();
    }
}

const removeImage = async (foto) => {
    try {
        const response = await ImageService.delete(foto._id);

        // Remover a imagem da lista localmente
        const index = images.value.findIndex(f => f._id === foto._id);
        if (index !== -1) {
            images.value.splice(index, 1);
        }
    } catch (error) {
        console.error("Erro ao remover imagem: ", error);
    }
}

const clearImageObject = () => {
    image.value.gameId;
    image.value.url = '';
    image.value.isCover = false;
}

onMounted(async () => {
    await getImages();
});

onUnmounted(() => {
    clearImageObject();
});
</script>

<template>
    <div class="space-y-4">
        <h3 class="text-sm font-semibold text-gray-400">Galeria</h3>
        <div class="flex gap-3">
            <!-- <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-200 flex-shrink-0">
                    </div> -->
            <input type="text" v-model="image.url" placeholder="Add images to your gallery +"
                class="bg-transparent border-none outline-none text-sm text-gray-400 w-full placeholder:text-gray-700">
            <button class="px-1 border rounded cursor-pointer" @click="addImage()"><i class="bi bi-plus"></i></button>
        </div>

        <template v-for="foto in images">

            <div
                class="group relative aspect-video rounded-lg overflow-hidden border border-gray-800 bg-[#1e1e1e] cursor-pointer">
                <img :src="foto.url" class="w-full h-full object-cover transition-transform group-hover:scale-105" />

                <button @click="removeImage(foto)"
                    class="absolute top-2 right-2 p-1 bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="bi bi-trash text-red-400"></i>
                </button>
            </div>
        </template>
    </div>
</template>