<script setup>
import { Microphone, Search } from "@vicons/fa";
import { Icon } from "@vicons/utils";
import { ref } from "vue";
import router from "../router";

const searchText = ref("");
const movieList = ref([]);
const searchTerm = ref("");
const searchList = ref([]);
const recentSearhesList = ref([]);
const count = ref(0);
const showRecent = ref(false);

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
  //todo: add toasts!
  recognition.onnomatch = (err) => {
    console.log(err);
    message.error("Try Again!", { duration: 1000 });
    showModal.value = false;
  };
};
const showModal = ref(false);
const handleRedirect = () => {
  if (searchText.value.trim().length != "") {
    router.push(`/results/${searchText.value}`);
  }
};
</script>

<template>
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
    ></n-auto-complete>

    <n-button size="large" @click="handleVoiceClick">
      <Icon>
        <Microphone />
      </Icon>
    </n-button>
    <n-button attr-type="submit" size="large" @click="handleRedirect">
      <Icon>
        <Search />
      </Icon>
    </n-button>
  </n-input-group>

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
</template>
