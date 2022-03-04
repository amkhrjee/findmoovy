<script setup>
import { ref } from "vue";
import { debounce } from "lodash-es";
import env from "@/env.js";
import SearchBar from "../components/SearchBar.vue";
import Trivia from "../components/Trivia.vue";

const searchTerm = ref("");
const searchList = ref([]);
const recentSearhesList = ref([]);
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
  <div class="flex justify-center mt-4">
    <n-message-provider>
      <Trivia />
    </n-message-provider>
  </div>
</template>
<style>
a {
  text-decoration: none;
}
</style>
