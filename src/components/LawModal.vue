<template>
  <div v-if="isOpen" class="modal" @click.self="closeModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h3>근로기준법</h3>
      <p>[시행 2025. 10. 23.] [법률 제20520호, 2024. 10. 22., 일부개정]</p>
      <p>고용노동부(임금근로시간정책과 - 근로시간, 휴게), 044-202-7545</p>
      <p>고용노동부(임금근로시간정책과 - 휴일, 연차휴가), 044-202-7973</p>
      <p>고용노동부(임금근로시간정책과 - 제63조 적용제외, 특례업종), 044-202-7530</p>
      <p>고용노동부(임금근로시간정책과 - 유연근로시간제), 044-202-7549</p>
      <hr />
      <p>제56조(연장ㆍ야간 및 휴일ㆍ휴무일 근로)</p>
      <p>① 사용자는 연장근로에 대해 통상임금의 100분의 50 이상을 가산하여 지급해야 합니다.</p>
      <p>② 제1항에도 불구하고 사용자는 휴일근로에 대해 추가 가산금을 지급해야 합니다:</p>
      <ul>
        <li>8시간 이내의 휴일근로: 통상임금의 100분의 50</li>
        <li>8시간을 초과한 휴일근로: 통상임금의 100분의 100</li>
        <li>휴무일은 주 40시간 이외의 시간에 대한 부분에 대하여 연장근로로 가산</li>
      </ul>
      <p>③ 사용자는 야간근로(오후 10시부터 오전 6시)에 대해 통상임금의 100분의 50 이상을 가산하여 지급해야 합니다.</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  overflow-y: auto;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #888;
}
h3 {
  margin-top: 0;
  font-size: 1.5em;
}
p {
  line-height: 1.5;
}
ul {
  margin-left: 20px;
}
</style>
