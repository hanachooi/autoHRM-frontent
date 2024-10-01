<template>
  <div class="card-body">
    <h5 class="card-title">익일 출퇴근 현황</h5>
    <p class="card-text">
      Jassa<br />
      You can also try different version of Bootstrap V4 side menu. Click below link to view all Bootstrap Menu versions.
    </p>

    <!-- 출근 상태 메시지 및 동그라미 -->
    <div>
      <span :class="{'circle-green': isCheckedIn, 'circle-red': !isCheckedIn}"></span>
      <span>
        {{ isCheckedIn === null ? 'Loading...' : (isCheckedIn ? '출근 처리가 완료되었습니다.' : '근무 상태 기록이 없습니다.') }}
      </span>
    </div>

    <a href="#" class="card-link">Link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const isCheckedIn = ref(null); // 출근 상태를 저장할 ref

const fetchData = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`http://localhost:8080/api/v1/commute/status/my`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      withCredentials: true
    });

    isCheckedIn.value = response.data; // 출근 상태 저장
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.circle-green {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
  margin-right: 5px;
}

.circle-red {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  margin-right: 5px;
}
</style>
