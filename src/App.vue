<script setup>
import { ref, onMounted, provide } from "vue";
import Sidebar from "./Components/Sidebar.vue";
</script>

<template>
  <div>
    <div class="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div class="flex">
        <Sidebar></Sidebar>

        <div class="flex-1 overflow-y-auto transition-all duration-300
             pt-20 lg:pt-4 
             pl-4 lg:pl-0 lg:ml-64"> 
          <router-view />
        </div>
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
