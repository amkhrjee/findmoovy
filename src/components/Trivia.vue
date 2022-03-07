<script setup>
import { useMessage } from "naive-ui";
import { onBeforeMount, ref } from "vue";
import ConfettiExplosion from "vue-confetti-explosion";
import { Icon } from "@vicons/utils";
import { ArrowCircleRight } from "@vicons/fa";

const question = ref("");
const correctAns = ref("");
const wrongAns = ref([]);
const allAns = ref([]);
const showConfetti = ref(false);
const shuffledAns = ref([]);
const refinedQuestion = ref("");
const message = useMessage();
const handleOptionClick = (ans) => {
  if (ans == correctAns.value) {
    navigator.vibrate(1000);
    message.success("Good job! That's correct!", { duration: 1000 });
    setTimeout(() => {
      showConfetti.value = true;
    }, 1000);
  } else {
    message.error("That's not correct!", { duration: 1000 });
    navigator.vibrate(50);
  }
};
//shuffling the answers array (Knuth Shuffle)
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const fetchTrivia = () => {
  // count++;
  showConfetti.value = false;
  fetch("https://opentdb.com/api.php?amount=1&category=11&type=multiple")
    .then((res) => res.json())
    .then((data) => {
      question.value = data.results[0].question;
      correctAns.value = data.results[0].correct_answer;
      wrongAns.value = data.results[0].incorrect_answers;
      allAns.value = [...wrongAns.value, correctAns.value];
      shuffledAns.value = shuffle(allAns.value);
    });
};
onBeforeMount(() => {
  fetch("https://opentdb.com/api.php?amount=1&category=11&type=multiple")
    .then((res) => res.json())
    .then((data) => {
      question.value = data.results[0].question;
      correctAns.value = data.results[0].correct_answer;
      wrongAns.value = data.results[0].incorrect_answers;
      allAns.value = [...wrongAns.value, correctAns.value];
      shuffledAns.value = shuffle(allAns.value);
    });
});
</script>
<template>
  <n-card aria-label="trivia question" style="width: 90%" title="Do you know this one?">
    <n-space v-if="question" vertical>
      <n-p strong>{{ question.replace(/&quot;/g, '\\"') }}</n-p>
      <n-space justify="center">
        <n-button-group
          style="min-width: 15rem; max-width: 100%; overflow: hidden"
          size="medium"
          vertical
          justify="center"
        >
          <n-button
            aria-label="answer option"
            @click="handleOptionClick(ans)"
            v-for="ans in shuffledAns"
            >{{ ans }}</n-button
          >
        </n-button-group>
        <n-button
          aria-label="Give another trivia question"
          @click="fetchTrivia"
          v-if="showConfetti"
          class="mt-4 ml-4"
        >
          Give me another one
          <template #icon>
            <Icon>
              <ArrowCircleRight />
            </Icon>
          </template>
        </n-button>
      </n-space>
    </n-space>
    <n-space vertical v-else>
      <n-skeleton text :repeat="2" size="medium" />
      <n-skeleton text />
    </n-space>
  </n-card>

  <ConfettiExplosion v-if="showConfetti" :particleCount="200" />
</template>
