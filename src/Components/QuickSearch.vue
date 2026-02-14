<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const searchAtiva = ref(false);

const handleKeyboard = (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'm') {
        event.preventDefault();

        searchAtiva.value = !searchAtiva.value;

        if (searchAtiva.value) {
            document.getElementById("quickSearchInput").focus();
        }
    }
}

onMounted(() => {

    addEventListener("keyup", (event) => handleKeyboard(event));
});

onUnmounted(() => {
    removeEventListener("keyup", (event) => handleKeyboard(event));
});

</script>
<template>

    <div v-show="searchAtiva" id="quick-search" class="grid place-content-center overlay" >

        <div class="p-4 search border rounded-xl border-gray-600">
            <div class="flex flex-col gap-1.5">
                <label class="text-[14px] uppercase tracking-wider text-gray-500 font-bold ml-1">Buscar</label>

                <input id="quickSearchInput" type="text" placeholder="Buscar.."
                    class="text-[14px] bg-[#252525] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600">
            </div>
        </div>
    </div>

</template>

<style scoped>
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.7);
    z-index: 1000;
}

.search {
    min-width: 500px;
    background-color: rgb(10,10,10);
}
</style>