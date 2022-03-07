<script setup>
import { Bookmark, Home } from "@vicons/fa";
import SearchCard from "../components/SearchCard.vue";
import router from "../router";
import { ref } from "vue";
const movieList = ref([]);
Object.keys(window.localStorage).forEach((key) => {
  movieList.value.push(JSON.parse(window.localStorage.getItem(key)));
});

const handleMovieRedirect = (movie) => {
  router.push(`/movies/${movie.imdbID}`);
};
</script>

<template>
  <n-space justify="center">
    <n-breadcrumb class="p-2">
      <n-breadcrumb-item separator=">">
        <RouterLink to="/">
          <n-icon size="15" class="pr-5">
            <Home /> </n-icon
          >Home
        </RouterLink>
      </n-breadcrumb-item>
      <n-breadcrumb-item>
        <n-icon size="12" class="pr-4">
          <Bookmark /> </n-icon
        >Watchlist
      </n-breadcrumb-item>
    </n-breadcrumb>
    <n-space justify="space-around" align="center">
      <SearchCard
        @click="handleMovieRedirect(movie)"
        class="h-56"
        v-for="movie in movieList"
        :img-src="movie.Poster"
      />
    </n-space>
  </n-space>
</template>
