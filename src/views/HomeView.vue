<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { debounce } from "lodash-es";
import MovieCard from "./MovieCard.vue";

const searchText = ref("");
const movieList = ref([]);
const searchTerm = ref("");
const searchList = ref([]);

const update = debounce((e) => {
  searchTerm.value = e.target.value;
  console.log(searchTerm.value);
  searchSuggest()
}, 300);

const searchSuggest = () => {
  if (searchTerm.value.length != 0) {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=9e23561e&s=${searchTerm.value}`).then(res => res.json()).then(data => {
      searchList.value = data.Search.slice(0, 7)
    }).catch(() => {
      return
    })
  }
}

const search = () => {
  if (searchText.value != "") {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=9e23561e&s=${searchText.value}`)
      .then((res) => res.json())
      .then((data) => {
        movieList.value = data.Search;
        searchText.value = "";
        console.log(data);
      });
  }
};

//featured movie
const featuredMovie = ref({});
fetch(`https://www.omdbapi.com/?i=tt5834426&apikey=9e23561e`)
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
        v-if="searchList.length != 0 && (searchText.length != 0)"
        v-for="search in searchList"
        class="search-suggest"
      >
        <RouterLink :to="'/movies/' + search.imdbID">
          <p style="color: #fff;">{{ search.Title }} ↗️</p>
        </RouterLink>
      </div>
    </form>
    <MovieCard :movie-list="movieList" />
    <div class="featured-card">
      <div class="featured-text">🌟 Featured</div>
      <RouterLink to="/movies/tt11198330">
        <img :src="featuredMovie.Poster" alt="The Big Bang Theory Poster" class="featured-image" />
        <div class="details">
          <h3>{{ featuredMovie.Title }} ↗️</h3>
          <p>{{ featuredMovie.Plot }}</p>
        </div>
      </RouterLink>
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

.featured-card {
  height: auto;
  width: 100%;
  position: relative;
}
.featured-image {
  width: 100%;
  z-index: 0;
}
.details {
  z-index: 1;
  position: absolute;
  bottom: 0;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  backdrop-filter: blur(5px);
}
form {
  padding: 1rem;
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
  font-size: 1rem;
  width: 100%;
}

input::placeholder {
  color: grey;
}

.search-box {
  font-size: 1rem;
  padding: 1rem;
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

  font-size: 1rem;
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
  top: 1rem;
  left: 1rem;
  border-radius: 12px;
  padding: 0.5rem;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
}

.search-suggest {
  display: block;
  grid-column: span 2;
  border-radius: 12px;
  color: #fff;
  margin-top: 0.5rem;
  padding: 1rem;
  background-color: #120e43;
}
</style>
