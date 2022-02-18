<script setup>
import { onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import env from '@/env.js'


const movie = ref({});
const route = useRoute();
const readMore = ref(false)
const link = ref({
  title: 'FindMoovy' + movie.value.Title,
  text: 'Check out this movie!',
  url: `https://www.imdb.com/title/${route.params.id}`
})
const shareLink = () => {
  if (navigator.share) {
    navigator.share(link.value).then(() => console.log('success')).catch(err => console.log(err))
  }
}
const copyToClipboard = () => {
  navigator.clipboard.writeText(link.value.url)
  alert('Copied text: ' + link.value.url)
}
const isReadMore = () => {
  readMore.value = !readMore.value

}
onBeforeMount(() => {
  fetch(`https://www.omdbapi.com/?i=${route.params.id}&apikey=${env.apiKey}&plot=full`)
    .then((res) => res.json())
    .then((data) => {
      movie.value = data;

    });
});
</script>
<template>
  <div class="movie">
    <h2 style="color: #fff">{{ movie.Title }}</h2>
    <h3>Number of Seasons: {{ movie.totalSeasons }}</h3>
    <img :src="movie.Poster" />
    <div class="container">
      <div class="year">
        <h3>{{ movie.Year }}</h3>
        <p>Year</p>
      </div>
      <div class="rating">
        <h3>{{ movie.Rated }}</h3>
        <p>Rated</p>
      </div>
      <div class="genre">
        <h3>{{ movie.Genre }}</h3>
        <p>Genre</p>
      </div>
      <div class="imdbRating">
        <h3>{{ movie.imdbRating }}</h3>
        <p>IMDB Rating</p>
      </div>
      <div v-if="movie.Type == 'series'" class="seasons">
        <h3>{{ movie.totalSeasons }}</h3>
        <p>Total Seasons</p>
      </div>
      <div v-if="movie.Type == 'movie'" class="runtime">
        <h3>{{ movie.Runtime }}</h3>
        <p>Runtime</p>
      </div>
      <div class="language">
        <h3>{{ movie.Language }}</h3>
        <p>Language</p>
      </div>
    </div>
    <div class="plot">
      <h3>🗒️What's the plot?</h3>
      <p v-if="!readMore">
        {{ movie.Plot?.length < 200 ? movie.Plot : movie.Plot?.slice(0, 200) }}
        <span
          @click="isReadMore"
          style="color: #5DA3FA;"
        >read more...</span>
      </p>
      <p v-if="readMore">{{ movie.Plot }}</p>
    </div>
    <div class="awards">
      <h3>🎗️ Awards and Nominations</h3>
      <p>{{ movie.Awards }}</p>
    </div>
    <div class="actors">
      <h3>🧑🏻‍🎤 Lead Actors</h3>
      <p>{{ movie.Actors }}</p>
    </div>
    <div class="share-copy">
      <button @click="shareLink" class="share">🔗 Share</button>
      <button @click="copyToClipboard" class="copy">📋 Copy</button>
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
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 1rem;
  color: #fff;
  align-items: center;
  background-image: linear-gradient(#000, #120e43);
  border-radius: 12px;
}

.year {
  background-color: #03203c;
  padding: 1rem;
  border-radius: 12px;
}
.rating {
  background-color: #03203c;
  padding: 1rem;
  border-radius: 12px;
}
.genre {
  background-color: #03203c;
  padding: 1rem;
  border-radius: 12px;
}
.runtime {
  background-color: #03203c;
  padding: 1rem;
  border-radius: 12px;
}
.imdbRating {
  background-color: #03203c;
  padding: 1rem;
  border-radius: 12px;
}
.seasons {
  background-color: #03203c;
  padding: 1rem;
  border-radius: 12px;
}
.language {
  background-color: #03203c;
  padding: 1rem;
  border-radius: 12px;
}
.plot {
  color: #fff;
  text-align: left;
  padding: 1rem;
}
.plot h3 {
  padding-bottom: 1rem;
}

.awards {
  color: #fff;
  text-align: left;
  padding: 1rem;
}
.awards h3 {
  padding-bottom: 1rem;
}

.actors {
  color: #fff;
  text-align: left;
  padding: 1rem;
}
.actors h3 {
  padding-bottom: 1rem;
}
.share-copy {
  display: flex;
  justify-content: space-around;
}
.share {
  padding: 1rem;
  border-radius: 12px;
  background-color: #5a20cb;
  color: #fff;
  font-weight: 600;
  width: 50%;
}
.copy {
  padding: 1rem;
  border-radius: 12px;
  background-color: #5da3fa;
  color: #fff;
  font-weight: 600;
}
</style>
