<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>불만 사항 제출</h2>
      <form @submit.prevent="submitComplaint">
        <div class="form-group">
          <label for="email">이메일:</label>
          <input type="email" :value="email" readonly />
        </div>

        <div class="form-group">
          <label for="title">제목:</label>
          <input type="text" v-model="title" placeholder="제목을 입력하세요" required />
        </div>

        <div class="form-group">
          <label for="description">내용:</label>
          <textarea v-model="description" placeholder="내용을 입력하세요" required></textarea>
        </div>

        <button type="submit" class="submit-button">제출</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// eslint-disable-next-line no-undef
const props = defineProps({
  isOpen: Boolean,
  email: String,
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["close"]);

const title = ref("");
const description = ref("");

const closeModal = () => {
  emit("close");
};

const submitComplaint = async () => {
  try {
    const token = localStorage.getItem("token");
    const requestData = {
      email: props.email,
      title: title.value,
      description: description.value,
    };

    await axios.post("http://172.27.0.13:8080/api/v1/complaint", requestData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      withCredentials: true,
    });

    alert("불만 사항이 성공적으로 제출되었습니다.");
    closeModal();
  } catch (error) {
    alert("불만 사항 제출에 실패하였습니다. 다시 시도해주세요.");
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #888;
  transition: color 0.2s;
}

.close:hover {
  color: #333;
}

h2 {
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

textarea {
  resize: vertical;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #706bad;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #55488d;
}
</style>
