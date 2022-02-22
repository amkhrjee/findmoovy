<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { debounce } from "lodash-es";
import MovieCard from "./MovieCard.vue";

import env from "@/env.js";
const searchText = ref("");
const movieList = ref([]);
const searchTerm = ref("");
const searchList = ref([]);
const recentSearhesList = ref([]);
const showAll = ref(true);
const showMovies = ref(false);
const showSeries = ref(false);
const showGames = ref(false);
const count = ref(0);
const funRun = ref(false);

const update = debounce((e) => {
  searchTerm.value = e.target.value;

  searchSuggest();
}, 300);

const searchSuggest = () => {
  if (searchTerm.value.length != 0) {
    fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${env.apiKey}&s=${searchTerm.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        searchList.value = data.Search.slice(0, 7);
      })
      .catch(() => {
        return;
      });
  }
};
const existsInSessionStorage = (key) => {
  if (recentSearhesList.value.includes(window.sessionStorage.getItem(key))) {
    return true;
  } else {
    return false;
  }
};

const recentSearches = () => {
  Object.keys(window.sessionStorage).forEach((key) => {
    if (key.length <= 3 && !existsInSessionStorage(key)) {
      recentSearhesList.value.push(window.sessionStorage.getItem(key));
    }
  });
};

const search = () => {
  if (searchText.value != "") {
    fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${env.apiKey}&s=${searchText.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        movieList.value = data.Search;
        window.sessionStorage.setItem(count.value, searchText.value);
        searchText.value = "";
        count.value += 1;
      });
  }
};

const handleShowAll = () => {
  showMovies.value = false;
  showAll.value = true;
  showSeries.value = false;
  showGames.value = false;
};
const handleShowMovies = () => {
  showMovies.value = true;
  showAll.value = false;
  showSeries.value = false;
  showGames.value = false;
};
const handleShowSeries = () => {
  showSeries.value = true;
  showAll.value = false;
  showMovies.value = false;
  showGames.value = false;
};
const handleShowGames = () => {
  showGames.value = true;
  showAll.value = false;
  showMovies.value = false;
  showSeries.value = false;
};
</script>

<template>
  <div class="w-screen">
    <form autocomplete="off" @submit.prevent="search" class="p-4 w-screen">
      <RouterLink to="#search-box">
        <input
          class="text-xs p-4 text-white font-bold rounded-l-lg bg-searchbar"
          id="search-box"
          v-model="searchText"
          type="text"
          placeholder="Looking for something?"
          @input="update"
          @click="recentSearches"
        />
      </RouterLink>

      <button
        @click="navigator.vibrate(100)"
        class="bg-searchbtn rounded-r-lg focus:bg-blue-900"
        type="submit"
      >
        🔍
      </button>
      <div v-for="recentSearch in recentSearhesList" class="search-suggest">
        <p style="color: #fff">{{ recentSearch }} ⌚</p>
      </div>
      <div
        v-if="searchList.length != 0 && searchText.length != 0"
        v-for="search in searchList"
        class="search-suggest"
      >
        <RouterLink :to="'/movies/' + search.imdbID">
          <p style="color: #fff">{{ search.Title }} ↗️</p>
        </RouterLink>
      </div>
    </form>
    <div v-if="movieList.length != 0" class="flex p-4 justify-center">
      <button
        @click="handleShowAll"
        class="text-white mr-4 bg-all rounded-xl p-2 border-solid border-{2} border-all focus:border-movies"
      >
        🍿 All
      </button>
      <button
        @click="handleShowMovies"
        class="text-white mr-4 bg-movies rounded-xl p-2 border-solid border-{2} border-movies focus:border-all"
      >
        🎬 Movies
      </button>
      <button
        @click="handleShowSeries"
        class="text-white mr-4 bg-series rounded-xl p-2 border-solid border-{2} border-series focus:border-movies"
      >
        🎞️ Series
      </button>
      <button
        @click="handleShowGames"
        class="text-white mr-4 bg-games rounded-xl p-2 border-solid border-{2} border-games focus:border-all"
      >
        🎮 Games
      </button>
    </div>
    <MovieCard v-if="showAll" :movie-list="movieList" />
    <MovieCard
      v-if="showMovies"
      :movie-list="movieList.filter((movie) => movie.Type === 'movie')"
    />
    <MovieCard
      v-if="showSeries"
      :movie-list="movieList.filter((movie) => movie.Type === 'series')"
    />
    <MovieCard
      v-if="showGames"
      :movie-list="movieList.filter((movie) => movie.Type === 'game')"
    />

    <div
      v-if="searchText.length === 0 && movieList.length == 0"
      class="h-auto w-full relative flex justify-center mt40"
    >
      <img class="w-1/2 p-4" src="@/assets/search.svg" alt="an svg" />
    </div>
  </div>
</template>
<style>
a {
  text-decoration: none;
}

form {
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: space-between;
}
input {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  font-size: 1em;
  width: 100%;
}

input::placeholder {
  color: grey;
}

button {
  text-decoration: none;
  appearance: none;
  border: none;
  box-sizing: content-box;
}

.featured-text {
  position: absolute;
  top: 1em;
  left: 1em;
  border-radius: 12px;
  padding: 0.5em;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
}

.search-suggest {
  display: block;
  grid-column: span 2;
  border-radius: 12px;
  color: #fff;
  margin-top: 0.5em;
  padding: 1em;
  background-color: #120e43;
}
</style>
