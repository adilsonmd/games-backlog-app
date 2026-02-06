<script setup>
import PlayingComponent from '@/Components/PlayingComponent.vue';

const props = defineProps({
    game: {
        type: Object, required: true
    },
    refreshToken: {
        type: Number, required: true
    },
    playing: {
        type: Boolean, required: false,
        default: true,
    },
});

</script>
<template>
    <a :href="'/biblioteca/' + game._id"
        class="bg-[#1a1a1a] rounded-xl overflow-hidden border  transition-all group cursor-pointer"
        :class="props.playing && props.game?.isPlaying === true ? 'border-green-800 hover:border-green-500' : 'border-gray-800 hover:border-gray-500'">
        
        <div class="relative h-64">
            <img :src="props.game?.fotos?.find(x => x.isCover === true)?.url ?? ''" class="w-full h-full object-cover">
            <div v-if="props.game.plataformaAdquirida.length > 0"
                class="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
                {{ props.game.plataformaAdquirida.join(',') }}
            </div>
        </div>

        <div class="p-4" >
            <h3 class="font-bold text-gray-100 truncate">{{ props.game.titulo }}</h3>

            <div v-if="props.playing" class="flex items-center justify-between mt-3 text-gray-500">

                <PlayingComponent :game="props.game" :key="props.refreshToken"></PlayingComponent>

                <div class="text-[11px] tracking-tighter font-semibold text-gray-400">
                    Tempo de jogo: {{ props.game.horasJogadas }}h
                </div>
                <div class="text-[11px] uppercase tracking-tighter font-semibold text-gray-400">
                    JRPG
                </div>
            </div>
        </div>
    </a>
</template>