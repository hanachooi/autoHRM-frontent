<template>
  <div class="image-container">
    <img class="login-header" alt="Login Header" src="../assets/loginheader.jpg"/>
    <div class="welcome-text">저희 서비스에 오신 것을 환영합니다.</div>
    <button @click="goToCompanyJoin">Company Join</button>
  </div>
  <div class="login-container bg-light vh-100 d-flex justify-content-center align-items-center">
    <div class="card p-2 shadow-lg" style="width: 400px;">
      <img class="login-logo" alt="Vue logo" src="../assets/logo1.png">
      <h3 class="text-center text-dark mb-4">로그인</h3>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="username" class="form-label">Email</label>
          <input type="text" class="form-control" id="email" v-model="email" required/>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required/>
        </div>
        <button type="submit" class="btn btn-dark w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {parseJwt} from "@/utils/auth";
import router from "@/router";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    goToCompanyJoin() {
      this.$router.push('/company-join');
    },
    async login() {
      try {
        const response = await axios.post("http://localhost:8080/login", null, {
          params: {
            email: this.email,
            password: this.password,
          },
        });
        console.log(response.data);
        if (response.status === 200) {
          const token = response.headers.authorization;
          console.log(token);
          const role = parseJwt(token).role;
          console.log(role);

          // 헤더에서 토큰 빼와서 로컬스토리지에 저장함
          localStorage.setItem('token', token);

          // 로그인 후 redirection
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
  },
};
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}

.login-container {
  background-color: #f8f9fa;
}

.card {
  border-radius: 10px;
}

.login-header {
  width: 100vw;
  height: 500px;
}

.login-logo {
  padding: 20px;
}

.image-container {
  width: 100vw;
  position: relative;
  display: inline-block;
  height: 500px;
}

.login-header {
  width: 100%;
  height: auto;
}

.welcome-text {
  position: absolute;
  top: 50%; /* 이미지의 세로 중앙 */
  left: 50%; /* 이미지의 가로 중앙 */
  transform: translate(-50%, -50%); /* 텍스트의 중앙 정렬 */
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7); /* 텍스트에 그림자 추가 */
}

</style>