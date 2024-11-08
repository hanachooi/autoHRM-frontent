<template>
    <div>
      <div class="container-fluid">
        <div class="row">
      <div class="mb-3">
        <label for="monthSelector" class="form-label">조회할 년/월 선택 </label>
        <input
            type="month"
            id="monthSelector"
            v-model="selectedMonth"
            @change="fetchAllowances"
        />
      </div>

      <table class="table">
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
            <td rowspan="item.allowances.length">{{ item.date }}</td>
            <td rowspan="item.allowances.length">{{ item.type }}</td>
            <td>{{ item.allowances[0]?.type || '' }}</td>
            <td>{{ item.allowances[0]?.time || 0 }}</td>
            <td>{{ item.allowances[0]?.allowancePay || 0 }}</td>
          </tr>
          <tr v-for="(allowance, index) in item.allowances.slice(1)" :key="index">
            <td rowspan="item.allowances.length"></td>
            <td rowspan="item.allowances.length"></td>
            <td>{{ allowance.type }}</td>
            <td>{{ allowance.time }}</td>
            <td>{{ allowance.allowancePay }}</td>
          </tr>
        </template>
        </tbody>
      </table>
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
    console.log(token)
    const response = await axios.get(`http://localhost:8080/api/v1/allowance/my`, {
      params: {
        startOfMonth,
        endOfMonth,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      withCredentials: true
    });
    allowances.value = response.data;
  } catch (error) {
    console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
  }
};

// 컴포넌트가 처음 마운트될 때 호출
onMounted(fetchAllowances);
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>

<style scoped>
.table {
  margin-top: 20px;
}

</style>
