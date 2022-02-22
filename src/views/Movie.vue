<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import env from "@/env.js";

const copied = ref(false);
const movie = ref({});
const route = useRoute();
const readMore = ref(false);
const addedToWatchlist = ref(false);
const link = ref({
  title: "FindMoovy" + movie.value.Title,
  text: "Check out this movie!",
  url: `https://www.imdb.com/title/${route.params.id}`,
});
const shareLink = () => {
  if (navigator.share) {
    navigator
      .share(link.value)
      .then(() => console.log("success"))
      .catch((err) => console.log(err));
  }
};
const checkLocalStorage = (id) => {
  let match = false;
  Object.keys(window.localStorage).forEach((key) => {
    if (id === key) {
      match = true;
    }
  });
  if (match || addedToWatchlist.value) {
    return true;
  } else {
    return false;
  }
};
const removeWatchlist = () => {
  window.localStorage.removeItem(movie.value.imdbID);
  addedToWatchlist.value = false;
};
const copyToClipboard = () => {
  navigator.clipboard.writeText(link.value.url);
  navigator.vibrate(100);
  copied.value = true;
};
const isReadMore = () => {
  readMore.value = !readMore.value;
};
const addWatchlist = () => {
  addedToWatchlist.value = true;
  window.localStorage.setItem(movie.value.imdbID, JSON.stringify(movie.value));
  navigator.vibrate(50);
};
onBeforeMount(() => {
  fetch(`https://www.omdbapi.com/?i=${route.params.id}&apikey=${env.apiKey}&plot=full`)
    .then((res) => res.json())
    .then((data) => {
      movie.value = data;
    });
});
</script>
<template>
  <div class="p-4 text-center md:grid md:grid-cols-2">
    <div class="flex flex-col justify-center items-center md:sticky">
      <h2 class="font-bold text-xl mb-4 text-black dark:text-white">{{ movie.Title }}</h2>
      <img class="rounded-xl w-2/3" :src="movie.Poster" />
    </div>
    <div
      class="mt-6 grid grid-cols-2 gap-2 p-4 items-center rounded-lg drop-shadow-lg dark:bg-gradient-to-b from-black to-gradblue"
    >
      <div class="bg-detail text-white p-4 rounded-lg">
        <h3 class="font-semibold">{{ movie.Year }}</h3>
        <p>Year</p>
      </div>
      <div class="bg-detail text-white p-4 rounded-lg">
        <h3 class="font-semibold">{{ movie.Rated }}</h3>
        <p>Rated</p>
      </div>
      <div class="bg-detail text-white p-4 rounded-lg">
        <h3 class="font-semibold">{{ movie.Genre }}</h3>
        <p>Genre</p>
      </div>
      <div class="bg-detail text-white p-4 rounded-lg">
        <h3 class="font-semibold">{{ movie.imdbRating }}</h3>
        <p>IMDB Rating</p>
      </div>
      <div v-if="movie.Type == 'series'" class="bg-detail text-white p-4 rounded-lg">
        <h3 class="font-semibold">{{ movie.totalSeasons }}</h3>
        <p>Total Seasons</p>
      </div>
      <div v-if="movie.Type == 'movie'" class="bg-detail text-white p-4 rounded-lg">
        <h3 class="font-semibold">{{ movie.Runtime }}</h3>
        <p>Runtime</p>
      </div>
      <div class="bg-detail text-white p-4 rounded-lg">
        <h3 class="font-semibold">{{ movie.Language }}</h3>
        <p>Language</p>
      </div>
    </div>
    <div class="md:col-span-2 md:mt-4">
      <div class="dark:text-white text-left p-4">
        <h3 class="pb-4 font-bold text-xl">🗒️What's the plot?</h3>
        <p v-if="!readMore">
          {{ movie.Plot?.length < 200 ? movie.Plot : movie.Plot?.slice(0, 200) }}
          <span @click="isReadMore" style="color: #5da3fa">read more...</span>
        </p>
        <p v-if="readMore">{{ movie.Plot }}</p>
      </div>
      <div class="dark:text-white text-left p-4">
        <h3 class="pb-4 font-bold text-xl">🎗️ Awards and Nominations</h3>
        <p>{{ movie.Awards }}</p>
      </div>
      <div class="dark:text-white text-left p-4">
        <h3 class="pb-4 font-bold text-xl">🧑🏻‍🎤 Lead Actors</h3>
        <p>{{ movie.Actors }}</p>
      </div>
      <div class="p-4">
        <button
          v-if="checkLocalStorage(movie.imdbID)"
          @click="removeWatchlist"
          class="p-4 rounded-lg w-5/6 bg-movies font-bold text-white focus:bg-all"
        >
          🗑️ Remove from watchlist
        </button>
        <button
          v-else
          @click="addWatchlist"
          class="p-4 rounded-lg w-5/6 bg-games font-bold text-white"
        >
          🔖 Add to watchlist
        </button>
      </div>
      <div class="flex justify-around md:mt-4">
        <button
          @click="shareLink"
          class="p-4 rounded-lg bg-share font-bold w-1/2 text-white"
        >
          🔗 Share
        </button>
        <button
          @click="copyToClipboard"
          class="p-4 rounded-lg bg-copy font-bold text-white focus:bg-all"
        >
          {{ copied ? "✅ Copied" : "📋 Copy" }}
        </button>
      </div>
    </div>
  </div>
</template>
