<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const movie = ref({});
const route = useRoute();

onBeforeMount(() => {
  fetch(`https://www.omdbapi.com/?i=${route.params.id}&apikey=9e23561e&plot=full`)
    .then((res) => res.json())
    .then((data) => {
      movie.value = data;
      console.log(data);
    });
});
</script>
<template>
  <div class="movie">
    <h1>{{ movie.Title }}</h1>
    <h2>Number of Seasons: {{ movie.totalSeasons }}</h2>
    <img :src="movie.Poster" />
    <div class="container">
      <div class="year">
        <h2>{{ movie.Year }}</h2>
        <p>Year</p>
      </div>
      <div class="rating">
        <h2>{{ movie.Rated }}</h2>
        <p>Rated</p>
      </div>
      <div class="genre">
        <h2>{{ movie.Genre }}</h2>
        <p>Genre</p>
      </div>
      <div class="imdbRating">
        <h2>{{ movie.imdbRating }}</h2>
        <p>IMDB Rating</p>
      </div>
      <div class="seasons">
        <h2>{{ movie.totalSeasons }}</h2>
        <p>Total Seasons</p>
      </div>
      <div class="language">
        <h2>{{ movie.Language }}</h2>
        <p>Language</p>
      </div>
    </div>
    <div class="plot">
      <h2>What's the plot?</h2>
      <p>{{ movie.Plot }}</p>
    </div>
    <div class="awards">
      <h2>Awards and Nominations</h2>
      <p>{{ movie.Awards }}</p>
    </div>
  </div>
</template>
<style>
.movie {
  padding: 1rem;
  text-align: center;
}
.movie h1 {
  color: #f5d547;
}
.movie img {
  border-radius: 12px;
}
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 1rem;
  color: #fff;
}

.year {
  background-color: #3c3c3b;
  padding: 1rem;
  border-radius: 12px;
}
.rating {
  background-color: #3c3c3b;
  padding: 1rem;
  border-radius: 12px;
}
.genre {
  background-color: #3c3c3b;
  padding: 1rem;
  border-radius: 12px;
}
.imdbRating {
  background-color: #3c3c3b;
  padding: 1rem;
  border-radius: 12px;
}
.seasons {
  background-color: #3c3c3b;
  padding: 1rem;
  border-radius: 12px;
}
.language {
  background-color: #3c3c3b;
  padding: 1rem;
  border-radius: 12px;
}
.plot {
  color: #fff;
  text-align: left;
  padding: 1rem;
}
.plot h2 {
  padding-bottom: 1rem;
}

.awards {
  color: #fff;
  text-align: left;
  padding: 1rem;
}
.awards h2 {
  padding-bottom: 1rem;
}
</style>
