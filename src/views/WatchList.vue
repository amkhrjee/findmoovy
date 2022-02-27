<script setup>
import { ref } from "vue";
import MovieCard from "./MovieCard.vue";

const movieList = ref([]);
Object.keys(window.localStorage).forEach((key) => {
  movieList.value.push(JSON.parse(window.localStorage.getItem(key)));
});
</script>
<template>
  <div class="dark: bg-black">
    <div class="font-bold text-xl dark:text-white text-center p-4">🔖 Your Watchlist</div>
    <MovieCard :movie-list="movieList" />
  </div>
</template>
