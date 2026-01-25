<script setup>
import { ref, onMounted, provide } from "vue";
import Sidebar from "./Components/Sidebar.vue";
</script>

<template>
  <div>
    <div class="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div class="flex">
        <Sidebar></Sidebar>

        <main class="flex-1 min-h-screen overflow-y-auto transition-all duration-300 lg:ml-64">
          <RouterView></RouterView>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: row;
}

.section-sidebar {
  height: 100vh;
  min-width: 200px;
  max-width: 250px;
}

.section-main {
  height: 100vh;
  flex: 1;
  overflow-y: auto;
}
</style>
