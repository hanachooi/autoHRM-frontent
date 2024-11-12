<template>
  <div class="layout">
    <div class="main-content">
      <h2>월급 관리</h2>
      <table class="salaries-table">
        <thead>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>년</th>
          <th>월</th>
          <th>월급</th>
          <th>미지급금</th>
          <th>지급 상태</th>
          <th>지급</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(employee, index) in filteredEmployeeData" :key="index">
          <tr v-for="(salary, salaryIndex) in employee.salaries" :key="salaryIndex">
            <td v-if="salaryIndex === 0" :rowspan="employee.salaries.length">{{ employee.employeeName }}</td>
            <td v-if="salaryIndex === 0" :rowspan="employee.salaries.length">{{ employee.employeeEmail }}</td>
            <td>{{ salary.year }}</td>
            <td>{{ salary.month }}</td>
            <td>{{ salary.salary.toLocaleString() }} 원</td>
            <td>{{ salary.unpaid.toLocaleString() }} 원</td>
            <td>{{ salary.status ? "지급 완료" : "미지급" }}</td>
            <td>
              <button v-if="!salary.status" @click="goToPaymentPage(employee, salary)" class="pay-button">
              지급하러가기
            </button>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router";

const employeeData = ref([]);
const router = useRouter();

// 필터링된 데이터만 반환 (salaries가 빈 배열이 아닌 직원들만)
const filteredEmployeeData = computed(() => {
  return employeeData.value.filter(employee => employee.salaries && employee.salaries.length > 0);
});

const fetchData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://211.253.28.110:8080/api/v1/salaries/my', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      withCredentials: true,
    });

    employeeData.value = response.data;
  } catch (error) {
    console.error('데이터 요청 오류:', error);
  }
};

const goToPaymentPage = (employee, salary) => {
  router.push({
    path: '/manager/pay',
    query: {
      name: employee.employeeName,
      email: employee.employeeEmail,
      year: salary.year,
      month: salary.month,
      unpaid: salary.unpaid,
      id : salary.id
    }
  });
};

onMounted(fetchData);
</script>

<style scoped>
.layout {
  display: flex;
  justify-content: flex-start;
  padding-top: 30px;
  width: calc(100% - 250px);
  margin-left: 350px;
}

@font-face {
  font-family: 'Bold';
  src: url('../../assets/NEXONLv1GothicBold.ttf') format('truetype');
  font-weight: 700;
}

h2 {
  font-family: 'Bold', sans-serif;
  margin-bottom: 20px;
}

.salaries-table {
  width: 100%;
  border-collapse: collapse;
}

.salaries-table th, .salaries-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  vertical-align: middle;
}

.salaries-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.salaries-table td {
  background-color: #ffffff;
}

.main-content {
  max-width: 800px;
  width: 800px;
  margin: 0 auto;
  padding-top: 20px;
}

.pay-button {
  background-color: #141464;
  color: white;
  border: none;
  border-radius: 3px;
  text-decoration: none;
  display: inline-block;
  padding: 1px;
  cursor: pointer;
}

.pay-button:hover {
  background-color: #0f0f52;
}
</style>
