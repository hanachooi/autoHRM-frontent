<template>
  <div class="layout">

    <div class="main-content">
      <FindCommute/>
    </div>
    <div class="grid-item">
      <button class="btn holiday">휴가 신청</button>
      <button class="btn field">외근 신청</button>
    </div>
    <div class="grid-item"><CheckInStatus/></div>
    <div class="grid-item"><ReviseApply/></div>
  </div>
</template>

<script setup>

import FindCommute from "@/components/Employee/FindCommute.vue";
import CheckInStatus from "@/components/Employee/CheckInStatus.vue";
import ReviseApply from "@/components/Employee/ReviseApply.vue";

</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 2fr 1fr; /* 첫 번째는 넓은 영역, 두 번째는 좁은 영역 */
  grid-template-areas:
    "main content1"
    "main content2"
    "main content3";
  grid-gap: 20px;
  height: 100vh; /* 높이를 전체 화면에 맞춤 */
  width: 85vw;
  padding: 30px;
}

.main-content {
  grid-area: main;
  border: 1px #333;
  background-color: #f9f9f9;
  padding: 20px;
}

.grid-item:nth-child(2) {
  grid-area: content1;
}

.grid-item:nth-child(3) {
  grid-area: content2;
}

.grid-item:nth-child(4) {
  grid-area: content3;
}

.grid-item {
  border: 2px #333;
  padding: 20px;
  background-color: #f9f9f9;
}
.btn {
  padding: 10px 20px;
  font-size: 16px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}
.btn.holiday {
  background-color: #007bff;
  color: white;
}

.btn.field {
  background-color: #6c757d;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>
