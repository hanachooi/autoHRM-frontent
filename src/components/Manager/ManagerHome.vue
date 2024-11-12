<template>
  <div class="layout">
    <!-- 메인 콘텐츠 영역 -->
    <div class="main-content">
      <h2>사원 관리</h2>

      <!-- Department Selection -->
      <div class="form-group">
        <label for="department">부서</label>
        <select id="department" v-model.number="selectedDepartmentId">
          <option value="">전체부서</option>
          <option v-for="department in departments" :key="department.departmentId" :value="department.departmentId">
            {{ department.departmentName }}
          </option>
        </select>
      </div>

      <!-- Employee Email Input -->
      <div class="form-group">
        <label for="email">사원 이메일</label>
        <input type="email" id="email" v-model="employeeEmail" placeholder="사원 이메일을 입력하세요" />
      </div>

      <!-- Search Button -->
      <button @click="fetchEmployees">검색</button>

      <!-- Result Table -->
      <div class="result-table" v-if="employees.length">
        <table>
          <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>부서</th>
            <th>작업</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="employee in employees" :key="employee.email">
            <td>{{ employee.name }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.departmentName }}</td>
            <td>
              <button @click="openModal(employee.email)">수정</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- No Results Found -->
      <div v-else class="no-results">
        사원을 찾을 수 없습니다.
      </div>

      <!-- External Modal for Employee Details -->
      <ExternalModal v-if="isModalOpen" :email="selectedEmployeeEmail" @close="closeModal" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ExternalModal from './EmployeeDetailsModal.vue';

const departments = ref([]);
const employees = ref([]);
const selectedDepartmentId = ref(null);
const employeeEmail = ref(null);
const selectedEmployeeEmail = ref(null);
const isModalOpen = ref(false);

// 모달 열기
const openModal = (email) => {
  selectedEmployeeEmail.value = email;
  console.log(selectedEmployeeEmail.value)
  isModalOpen.value = true;
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
  selectedEmployeeEmail.value = null;
};


// 초기 데이터 불러오기
onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://211.253.28.110:8080/api/v1/department/my', {
      headers: { 'Authorization': `${token}` },
      withCredentials: true,
    });
    departments.value = response.data;
    await fetchEmployees();
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
});

// 사원 데이터 불러오기
const fetchEmployees = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://211.253.28.110:8080/api/v1/employees/my', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      params: {
        departmentId: selectedDepartmentId.value || null,
        employeeEmail: employeeEmail.value || null,
      },
      withCredentials: true,
    });
    employees.value = response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
};
</script>

<style scoped>
@font-face {
font-family: 'Bold';
src: url('../../assets/NEXONLv1GothicBold.ttf') format('truetype');
font-weight: 700;
}

h2{
font-family: 'Bold', sans-serif;
}

.layout {
display: flex;
justify-content: flex-start; /* 왼쪽으로 정렬 */
padding-top: 30px; /* 세로 상단 위치 */
width: calc(100% - 250px); /* 사이드바 너비(250px)를 제외한 전체 폭 */
margin-left: 400px; /* 사이드바 너비만큼 왼쪽 마진 */
}

.main-content {
max-width: 700px;
width: 650px;
margin: 0 auto; /* 가로 중앙 정렬 */
padding: 20px;
}

.form-group {
margin-bottom: 20px;
width: 100%;
text-align: left;
}

label {
display: block;
margin-bottom: 5px;
font-weight: bold;
}

input,
select {
width: 100%;
padding: 10px;
margin-bottom: 10px;
border: 1px solid #ddd;
border-radius: 5px;
box-sizing: border-box;
}

button {
background-color: #141464;
color: white;
padding: 10px 20px;
border: none;
border-radius: 5px;
cursor: pointer;
}

button:hover {
background-color: #0f0f52;
}

.result-table {
margin-top: 20px;
overflow-x: auto; /* 테이블이 화면을 넘어갈 경우 스크롤 */
}

table {
width: 100%;
border-collapse: collapse;
min-width: 600px; /* 테이블의 최소 너비 설정 */
}

th,
td {
padding: 10px;
border: 1px solid #ddd;
text-align: center;
}

th {
background-color: #f4f4f4;
}

.no-results {
margin-top: 20px;
font-size: 18px;
color: #888;
}
</style>
