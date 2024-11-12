<template>
  <div class="layout">
    <div class="main-content">
      <h2>수당 조회</h2>

      <!-- Month Selector -->
      <div class="form-group">
        <label for="monthSelector" class="form-label">조회할 년/월 선택</label>
        <input
            type="month"
            id="monthSelector"
            v-model="selectedMonth"
            @change="fetchAllowances"
            class="input-month"
        />
      </div>

      <!-- Allowance Table -->
      <div class="result-table" v-if="allowances.length">
        <table>
          <thead>
          <tr>
            <th>근무일</th>
            <th>근무유형</th>
            <th>수당유형</th>
            <th>시간</th>
            <th>수당</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="item in allowances" :key="item.date">
            <tr v-if="item.allowances && item.allowances.length">
              <td :rowspan="item.allowances.length">{{ item.date }}</td>
              <td :rowspan="item.allowances.length">{{ formatWorkType(item.type) }}</td>
              <td>{{ formatAllowanceType(item.allowances[0]?.type) }}</td>
              <td>{{ item.allowances[0]?.time || 0 }}</td>
              <td>{{ item.allowances[0]?.allowancePay || 0 }}</td>
            </tr>
            <tr v-for="(allowance, index) in item.allowances.slice(1)" :key="index">
              <td>{{ formatAllowanceType(allowance.type) }}</td>
              <td>{{ allowance.time }}</td>
              <td>{{ allowance.allowancePay }}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>

      <!-- No Results Found -->
      <div v-else class="no-results">
        수당 데이터를 찾을 수 없습니다.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const allowances = ref([]);
const selectedMonth = ref(new Date().toISOString().substring(0, 7)); // 기본값으로 현재 월

const fetchAllowances = async () => {
  const [year, month] = selectedMonth.value.split('-');
  const startOfMonth = `${year}-${month}-01`;
  const endOfMonth = `${year}-${month}-${new Date(year, month, 0).getDate()}`;

  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://172.27.0.13:8080/api/v1/allowance/my`, {
      params: {
        startOfMonth,
        endOfMonth,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      withCredentials: true,
    });
    allowances.value = response.data;
  } catch (error) {
    console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
  }
};

// 근무유형 변환 함수
const formatWorkType = (type) => {
  switch (type) {
    case 'Work':
      return '근무일';
    case 'Holiday':
      return '휴일';
    case 'Dayoff':
      return '휴무일';
    default:
      return type;
  }
};

// 수당유형 변환 함수
const formatAllowanceType = (type) => {
  switch (type) {
    case 'Night':
      return '야간';
    case 'Over':
      return '연장';
    case 'Holiday':
      return '휴일';
    default:
      return type;
  }
};

// 컴포넌트가 처음 마운트될 때 호출
onMounted(fetchAllowances);
</script>

<style scoped>
.layout {
  display: flex;
  justify-content: center; /* 전체 레이아웃을 중앙에 정렬 */
  background: white;
  border: #e4d4e4 solid 2px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-content {
  max-width: 700px;
  width: 100%; /* 화면에 맞게 늘어나도록 */
  padding: 20px;
}

h2 {
  font-family: 'Bold', sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center; /* 제목을 중앙에 정렬 */
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.input-month {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.result-table {
  margin-top: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
  color: #333;
}

.no-results {
  margin-top: 20px;
  font-size: 18px;
  color: #888;
  text-align: center; /* 결과 없음 메시지를 중앙에 정렬 */
}
</style>
