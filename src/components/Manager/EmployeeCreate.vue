<template>
  <div class="signup-form">
    <h2>Sign Up</h2>
    <form @submit.prevent="submitForm">
      <!-- Email -->
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="joinDTO.email" required />
      </div>

      <!-- Name -->
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="joinDTO.name" required />
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="joinDTO.password" required />
      </div>

      <!-- Role -->
      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="joinDTO.role" required>
          <option value="ROLE_USER">사원</option>
          <option value="ROLE_ADMIN">관리자</option>
        </select>
      </div>

      <!-- Department (select department by name, store the ID) -->
      <div class="form-group">
        <label for="department">Department</label>
        <select id="department" v-model.number="joinDTO.departmentId" required>
          <option v-for="department in departments" :key="department.departmentId" :value="department.departmentId">
            {{ department.departmentName }}
          </option>
        </select>

      </div>

      <!-- Company Name -->
      <div class="form-group">
        <label for="companyName">Company Name</label>
        <input type="text" id="companyName" v-model="joinDTO.companyName" required />
      </div>

      <!-- Submit Button -->
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';

// Reactive object for joinDTO
const joinDTO = reactive({
  email: '',
  name: '',
  password: '',
  role: 'USER', // Default role as 'USER'
  departmentId: null,
  companyName: ''
});

// Department list
const departments = ref([]);


// Fetch departments on mount
onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/api/v1/department/my', {
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

// Form submit handler
const submitForm = async () => {
  try {
    // Sending POST request to backend
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
.signup-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input,
select {
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
  width: 100%;
  margin-top: 20px;
}

button:hover {
  background-color: #357ab8;
}
</style>
