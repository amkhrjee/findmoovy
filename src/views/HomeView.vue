<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { debounce } from "lodash-es";
import MovieCard from "./MovieCard.vue";
// import { NInputGroup, NInput, NButton, NSpace, NModal } from "naive-ui";
// import { Microphone, Search } from "@vicons/fa";
// import { Icon } from "@vicons/utils";

import env from "@/env.js";
import SearchBar from "../components/SearchBar.vue";
import Trivia from "../components/Trivia.vue";
const searchText = ref("");
const movieList = ref([]);
const searchTerm = ref("");
const searchList = ref([]);
const recentSearhesList = ref([]);
const showAll = ref(true);
const showMovies = ref(false);
const showSeries = ref(false);
const showGames = ref(false);
const count = ref(0);
const showRecent = ref(false);

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
const existsInSessionStorage = (key) => {
  if (recentSearhesList.value.includes(window.sessionStorage.getItem(key))) {
    return true;
  } else {
    return false;
  }
};

const recentSearches = () => {
  Object.keys(window.sessionStorage).forEach((key) => {
    if (key.length <= 3 && !existsInSessionStorage(key)) {
      recentSearhesList.value.push(window.sessionStorage.getItem(key));
    }
  });
  showRecent.value = true;
};
// document.getElementById("searchbox").addEventListener("blur", () => {
//   showRecent.value = false;
// });

const search = () => {
  if (searchText.value != "") {
    fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${env.apiKey}&s=${searchText.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        movieList.value = data.Search;
        window.sessionStorage.setItem(count.value, searchText.value);
        searchText.value = "";
        count.value += 1;
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
const clickOutside = () => {
  showRecent.value = false;
};

const handleSpeechRecognition = () => {
  navigator.vibrate(50);
  // Configure SpeechRecognition
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  recognition.start();
  recognition.onresult = (e) => {
    searchText.value = e.results[0][0].transcript;
    search();
  };
  //todo: add toasts!
  recognition.onnomatch = (err) => {
    searchText.value = "";
  };
};
</script>

<template>
  <n-space justify="center" class="pt-4">
    <SearchBar />
  </n-space>
  <n-space justify="center" class="pt-4">
    <n-message-provider>
      <Trivia />
    </n-message-provider>
  </n-space>
</template>
<style>
a {
  text-decoration: none;
}

form {
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

button {
  text-decoration: none;
  appearance: none;
  border: none;
  box-sizing: content-box;
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

form {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  gap: 0;
}
</style>
