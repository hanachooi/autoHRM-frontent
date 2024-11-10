<template>
  <div class="commute-summary">
    <!-- 상단 섹션: 총 근무 시간, 필터 버튼, 날짜 범위 -->
    <div class="summary-header">
      <h2>근무 조회</h2>
      <div class="filter-buttons">
        <button :class="{ active: filterType === 'month' }" @click="setFilterType('month')">월별</button>
        <button :class="{ active: filterType === 'week' }" @click="setFilterType('week')">주별</button>
      </div>
    </div>

    <!-- 날짜 범위 표시 -->
    <div class="date-range">
      <button @click="previousPeriod">〈</button>
      <span>{{ formattedDateRange }}</span>
      <button @click="nextPeriod">〉</button>
    </div>

    <!-- 근무 리스트 -->
    <div class="commute-list-container">
      <ul class="commute-list">
        <li v-for="day in displayDays" :key="day" class="commute-item">
          <div class="time-bar-container">
            <!-- 데이터가 있는 경우 근무 시간 막대 -->
            <div
                v-if="commuteMap[day]"
                class="time-bar"
                :style="getBarStyle(commuteMap[day].startTime, commuteMap[day].endTime)"
            ></div>

            <!-- 데이터가 없는 경우 기본 기준치 막대 -->
            <div v-else class="empty-bar"></div>
          </div>
          <p class="date-info">{{ formatDayLabel(day) }}</p>
          <p class="work-duration">
            {{ commuteMap[day] ? calculateWorkHours(commuteMap[day].startTime, commuteMap[day].endTime) : '0시간 0분' }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';

const commutes = ref([]);
const filterType = ref('week');
const startDate = ref(dayjs().startOf('week').add(1, 'day')); // 주 시작일을 월요일로 설정

// 요일 배열 (월화수목금토일)
const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

// 날짜별 데이터를 매핑하기 위한 객체
const commuteMap = ref({});

const displayDays = computed(() => {
  const days = [];
  if (filterType.value === 'week') {
    for (let i = 0; i < 7; i++) {
      days.push(startDate.value.add(i, 'day').format('YYYY-MM-DD'));
    }
  } else {
    const daysInMonth = startDate.value.daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(startDate.value.date(i).format('YYYY-MM-DD'));
    }
  }
  return days;
});

const formattedDateRange = computed(() => {
  const start = startDate.value;
  if (filterType.value === 'week') {
    const end = start.add(6, 'day');
    return `${start.format('YYYY.MM.DD')} ~ ${end.format('YYYY.MM.DD')}`;
  } else {
    const end = start.endOf('month');
    return `${start.format('YYYY.MM.DD')} ~ ${end.format('YYYY.MM.DD')}`;
  }
});

const setFilterType = (type) => {
  filterType.value = type;
  startDate.value = type === 'week' ? dayjs().startOf('week').add(1, 'day') : dayjs().startOf('month');
  fetchCommutes();
};

const previousPeriod = () => {
  const unit = filterType.value === 'week' ? 'week' : 'month';
  startDate.value = startDate.value.subtract(1, unit);
  fetchCommutes();
};

const nextPeriod = () => {
  const unit = filterType.value === 'week' ? 'week' : 'month';
  startDate.value = startDate.value.add(1, unit);
  fetchCommutes();
};

const fetchCommutes = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/api/v1/commute/my', {
      params: {
        filterType: filterType.value,
        startDate: startDate.value.format('YYYY-MM-DD'),
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      withCredentials: true
    });
    commutes.value = response.data;
    mapCommutesByDay();
  } catch (error) {
    console.error('Error fetching commutes:', error);
  }
};

const mapCommutesByDay = () => {
  commuteMap.value = {};
  commutes.value.forEach((commute) => {
    const day = dayjs(commute.startTime).format('YYYY-MM-DD');
    commuteMap.value[day] = commute;
  });
};

const getBarStyle = (startTime, endTime) => {
  const start = dayjs(startTime);
  const end = dayjs(endTime);

  const totalHours = 24;
  const duration = end.diff(start, 'minutes') / 60;
  const heightPercentage = (duration / totalHours) * 100;

  return {
    height: `${Math.min(heightPercentage, 100)}%`,
    backgroundColor: heightPercentage > 33 ? '#6f42c1' : '#007bff',
  };
};

const formatDayLabel = (day) => {
  const dayOfWeek = dayjs(day).day();
  return weekDays[dayOfWeek === 0 ? 6 : dayOfWeek - 1] + '(' + dayjs(day).format('DD') + ')';
};

const calculateWorkHours = (startTime, endTime) => {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  const duration = end.diff(start, 'minutes');

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}시간 ${minutes}분`;
};

onMounted(fetchCommutes);
</script>

<style scoped>
.commute-summary {
  background: white;
  border: #e4d4e4 solid 2px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  height : 350px;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  width: 100%;
}

.filter-buttons {
  display: flex;
  gap: 10px;
}

.filter-buttons button {
  background-color: #e7e9ed;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
}

.filter-buttons .active {
  background-color: #c4b4dc;
  color: white;
}

.date-range {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  margin-top: 10px;
}

.date-range button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #3a7bd5;
}

.commute-list-container {
  overflow-x: auto;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.commute-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 20px;
  justify-content: center;
}

.commute-item {
  text-align: center;
  width: 60px;
}

.time-bar-container {
  background-color: #e9ecef;
  border-radius: 5px;
  height: 150px; /* 24시간 기준 고정 세로폭 */
  position: relative;
  margin-bottom: 5px;
  display: flex;
  align-items: flex-end;
}

.time-bar {
  width: 100%;
  border-radius: 5px;
  transition: height 0.3s ease;
}

.empty-bar {
  background-color: rgba(200, 200, 200, 0.3); /* 기준 표시용 회색 막대 */
  width: 100%;
  height: 100%; /* 24시간 기준 높이 */
}

.date-info {
  font-size: 14px;
  margin-top: 5px;
  color: #555;
}

.work-duration {
  font-size: 12px;
  color: #3a7bd5;
}

h2 {
  font-family: 'Bold', sans-serif;
  font-size: 20px;
  text-align: center;
  font-color : black;
}
</style>
