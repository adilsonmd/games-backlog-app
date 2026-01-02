<script setup>
import { ref } from "vue";
const props = defineProps(['query']);
const emit = defineEmits(['paginationChanged', 'searchChanged']);

const searchQuery = ref('');

const changePage = (direction) => {
    props.query.page += direction;
    emit('paginationChanged', props.query.page);
}

const showSteam =() => {
    if (searchQuery.value.includes('steam:')) {
        searchQuery.value = searchQuery.value.replace('steam:', '');
    } else {
        searchQuery.value = 'steam:' + searchQuery.value;
    }
}

const showPsn =() => {
    if (searchQuery.value.includes('psn:')) {
        searchQuery.value = searchQuery.value.replace('psn:', '');
    } else {
        searchQuery.value = 'psn:' + searchQuery.value;
    }
}
const onSearch = () => {
    emit('search', searchQuery.value);
}

</script>

<template>
  <div v-if="props.query" class="flex flex-col gap-4 bg-[#1a1a1a] p-4 rounded-t-lg border-x border-t border-gray-800">
    
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex items-center flex-grow max-w-md bg-[#252525] border border-gray-700 rounded-md px-3 py-1.5 focus-within:border-blue-500 transition-all">
        <i class="bi bi-search text-gray-500 mr-2"></i>
        <input 
          v-model="searchQuery" 
          type="text" 
          class="bg-transparent border-none outline-none text-sm text-gray-200 w-full placeholder-gray-600" 
          placeholder="Buscar pelo título..."
        />
      </div>

      <div class="flex bg-[#252525] rounded-md border border-gray-700 p-1">
        <button @click="showSteam()" class="px-3 py-1 rounded text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
          <i class="bi bi-steam"></i>
        </button>
        <button @click="showPsn()" class="px-3 py-1 rounded text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition-colors border-l border-gray-700">
          <i class="bi bi-playstation"></i>
        </button>
      </div>

      <select class="bg-[#252525] text-sm text-gray-300 border border-gray-700 rounded-md px-3 py-1.5 outline-none focus:border-gray-500">
        <option value="all">Todas as Mídias</option>
        <option value="digital">Digital</option>
        <option value="fisica">Física</option>
      </select>


      <button @click="onSearch"><i class="bi bi-search"></i></button>
    </div>

    <div class="flex items-center justify-between border-t border-gray-800 pt-3">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <label class="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Por página</label>
          <select 
            v-model="query.limit" 
            class="bg-transparent text-sm text-gray-300 cursor-pointer outline-none hover:text-white"
            @change="$emit('paginationChanged')"
          >
            <option :value="25" class="bg-[#1a1a1a]">25</option>
            <option :value="50" class="bg-[#1a1a1a]">50</option>
            <option :value="100" class="bg-[#1a1a1a]">100</option>
          </select>
        </div>
        
        <span class="text-sm text-gray-500">
          <span class="text-gray-300">{{ props.query.page * props.query.limit + 1 }}</span> 
          - 
          <span class="text-gray-300">{{ Math.min((props.query.page + 1) * props.query.limit, props.query.totalCount) }}</span> 
          de 
          <span class="text-gray-300">{{ props.query.totalCount }}</span>
        </span>
      </div>

      <div class="flex gap-2">
        <button 
          @click="changePage(-1)" 
          :disabled="props.query.page === 0"
          class="flex items-center gap-2 bg-[#252525] hover:bg-[#323232] text-gray-300 px-3 py-1.5 rounded border border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-medium"
        >
          <i class="bi bi-chevron-left"></i> Anterior
        </button>
        <button 
          @click="changePage(1)" 
          :disabled="props.query.lastPage === true"
          class="flex items-center gap-2 bg-[#252525] hover:bg-[#323232] text-gray-300 px-3 py-1.5 rounded border border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-medium"
        >
          Próximo <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>