<script setup>
import PsnService from '@/services/PsnService';
import SteamService from '@/services/SteamService';
import { onMounted, ref } from 'vue';

const props = defineProps({
    game: {
        type: Object,
        required: true
    }
});

const isLoadingGame = ref(false);

const getSteamPlayerSummary = async () => {
    try {
        const playerData = await SteamService.getPlayerSummary();
        let gameName = playerData.response.players.player[0]?.gameextrainfo || null;
        let gameId = playerData.response.players.player[0]?.steamid || null;

        if (gameName && gameId) {
            if(props.game.titulo === gameName || props.game.steam_id == gameId) {
                props.game.isPlaying = true;
            }
        }
    } catch (error) {
        console.error("Erro ao buscar dados do Steam: ", error);
        return null;
    }
};

const getPsnPlayerSummary = async () => {
    try {
        const playerData = await PsnService.getPlayerSummary();

        if (!playerData) {
            return;
        }

        // Checando se há dados no retorno;
        if (playerData.basicPresence.availability === "unavailable")
            return;

        let gameName = playerData.basicPresence?.gameTitleInfoList[0]?.titleName || null;
        let gameId = playerData.basicPresence?.gameTitleInfoList[0]?.npTitleId || null

        gameId = gameId.replace("_", "");
        if (props.game.titulo === gameName || props.game.psn_id == gameId) {
            props.game.isPlaying = true;
        }

    } catch (error) {
        console.error("Erro ao buscar dados do PSN: ", error);
        return null;
    }
};

onMounted(async () => {
    isLoadingGame.value = true;

    await getSteamPlayerSummary();

    await getPsnPlayerSummary();

    isLoadingGame.value = false;
});

</script>
<template>
    <template v-if="game">
        <div v-if="isLoadingGame" class="flex items-center gap-1.5">
            <i class="bi bi-three-dots text-gray-500"></i>
            <span class="text-[12px] text-gray-500">Loading</span>
        </div>
        <div v-else-if="game.isPlaying" class="flex items-center gap-1.5">
            <i class="bi bi-play text-green-600"></i>
            <span class="text-[12px] text-green-600">Jogando Agora</span>
        </div>
        <div v-else class="flex items-center gap-1.5">
            <i class="bi bi-pause text-gray-500"></i>
            <span class="text-[12px]">Em espera</span>
        </div>
    </template>
</template>
