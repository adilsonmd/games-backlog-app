<script setup>
import { ref } from 'vue'

// Propriedades ou dados reativos para os itens da timeline
const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { id: 1, title: 'Fire Emblem Fortune\'s Weave', description: 'Lançamento 17/09/2026', active: true },
      { id: 2, title: 'Legend of Zelda', description: 'Lançamento 05/11/2026', active: false },
      { id: 3, title: 'Danganronpa 2x2', description: 'Lançamento 14/01/2027', active: false },
      { id: 4, title: 'Fate Extra Record', description: 'Lançamento 28/01/2027', active: false },
      { id: 5, title: 'Persona 4 Revival', description: 'Lançamento 20/02/2027', active: false },
      { id: 6, title: 'Final Fantasy VII Revelation', description: 'Lançamento 08/04/2027', active: false },
    ]
  }
})

const timelineContainer = ref(null)
</script>

<template>
  <div class="w-full h-full p-8 flex flex-col box-border">
    <h2 class="text-2xl font-bold text-white mb-6">Página Timeline</h2>

    <!-- Container com scroll horizontal -->
    <div class="timeline-scroll w-full flex-1 overflow-x-auto overflow-y-hidden py-10">
      
      <!-- Container flex com min-w-max: ele cresce automaticamente conforme novos itens entram -->
      <div class="relative min-w-max h-[220px] px-16 flex items-center gap-24">
        
        <!-- Linha de Fundo Horizontal (Atravessa toda a extensão do container) -->
        <div class="absolute top-[60px] left-8 right-8 flex items-center pointer-events-none">
          <div class="w-4 h-4 rounded-full border-2 border-zinc-700 bg-zinc-900 z-10"></div>
          <div class="flex-1 h-[2px] bg-zinc-700"></div>
          <div class="w-4 h-4 rounded-full border-2 border-zinc-700 bg-zinc-900 z-10"></div>
        </div>

        <!-- Itens da Timeline em linha -->
        <div
          v-for="item in items"
          :key="item.id"
          class="relative flex flex-col items-center z-20 shrink-0"
        >
          <!-- Traço Vertical -->
          <div class="absolute top-[-8px] w-[2px] h-4 bg-zinc-700"></div>

          <!-- Card do Evento -->
          <div 
            class="mt-[8px] min-w-[140px] max-w-[200px] p-3.5 rounded-xl text-center text-white shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            :class="item.active ? 'bg-blue-600 border-2 border-blue-400' : 'bg-blue-700'"
          >
            <span class="font-bold text-sm block leading-tight">{{ item.title }}</span>
            <p v-if="item.description" class="text-xs opacity-80 mt-1.5">{{ item.description }}</p>
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