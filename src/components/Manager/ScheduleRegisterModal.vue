<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="emitClose">&times;</span>
      <h3>사원 근무표 등록</h3>

      <!-- 이메일 입력 필드 -->
      <div class="form-group">
        <label for="email">사원이메일</label>
        <input type="text" id="email" v-model="scheduleRequest.email" readonly />
      </div>

      <!-- 요일 및 스케줄 타입 선택 필드 -->
      <div v-for="(scheduleType, day) in scheduleRequest.schedule" :key="day" class="form-group">
        <label :for="day">{{ day }}:</label>
        <select :id="day" v-model="scheduleRequest.schedule[day]">
          <option disabled value="">근무유형 선택</option>
          <option value="WORK">근무일</option>
          <option value="DAYOFF">휴무일</option>
          <option value="HOLIDAY">휴일</option>
        </select>
      </div>

      <!-- 전송 버튼 -->
      <button @click="submitSchedule">등록하기</button>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';

// Props
// eslint-disable-next-line no-undef
const props = defineProps({
  email: {
    type: String,
    required: true,
  },
});

// Emits
// eslint-disable-next-line no-undef
const emit = defineEmits(['close']);
const emitClose = () => emit('close');

// Schedule request data
const scheduleRequest = ref({
  email: props.email,
  schedule: {
    월요일: '',
    화요일: '',
    수요일: '',
    목요일: '',
    금요일: '',
    토요일: '',
    일요일: ''
  }
});

// submitSchedule function
const submitSchedule = async () => {
  try {
    await axios.post('http://211.253.28.110:8080/api/v1/schedule/', scheduleRequest.value);
    alert("스케줄이 성공적으로 등록되었습니다.");
    emitClose();
  } catch (error) {
    console.error('스케줄 등록 실패:', error);
    alert("스케줄 등록에 실패했습니다.");
  }
};

// 모달이 열릴 때 전달된 이메일로 초기화
onMounted(() => {
  scheduleRequest.value.email = props.email;
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

