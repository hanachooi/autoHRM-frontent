<template>
  <div class="salary-view">
    <h1>Salary Information</h1>

    <!-- 로딩 중일 때 로딩 메시지 출력 -->
    <div v-if="loading">
      Loading...
    </div>

    <!-- 데이터가 성공적으로 로드되었을 때 salary와 baseSalary 출력 -->
    <div v-else-if="salary && baseSalary">
      <h2>Base Salary</h2>
      <p>{{ baseSalary }}</p>

      <h2>Calculated Salary</h2>
      <p>{{ salary }}</p>
    </div>

    <!-- 에러 발생 시 에러 메시지 출력 -->
    <div v-else-if="error">
      <p class="error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.salary-view {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  color: #333;
}

.error {
  color: red;
}
</style>


<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  // 데이터 정의
  const salary = ref(null);
  const baseSalary = ref(null);
  const loading = ref(true);
  const error = ref(null);

  // 데이터를 가져오는 함수
  const fetchSalaryData = async () => {
  try {
  const token = localStorage.getItem('token');
  console.log(token)

  // axios 요청 보내기
  const response = await axios.get(`http://localhost:8080/api/v1/salary/my`, {
  headers: {
  'Content-Type': 'application/json',
  'Authorization': `${token}`,
},
  withCredentials: true,
});

  const data = response.data;

  // 응답에서 salary와 baseSalary를 할당
  salary.value = data.salary;
  baseSalary.value = data.baseSalary;
} catch (err) {
  error.value = 'Failed to load salary information.';
} finally {
  loading.value = false;
}
};

  // 컴포넌트가 마운트될 때 fetchSalaryData 함수 호출
  onMounted(() => {
  fetchSalaryData();
});
</script>

<style scoped>
.salary-view {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  color: #333;
}

.error {
  color: red;
}
</style>
