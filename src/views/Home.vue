<script setup>
import SearchBar from "../components/SearchBar.vue";
import Trivia from "../components/Trivia.vue";
</script>

<template>
  <n-space justify="center" class="pt-4">
    <SearchBar />
  </n-space>
  <div class="flex justify-center mt-4">
    <Trivia />
  </div>
</template>
