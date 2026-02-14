<script setup>

import { ref, onMounted } from "vue";
import MyModal from "@/Components/MyModal.vue";
import ProgressBar from '@/Components/ProgressBar.vue';
import ColecaoService from "@/services/ColecaoService";

const modal = ref({
    isOpen:false,
});

const newCollection = ref({
    colecaoId: '',
    nome: '',
    games: [],
});
const collections = ref([]);

const toggle = (item) => {
    item.isShown = !item.isShown;
}

const openCreate = () => {
    modal.value.isOpen = true;
}

const handleClose = () => {
    modal.value.isOpen = false;
}

const createCollection = async () => {
    await ColecaoService.create(newCollection.value);
}

onMounted(async () => {
    collections.value = await ColecaoService.getAll();
})
</script>
<template>
    <div class="p-4">
        
        <!--  TODO fazer uma página de controle de séries de jogos.  -->

        <!-- Irá ser por exemplo: "Serie Final Fantasy" e dentro poderei adicionar os jogos já cadastrados a essa lista -->
        <!-- A ideia é também ter barra de progresso de jogos finalizados/adquiridos -->
        <!-- Com isso posso ter minhas séries favoritas com grande destaque. -->
        <!-- Talvez colocar na página home as séries -->
        <MyModal :is-open="modal.isOpen" :title="modal.title" @close="handleClose()" @confirm="createCollection">

            <div class="flex flex-col gap-1.5">
                        <label class="text-[11px] uppercase tracking-wider text-gray-500 font-bold ml-1">Titulo</label>
                        <input v-model="newCollection.nome" type="text" placeholder="Coleção x"
                            class="bg-[#252525] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600">
                    </div>
        </MyModal>

        <div class="flex items-center justify-between mb-4">

            <h2 class="text-2xl font-bold mb-4">Coleções</h2>
            <button @click="openCreate()"
                class="flex items-center gap-2 bg-[#252525] hover:bg-[#323232] text-gray-300 px-3 py-1.5 rounded border border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-medium">
                <i class="bi bi-plus"></i>Adicionar Coleção
            </button>
        </div>

        <template v-for="(cc, index) in collections">
            <div class="border border-gray-500 rounded-xl  p-4">
                <header class="flex justify-between">
                    <div class="flex gap-2 text-xl">
                        <h3 class="font-bold">{{ cc.nome }}</h3>
                        <!-- <div>
                            <span class="text-gray-400">{{ `${cc.games.length}/${cc.total}` }}</span>
                        </div> -->
                    </div>
                    <div>
                        <button class="button cursor-pointer" @click="toggle(cc)">
                            <i class="bi" :class="cc.isShown ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                        </button>
                    </div>
                </header>

                <section v-show="cc.isShown">
                    <ProgressBar :progress="cc.progresso ?? 0"></ProgressBar>
                    <div>
                        <template v-for="game in cc.games">
                            <div>{{ game.titulo }} - <span class="text-gray-400">{{ game.status }}</span></div>
                        </template>
                    </div>
                </section>
            </div>
        </template>
    </div>
</template>
