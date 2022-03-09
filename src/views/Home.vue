<script setup>
import SearchBar from "../components/SearchBar.vue";
import Trivia from "../components/Trivia.vue";
// silly log messages
console.log(
  "%cHello there, hacker 👋🏻!",
  "color: skyblue; font-size:3rem;font-family:system-ui; font-weight:800;"
);
console.log(
  "%cHave a great day and maybe add me on discord: %camkhrjee#7376 😉",
  "color: grey; font-size:1rem;font-family:system-ui; font-weight:400;",
  "color: blue; font-size:1rem;font-family:system-ui; font-weight:400;"
);
</script>

<template>
  <n-space justify="center" class="pt-4">
    <SearchBar />
  </n-space>
  <div class="flex justify-center mt-4">
    <Trivia />
  </div>
</template>
