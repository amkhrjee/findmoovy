<script setup>
import { onBeforeMount, ref } from "vue";

const question = ref("");
const correctAns = ref("");
const wrongAns = ref([]);
const allAns = ref([]);
const selected = ref("");
// const buttonType = (ans) => {
//   if (ans === correctAns.value) {
//     return "success";
//   } else {
//     return "error";
//   }
// };

const handleOptionClick = (ans) => {
  if (ans == correctAns.value) {
  } else {
    navigator.vibrate(50);
  }
};
onBeforeMount(() => {
  fetch("https://opentdb.com/api.php?amount=1&category=11&type=multiple")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      question.value = data.results[0].question;
      correctAns.value = data.results[0].correct_answer;
      wrongAns.value = data.results[0].incorrect_answers;
      allAns.value = [...wrongAns.value, correctAns.value];
    });
});
</script>
<template>
  <n-card v-if="question" style="width: 90%" title="Do you know this one?">
    <n-p strong>{{ question }}</n-p>
    <n-space justify="center">
      <n-button-group style="min-width: 15rem" size="medium" vertical justify="center">
        <n-button @click="handleOptionClick(ans)" v-for="ans in allAns">{{
          ans
        }}</n-button>
      </n-button-group>
    </n-space>
  </n-card>
</template>
