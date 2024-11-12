<template>
  <div class="layout">
    <div class="main-content">
      <h2>신청 기록</h2>

      <!-- 필터 input과 조회 버튼 -->
      <div class="filter-section">
        <select v-model="typeFilter">
          <option value="">전체 유형</option>
          <option v-for="(label, key) in typeOptions" :value="key" :key="key">{{ label }}</option>
        </select>
        <select v-model="statusFilter">
          <option value="">전체 상태</option>
          <option value="미처리">미처리</option>
          <option value="반려">반려</option>
          <option value="승인">승인</option>
        </select>
        <button @click="fetchData">조회</button>
      </div>

      <table class="applies-table">
        <thead>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>신청 날짜</th>
          <th>시작 시간</th>
          <th>종료 시간</th>
          <th>신청 유형</th>
          <th>신청 사유</th>
          <th>처리 상태</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(apply, index) in applyData" :key="index">
          <tr>
            <td>{{ apply.name }}</td>
            <td>{{ apply.email }}</td>
            <td>{{ new Date(apply.applyDate).toLocaleString() }}</td>
            <td>{{ new Date(apply.startTime).toLocaleString() }}</td>
            <td>{{ apply.endTime ? new Date(apply.endTime).toLocaleString() : "근무 중" }}</td>
            <td>{{ typeOptions[apply.type] || apply.type }}</td>
            <td>{{ apply.content }}</td>
            <td>
              <button @click="showStatusMenu(apply.id)" :class="['status-button', apply.status === '승인' ? 'approved' : apply.status === '반려' ? 'rejected' : 'pending']">
                {{ apply.status || "미처리" }}
              </button>
              <div v-if="selectedApplyId === apply.id" class="status-menu">
                <button @click="updateApplyStatus(apply.id, apply.type, '승인')">승인</button>
                <button @click="updateApplyStatus(apply.id, apply.type, '반려')">반려</button>
              </div>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const applyData = ref([]);
const emailFilter = ref("");
const typeFilter = ref("");
const statusFilter = ref("");

// 타입 옵션을 정의하여 한글로 표시
const typeOptions = {
  holiday: "휴가",
  fieldwork: "외근",
  commute: "출퇴근 이의",
};

const selectedApplyId = ref(null);

const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://211.253.28.110:8080/api/v1/applies/my", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      withCredentials: true,
      params: {
        email: emailFilter.value || null,
        type: typeFilter.value || null,
        status: statusFilter.value || null,
      },
    });

    applyData.value = response.data;
  } catch (error) {
    console.error("데이터 요청 오류:", error);
  }
};

const showStatusMenu = (id) => {
  selectedApplyId.value = selectedApplyId.value === id ? null : id;
};

const updateApplyStatus = async (id, type, status) => {
  try {
    const token = localStorage.getItem("token");
    await axios.patch("http://211.253.28.110:8080/api/v1/apply/holiday", null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      params: {
        id: id,
        type: type,
        status: status,
      },
    });

    fetchData(); // 변경 후 데이터 갱신
    selectedApplyId.value = null; // 메뉴 닫기
  } catch (error) {
    console.error("상태 변경 오류:", error);
  }
};

// 초기 데이터 로드
onMounted(() => {
  emailFilter.value = "";
  fetchData();
});
</script>

<style scoped>
.layout {
  display: flex;
  justify-content: flex-start;
  padding-top: 30px;
  width: calc(100% - 250px);
  margin-left: 300px;
}

@font-face {
  font-family: "Bold";
  src: url("../../assets/NEXONLv1GothicBold.ttf") format("truetype");
  font-weight: 700;
}

h2 {
  font-family: "Bold", sans-serif;
  margin-bottom: 20px;
}

.filter-section {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

input[type="email"],
select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
}

button {
  background-color: #141464;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0f0f52;
}

.status-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.status-button.pending {
  background-color: #6c757d;
  color: white;
}

.status-button.approved {
  background-color: #28a745;
  color: white;
}

.status-button.rejected {
  background-color: #dc3545;
  color: white;
}

.status-menu {
  position: absolute;
  display: flex;
  gap: 5px;
  margin-top: 5px;
}

.applies-table {
  width: 100%;
  border-collapse: collapse;
}

.applies-table th,
.applies-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  vertical-align: middle;
}

.applies-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.applies-table td {
  background-color: #ffffff;
}

.main-content {
  max-width: 1500px;
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
}
</style>
