<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">출퇴근 조회</h5>
      <p class="card-text">
        Jassa<br />
        You can also try different version of Bootstrap V4 side menu. Click below link to view all Bootstrap Menu versions.
      </p>
      <a href="#" class="card-link">Link</a>
      <a href="#" class="card-link">Another link</a>

      <div>
        <label for="filterType">필터 타입:</label>
        <select v-model="filterType">
          <option value="week">주별</option>
          <option value="month">달별</option>
        </select>

        <label for="startDate">시작 날짜:</label>
        <input type="date" v-model="startDate" />

        <button @click="fetchCommutes">조회</button>
      </div>

      <ul>
        <li v-for="commute in commutes" :key="commute.id">
          {{ commute.startTime }} - {{ commute.endTime }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const commutes = ref([]);
const filterType = ref('week');
const startDate = ref('');

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

</script>


<style scoped>

</style>