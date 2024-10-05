<template>
  <div id="app">
    <!-- Header -->
    <header>
      <HeaderBar v-if="showHeaderBar" />
    </header>

    <div class="layout">
      <!-- Sidebar -->
      <aside>
        <SideBar v-if="showHeaderBar"/>
      </aside>

      <!-- Main Content Area -->
      <main>
        <router-view />
      </main>
    </div>
  </div>

</template>

<script setup>
import HeaderBar from './components/Employee/HeaderComponent.vue';
import { useRoute } from 'vue-router';
import {computed} from "vue";
import SideBar from "@/components/SideBar.vue";

const route = useRoute();
const showHeaderBar = computed(() => {
  return route.path !== '/company-join';
});
</script>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout {
  display: flex;
  flex: 1;
}

</style>
