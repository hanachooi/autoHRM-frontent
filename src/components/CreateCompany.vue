<template>
  <div class="signup-form">
    <h2>Company Registration</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="companyName">Company Name</label>
        <input type="text" v-model="companyDTO.companyName" id="companyName" required />
      </div>

      <div class="form-group">
        <label for="companyAddress">Company Address</label>
        <input type="text" v-model="companyDTO.companyAddress" id="companyAddress" required />
      </div>

      <div class="form-group">
        <label for="companyPhone">Company Phone</label>
        <input type="tel" v-model="companyDTO.companyPhone" id="companyPhone" required />
      </div>

      <div class="form-group">
        <label for="ownerName">Owner Name</label>
        <input type="text" v-model="companyDTO.ownerName" id="ownerName" required />
      </div>

      <div class="form-group">
        <label for="registrationNumber">Registration Number</label>
        <input type="text" v-model="companyDTO.registrationNumber" id="registrationNumber" required />
      </div>

      <div class="form-group">
        <label for="owner_email">Owner Email</label>
        <input type="email" v-model="companyDTO.owner_email" id="owner_email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="companyDTO.password" id="password" required />
      </div>

      <!-- 부서 추가 부분 -->
      <div class="form-group">
        <label>Departments</label>
        <div v-for="(department, index) in companyDTO.departments" :key="index" class="department-input">
          <input
              type="text"
              v-model="companyDTO.departments[index]"
              :placeholder="'Department ' + (index + 1)"
          />
          <button type="button" @click="removeDepartment(index)">Remove</button>
        </div>
        <button type="button" @click="addDepartment">Add Department</button>
      </div>

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      companyDTO: {
        companyName: '',
        companyAddress: '',
        companyPhone: '',
        ownerName: '',
        registrationNumber: '',
        owner_email: '',
        password: '',
        departments: [''] // 부서 필드를 초기화 (최소 하나의 입력 필드를 제공)
      }
    };
  },
  methods: {
    addDepartment() {
      this.companyDTO.departments.push(''); // 부서 추가 시 빈 필드 추가
    },
    removeDepartment(index) {
      this.companyDTO.departments.splice(index, 1); // 부서 삭제
    },
    async submitForm() {
      try {
        // 서버에 회원가입 요청 보내기
        const response = await axios.post('http://localhost:8080/company', this.companyDTO);
        if (response.status === 200) {
          alert('회사 생성이 완료되었습니다. 입력한 이메일과 비밀번호로 서비스를 이용할 수 있습니다.');
        }
      } catch (error) {
        console.error('Error registering company:', error);
        alert('Registration failed. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
.signup-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  background-color: #4a90e2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"] {
  margin-top: 20px;
  display: block;
  width: 100%;
}

button:hover {
  background-color: #357ab8;
}

.department-input {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
