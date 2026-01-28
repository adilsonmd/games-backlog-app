<script setup>
import { ref, onMounted, inject } from "vue";

const emit = defineEmits(['refresh']);

const columnsLayout = inject("columnsLayout");

const changePageLayout = (cols) => {
    if ([1, 2, 3, 4, 6].includes(cols)) {
        columnsLayout.value = `grid-cols-${cols}`;
    }
    return "grid-cols-3";
}

const refreshPage = () => {
    emit('refresh');
}

onMounted(() => {
    if (!columnsLayout.value) {
        columnsLayout.value = "grid-cols-3";
    }
});
</script>
<template>
    <div class="flex flex-row justify-between p-4">
        <div class="flex gap-1">
            <slot name="left"></slot>
            <button @click="changePageLayout(1)"
                class="button button-color">
                <i class="bi bi-view-stacked"></i>
            </button>
            <button @click="changePageLayout(2)"
                class="button button-color">
                <i class="bi bi-grid-fill"></i>
            </button>
            <button @click="changePageLayout(3)"
                class="button button-color">
                <i class="bi bi-grid-3x3-gap-fill"></i>
            </button>
        </div>

        <div class="flex gap-2">
            <button @click="refreshPage"
                class="button button-color">
                <i class="bi bi-arrow-clockwise"></i>
            </button>
            <slot name="right"></slot>
        </div>
    </div>
</template>