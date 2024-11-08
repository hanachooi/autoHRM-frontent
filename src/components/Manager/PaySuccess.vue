<template>
  <div>
    <h2>결제 성공</h2>
    <p>주문번호: {{ orderId }}</p>
    <p>결제 금액: {{ amount }}원</p>
    <p>paymentKey: {{ paymentKey }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const paymentKey = ref(null);
const orderId = ref(null);
const amount = ref(null);
const router = useRouter();

// 서버에 결제 확인 요청을 보냅니다.
const confirmPayment = async () => {
  try {
    const requestData = {
      paymentKey: paymentKey.value,
      orderId: orderId.value,
      amount: amount.value,
    };

    const response = await fetch("/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const json = await response.json();

    if (!response.ok) {
      // 결제 실패 시 실패 페이지로 리다이렉트
      console.error(json);
      router.push(`/fail?message=${json.message}&code=${json.code}`);
    }

    // 결제 성공 비즈니스 로직 추가 가능
    console.log("결제 성공:", json);
  } catch (error) {
    console.error("결제 확인 중 오류 발생:", error);
  }
};

// 컴포넌트가 마운트되면 URL 쿼리에서 결제 정보를 가져옵니다.
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  paymentKey.value = urlParams.get("paymentKey");
  orderId.value = urlParams.get("orderId");
  amount.value = urlParams.get("amount");

  // 결제 확인 요청을 보냅니다.
  confirmPayment();
});
</script>

<style scoped>
/* 필요에 따라 스타일 추가 */
</style>
