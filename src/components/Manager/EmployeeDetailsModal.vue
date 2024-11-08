<template>
  <div v-if="email" class="modal">
    <div class="modal-content">
      <span class="close" @click="emitClose">&times;</span>

      <!-- Employee Info Display -->
      <div v-if="employeeData">
        <h3>{{ employeeData.name }}사원 상세 관리</h3>
        <p><strong>사원명:</strong> {{ employeeData.name || '등록을 해야 합니다' }}</p>
        <p><strong>회사명:</strong> {{ employeeData.companyName || '등록을 해야 합니다' }}</p>
        <p><strong>부서명:</strong> {{ employeeData.departmentName || '등록을 해야 합니다' }}</p>
        <p><strong>기본급:</strong> {{ employeeData.baseSalary !== null ? employeeData.baseSalary : '등록을 해야 합니다' }}</p>
        <p><strong>연도:</strong> {{ employeeData.year !== null ? employeeData.year : '등록을 해야 합니다' }}</p>
        <p><strong>월:</strong> {{ employeeData.month !== null ? employeeData.month : '등록을 해야 합니다' }}</p>
        <p><strong>임금:</strong> {{ employeeData.wage !== null ? employeeData.wage : '등록을 해야 합니다' }}</p>
        <p><strong>분 단위 임금:</strong> {{ employeeData.minuteWage !== null ? employeeData.minuteWage : '등록을 해야 합니다' }}</p>
        <p><strong>급여:</strong> {{ employeeData.salary !== null ? employeeData.salary : '등록을 해야 합니다' }}</p>
        <p><strong>주간 일정:</strong> {{ employeeData.weeklySchedule || '등록을 해야 합니다' }}</p>
      </div>

      <!-- Additional Action Buttons -->
      <div class="additional-buttons">
        <button @click="registerSchedule">사원 스케줄 등록</button>
        <button @click="registerBaseSalary">기본급 등록</button>
        <button @click="close">닫기</button>
      </div>


      <ScheduleRegisterModal
          v-if="isScheduleModalOpen"
          :email="email"
          @close="isScheduleModalOpen = false"
      />
  </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import ScheduleRegisterModal from '@/components/Manager/ScheduleRegisterModal.vue';


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

// Data properties for employee
const employeeData = ref(null);
const employeeName = ref('');
const employeeDepartment = ref('');
const isScheduleModalOpen = ref(false);

// Fetch employee data function
const fetchEmployeeData = async (email) => {
  try {
    console.log("Fetching data for email:", email);
    const response = await axios.get('http://localhost:8080/api/v1/employee', {
      params: { employeeEmail: email },
    });
    employeeData.value = response.data;
    employeeName.value = response.data.name;
    employeeDepartment.value = response.data.departmentName;
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }
};

// Watch for email prop to fetch data whenever it changes
watch(
    () => props.email,
    async (newEmail) => {
      if (newEmail) {
        await fetchEmployeeData(newEmail);
      }
    },
    { immediate: true }
);

// Close modal function
const emitClose = () => {
  emit('close');
};

// Submit form function
const close = () => {
  emitClose(); // Close modal after submission
};

const registerSchedule = () => {
  isScheduleModalOpen.value = true;  // 이 부분이 모달 열기 상태 설정
};

const registerBaseSalary = () => {
  console.log('Register base salary for:', props.email);
};
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
  background-color: #4a90e2;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #357ab8;
}

.additional-buttons {
  margin-top: 20px;
}

.additional-buttons button {
  margin-right: 10px;
  padding: 10px 20px;
}

.additional-buttons button:hover {
  background-color: #357ab8;
}
</style>
