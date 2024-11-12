<template>
  <div class="employee-page">
    <!-- 근무 정보 상단 섹션 -->
    <CheckInStatus @updateEmail="setEmail" />

    <!-- 신청하기 섹션 -->
    <div class="request-section">
      <h3 class="section-title" @click="toggleRequestSection">
        신청하기 <span class="arrow">{{ isRequestOpen ? "˄" : "˅" }}</span>
      </h3>
      <div class="divider"></div>
      <div v-if="isRequestOpen" class="request-cards">
        <div class="card" @click="openFieldApplyModal">
          <img src="../../assets/workout.png" alt="icon" class="icon" />
          <p class="card-title">외근 신청</p>
          <p class="card-description">폼으로 이동</p>
        </div>
        <div class="card" @click="openHolidayApplyModal">
          <img src="../../assets/vacation.png" alt="icon" class="icon" />
          <p class="card-title">휴가 신청</p>
          <p class="card-description">폼으로 이동</p>
        </div>
        <div class="card" @click="openReviseApplyModal">
          <img src="../../assets/apply.png" alt="icon" class="icon" />
          <p class="card-title">출퇴근 이의</p>
          <p class="card-description">폼으로 이동</p>
        </div>
        <div class="card" @click="openComplaintModal">
          <img src="../../assets/complaint.png" alt="icon" class="icon" />
          <p class="card-title">신고</p>
          <p class="card-description">폼으로 이동</p>
        </div>
      </div>
    </div>

    <!-- 근무 시간 그래프 섹션 -->
    <div class="work-hours-section">
      <div class="chart">
        <FindCommute />
      </div>
    </div>
    <div class="work-hours-section">
      <div class="chart">
        <FindAllowance />
      </div>
    </div>

    <!-- 모달 컴포넌트들 -->
    <FieldApplyModal :isOpen="isFieldApplyModalOpen" @close="closeFieldApplyModal" />
    <HolidayApplyModal :isOpen="isHolidayApplyModalOpen" @close="closeHolidayApplyModal" />
    <ReviseApplyModal :isOpen="isReviseApplyModalOpen" @close="closeReviseApplyModal" />
    <ComplaintModal :isOpen="isComplaintModalOpen" :email="userEmail" @close="closeComplaintModal" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import FindCommute from "@/components/Employee/FindCommute.vue";
import FindAllowance from "@/components/Employee/FindAllowance.vue";
import CheckInStatus from "@/components/Employee/CheckInStatus.vue";
import FieldApplyModal from "@/components/Employee/FieldApplyModal.vue";
import HolidayApplyModal from "@/components/Employee/HolidayApplyModal.vue";
import ReviseApplyModal from "@/components/Employee/ReviseApplyModal.vue";
import ComplaintModal from "@/components/Employee/ComplaintModal.vue";

const isRequestOpen = ref(false);
const isFieldApplyModalOpen = ref(false);
const isHolidayApplyModalOpen = ref(false);
const isReviseApplyModalOpen = ref(false);
const isComplaintModalOpen = ref(false);
 // 기본값 설정, 실제 이메일 정보를 설정하세요.
const userEmail = ref("");

// CheckInStatus로부터 이메일 정보를 업데이트
const setEmail = (email) => {
  userEmail.value = email;
};
const toggleRequestSection = () => {
  isRequestOpen.value = !isRequestOpen.value;
};

const openFieldApplyModal = () => { isFieldApplyModalOpen.value = true; };
const closeFieldApplyModal = () => { isFieldApplyModalOpen.value = false; };

const openHolidayApplyModal = () => { isHolidayApplyModalOpen.value = true; };
const closeHolidayApplyModal = () => { isHolidayApplyModalOpen.value = false; };

const openReviseApplyModal = () => { isReviseApplyModalOpen.value = true; };
const closeReviseApplyModal = () => { isReviseApplyModalOpen.value = false; };

const openComplaintModal = () => { isComplaintModalOpen.value = true; };
const closeComplaintModal = () => { isComplaintModalOpen.value = false; };
</script>

<style scoped>
.employee-page {
  padding: 20px;
  width: 100vw;
  position: relative;
}

.request-section {
  margin: 0 auto;
  background: linear-gradient(to right, #89ace2, #c4b4dc, #e4d4e4);
  padding: 10px 20px;
  border-radius: 15px;
  width: 40%;
  text-align: center;
  position: relative;
  top: -20px; /* 위로 올려 근무 정보 상단 섹션과 일부 겹치도록 설정 */
  z-index: 1; /* 근무 정보 상단 섹션 뒤에 배치 */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.arrow {
  font-size: 18px;
  margin-left: 5px;
}

.divider {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.6);
  margin: 10px 0;
}

.request-cards {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.card {
  background-color: transparent;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}

.card-title {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
}

.card-description {
  font-size: 12px;
}

.work-hours-section {
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-top: 60px; /* 겹치는 효과 후의 상단 여백 추가 */
  z-index: 2; /* 근무 정보 상단 섹션이 위로 보이도록 설정 */
  position: relative;
  padding-top : 10px;
  margin-bottom: 10px;
}

.chart {
  background-color: white;
  border-radius: 10px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@font-face {
  font-family: "Bold";
  src: url("../../assets/NEXONLv1GothicBold.ttf") format("truetype");
  font-weight: 700;
}

h3 {
  font-family: "Bold", sans-serif;
}

</style>
