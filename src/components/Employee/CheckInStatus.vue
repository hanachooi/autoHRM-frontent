<template>
  <div class="top-section">
    <div class="work-info">
      <p class="time">00:48:22</p>
      <span class="employee-name">
        {{ isCheckedIn === null ? 'Loading...' : (isCheckedIn ? '근무시간이 기록되고 있습니다' : '근무 상태 기록이 없습니다.') }}
        <span :class="{'circle-green': isCheckedIn, 'circle-red': !isCheckedIn}"></span>
      </span>
    </div>
    <div class="additional-info">
      <img src="../../assets/employeeheader.png" alt="Header Image" class="header-image">
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const isCheckedIn = ref(null);

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

    isCheckedIn.value = response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.top-section {
  background-color: #e3f2fd;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 250px;
}

.work-info {
  text-align: center;
}

.time {
  font-size: 24px;
  font-weight: bold;
}

.employee-name {
  font-size: 16px;
  margin: 10px 0;
}

.additional-info {
  font-size: 14px;
  color: #666;
  overflow: hidden; /* 이미지를 컨테이너에 맞추기 위해 추가 */
}

.header-image {
  width: 500px; /* 원하는 이미지 너비로 조정 */
  height: 250px; /* 원하는 이미지 높이로 조정 */
  object-fit: cover; /* 이미지를 잘라서 영역에 맞춤 */
}
</style>
