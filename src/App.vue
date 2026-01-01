<script setup>
import { ref, onMounted, provide } from "vue";
import Sidebar from "./Components/Sidebar.vue";
</script>

<template>

  <div class="app-container">

    <section class="section-sidebar">
      <Sidebar></Sidebar>
    </section>

    <main class="section-main">
      <RouterView></RouterView>
    </main>
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
