<template>
  <div class="rectify-form">
    <h2>외근 신청</h2>
    <form @submit.prevent="submitRectify">
      <div>
        <label for="rectifyDate">외근 날짜:</label>
        <input type="date" v-model="rectifyDate" required />
      </div>

      <div>
        <label for="startTime">외근 시간:</label>
        <input type="time" v-model="startTime" required />
      </div>

      <div>
        <label for="endTime">종료 시간:</label>
        <input type="time" v-model="endTime" required />
      </div>

      <div>
        <label for="content">외근 사유:</label>
        <textarea v-model="content" placeholder="정정 사유를 입력하세요" required></textarea>
      </div>

      <button type="submit">신청</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rectifyDate: '',
      startTime: '',
      endTime: '',
      content: ''
    };
  },
  methods: {
    async submitRectify() {
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        const requestData = {
          rectifyDate: this.rectifyDate,
          startTime: `${this.rectifyDate}T${this.startTime}:00`, // LocalDateTime 형식으로 변환
          endTime: `${this.rectifyDate}T${this.endTime}:00`,     // LocalDateTime 형식으로 변환
          content: this.content
        };

        await axios.post('http://localhost:8080/api/v1/apply/fieldwork', requestData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          withCredentials: true
        });

        alert('외근 신청이 성공적으로 제출되었습니다.');
      } catch (error) {
        alert('외근 신청에 실패하였습니다. 다시 시도해주세요.');
      }
    }
  }}

</script>

<style scoped>
.rectify-form {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input, textarea {
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
