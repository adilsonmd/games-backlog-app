<script setup>
defineProps({
  isLoading: Boolean,
  message: {
    type: String,
    default: 'Carregando jogos...'
  }
});
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="isLoading" 
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#121212]/80 backdrop-blur-sm"
    >
      <div class="relative flex items-center justify-center">
        <div class="w-16 h-16 border-4 border-blue-900/30 rounded-full"></div>
        <div class="absolute w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        
        <i class="bi bi-controller absolute text-blue-500 animate-pulse"></i>
      </div>

      <p class="mt-4 text-gray-300 font-medium tracking-widest text-xs uppercase animate-pulse">
        {{ message }}
      </p>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>