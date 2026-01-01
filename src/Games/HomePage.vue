<script setup>
import axios from 'axios';
import { ref, onMounted } from "vue";

const isLoading = ref(true);
const isPlaying = ref(false);

const profile = ref({
    profileName: "",
    gameTitle: "",
    gameId: "",
});


const getUserData = async () => {
    try {

        const response = await axios.get("http://localhost:3000/api/steam/player");

        let playerObj = response.data.response.players.player[0];

        if (playerObj) {

            profile.value.profileName = playerObj.personaname;
            profile.value.gameId = playerObj.gameid;
            profile.value.gameTitle = playerObj.gameextrainfo;
            if (profile.value.gameTitle)
                isPlaying.value = true;

        }
        else {
            isPlaying.value = false;
        }

    }
    catch (error) {
        alert(error);
    }
    finally {
        isLoading.value = false;
    }
    /*
    "gameextrainfo": "FINAL FANTASY VII",
    "gameid": "39140",
     */
}

onMounted(() => {
    getUserData();
})
</script>

<template>

    <div>
        <h1>Home Page</h1>
        <button @click="getUserData" class="btn btn-sm btn-light">Refresh</button>
        <p v-if="isLoading">Verificando...</p>


        <div class="profile-card card p-3" v-if="isPlaying">
            <div>
                {{ profile.profileName }}
            </div>
            <div>
                <span class="text-success text-bold">Jogando {{ profile.gameTitle }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profile-card {
    max-width: 500px;
}
</style>