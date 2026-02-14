<script setup>
import { ref, onMounted } from "vue";
import ProgressBar from '@/Components/ProgressBar.vue';

const progress = ref(0);
const collections = ref([
    {
        collectionId: "283718231",
        name: "Final Fantasy",
        total: 16,
        isShown: false,
        games: [
            "Final Fantasy XIII",
            "Final Fantasy VII",
            "Final Fantasy VII Remake",
            "Final Fantasy VII Rebirth",
            "Final Fantasy XIV",
            "Final Fantasy XVI"
        ]
    },
    {
        collectionId: "283718231",
        name: "Persona",
        total: 4,
        isShown: false,
        games: [
            "Persona 4 Golden",
            "Persona 3 Reload",
            "Persona 5 Royal",
        ]
    }
]);

const move = (direction) => {
    console.log("movendo na direcao", direction);
    if (direction === -1 && progress.value - 10 > 0) {
        console.log("condição sub");
        progress.value -= 10;
    }

    else if (direction === 1 && progress.value < 100) {
        progress.value += 10;
        console.log("condição add");
    }
};

const toggle = (item) => {
    item.isShown = !item.isShown;
}

</script>
<template>

    <div class="p-4">

        <!--  TODO fazer uma página de controle de séries de jogos.  -->

        <!-- Irá ser por exemplo: "Serie Final Fantasy" e dentro poderei adicionar os jogos já cadastrados a essa lista -->
        <!-- A ideia é também ter barra de progresso de jogos finalizados/adquiridos -->
        <!-- Com isso posso ter minhas séries favoritas com grande destaque. -->
        <!-- Talvez colocar na página home as séries -->
        <h1>Coleções</h1>

        <template v-for="(cc, index) in collections">
            <div class="border border-gray-500 rounded-xl  p-4">
                <header class="flex justify-between">
                    <div class="flex gap-2 text-xl">
                        <h3 class="font-bold">{{ cc.name }}</h3>
                        <div>
                            <span class="text-gray-400">{{ `${cc.games.length}/${cc.total}` }}</span>
                        </div>
                    </div>
                    <div>
                        <button class="button cursor-pointer" @click="toggle(cc)">
                            <i class="bi" :class="cc.isShown ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                        </button>
                    </div>
                </header>

                <section v-show="cc.isShown">
                    <ProgressBar :progress="progress"></ProgressBar>

                    <button class="button button-color cursor-pointer" @click="move(-1)">-</button>
                    <button class="button button-color cursor-pointer" @click="move(1)">+</button>

                    <div>
                        <template v-for="game in cc.games">
                            <div>{{ game }}</div>
                        </template>
                    </div>
                </section>
            </div>
        </template>
    </div>
</template>
