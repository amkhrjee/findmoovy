<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import env from "@/env.js";
import { Icon } from "@vicons/utils";
import {
  Imdb,
  Language,
  HourglassRegular,
  Bookmark,
  Share,
  Copy,
  Trash,
} from "@vicons/fa";
import { useMessage } from "naive-ui";
const message = useMessage();
const copied = ref(false);
const movie = ref({});
const route = useRoute();
const readMore = ref(false);
const addedToWatchlist = ref(false);
const removedFromWatchlist = ref(false);
const loading = ref();
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
  message.success("Removed from watchlist", { duration: 1000 });
};
const copyToClipboard = () => {
  navigator.clipboard.writeText(link.value.url);
  navigator.vibrate(100);
  copied.value = true;
  message.success("Link copied", { duration: 1000 });
};
const isReadMore = () => {
  readMore.value = !readMore.value;
};
const addWatchlist = () => {
  addedToWatchlist.value = true;
  window.localStorage.setItem(movie.value.imdbID, JSON.stringify(movie.value));
  message.success("Added to watchlist", { duration: 1000 });
  navigator.vibrate(50);
};
onBeforeMount(() => {
  loading.value = true;
  fetch(`https://www.omdbapi.com/?i=${route.params.id}&apikey=${env.apiKey}&plot=full`)
    .then((res) => res.json())
    .then((data) => {
      movie.value = data;
      loading.value = false;
    });
});
</script>
<template>
  <n-space vertical class="text-center dark:bg-background">
    <n-h3 v-if="!loading" class="pt-4 mb-0">{{ movie.Title }}</n-h3>
    <n-skeleton v-else size="medium" text class="w-1/2 mt-2" />
    <n-tag v-if="!loading" type="info">{{ movie.Genre }}</n-tag>
    <n-skeleton v-else text class="w-2/3" />

    <div class="w-2/3 m-auto">
      <n-image v-if="!loading" style="border-radius: 12px" :src="movie.Poster" />
      <n-skeleton v-else height="16rem" class="w-full" :sharp="false" />

      <n-card class="mt-4">
        <n-space justify="space-around">
          <n-space vertical>
            <n-h4 v-if="!loading" class>{{ movie.imdbRating }}</n-h4>
            <n-skeleton v-else text />

            <Icon size="large" class="mt-0 pt-0">
              <Imdb />
            </Icon>
          </n-space>
          <n-space vertical>
            <n-h4 v-if="!loading" class>{{ movie.Language }}</n-h4>
            <n-skeleton v-else text />
            <Icon size="large" class="mt-0 pt-0">
              <Language />
            </Icon>
          </n-space>
          <n-space vertical>
            <n-h4 v-if="!loading" class>{{ movie.Runtime }}</n-h4>
            <n-skeleton v-else text />

            <Icon size="large" class="mt-0 pt-0">
              <HourglassRegular />
            </Icon>
          </n-space>
        </n-space>
      </n-card>
      <n-h3 class="text-left mb-0">What's the plot?</n-h3>
      <n-ellipsis class="text-left" expand-trigger="click" line-clamp="3">
        <n-p v-if="!loading">{{ movie.Plot }}</n-p>
        <n-skeleton v-else text :repeat="2" class="w-64" />
        <n-skeleton v-else text class="w-56" />
      </n-ellipsis>
      <n-h3 class="text-left mb-0">Starring</n-h3>
      <n-p v-if="!loading" class="text-left mt-0">{{ movie.Actors }}</n-p>
      <n-space v-else vertical align="start" class="mb-2">
        <n-skeleton text :repeat="2" class="w-64" />
      </n-space>

      <n-button
        v-if="checkLocalStorage(movie.imdbID)"
        @click="removeWatchlist"
        size="large"
        class="w-full mb-2"
        aria-label="remove from watchlist"
      >
        Remove from watchlist
        <template #icon>
          <Icon>
            <Trash />
          </Icon>
        </template>
      </n-button>
      <n-button
        aria-label="add to watchlist"
        v-else
        @click="addWatchlist"
        size="large"
        class="w-full mb-2"
      >
        Add to Watchlist
        <template #icon>
          <Icon>
            <Bookmark />
          </Icon>
        </template>
      </n-button>
      <n-button-group class="mb-4" size="large">
        <n-button aria-label="share link" @click="shareLink">
          Share
          <template #icon>
            <Icon>
              <Share />
            </Icon>
          </template>
        </n-button>
        <n-button aria-label="copy link" @click="copyToClipboard">
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
