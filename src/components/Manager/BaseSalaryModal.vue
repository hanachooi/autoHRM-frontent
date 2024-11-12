<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="emitClose">&times;</span>
      <h3>기본급여금 등록</h3>

      <!-- 이메일 입력 필드 (읽기 전용) -->
      <div class="form-group">
        <label for="email">사원이메일</label>
        <input type="text" id="email" v-model="salaryRequest.email" readonly />
      </div>

      <!-- 연도 입력 필드 -->
      <div class="form-group">
        <label for="year">연도</label>
        <input type="number" id="year" v-model="salaryRequest.year" placeholder="연도 입력" />
      </div>

      <!-- 월 입력 필드 -->
      <div class="form-group">
        <label for="month">월</label>
        <input type="number" id="month" v-model="salaryRequest.month" placeholder="월 입력" />
      </div>

      <!-- 기본급여금 입력 필드 -->
      <div class="form-group">
        <label for="baseSalary">기본급여금</label>
        <input type="number" id="baseSalary" v-model="salaryRequest.baseSalary" placeholder="기본급여금 입력" />
      </div>

      <!-- 통상근무시간 입력 필드 -->
      <div class="form-group">
        <label for="workHour">통상근무시간</label>
        <input type="number" id="workHour" v-model="salaryRequest.workHour" placeholder="통상근무시간 입력" />
      </div>

      <!-- 전송 버튼 -->
      <button @click="submitSalary">등록하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Props to receive email from the parent component
// eslint-disable-next-line no-undef
const props = defineProps({
  email: {
    type: String,
    required: true,
  },
});

// Emit close event
// eslint-disable-next-line no-undef
const emit = defineEmits(['close']);
const emitClose = () => emit('close');

// Data properties for salary request
const salaryRequest = ref({
  email: props.email,   // 초기 이메일 값 설정
  year: null,
  month: null,
  baseSalary: null,
  workHour: null
});

// Submit salary data to backend
const submitSalary = async () => {
  try {
    await axios.post('http://211.253.28.110:8080/api/v1/salary', salaryRequest.value);
    alert("기본급여금이 성공적으로 등록되었습니다.");
    emitClose(); // Close modal on success
  } catch (error) {
    console.error('기본급여금 등록 실패:', error);
    alert("기본급여금 등록에 실패했습니다.");
  }
};

// Set email on mount
onMounted(() => {
  salaryRequest.value.email = props.email;
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  width: 400px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

button {
  background-color: #0f0f52;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #080833;
}

@font-face {
  font-family: 'Bold';
  src: url('../../assets/NEXONLv1GothicBold.ttf') format('truetype');
  font-weight: 700;
}

h3{
  font-family: 'Bold', sans-serif;
}
</style>
