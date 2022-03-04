<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import env from "@/env.js";
import { Icon } from "@vicons/utils";
import { Imdb, Language, HourglassRegular, Bookmark, Share, Copy } from "@vicons/fa";

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
    <n-h3 class="pt-4 mb-0">{{ movie.Title }}</n-h3>
    <n-tag type="info">{{ movie.Genre }}</n-tag>
    <div class="w-2/3 m-auto">
      <n-image style="border-radius: 12px" :src="movie.Poster" />
      <n-card class="mt-4">
        <n-space justify="space-around">
          <n-space vertical>
            <n-h4 class>{{ movie.imdbRating }}</n-h4>
            <Icon size="large" class="mt-0 pt-0">
              <Imdb />
            </Icon>
          </n-space>
          <n-space vertical>
            <n-h4 class>{{ movie.Language }}</n-h4>
            <Icon size="large" class="mt-0 pt-0">
              <Language />
            </Icon>
          </n-space>
          <n-space vertical>
            <n-h4 class>{{ movie.Runtime }}</n-h4>
            <Icon size="large" class="mt-0 pt-0">
              <HourglassRegular />
            </Icon>
          </n-space>
        </n-space>
      </n-card>
      <n-h3 class="text-left mb-0">What's the plot?</n-h3>
      <n-ellipsis class="text-left" expand-trigger="click" line-clamp="3">{{
        movie.Plot
      }}</n-ellipsis>
      <n-h3 class="text-left mb-0">Starring</n-h3>
      <n-p class="text-left mt-0">{{ movie.Actors }}</n-p>
      <n-button size="large" class="w-full mb-2">
        Add to Watchlist
        <template #icon>
          <Icon>
            <Bookmark />
          </Icon>
        </template>
      </n-button>
      <n-button-group class="mb-4" size="large">
        <n-button>
          Share
          <template #icon>
            <Icon>
              <Share />
            </Icon>
          </template>
        </n-button>
        <n-button>
          Copy Link
          <template #icon>
            <Icon>
              <Copy />
            </Icon>
          </template>
        </n-button>
      </n-button-group>
    </div>
  </n-space>
</template>
