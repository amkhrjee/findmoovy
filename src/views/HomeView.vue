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

const showAll = ref(true);
const showMovies = ref(false);
const showSeries = ref(false);
const showGames = ref(false);

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

const search = () => {
  if (searchText.value != "") {
    fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${env.apiKey}&s=${searchText.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        movieList.value = data.Search;
        searchText.value = "";
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

//featured movie
const featuredMovie = ref({});
fetch(`https://www.omdbapi.com/?i=tt5834426&apikey=${env.apiKey}`)
  .then((res) => res.json())
  .then((data) => (featuredMovie.value = data));
</script>

<template>
  <div class="home">
    <form autocomplete="off" @submit.prevent="search">
      <RouterLink to="#search-box">
        <input
          class="search-box"
          id="search-box"
          v-model="searchText"
          type="text"
          placeholder="Looking for something?"
          @input="update"
        />
      </RouterLink>

      <button class="submit" type="submit">🔍</button>
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
    <div v-if="movieList.length != 0" class="sort-by">
      <button @click="handleShowAll" class="all">🍿 All</button>
      <button @click="handleShowMovies" class="movies">🎬 Movies</button>
      <button @click="handleShowSeries" class="series">🎞️ Series</button>
      <button @click="handleShowGames" class="games">🎮 Games</button>
    </div>
    <MovieCard v-if="showAll" :movie-list="movieList" />
    <MovieCard
      v-if="showMovies"
      :movie-list="movieList.filter((movie) => (movie.Type === 'movie'))"
    />
    <MovieCard
      v-if="showSeries"
      :movie-list="movieList.filter((movie) => (movie.Type === 'series'))"
    />
    <MovieCard v-if="showGames" :movie-list="movieList.filter((movie) => (movie.Type === 'game'))" />

    <div v-if="searchText.length === 0" class="featured-card">
      <img class="featured-image" src="@/assets/search.svg" alt="an svg" />
    </div>
  </div>
</template>
<style>
.home {
  width: 100vw;
}

a {
  text-decoration: none;
}
svg {
  width: 100%;
  height: 10em;
}
.featured-card {
  height: auto;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 10em;
}
.featured-image {
  width: 50%;
  padding: 1em;
}

form {
  padding: 1em;
  width: 100vw;
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

.search-box {
  font-size: 1em;
  padding: 1em;
  color: #fff;
  font-weight: 800;

  border-radius: 12px 0 0 12px;
  background-color: #120e43;
}

.submit {
  background-color: #242b2e;

  height: auto;
  text-transform: uppercase;
  border-radius: 0 12px 12px 0;

  font-size: 1em;
}
button {
  text-decoration: none;
  appearance: none;
  border: none;
  box-sizing: content-box;
}
.submit:focus {
  background-color: #3c3c3b;
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
.sort-by {
  display: flex;
  padding: 1em;
  justify-content: center;
}
.all {
  color: #fff;
  margin-right: 1em;
  background-color: #e07c24;
  border-radius: 12px;
  padding: 0.5em;
  border: solid 2px #e07c24;
}
.all:focus {
  border: solid 2px red;
}
.movies {
  color: #fff;

  margin-right: 1em;
  background-color: #d82e2f;
  border-radius: 12px;
  padding: 0.5em;
  border: solid 2px #d82e2f;
}
.movies:focus {
  border: 2px solid #e07c24;
}
.series {
  color: #fff;

  margin-right: 1em;
  background-color: #5a20cb;
  border-radius: 12px;
  padding: 0.5em;
  border: solid 2px #5a20cb;
}
.series:focus {
  border: 2px solid #bf3312;
}
.games {
  color: #fff;

  margin-right: 1em;
  background-color: #8d3daf;
  border-radius: 12px;
  padding: 0.5em;
  border: solid 2px #8d3daf;
}
.games:focus {
  border: 2px solid #bf3312;
}
</style>
