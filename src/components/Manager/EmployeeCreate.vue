<template>
  <div class="layout">
    <div class="main-content">
      <h2>신규 사원 등록</h2>
      <form @submit.prevent="submitForm">
        <!-- Email -->
        <div class="form-group">
          <label for="email">사원이메일</label>
          <input type="email" id="email" v-model="joinDTO.email" required />
        </div>

        <!-- Name -->
        <div class="form-group">
          <label for="name">사원이름</label>
          <input type="text" id="name" v-model="joinDTO.name" required />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="joinDTO.password" required />
        </div>

        <!-- Role -->
        <div class="form-group">
          <label for="role">권한</label>
          <select id="role" v-model="joinDTO.role" required>
            <option value="ROLE_USER">사원</option>
            <option value="ROLE_ADMIN">관리자</option>
          </select>
        </div>

        <!-- Department -->
        <div class="form-group">
          <label for="department">부서</label>
          <select id="department" v-model.number="joinDTO.departmentId" required>
            <option v-for="department in departments" :key="department.departmentId" :value="department.departmentId">
              {{ department.departmentName }}
            </option>
          </select>
        </div>

        <!-- Company Name -->
        <div class="form-group">
          <label for="companyName">회사명</label>
          <input type="text" id="companyName" v-model="joinDTO.companyName" required />
        </div>

        <!-- Submit Button -->
        <button type="submit">등록</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';

const joinDTO = reactive({
  email: '',
  name: '',
  password: '',
  role: 'USER',
  departmentId: null,
  companyName: ''
});

const departments = ref([]);

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://211.253.28.110:8080/api/v1/department/my', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      withCredentials: true
    });
    departments.value = response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
});

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:8080/join', joinDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      alert('Registration successful');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert('Registration failed. Please try again.');
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
  max-width: 800px;
  width: 650px;
  margin: 0 auto; /* 가로 중앙 정렬 */
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
  text-align: left;
}
h2 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
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
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}

button {
  background-color: #141464;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  font-size: 16px;
}

button:hover {
  background-color: #0f0f52;
}
</style>
