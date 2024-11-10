<template>
  <div class="layout">
    <p><strong>지급대상사원:</strong> {{ name }}</p>
    <p><strong>사원이메일:</strong> {{ email }}</p>
    <p><strong></strong> {{ year }}년 {{ month }}월 월급</p>
    <p><strong>미지급금:</strong> {{ formattedUnpaid }}</p>
    <div id="payment-method"></div>
    <div id="agreement"></div>
    <button class="button" id="payment-button" @click="requestPayment">
      {{ formattedUnpaid }} 결제하기
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { useRoute } from "vue-router";
import router from "@/router";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const paymentWidget = ref(true);

const route = useRoute();
const name = route.query.name;
const email = route.query.email;
const year = route.query.year;
const month = route.query.month;
const unpaid = parseInt(route.query.unpaid, 10);
const id = route.query.id;
const paymentError = ref(null);

const formattedUnpaid = computed(() => `${unpaid.toLocaleString()}원`);

const renderPaymentUI = async () => {
  if (paymentWidget.value) {
    await paymentWidget.value.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
  }
};

const requestPayment = async () => {

  try {
    if (paymentWidget.value) {
      await paymentWidget.value.requestPayment({
        orderId: `order_${Date.now()}`,
        orderName: `${name}사원님 ${year}년 ${month}월 급여 지급`,
        successUrl: `${window.location.origin}/manager/pay/success?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&year=${year}&month=${month}&unpaid=${unpaid}&id=${id}`,
        failUrl: `${window.location.origin}/manager/pay/fail`,
        customerEmail: email,
        customerName: name,
      });
    }
  } catch (error) {
    if (error.code === "USER_CANCEL") {
      paymentError.value = "결제가 취소되었습니다. 다시 시도해 주세요.";
      await router.push(`/manager/salaries`);
    } else {
      paymentError.value = "결제 중 오류가 발생했습니다. 다시 시도해 주세요.";
      await router.push(`/manager/salaries`);
    }
  }
};

onMounted(async () => {
  paymentWidget.value = await loadPaymentWidget(clientKey, ANONYMOUS);
  await paymentWidget.value.renderPaymentMethods("#payment-method", { value: unpaid, currency: "KRW" });
  await renderPaymentUI();
});
</script>

<style scoped>
@import '../../../public/style.css';

.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-top: 10px;
  margin-left:650px;
}

p, #payment-method, #agreement, #payment-button {
  margin: 10px 0;
}

.button {
  background-color: #141464;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.button:hover {
  background-color: #0f0f52;
}
</style>
