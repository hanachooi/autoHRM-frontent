<template>
  <div>
    <h2>임금 지급 완료</h2>
    <p>지급번호: {{ orderId }}</p>

    <p>지급대상사원: {{name}}</p>
    <p>지급금액: {{ amount }}원</p>
  </div>
</template>


<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';

const paymentKey = ref(null);
const orderId = ref(null);
const amount = ref(null);
const name = ref(null);
const email = ref(null);
const year = ref(null);
const month = ref(null);
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

    console.log("결제 성공:", json);
  } catch (error) {
    console.error("결제 확인 중 오류 발생:", error);
  }
};

// 컴포넌트가 마운트되면 URL 쿼리에서 결제 정보를 가져옵니다.
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);

  orderId.value = urlParams.get("orderId");
  amount.value = urlParams.get("amount");
  name.value = urlParams.get("name");
  email.value = urlParams.get("email");
  year.value = urlParams.get("year");
  month.value = urlParams.get("month");

  // 결제 확인 요청을 보냅니다.
  confirmPayment();
});
</script>
