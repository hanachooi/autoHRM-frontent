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
import HeaderBar from './components/Manager/HeaderComponent.vue';
import { useRoute } from 'vue-router';
import { computed } from "vue";
import SideBar from "@/components/SideBar.vue";

const route = useRoute();
const showHeaderBar = computed(() => {
  return !['/company-join', '/employee/home', '/'].includes(route.path);
});
</script>

<style scoped>
@font-face {
  font-family: 'Bold';
  src: url('assets/NEXONLv1GothicBold.ttf') format('truetype');
  font-weight: 700;
}
@font-face {
  font-family: 'Light';
  src: url('assets/NEXONLv1GothicLight.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family: 'Regular';
  src: url('assets/NEXONLv1GothicRegular.ttf') format('truetype');
  font-weight: 400;
}

#app {
  font-family: 'Regular', sans-serif; /* 기본 폰트: Regular */
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

/* 특정 폰트 적용 예시 */
header {
  font-family: 'Bold', sans-serif;
}

aside {
  font-family: 'Light', sans-serif;
}

main {
  font-family: 'Regular', sans-serif;
}
</style>
