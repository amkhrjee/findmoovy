<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
const searchText = ref("");
const movieList = ref([]);
const search = () => {
  if (searchText.value != "") {
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=9e23561e&s=${searchText.value}`)
      .then((res) => res.json())
      .then((data) => {
        movieList.value = data.Search;
        searchText.value = "";
      });
  }
};
</script>

<template>
  <div class="home">
    <div class="featured-card">
      <RouterLink to="/movies/tt0487831">
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/814E7D8mMQL._RI_.jpg"
          alt="The IT Crowd Poster"
          class="featured-image"
        />
      </RouterLink>
      <div class="details">
        <h3>The IT Crowd</h3>
        <p>
          Two tech geeks are based out of a Reynholm Industries' basement. When a new
          supervisor is hired, she turns out to be illiterate in technology and together
          they land in hilarious situations.
        </p>
      </div>
    </div>
    <form @submit.prevent="search" class="search-box">
      <input
        class="search-box"
        v-model="searchText"
        type="text"
        placeholder="What are you looking for?"
      />
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

.featured-card {
  background-color: red;
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
}
input {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  font-size: 1rem;
}
input::placeholder {
  color: grey;
}

.search-box {
  font-size: 1.5rem;
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
  font-size: 1.5rem;
  font-weight: 400;
  color: #fff;
  border-radius: 10px;
}
.submit:focus {
  background-color: #3c3c3b;
}
ul {
  padding: 1rem;
}
li {
  background: #3c3c3b;
  position: relative;
  margin: 2rem 0;
  border-radius: 12px;
  display: flex;
  height: auto;
  overflow: hidden;
  color: #fff;
}
.poster {
  height: 10rem;
  object-fit: cover;
  object-position: center;
}
li h3 {
  padding: 1rem;
  color: #ebebd3;
}

.type {
  position: absolute;
  left: 0;
  bottom: 1rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  text-transform: capitalize;
  border-radius: 0 10px 10px 0;
  padding: 0.5rem;
  font-weight: 600;
  backdrop-filter: blur(5px);
}
</style>
