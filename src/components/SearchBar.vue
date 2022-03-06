<script setup>
import { Microphone, Search } from "@vicons/fa";
import { Icon } from "@vicons/utils";
import { debounce } from "lodash-es";
import { useMessage } from "naive-ui";
import { computed, ref } from "vue";
import router from "../router";
import env from "@/env.js";
import { RouterLink } from "vue-router";

const showModal = ref(false);
const message = useMessage();
const searchText = ref("");
const searchTerm = ref("");
const searchList = ref([]);
const recentSearhesList = ref([]);

const update = debounce((value) => {
  searchTerm.value = value;
  searchSuggest();
}, 300);

const options = computed(() => {
  const existsInSessionStorage = (key) => {
    if (recentSearhesList.value.includes(window.sessionStorage.getItem(key))) {
      return true;
    } else {
      return false;
    }
  };

  Object.keys(window.sessionStorage).forEach((key) => {
    if (key.length <= 8 && !existsInSessionStorage(key)) {
      recentSearhesList.value.push(window.sessionStorage.getItem(key));
    }
  });
  return recentSearhesList.value;
});

const searchSuggest = () => {
  if (searchTerm.value.length != 0) {
    fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${env.apiKey}&s=${searchTerm.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        searchList.value = data.Search.slice(0, 4);
      })
      .catch(() => {
        return;
      });
  }
};
const handleVoiceClick = () => {
  showModal.value = true;
  navigator.vibrate(50);
  // Configure SpeechRecognition
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  recognition.start();
  recognition.onresult = (e) => {
    searchText.value = e.results[0][0].transcript.slice(0, -1);
    router.push(`/results/${searchText.value}`);
    showModal.value = false;
  };

  recognition.onnomatch = (err) => {
    console.log(err);
    message.error("Try Again!", { duration: 1000 });
    showModal.value = false;
  };
};

const handleRedirect = () => {
  if (searchText.value.trim().length != "") {
    router.push(`/results/${searchText.value}`);
  }
};
</script>

<template>
  <n-space vertical>
    <n-input-group style="width: 100%">
      <n-auto-complete
        :input-props="{
          autocomplete: 'disabled',
        }"
        size="large"
        round
        v-model:value="searchText"
        placeholder="Search for a movie"
        clearable
        :options="options"
        @input="update"
      />

      <n-button aria-label="Voice Input" size="large" @click="handleVoiceClick">
        <Icon>
          <Microphone />
        </Icon>
      </n-button>
      <n-button
        aria-label="Search"
        attr-type="submit"
        size="large"
        @click="handleRedirect"
      >
        <Icon>
          <Search />
        </Icon>
      </n-button>
    </n-input-group>
    <n-space v-if="searchText" size="small" justify="center">
      <div v-for="search in searchList">
        <n-button
          aria-label="search-suggestions"
          tertiary
          size="small"
          v-if="search.Title.length <= 20"
          >{{ search.Title }}</n-button
        >
      </div>
    </n-space>

    <n-modal v-model:show="showModal">
      <n-card
        style="width: 80%"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <lottie-player
          src="https://assets5.lottiefiles.com/packages/lf20_kuaqfduw.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      </n-card>
    </n-modal>
  </n-space>
</template>
