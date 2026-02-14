<script setup>
    const props = defineProps(['progress']);
</script>
<template>
    <div class="progress-container mt-2 mb-2">
        <div class="progress-bar" :style="`width: ${props.progress}%;`"></div>
    </div>
</template>
<style scoped>
.progress-container {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 25px;
    height: 10px;
    overflow: hidden;
    /* Garante que a barra não saia das bordas arredondadas */
}

.progress-bar {
    width: 0%; /* Mude esse valor para alterar o progresso */
    height: 100%;
    background-color: #2564d9;
    transition: width 0.5s ease-in-out;
}
</style>