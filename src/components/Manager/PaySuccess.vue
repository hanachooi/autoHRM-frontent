<template>
  <div>
    <h2>임금 지급 완료</h2>
    <p>지급번호: {{ orderId }}</p>
    <p>{{id}}</p>
    <p>지급대상사원: {{name}}</p>
    <p>지급금액: {{ amount }}원</p>
  </div>
</template>


<script setup>
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import axios from "axios";

const orderId = ref(null);
const amount = ref(null);
const name = ref(null);
const email = ref(null);
const year = ref(null);
const month = ref(null);
const id = ref(null);
const router = useRouter();

// 서버에 결제 확인 요청을 보냅니다.
const confirmPayment = async () => {
  try {
    console.log(id.value)
    console.log(amount.value)
    const response = await axios.patch('http://211.253.28.110:8080/api/v1/salary/ok',
        null, // 본문 데이터가 필요하지 않을 경우 null을 두 번째 인자로 전달
        {
          headers: {
            'Content-Type': 'application/json',
          },
          params: { // URL 쿼리 매개변수로 전달
            salaryId: id.value || null,
            paiedAmount: amount.value || null,
          },
          withCredentials: true,
        }
    );

    if (response.status === 200) {
      console.log('월급 반영 성공');
      await router.push(`/manager/salaries`);
    } else {
      await router.push(`/manager/pay/fail`);
    }
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
  id.value = urlParams.get("id");

  // 결제 확인 요청을 보냅니다.
  confirmPayment();
});
</script>
