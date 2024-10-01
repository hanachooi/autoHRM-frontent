<template>
  <img alt="Vue logo" src="../assets/logo.png">

  <div class="login-container vh-100 d-flex justify-content-center align-items-center">
    <div class="card p-4 shadow-lg" style="width: 400px;">
      <h3 class="text-center text-dark mb-4">Jassa Admin</h3>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="username" class="form-label">Email</label>
          <input type="text" class="form-control" id="email" v-model="email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn btn-dark w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
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
          // const role = parseJwt(token).role;
          // console.log(role);

          // 헤더에서 토큰 빼와서 로컬스토리지에 저장함
          localStorage.setItem('token', token);
        }
        // 로그인 성공 후 리디렉션
        this.$router.push({ path: "/home" });
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
</style>