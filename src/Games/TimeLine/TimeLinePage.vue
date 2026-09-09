<script setup>
import { ref } from 'vue'

// Propriedades ou dados reativos para os itens da timeline
const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { id: 1, position: 15, title: 'Legend of Zelda', description: 'Lançamento 05/11/2026', active: true },
      { id: 2, position: 38, title: 'Fate Extra Record', description: 'Lançamento 28/01/2027', active: false },
      { id: 3, position: 65, title: 'Persona 4 Revival', description: 'Lançamento 20/02/2027', active: false },
      { id: 4, position: 85, title: 'Final Fantasy VII Revelation', description: 'Lançamento 08/04/2027', active: false },
    ]
  }
})

const timelineContainer = ref(null)
</script>

<template>
<!-- Wrapper ocupando 100% da área da página -->
  <div class="w-full h-full p-8 flex flex-col box-border">
    <!-- Cabeçalho -->
    <h2 class="text-2xl font-bold text-white mb-6">Página Timeline</h2>

    <!-- Container Rolável -->
    <div class="timeline-scroll w-full flex-1 overflow-x-auto overflow-y-hidden py-10">
      
      <!-- Linha do tempo expandida (largura maior para forçar o scroll) -->
      <div class="relative w-[2000px] h-[220px] px-10 box-border">
        
        <!-- Eixo Principal (Linha e Nós) -->
        <div class="absolute top-[60px] left-[40px] right-[40px] flex items-center">
          <div class="w-4 h-4 rounded-full border-2 border-zinc-700 bg-zinc-900 z-10"></div>
          <div class="flex-1 h-[2px] bg-zinc-700"></div>
          <div class="w-4 h-4 rounded-full border-2 border-zinc-700 bg-zinc-900 z-10"></div>
        </div>

        <!-- Itens da Timeline -->
        <div class="absolute inset-x-[40px] inset-y-0">
          <div
            v-for="item in items"
            :key="item.id"
            class="absolute flex flex-col items-center -translate-x-1/2"
            :style="{ left: item.position + '%' }"
          >
            <!-- Traço Vertical -->
            <div class="absolute top-[52px] w-[2px] h-4 bg-zinc-700"></div>

            <!-- Card do Evento -->
            <div 
              class="absolute top-[68px] min-w-[120px] p-3.5 rounded-xl text-center text-white shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              :class="item.active ? 'bg-blue-600 border-2 border-blue-400' : 'bg-blue-700'"
            >
              <span class="font-bold text-sm block">{{ item.title }}</span>
              <p v-if="item.description" class="text-xs opacity-80 mt-1.5">{{ item.description }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Apenas o estilo da Scrollbar, que é mais prático em CSS tradicional */
.timeline-scroll::-webkit-scrollbar {
  height: 8px;
}
.timeline-scroll::-webkit-scrollbar-track {
  background: #18181b; /* zinc-900 */
  border-radius: 4px;
}
.timeline-scroll::-webkit-scrollbar-thumb {
  background: #3f3f46; /* zinc-700 */
  border-radius: 4px;
}
.timeline-scroll::-webkit-scrollbar-thumb:hover {
  background: #52525b; /* zinc-600 */
}
</style>