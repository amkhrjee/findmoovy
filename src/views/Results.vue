<script setup>
import { onBeforeMount, ref } from "vue";
import SearchCard from "../components/SearchCard.vue";
import env from "@/env.js";
import { useRoute } from "vue-router";
import router from "../router";
import { SadTear } from "@vicons/fa";

import { Icon } from "@vicons/utils";
const route = useRoute();

const movieList = ref([]);
const searchTerm = ref("");
const searchList = ref([]);
const recentSearhesList = ref([]);
const count = ref(0);
const showRecent = ref(false);
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
      // window.sessionStorage.setItem(count.value, searchText.value);
      loading.value = false;
      count.value += 1;
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
            class="h-56"
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
              class="h-56"
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
              class="h-56"
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
              class="h-56"
              :img-src="movie.Poster"
            />
          </div>
        </n-space>
      </n-tab-pane>
    </n-tabs>
  </n-space>
</template>
