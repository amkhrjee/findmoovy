<script setup>
defineProps({
  movieList: Array,
});
</script>
<template>
  <div class="movie-list">
    <ul class="p-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
      <li
        class="bg-navbar dark:bg-moviecard rounded-xl relative h-auto overflow-hidden drop-shadow-lg"
        v-for="movie in movieList"
        :key="movie.imdbID"
      >
        <RouterLink :to="'/movies/' + movie.imdbID">
          <img
            class="h-72 block object-cover object-center"
            :src="movie.Poster"
            :alt="movie.Title + ' Poster'"
          />
        </RouterLink>
        <div
          class="absolute left-0 top-4 text-white bg-black opacity-60 font-bold p-2 rounded-r-lg backdrop-blur-xl capitalize"
        >
          {{ movie.Type }}
        </div>
        <h3 class="p-4 text-movieTitle font-bold text-lg">{{ movie.Title }}</h3>
      </li>
    </ul>
  </div>
</template>
<style></style>
