<script setup>
import { ref } from "vue";
const props = defineProps(['query']);
const emit = defineEmits(['paginationChanged']);

const changePage = (direction) => {
    props.query.page += direction;

    emit('paginationChanged');
}

</script>
<template>
    <div v-if="props.query" class="d-flex justify-content-between border">
        <div class="page-limit m-1">
            <span class="m-1">Itens por página</span>
            <select id="page-limit" v-model="query.limit" class="m-1" @change="$emit('paginationChanged')">
                <option :value="24">24</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
            </select>
            <span>1 - {{ props.query.limit }} of {{ props.query.totalCount }} </span>
        </div>
        <div class="pagination m-1">
            <button @click="changePage(-1)" :disabled="props.query.page === 0"
                class="btn btn-light btn-sm border">Previous</button>
            <button @click="changePage(1)" :disabled="props.query.lastPage === true"
                class="btn btn-light btn-sm border">Next</button>
        </div>
    </div>


</template>