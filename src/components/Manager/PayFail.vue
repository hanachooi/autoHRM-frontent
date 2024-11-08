<template>
  <div>
    <h2>결제 실패</h2>
    <p>에러코드: {{ code }}</p>
    <p>실패 사유: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const code = ref('');
const message = ref('');

// 컴포넌트가 마운트될 때 URL 쿼리에서 에러 코드와 메시지를 가져옵니다.
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  code.value = urlParams.get("code") || "N/A";
  message.value = urlParams.get("message") || "알 수 없는 오류가 발생했습니다.";
});
</script>

<style scoped>
/* 필요시 스타일 추가 */
</style>
