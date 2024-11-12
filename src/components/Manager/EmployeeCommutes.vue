<template>
  <div class="layout">
    <div class="main-content">
      <h2>근무 기록</h2>

      <!-- 이메일 필터 input과 조회 버튼 -->
      <div class="filter-section">
        <input
            type="email"
            v-model="emailFilter"
            placeholder="이메일 입력 (선택 사항)"
        />
        <button @click="fetchData">조회</button>
      </div>

      <table class="commutes-table">
        <thead>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>출근 시간</th>
          <th>퇴근 시간</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(employee, index) in filteredEmployeeData" :key="index">
          <template v-if="employee.commutes.length > 0">
            <tr
                v-for="(commute, commuteIndex) in employee.commutes"
                :key="commuteIndex"
            >
              <td
                  v-if="commuteIndex === 0"
                  :rowspan="employee.commutes.length"
              >
                {{ employee.name }}
              </td>
              <td
                  v-if="commuteIndex === 0"
                  :rowspan="employee.commutes.length"
              >
                {{ employee.email }}
              </td>
              <td>{{ new Date(commute.startTime).toLocaleString() }}</td>
              <td>
                {{ commute.endTime ? new Date(commute.endTime).toLocaleString() : "근무 중" }}
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td>{{ employee.name }}</td>
              <td>{{ employee.email }}</td>
              <td colspan="2">근무 기록 없음</td>
            </tr>
          </template>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const employeeData = ref([]);
const emailFilter = ref("");

const filteredEmployeeData = computed(() => {
  return employeeData.value;
});

const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://172.27.0.13:8080/api/v1/commutes/my", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      withCredentials: true,
      params: {
        email: emailFilter.value || null,
      },
    });

    employeeData.value = response.data;
  } catch (error) {
    console.error("데이터 요청 오류:", error);
  }
};

onMounted(() => {
  emailFilter.value = "";
  fetchData();
});
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
  font-family: "Bold";
  src: url("../../assets/NEXONLv1GothicBold.ttf") format("truetype");
  font-weight: 700;
}

h2 {
  font-family: "Bold", sans-serif;
  margin-bottom: 20px;
}

.filter-section {
  display: flex;
  gap: 10px;
  justify-content: center; /* 중앙 정렬 */
  margin-bottom: 20px;
}

input[type="email"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}

button {
  background-color: #141464;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0f0f52;
}

.commutes-table {
  width: 100%;
  border-collapse: collapse;
}

.commutes-table th,
.commutes-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  vertical-align: middle;
}

.commutes-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.commutes-table td {
  background-color: #ffffff;
}

.main-content {
  max-width: 800px;
  width: 800px;
  margin: 0 auto;
  padding-top: 20px;
}
</style>
