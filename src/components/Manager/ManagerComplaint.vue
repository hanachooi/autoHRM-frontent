<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 신고 데이터와 신고 횟수를 저장할 ref 변수
const complaints = ref([]);
const complaintCount = ref(0);

// API 요청을 통해 데이터를 가져오는 함수
const fetchComplaints = async () => {
  try {
    const token = localStorage.getItem('token');
    // 신고 내역 가져오기
    const responseComplaints = await axios.get('http://211.253.28.110:8080/api/v1/complaint/my', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      withCredentials: true,
    });
    complaints.value = responseComplaints.data;

    // 신고 횟수 가져오기
    const responseCount = await axios.get('http://211.253.28.110:8080/api/v1/complaint/count/my', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      withCredentials: true,
    });
    complaintCount.value = responseCount.data;
  } catch (error) {
    console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
  }
};

// 컴포넌트가 처음 마운트될 때 데이터를 가져옵니다.
onMounted(fetchComplaints);
</script>

<template>
  <div class="layout">
    <!-- 신고 횟수 표시 -->
    <div class="complaint-count">
      월급 미지급 신고 횟수: {{ complaintCount }}
    </div>
    사원수의 10%프로가 신고를 하게 되면 서비스가 블락됩니다.

    <!-- 신고 내역 테이블 -->
    <div class="complaint-table">
      <table>
        <thead>
        <tr>
          <th>사원번호</th>
          <th>제목</th>
          <th>설명</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="complaint in complaints" :key="complaint.id">
          <td>{{ complaint.email }}</td>
          <td>{{ complaint.title }}</td>
          <td>{{ complaint.description }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  margin-top: 30px;
  width: calc(100% - 250px);
  margin-left: 400px;
}

.complaint-count {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.complaint-table {
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
</style>
