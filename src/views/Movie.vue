<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import env from "@/env.js";

const copied = ref(false);
const movie = ref({});
const route = useRoute();
const readMore = ref(false);
const addedToWatchlist = ref(false);
const removedFromWatchlist = ref(false);
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
  removedFromWatchlist.value = true;
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
  <n-space vertical class="text-center">
    <n-h3 class="pt-4">{{ movie.Title }}</n-h3>
    <div class="w-1/2 m-auto">
      <n-image style="border-radius: 12px" :src="movie.Poster" />
    </div>
  </n-space>
</template>
