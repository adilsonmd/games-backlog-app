<script setup>
import { onMounted, ref } from "vue";

const props = defineProps(
    {
        /*
        table: [
            { field: 'titulo', fieldName: 'Titulo', sort: true, direction: 'asc' },
        ]
        */
        table: {
            type: Array,
            required: true,
        }
    });

const emit = defineEmits(['sort-changed']);

/* { index: 1, field: 'titulo' } */
const activeSort = ref({ index: 0, field: 'titulo' });

const changeFilterDirection = (col) => {
    try {

        if (col.field === activeSort.value.field) {

            let direction = props.table[activeSort.value.index].direction == 'asc' ? 'desc' : 'asc';

            props.table[activeSort.value.index].direction = direction;
        }
        else {
            // Encontra o filtro atual
            props.table[activeSort.value.index].sort = false;
            props.table[activeSort.value.index].direction = 'asc';

            let idx = props.table.findIndex(x => x.field == col.field);
            if (idx !== -1) {
                props.table[idx].sort = true;
                props.table[idx].direction = 'asc';

                activeSort.value = { index: idx, field: props.table[idx].field };
            }
        }
    }
    catch (error) { }
    finally {
        emit('sort-changed');
    }

}

onMounted(() => {

})
</script>
<template>
    <thead v-if="props.table">
        <tr class="border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-sm">
            <th class=" px-4 py-2 font-medium" v-for="col in props.table">

                <template v-if="col.isAction">
                    <div>{{ col.fieldName }}</div>
                </template>
                <template v-else>
                    <div class="flex cursor-pointer" @click="changeFilterDirection(col)">
                        <div>
                            {{ col.fieldName }}
                        </div>
                        <div v-if="!col.isAction">
                            <span v-if="col.sort == true && col.direction == 'asc'">
                                <i class="bi bi-arrow-down-short"></i>
                            </span>

                            <span v-else-if="col.sort == true && col.direction == 'desc'">
                                <i class="bi bi-arrow-up-short"></i>
                            </span>
                        </div>
                    </div>
                </template>

            </th>
        </tr>
    </thead>
</template>

<style></style>