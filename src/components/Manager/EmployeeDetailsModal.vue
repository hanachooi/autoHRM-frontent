<template>
  <div v-if="email" class="modal">
    <div class="modal-content">
      <span class="close" @click="emitClose">닫기</span>

      <!-- Employee Info Table -->
      <div v-if="employeeData">
        <h3>{{ employeeData.name }} 사원 상세 관리</h3>
        <table class="employee-table">
          <tr>
            <th>사원명</th>
            <td>{{ employeeData.name || '등록을 해야 합니다' }}</td>
          </tr>
          <tr>
            <th>회사명</th>
            <td>{{ employeeData.companyName || '등록을 해야 합니다' }}</td>
          </tr>
          <tr>
            <th>부서명</th>
            <td>{{ employeeData.departmentName || '등록을 해야 합니다' }}</td>
          </tr>
          <tr>
            <th>기본급</th>
            <td>{{ employeeData.baseSalary !== null ? employeeData.baseSalary : '등록을 해야 합니다' }}</td>
          </tr>
          <tr>
            <th>연도</th>
            <td>{{ employeeData.year !== null ? employeeData.year : '등록을 해야 합니다' }}</td>
          </tr>
          <tr>
            <th>월</th>
            <td>{{ employeeData.month !== null ? employeeData.month : '등록을 해야 합니다' }}</td>
          </tr>
          <tr>
            <th>임금</th>
            <td>{{ employeeData.wage !== null ? employeeData.wage : '등록을 해야 합니다' }}</td>
          </tr>
          <tr>
            <th>분 단위 임금</th>
            <td>{{ employeeData.minuteWage !== null ? employeeData.minuteWage : '등록을 해야 합니다' }}</td>
          </tr>
          <tr>
            <th>급여</th>
            <td>{{ employeeData.salary !== null ? employeeData.salary : '등록을 해야 합니다' }}</td>
          </tr>
          <!-- Weekly Schedule -->
          <tr>
            <th>주간 일정</th>
            <td>
              <table class="weekly-schedule">
                <tr v-if="!employeeData.weeklySchedule || Object.keys(employeeData.weeklySchedule).length === 0">
                  <td colspan="2" class="no-schedule">등록을 해야 합니다</td>
                </tr>
                <tr v-else v-for="day in orderedDays" :key="day">
                  <th>{{ day }}</th>
                  <td>{{ getScheduleType(employeeData.weeklySchedule[day]) || '등록을 해야 합니다' }}</td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </div>

      <!-- Additional Action Buttons -->
      <div class="additional-buttons">
        <button class="action-button" @click="registerSchedule">사원 스케줄 등록</button>
        <button class="action-button" @click="registerBaseSalary">기본급 등록</button>
      </div>

      <!-- ScheduleRegisterModal 모달 -->
      <ScheduleRegisterModal
          v-if="isScheduleModalOpen"
          :email="email"
          @close="isScheduleModalOpen = false"
      />

      <!-- BaseSalaryModal 모달 -->
      <BaseSalaryModal
          v-if="isSalaryModalOpen"
          :email="email"
          @close="isSalaryModalOpen = false"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue';
import axios from 'axios';
import ScheduleRegisterModal from '@/components/Manager/ScheduleRegisterModal.vue';
import BaseSalaryModal from '@/components/Manager/BaseSalaryModal.vue';

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

// Data properties for employee
const employeeData = ref(null);
const isScheduleModalOpen = ref(false);
const isSalaryModalOpen = ref(false);

// 요일 순서
const orderedDays = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

// Schedule type 변환 함수
const getScheduleType = (schedule) => {
  switch (schedule) {
    case "WORK":
      return "근무일";
    case "DAYOFF":
      return "휴무일";
    case "HOLIDAY":
      return "휴일";
    default:
      return "등록을 해야 합니다";
  }
};

// Fetch employee data function
const fetchEmployeeData = async (email) => {
  try {
    const response = await axios.get('http://172.27.0.13:8080/api/v1/employee', {
      params: {employeeEmail: email},
    });
    employeeData.value = response.data;
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
    {immediate: true}
);

// 모달 열기 함수들
const registerSchedule = () => {
  isScheduleModalOpen.value = true;
};

const registerBaseSalary = () => {
  isSalaryModalOpen.value = true;
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
  width: 500px;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 16px;
  cursor: pointer;
  color: #0f0f52;
  font-weight: bold;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.employee-table th,
.employee-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.employee-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  width: 30%;
}

.weekly-schedule {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.weekly-schedule th,
.weekly-schedule td {
  padding: 5px;
  border: 1px solid #ddd;
  text-align: left;
}

.additional-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.action-button {
  background-color: #0f0f52;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.action-button:hover {
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
