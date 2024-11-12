<template>
  <div class="image-container">
    <img class="login-header" alt="Login Header" src="../assets/loginheader.jpg"/>
    <div class="welcome-text">AUTOHRM 서비스에 오신것을 환영합니다.</div>

    <!-- 버튼 영역 -->
    <div class="button-container">
      <button @click="showLoginOverlay" class="login-button">로그인</button>
      <button @click="showSignupOverlay" class="company-join-button">회원가입 for company</button>
    </div>

    <!-- 로그인 폼 오버레이 -->
    <div v-if="isLoginOverlayVisible" class="overlay" @click.self="hideLoginOverlay">
      <div class="overlay-container">
        <img class="login-logo" alt="Vue logo" src="../assets/logo.png">
        <h3 class="text-center text-dark mb-4">사원 로그인</h3>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">사원이메일</label>
            <input type="text" class="form-control" id="email" v-model="email" required/>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">비밀번호</label>
            <input type="password" class="form-control" id="password" v-model="password" required/>
          </div>
          <button type="submit" class="btn btn-dark w-100">로그인</button>
        </form>
      </div>
    </div>

    <!-- 회원가입 폼 오버레이 -->
    <div v-if="isSignupOverlayVisible" class="overlay" @click.self="hideSignupOverlay">
      <div class="overlay-container">
        <h3 class="text-center text-dark mb-4">회사 등록</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="companyName">회사명</label>
            <input type="text" v-model="companyDTO.companyName" id="companyName" required />
          </div>
          <div class="form-group">
            <label for="companyAddress">회사주소</label>
            <input type="text" v-model="companyDTO.companyAddress" id="companyAddress" required />
          </div>
          <div class="form-group">
            <label for="companyPhone">회사번호</label>
            <input type="tel" v-model="companyDTO.companyPhone" id="companyPhone" required />
          </div>
          <div class="form-group">
            <label for="ownerName">대표자명</label>
            <input type="text" v-model="companyDTO.ownerName" id="ownerName" required />
          </div>
          <div class="form-group">
            <label for="registrationNumber">사업자번호</label>
            <input type="text" v-model="companyDTO.registrationNumber" id="registrationNumber" required />
          </div>
          <div class="form-group">
            <label for="owner_email">대표자 이메일</label>
            <input type="email" v-model="companyDTO.owner_email" id="owner_email" placeholder="관리자계정 아이디로 사용됩니다." required />
          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" v-model="companyDTO.password" id="password" placeholder="관리자계정 비밀번호로 사용됩니다." required />
          </div>

          <!-- 부서 추가 부분 -->
          <div class="form-group">
            <label>부서</label>
            <div v-for="(department, index) in companyDTO.departments" :key="index" class="department-input">
              <input type="text" v-model="companyDTO.departments[index]" :placeholder="'부서' + (index + 1)" />
              <button type="button" @click="removeDepartment(index)">제거</button>
            </div>
            <button type="button" @click="addDepartment" class="add-department-button">부서추가</button>
          </div>
          <button type="submit" class="submit-button">AUTOHRM과 시작하기</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { parseJwt } from "@/utils/auth";
import router from "@/router";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      isLoginOverlayVisible: false,
      isSignupOverlayVisible: false,
      companyDTO: {
        companyName: '',
        companyAddress: '',
        companyPhone: '',
        ownerName: '',
        registrationNumber: '',
        owner_email: '',
        password: '',
        departments: [''] // 부서 필드를 초기화
      }
    };
  },
  methods: {
    showLoginOverlay() {
      this.isLoginOverlayVisible = true;
      this.isSignupOverlayVisible = false;
    },
    hideLoginOverlay() {
      this.isLoginOverlayVisible = false;
    },
    showSignupOverlay() {
      this.isSignupOverlayVisible = true;
      this.isLoginOverlayVisible = false;
    },
    hideSignupOverlay() {
      this.isSignupOverlayVisible = false;
    },
    async login() {
      try {
        const response = await axios.post("http://211.253.28.110:8080/login", null, {
          params: {
            email: this.email,
            password: this.password,
          },
        });
        if (response.status === 200) {
          const token = response.headers.authorization;
          const role = parseJwt(token).role;
          localStorage.setItem('token', token);
          if (role === 'ROLE_ADMIN') {
            await router.push('/manager/home');
          } else if (role === 'ROLE_USER') {
            await router.push('/employee/home');
          } else {
            await router.push('/sign-in');
          }
        }
      } catch (error) {
        console.error(error);
        alert("로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요");
      }
    },
    addDepartment() {
      this.companyDTO.departments.push('');
    },
    removeDepartment(index) {
      this.companyDTO.departments.splice(index, 1);
    },
    async submitForm() {
      try {
        const response = await axios.post('http://211.253.28.110:8080/company', this.companyDTO);
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
body {
  background-color: #f8f9fa;
}

.image-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.login-header {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.welcome-text {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
}

/* 버튼들을 가로로 배치 */
.button-container {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
}

.company-join-button,
.login-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #706bad;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 180px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.company-join-button:hover,
.login-button:hover {
  background-color: #55488d;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  overflow-y: auto;
}

.overlay-container {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-height: 90vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-top: 5px;
}

.submit-button,
.add-department-button {
  background-color: #706bad;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.add-department-button {
  width: auto;
  margin-top: 10px;
}

.department-input {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.add-department-button:hover,
.submit-button:hover {
  background-color: #55488d;
}
.login-logo {
  width: 300px; /* 이미지 너비를 적절히 제한 */
  height: auto;
  margin: 0 auto 20px; /* 가운데 정렬과 아래쪽 여백 추가 */
  display: block;
}

</style>
