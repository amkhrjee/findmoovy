<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const searchText = ref("");
const movieList = ref([]);
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
fetch(`https://www.omdbapi.com/?i=tt0898266&apikey=9e23561e`)
  .then((res) => res.json())
  .then((data) => (featuredMovie.value = data));
</script>

<template>
  <div class="home">
    <div class="featured-card">
      <div class="featured-text">Featured</div>
      <RouterLink to="/movies/tt0487831">
        <img
          :src="featuredMovie.Poster"
          alt="The Big Bang Theory Poster"
          class="featured-image"
        />
      </RouterLink>
      <div class="details">
        <h3>The Big Bang Theory</h3>
        <p>{{ featuredMovie.Plot }}</p>
      </div>
    </div>
    <form @submit.prevent="search" class="search-box">
      <RouterLink to="#search-box">
        <input
          class="search-box"
          id="search-box"
          v-model="searchText"
          type="text"
          placeholder="What are you looking for?"
        />
      </RouterLink>
      <input class="submit" type="submit" />
    </form>
    <div class="movie-list">
      <ul>
        <li v-for="movie in movieList" :key="movie.imdbID">
          <RouterLink :to="'/movies/' + movie.imdbID">
            <img class="poster" :src="movie.Poster" :alt="movie.Title + ' Poster'" />
          </RouterLink>
          <div class="type">{{ movie.Type }}</div>
          <h3>{{ movie.Title }}</h3>
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
.home {
  width: 100vw;
}

.home {
  width: 100vw;
}

.home {
  width: 100vw;
}

.home {
  width: 100vw;
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
}
input {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  font-size: 1rem;
}
/* .search-box:focus,
.search-box::after {
  background: red;
  height: 34px;
  position: absolute;
} */
input::placeholder {
  color: grey;
}

.search-box {
  font-size: 1.2rem;
  padding: 1rem;
  color: #fff;
  font-weight: 800;
}
.submit {
  background-color: #1446a0;
  width: 100%;
  height: auto;
  padding: 1rem 0;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  border-radius: 10px;
}
.submit:focus {
  background-color: #3c3c3b;
}
ul {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
li {
  background: #3c3c3b;
  position: relative;

  border-radius: 12px;

  height: auto;
  overflow: hidden;
  color: #fff;
}
.poster {
  height: 18rem;
  display: block;
  object-fit: cover;
  object-position: center;
}
li h3 {
  padding: 1rem;
  color: #ebebd3;
}

li h4 {
  padding: 1rem;
  color: #ebebd3;
}

.type {
  position: absolute;
  left: 0;
  top: 1rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  text-transform: capitalize;
  border-radius: 0 10px 10px 0;
  padding: 0.5rem;
  font-weight: 600;
  backdrop-filter: blur(5px);
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
</style>
