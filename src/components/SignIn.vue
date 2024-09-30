<template>
  <div class="login-container">
    <div class="login-card">
      <h2>로그인 하기</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="email">아이디</label>
          <input
              type="email"
              id="email"
              v-model="email"
              placeholder="사원 이메일을 입력하세요"
              required
          />
        </div>

        <div class="input-group">
          <label for="password">비밀번호</label>
          <input
              type="password"
              id="password"
              v-model="password"
              placeholder="영문 대/소문자 포함 8자 이상"
              required
          />
        </div>

        <button type="submit" class="login-button">로그인 하기</button>
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  min-width: 300px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>