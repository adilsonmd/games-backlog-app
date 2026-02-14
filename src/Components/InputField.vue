<script setup>
    import {ref} from "vue";

    const props = defineProps({
        field: { type: Object, required: true}
    });

    /*
    field: {   
        label: '',
        placeholder: '',
        value: '',
        type: 'text',
        options: null,
    }
    */
</script>
<template>
    <div v-if="props.field.type === 'text'" class="flex flex-col gap-1.5">
        <label class="text-[11px] uppercase tracking-wider text-gray-500 font-bold ml-1">{{ props.field.label }}</label>
        <!-- v-model="newGame.psn_id" -->
        <input 
        type="text" :placeholder="props.field.placeholder"
        class="bg-[#252525] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600">
    </div>

</template>