<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { NSwitch, NButton, NConfigProvider, NSpace, NP, NText, NA } from "naive-ui";
import { Sun, Moon, Bookmark, Github, ExternalLinkAlt } from "@vicons/fa";
import { Icon } from "@vicons/utils";

const darkMode = ref(true);

const railStyle = ({ focused, checked }) => {
  const style = {};
  if (checked) {
    style.background = "#d03050";
    if (focused) {
      style.boxShadow = "0 0 0 2px #da4163";
    }
  } else {
    style.background = "#2080f0";
    if (focused) {
      style.boxShadow = "0 0 0 2px #2080f040";
    }
  }
  return style;
};
</script>

<template>
  <n-space class="h-16 bg-navbar" justify="space-between" align="center">
    <RouterLink to="/">
      <div class="text-title ml-4 text-xl font-bold">🎬 FindMoovy</div>
    </RouterLink>
    <n-space justify="space-around" align="center">
      <n-switch v-model:value="darkMode" size="large" :rail-style="railStyle">
        <template #checked-icon>
          <Icon color="#808080">
            <Moon />
          </Icon>
        </template>
        <template #unchecked-icon>
          <Icon color="#da4163">
            <Sun />
          </Icon>
        </template>
      </n-switch>
      <RouterLink to="/watchlist">
        <n-button secondary type="error">
          <Icon>
            <Bookmark />
          </Icon>
        </n-button>
      </RouterLink>
      <n-button class secondary type="info">
        <Icon size="1.2rem" color="white">
          <Github />
        </Icon>
      </n-button>
    </n-space>
  </n-space>
  <!-- <n-space justify="center">
      <Icon size>
        <Searchengin />
      </Icon>
  </n-space>-->
  <div class="h-screen flex justify-between flex-col">
    <main class="h-auto">
      <RouterView />
    </main>
    <n-space justify="center">
      <n-p depth="3">
        Made with
        <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">
          <n-text type="success">
            Vue3
            <Icon size="0.6rem">
              <ExternalLinkAlt />
            </Icon>
          </n-text>
        </a>

        <n-text class="ml-1" depth="3">and 🍵 by</n-text>
        <a href="https://www.twitter.com/amkhrjee" target="_blank" rel="noopener noreferrer">
          <n-text depth="3" type="info">
            amkrjee
            <Icon size="0.6rem">
              <ExternalLinkAlt />
            </Icon>
          </n-text>
        </a>
      </n-p>
    </n-space>
  </div>
</template>

<style>
*,
::after,
::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Rubik", sans-serif;
  -webkit-tap-highlight-color: transparent;
}
footer a {
  text-decoration: none;
  color: #1da1f2;
}
</style>