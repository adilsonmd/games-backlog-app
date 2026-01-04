<script setup>
import { ref, onMounted } from 'vue';
import SteamService from '@/services/SteamService';
import PsnService from '@/services/PsnService';

const stats = ref([
    { label: 'Total de Jogos', value: 0, icon: 'bi-controller', color: 'text-blue-500' },
    { label: 'Na Wishlist', value: 0, icon: 'bi-star', color: 'text-yellow-500' },
    { label: 'Concluídos', value: 0, icon: 'bi-check-circle', color: 'text-green-500' },
]);

const recentGames = ref([]);

const getSteamPlayerSummary = async () => {
    try {
        const playerData = await SteamService.getPlayerSummary();
        let gameName = playerData.response.players.player[0]?.gameextrainfo || null;
        if (gameName) {
            if (!recentGames.value.includes(gameName))
                recentGames.value.push(gameName);
        }
    } catch (error) {
        console.error("Erro ao buscar dados do Steam: ", error);
        return null;
    }
};

const getPsnPlayerSummary = async () => {
    try {
        const playerData = await PsnService.getPlayerSummary();
        let gameName = playerData.basicPresence?.gameTitleInfoList[0]?.titleName || null;
        if (gameName) {
            if (!recentGames.value.includes(gameName))
                recentGames.value.push(gameName);
        }
    } catch (error) {
        console.error("Erro ao buscar dados do PSN: ", error);
        return null;
    }
};

onMounted(async () => {
    // Aqui você chamaria sua API para preencher os dados
    // const response = await axios.get('/api/dashboard/summary');
    await getSteamPlayerSummary();
    await getPsnPlayerSummary();
});
</script>

<template>
    <div class="p-8 max-w-7xl mx-auto">
        <header class="mb-10">
            <h1 class="text-4xl font-bold text-white tracking-tight">Bom dia, Jogador! 🎮</h1>
            <p class="text-gray-400 mt-2">Aqui está o resumo da sua jornada gamer.</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
            <div v-for="stat in stats" :key="stat.label"
                class="bg-[#1a1a1a] border border-gray-800 p-6 rounded-2xl hover:border-gray-700 transition-all shadow-sm">
                <div class="flex items-center gap-4">
                    <div :class="[stat.color, 'text-2xl']">
                        <i :class="['bi', stat.icon]"></i>
                    </div>
                    <div>
                        <p class="text-xs font-bold text-gray-500 uppercase tracking-widest">{{ stat.label }}</p>
                        <p class="text-2xl font-bold text-gray-100">{{ stat.value }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section class="lg:col-span-2">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-bold text-white flex items-center gap-2">
                        <i class="bi bi-play-fill text-blue-500"></i> Jogando Agora
                    </h2>
                    <button @click="getSteamPlayerSummary"><i class="bi bi-arrow-clockwise"></i></button>
                </div>

                <div
                    class="group relative min-h-[120px] p-5 border-2 border-dashed border-[#1e2329] bg-[#0d1117]/30 rounded-2xl transition-all hover:border-gray-700 hover:bg-[#0d1117]/60">
                    <div v-if="recentGames.length === 0"
                        class="flex flex-col items-center justify-center h-full text-gray-600">
                        <i
                            class="bi bi-plus-circle text-2xl mb-2 opacity-50 group-hover:scale-110 transition-transform"></i>
                        <p class="text-sm font-medium">Clique para adicionar o que está jogando</p>
                    </div>

                    <div v-else class="flex flex-col gap-3">
                        <div v-for="game in recentGames" :key="game"
                            class="flex items-center gap-3 group/item cursor-pointer">
                            <div
                                class="w-1 h-5 bg-green-600 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity">
                            </div>

                            <div class="flex flex-col">
                                <span
                                    class="text-base font-semibold text-gray-100 group-hover/item:text-neutral-300 transition-colors">
                                    {{ game }}
                                </span>
                                <span class="text-[10px] text-gray-500 font-mono uppercase tracking-tighter">Iniciado em
                                    04/01/2026</span>
                            </div>

                           
                        </div>
                    </div>

                </div>
            </section>

            <section>
                <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <i class="bi bi-lightning-charge-fill text-yellow-500"></i> Wishlist Recente
                </h2>
                <div class="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-4 space-y-4">
                    <div v-for="i in 3" :key="i"
                        class="flex items-center gap-3 p-2 hover:bg-[#252525] rounded-xl transition-colors cursor-pointer">
                        <div class="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                        </div>
                        <div class="flex-grow">
                            <p class="text-sm font-semibold text-gray-200">Título do Jogo</p>
                            <p class="text-xs text-gray-500">Adicionado há 2 dias</p>
                        </div>
                        <i class="bi bi-chevron-right text-gray-700"></i>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>