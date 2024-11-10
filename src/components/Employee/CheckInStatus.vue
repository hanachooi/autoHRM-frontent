<template>
  <div class="top-section">
    <!-- 좌측: 근무 시간 정보 -->
    <div class="work-info">
      <div class="current-time">{{ currentTime }}</div>
      <div class="work-time-box">
        <p class="label">{{ employeeName }}님 오늘 근무한 시간</p>
        <p class="time">{{ workTimeMessage }}</p>
        <div class="buttons">
          <div :class="['start-button', { active: isCheckedIn }]">출근중</div>
          <div :class="['end-button', { active: !isCheckedIn }]">퇴근중</div>
        </div>
        <p class="status-message">
          {{ isCheckedIn ? "근무 중입니다." : "출근 상태가 아닙니다. 버튼을 눌러 출근 시간을 기록하세요." }}
        </p>
      </div>
    </div>

    <!-- 우측: 근태 정보 -->
    <div class="additional-info">
      <img src="../../assets/employeeheader.png" alt="Header Image" class="header-image" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { formatDuration, intervalToDuration, format } from "date-fns";

const currentTime = ref(format(new Date(), "hh:mm:ss a M/d (EEE)"));
const workTimeMessage = ref("00:00:00");
const isCheckedIn = ref(false);
const employeeName = ref("");

// 실시간 시간 업데이트
setInterval(() => {
  currentTime.value = format(new Date(), "hh:mm:ss a M/d (EEE)");
}, 1000);

const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:8080/api/v1/commute/status/my", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      withCredentials: true,
    });

    const { name, startTime, status } = response.data;
    employeeName.value = name;
    isCheckedIn.value = status;

    if (status) {
      const startDateTime = new Date(startTime);
      const now = new Date();
      const duration = intervalToDuration({ start: startDateTime, end: now });
      workTimeMessage.value = formatDuration(duration);
    } else {
      workTimeMessage.value = "00:00:00";
    }
  } catch (error) {
    console.error("Error fetching commute status:", error);
  }
};

onMounted(fetchData);
</script>

<style scoped>
.top-section {
  background-color: #e3f2fd;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 280px;
  padding-left: 20px;
}

.current-time {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
  width: 400px;
}

.work-info {
  flex: 1;
}

.work-time-box {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.label {
  font-size: 14px;
  color: #555;
}

.time {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  margin-left: 110px;
}

.start-button,
.end-button {
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-button {
  background-color: white;
  color: #555;
  border: 1px solid #007bff;
}

.end-button {
  background-color: white;
  color: #555;
  border: 1px solid #007bff;
}

.start-button.active {
  background-color: #007bff;
  color: white;
}

.end-button.active {
  background-color: #007bff;
  color: white;
}

.status-message {
  font-size: 12px;
  color: #888;
  margin-top: 10px;
}

.additional-info {
  font-size: 14px;
  color: #666;
  overflow: hidden;
}

.header-image {
  width: 500px;
  height: 280px;
  object-fit: cover;
}
</style>
