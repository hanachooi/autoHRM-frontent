<template>
  <div>
    <div>
      <div>
        <label for="filterType"></label>
        <select v-model="filterType">
          <option value="week">주별</option>
          <option value="month">달별</option>
        </select>

        <label for="startDate">조회 날짜:</label>
        <input type="date" v-model="startDate" />

        <button @click="fetchCommutes">조회</button>
      </div>

      <ul class="commute-list">
        <li v-for="commute in commutes" :key="commute.id" class="commute-item">
          <div class="time-info">
            {{ formatDate(commute.startTime) }}
          </div>
          <div class="time-bar-container">
            <div
                class="time-bar"
                :style="getBarStyle(commute.startTime, commute.endTime)"
                @mouseover="showTimeTooltip($event, commute.startTime, commute.endTime)"
                @mouseleave="hideTimeTooltip"
            ></div>
          </div>
        </li>
      </ul>

      <!-- Time Scale -->
      <div class="time-scale">
        <div v-for="hour in 25" :key="hour" class="time-marker">{{ (hour - 1) }}시</div>
      </div>

      <!-- Tooltip for displaying time -->
      <div v-if="tooltip.visible" class="tooltip" :style="tooltip.position">
        {{ tooltip.time }}
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';

const commutes = ref([]);
const filterType = ref('week');
const startDate = ref('');

// Tooltip 관련 상태
const tooltip = ref({
  visible: false,
  time: '',
  position: {
    left: '0px',
    top: '0px'
  }
});

const fetchCommutes = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get('http://localhost:8080/api/v1/commute/my', {
      params: {
        filterType: filterType.value,
        startDate: startDate.value,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      withCredentials: true
    });

    commutes.value = response.data;
  } catch (error) {
    console.error('Error fetching commutes:', error);
  }
};

// 시간 바의 스타일을 동적으로 계산
const getBarStyle = (startTime, endTime) => {
  const start = dayjs(startTime);
  const end = dayjs(endTime);

  const totalHours = 24; // 하루 24시간
  const startHour = start.hour() + start.minute() / 60;
  const endHour = end.hour() + end.minute() / 60;

  const startPercentage = (startHour / totalHours) * 100;
  const durationPercentage = ((endHour - startHour) / totalHours) * 100;

  return {
    left: `${startPercentage}%`,
    width: `${durationPercentage}%`
  };
};

// 날짜 포맷팅
const formatDate = (datetime) => {
  return dayjs(datetime).format('YYYY-MM-DD');
};

// Tooltip 표시
const showTimeTooltip = (event, startTime, endTime) => {
  const start = dayjs(startTime).format('HH:mm');
  const end = dayjs(endTime).format('HH:mm');
  tooltip.value.time = `${start} - ${end}`;
  tooltip.value.visible = true;

  const { clientX, clientY } = event;
  tooltip.value.position = {
    left: `${clientX}px`,
    top: `${clientY - 40}px` // 툴팁이 마우스 위로 나타나도록
  };
};

// Tooltip 숨김
const hideTimeTooltip = () => {
  tooltip.value.visible = false;
};

</script>

<style scoped>
.commute-list {
  list-style-type: none;
  padding: 0;
}

.commute-item {
  margin: 10px 0;
}

.time-info {
  font-weight: bold;
}

.time-bar-container {
  background-color: #e9ecef;
  border-radius: 5px;
  height: 20px;
  position: relative;
  margin-bottom: 5px;
}

.time-bar {
  background-color: #007bff;
  height: 100%;
  border-radius: 5px;
  position: absolute;
}

.time-scale {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.time-marker {
  font-size: 12px;
  text-align: center;
  flex: 1;
  border-left: 1px solid #ccc;
  padding-left: 2px;
  margin-left: -1px;
}

.tooltip {
  position: absolute;
  background-color: #333;
  color: white;
  padding: 5px;
  border-radius: 3px;
  font-size: 12px;
  pointer-events: none;
  z-index: 1000; /* 툴팁이 다른 요소들 위로 오도록 */
}
</style>
