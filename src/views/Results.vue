<script setup>
import { onBeforeMount, ref } from "vue";
import SearchCard from "../components/SearchCard.vue";
import env from "@/env.js";
import { useRoute } from "vue-router";
import router from "../router";
const route = useRoute();

const movieList = ref([]);
const loading = ref();
const handleMovieRedirect = (movie) => {
  router.push(`/movies/${movie.imdbID}`);
};

onBeforeMount(() => {
  loading.value = true;
  fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=${env.apiKey}&s=${route.params.name}`
  )
    .then((res) => res.json())
    .then((data) => {
      movieList.value = data.Search;
      window.sessionStorage.setItem(route.params.name, route.params.name);
      loading.value = false;
    });
});
</script>
<template>
  <n-space justify="center" class="dark:bg-background">
    <n-h4 class="pt-4">Showing Results for "{{ $route.params.name }}"</n-h4>
    <n-tabs class="w-screen" size="large" justify-content="space-around" type="segment">
      <n-tab-pane name="all" tab="All">
        <n-space justify="space-around" align="center">
          <SearchCard
            v-if="!loading"
            @click="handleMovieRedirect(movie)"
            class="h-56 w-40 object-cover object-center"
            v-for="movie in movieList"
            :img-src="movie.Poster"
          />

          <n-skeleton v-else width="10rem" height="14rem" :sharp="false" />
          <n-skeleton v-else width="10rem" height="14rem" :sharp="false" />
          <n-skeleton v-else width="10rem" height="14rem" :sharp="false" />
          <n-skeleton v-else width="10rem" height="14rem" :sharp="false" />
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="Movies" tab="Movies">
        <n-space justify="space-around" align="center">
          <div v-for="movie in movieList">
            <SearchCard
              @click="handleMovieRedirect(movie)"
              class="h-56 w-40 object-cover object-center"
              v-if="movie.Type === 'movie'"
              :img-src="movie.Poster"
            />
          </div>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="Series" tab="Series">
        <n-space justify="space-around" align="center">
          <div v-for="movie in movieList">
            <SearchCard
              @click="handleMovieRedirect(movie)"
              class="h-56 w-40 object-cover object-center"
              v-if="movie.Type === 'series'"
              :img-src="movie.Poster"
            />
          </div>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="Games" tab="Games">
        <n-space justify="space-around" align="center">
          <div v-for="movie in movieList">
            <SearchCard
              v-if="movie.Type === 'game'"
              @click="handleMovieRedirect(movie)"
              class="h-56 w-40 object-cover object-center"
              :img-src="movie.Poster"
            />
          </div>
        </n-space>
      </n-tab-pane>
    </n-tabs>
  </n-space>
</template>
