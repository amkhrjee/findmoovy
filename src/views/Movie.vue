<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const movie = ref({});
const route = useRoute();

onBeforeMount(() => {
  fetch(`http://www.omdbapi.com/?i=${route.params.id}&apikey=9e23561e&plot=full`)
    .then((res) => res.json())
    .then((data) => {
      movie.value = data;
    });
});
</script>
<template>
  <div class="movie">
    <h1>{{ movie.Title }}</h1>
    <h2>Number of Seasons: {{ movie.totalSeasons }}</h2>
    <img :src="movie.Poster" />
  </div>
</template>
