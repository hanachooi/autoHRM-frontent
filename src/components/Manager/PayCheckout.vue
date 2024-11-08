<template>
  <div>
    <!-- 할인 쿠폰 -->
    <div>
      <input type="checkbox" id="coupon-box" v-model="isCouponApplied" @change="renderPaymentUI" />
      <label for="coupon-box">5,000원 쿠폰 적용</label>
    </div>
    <!-- 결제 UI -->
    <div id="payment-method"></div>
    <!-- 이용약관 UI -->
    <div id="agreement"></div>
    <!-- 결제하기 버튼 -->
    <button class="button" id="payment-button" style="margin-top: 30px" @click="requestPayment" :disabled="!inputEnabled">
      {{ formattedAmount }} 결제하기
    </button>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from "vue";
import {loadPaymentWidget, ANONYMOUS} from "@tosspayments/payment-widget-sdk";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const baseAmount = 50000; // 기본 금액 설정
const discount = 5000; // 할인 금액 설정
const isCouponApplied = ref(false); // 쿠폰 적용 여부
const paymentWidget = ref(null); // 결제 위젯 인스턴스
const inputEnabled = ref(false); // 결제 버튼 활성화 여부

// 현재 결제 금액을 포맷하여 표시
const formattedAmount = computed(() => {
  const amount = isCouponApplied.value ? baseAmount - discount : baseAmount;
  return `${amount.toLocaleString()}원`;
});

// 결제 UI 및 이용약관 UI 렌더링
const renderPaymentUI = async () => {
  const amount = isCouponApplied.value ? baseAmount - discount : baseAmount;

  if (paymentWidget.value) {
    const paymentMethodWidget = await paymentWidget.value.renderPaymentMethods("#payment-method", {
      value: amount,
      currency: "KRW",
      variantKey: "DEFAULT",
    });

    // 결제 UI가 준비되었을 때 버튼 활성화
    paymentMethodWidget.on("ready", () => {
      inputEnabled.value = true;
    });

    // 이용약관 UI 렌더링
    await paymentWidget.value.renderAgreement("#agreement", {
      variantKey: "AGREEMENT",
    });
  }
};

// 결제 요청
const requestPayment = async () => {
  if (paymentWidget.value) {
    await paymentWidget.value.requestPayment({
      orderId: "alApJMENzbeN9eXrYhkkV",
      orderName: "토스 티셔츠 외 2건",
      successUrl: window.location.origin + "/success.html",
      failUrl: window.location.origin + "/fail.html",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      customerMobilePhone: "01012341234",
    });
  }
};

// 컴포넌트 마운트 시 SDK 초기화 및 결제 위젯 설정
onMounted(async () => {
  paymentWidget.value = await loadPaymentWidget(clientKey, ANONYMOUS);

  // 초기 렌더링
  await renderPaymentUI();
});
</script>

<style scoped>
@import '../../../public/style.css';
</style>
