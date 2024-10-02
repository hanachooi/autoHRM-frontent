<template>
  <!-- 헤더바 -->
  <HeaderBar v-if="showHeaderBar" />
  <div class="container-fluid">
    <div class="row">
      <!-- 사이드바 -->
      <SideBar/>
      <router-view/>
    </div>
  </div>

</template>

<script setup>
import HeaderBar from './components/HeaderComponent.vue';
import { useRoute } from 'vue-router';
import {computed} from "vue";
import SideBar from "@/components/SideBar.vue";

const route = useRoute();
const showHeaderBar = computed(() => {
  return route.path !== '/';
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
